
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import ReservationForm from "@/components/sections/Form";
import FloorPlan from "@/components/Booking/Blueprint";

import { restaurantConfig } from "@/config/restaurant";
import type { ThemeName } from "@/config/themes";
import { supabase } from "@/lib/supabase/client";

// =============================================================================
// Types
// =============================================================================

type TableStatus = "available" | "held" | "reserved";

type BookingStep = "details" | "tables" | "customer" | "confirmation";

interface RestaurantTable {
  id: string;
  code: string;
  name: string;
  label: string;
  capacity: number;
  x: number;
  y: number;
  visualType: string;
  area: string;
  canCombineWith: string[];
  status: TableStatus;
}

interface RestaurantBookingData {
  id: string;
  name: string;
  slug: string;
  timezone: string;
  bookingEnabled: boolean;
  holdDurationMinutes: number;
  reservationDurationMinutes: number;
  floorPlan: {
    width: number;
    height: number;
    tables: RestaurantTable[];
  };
}

interface AvailabilityRow {
  table_id: string;
  status: TableStatus;
}

interface HoldRow {
  reservation_id: string;
  hold_expires_at: string;
}

interface BookingShellProps {
  theme: ThemeName;
}

// =============================================================================
// Timezone helper
// =============================================================================

function restaurantDateTimeToISO(
  date: string,
  time: string,
  timezone: string
): string {
  const [year, month, day] = date.split("-").map(Number);
  const [hour, minute] = time.split(":").map(Number);

  const targetTimestamp = Date.UTC(
    year,
    month - 1,
    day,
    hour,
    minute
  );

  let utcTimestamp = targetTimestamp;

  const formatter = new Intl.DateTimeFormat("en-GB", {
    timeZone: timezone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
  });

  for (let i = 0; i < 4; i++) {
    const parts = formatter.formatToParts(new Date(utcTimestamp));
    const values = Object.fromEntries(
      parts.map((part) => [part.type, part.value])
    );

    const representedTimestamp = Date.UTC(
      Number(values.year),
      Number(values.month) - 1,
      Number(values.day),
      Number(values.hour),
      Number(values.minute),
      Number(values.second)
    );

    const difference = targetTimestamp - representedTimestamp;

    utcTimestamp += difference;

    if (difference === 0) break;
  }

  const finalParts = formatter.formatToParts(new Date(utcTimestamp));
  const finalValues = Object.fromEntries(
    finalParts.map((part) => [part.type, part.value])
  );

  const matches =
    Number(finalValues.year) === year &&
    Number(finalValues.month) === month &&
    Number(finalValues.day) === day &&
    Number(finalValues.hour) === hour &&
    Number(finalValues.minute) === minute;

  if (!matches) {
    throw new Error(
      "The selected time is not valid in the restaurant's timezone."
    );
  }

  return new Date(utcTimestamp).toISOString();
}

// =============================================================================
// Booking Shell
// =============================================================================

export default function BookingShell({ theme }: BookingShellProps) {
  const [step, setStep] = useState<BookingStep>("details");

  const [selectedTableIds, setSelectedTableIds] = useState<string[]>([]);

  const [bookingDetails, setBookingDetails] = useState({
    date: "",
    time: "",
    guests: "2",
  });

  const [customerDetails, setCustomerDetails] = useState({
    name: "",
    phone: "",
    email: "",
    notes: "",
  });

  const [restaurant, setRestaurant] =
    useState<RestaurantBookingData | null>(null);

  const [availability, setAvailability] = useState<
    Record<string, TableStatus>
  >({});

  const [loading, setLoading] = useState(true);
  const [availabilityLoading, setAvailabilityLoading] = useState(false);
  const [creatingHold, setCreatingHold] = useState(false);

  const [error, setError] = useState<string | null>(null);
  const [availabilityError, setAvailabilityError] = useState<string | null>(
    null
  );
  const [bookingError, setBookingError] = useState<string | null>(null);

  const [availabilityRetry, setAvailabilityRetry] = useState(0);

  const [hold, setHold] = useState<{
    reservationId: string;
    expiresAt: string;
  } | null>(null);

  const [remainingSeconds, setRemainingSeconds] = useState(0);

  const isLuxury = theme === "luxury";
  const bookingMethod = restaurantConfig.booking.method;
  const restaurantSlug = restaurantConfig.booking.restaurantSlug;

  // ===========================================================================
  // Load restaurant and floor-plan data
  // ===========================================================================

  useEffect(() => {
    let cancelled = false;

    async function loadRestaurant() {
      setLoading(true);
      setError(null);

      try {
        const { data: restaurantRow, error: restaurantError } =
          await supabase
            .from("restaurants")
            .select(
              `
                id,
                slug,
                name,
                timezone,
                booking_enabled,
                hold_duration_minutes,
                reservation_duration_minutes,
                floor_plan_width,
                floor_plan_height
              `
            )
            .eq("slug", restaurantSlug)
            .eq("booking_enabled", true)
            .single();

        if (restaurantError) throw restaurantError;

        if (!restaurantRow) {
          throw new Error("This restaurant could not be found.");
        }

        const [
          { data: tableRows, error: tablesError },
          { data: combinationRows, error: combinationsError },
        ] = await Promise.all([
          supabase
            .from("restaurant_tables")
            .select(
              `
                id,
                code,
                name,
                label,
                capacity,
                x,
                y,
                visual_type,
                area
              `
            )
            .eq("restaurant_id", restaurantRow.id)
            .eq("is_active", true)
            .order("code"),

          supabase
            .from("restaurant_table_combinations")
            .select("table_id, compatible_table_id")
            .eq("restaurant_id", restaurantRow.id),
        ]);

        if (tablesError) throw tablesError;
        if (combinationsError) throw combinationsError;

        const combinations = combinationRows ?? [];

        const tables: RestaurantTable[] = (tableRows ?? []).map(
          (table) => ({
            id: table.id,
            code: table.code,
            name: table.name,
            label: table.label,
            capacity: table.capacity,
            x: Number(table.x),
            y: Number(table.y),
            visualType: table.visual_type,
            area: table.area,

            canCombineWith: combinations
              .filter((combination) => combination.table_id === table.id)
              .map((combination) => combination.compatible_table_id),

            status: "available",
          })
        );

        if (cancelled) return;

        setRestaurant({
          id: restaurantRow.id,
          slug: restaurantRow.slug,
          name: restaurantRow.name,
          timezone: restaurantRow.timezone,
          bookingEnabled: restaurantRow.booking_enabled,
          holdDurationMinutes: restaurantRow.hold_duration_minutes,
          reservationDurationMinutes:
            restaurantRow.reservation_duration_minutes,

          floorPlan: {
            width: restaurantRow.floor_plan_width,
            height: restaurantRow.floor_plan_height,
            tables,
          },
        });
      } catch (err) {
        console.error("Failed to load restaurant:", err);

        if (!cancelled) {
          setError(
            err instanceof Error
              ? err.message
              : "Something went wrong while loading the restaurant."
          );
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadRestaurant();

    return () => {
      cancelled = true;
    };
  }, [restaurantSlug]);

  // ===========================================================================
  // Load availability for the selected date and time
  // ===========================================================================

  useEffect(() => {
    if (
      step !== "tables" ||
      !restaurant ||
      !bookingDetails.date ||
      !bookingDetails.time
    ) {
      return;
    }

    let cancelled = false;

    async function loadAvailability() {
      setAvailabilityLoading(true);
      setAvailabilityError(null);
      setAvailability({});

      try {
        const startsAt = restaurantDateTimeToISO(
          bookingDetails.date,
          bookingDetails.time,
          restaurant!.timezone
        );

        const { data, error: rpcError } = await supabase.rpc(
          "get_table_availability",
          {
            p_restaurant_slug: restaurant!.slug,
            p_starts_at: startsAt,
          }
        );

        if (rpcError) throw rpcError;

        const rows = (data ?? []) as AvailabilityRow[];
        const newAvailability: Record<string, TableStatus> = {};

        for (const row of rows) {
          if (
            row.status !== "available" &&
            row.status !== "held" &&
            row.status !== "reserved"
          ) {
            throw new Error("The database returned an invalid table status.");
          }

          newAvailability[row.table_id] = row.status;
        }

        const missingTable = restaurant!.floorPlan.tables.find(
          (table) => !newAvailability[table.id]
        );

        if (missingTable) {
          throw new Error(
            `Availability information is missing for ${missingTable.name}.`
          );
        }

        if (!cancelled) {
          setAvailability(newAvailability);
        }
      } catch (err) {
        console.error("Failed to load table availability:", err);

        if (!cancelled) {
          setAvailabilityError(
            err instanceof Error
              ? err.message
              : "Unable to check table availability."
          );
        }
      } finally {
        if (!cancelled) {
          setAvailabilityLoading(false);
        }
      }
    }

    loadAvailability();

    return () => {
      cancelled = true;
    };
  }, [
    step,
    bookingDetails.date,
    bookingDetails.time,
    restaurant,
    availabilityRetry,
  ]);

  // ===========================================================================
  // Hold countdown
  // ===========================================================================

  useEffect(() => {
    if (!hold) return;

    function updateCountdown() {
      const difference = Math.max(
        0,
        Math.ceil((new Date(hold!.expiresAt).getTime() - Date.now()) / 1000)
      );

      setRemainingSeconds(difference);
    }

    updateCountdown();

    const interval = window.setInterval(updateCountdown, 1000);

    return () => window.clearInterval(interval);
  }, [hold]);

  // ===========================================================================
  // Derived table data
  // ===========================================================================

  const tables: RestaurantTable[] =
    restaurant?.floorPlan.tables.map((table) => ({
      ...table,
      status: availability[table.id] ?? "available",
    })) ?? [];

  const selectedTables = tables.filter(
    (table) =>
      selectedTableIds.includes(table.id) &&
      table.status === "available"
  );

  const totalCapacity = selectedTables.reduce(
    (total, table) => total + table.capacity,
    0
  );

  const guestCount =
    bookingDetails.guests === "11+"
      ? 11
      : Number(bookingDetails.guests);

  const formatCountdown = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remaining = seconds % 60;

    return `${String(minutes).padStart(2, "0")}:${String(
      remaining
    ).padStart(2, "0")}`;
  };

  // ===========================================================================
  // Table selection
  // ===========================================================================

  function toggleTable(tableId: string) {
    const table = tables.find((item) => item.id === tableId);

    if (!table || table.status !== "available") return;

    setSelectedTableIds((current) =>
      current.includes(tableId)
        ? current.filter((id) => id !== tableId)
        : [...current, tableId]
    );
  }

  // ===========================================================================
  // Create temporary hold
  // ===========================================================================

  async function createHold(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!restaurant || creatingHold) return;

    if (selectedTables.length === 0) {
      setBookingError("Please select at least one available table.");
      setStep("tables");
      return;
    }

    if (totalCapacity < guestCount) {
      setBookingError(
        "The selected tables do not have enough seating capacity for your group."
      );
      setStep("tables");
      return;
    }

    setCreatingHold(true);
    setBookingError(null);

    try {
      const startsAt = restaurantDateTimeToISO(
        bookingDetails.date,
        bookingDetails.time,
        restaurant.timezone
      );

      const { data, error: holdError } = await supabase.rpc(
        "create_table_hold",
        {
          p_restaurant_slug: restaurant.slug,
          p_starts_at: startsAt,
          p_table_ids: selectedTables.map((table) => table.id),
          p_customer_name: customerDetails.name.trim(),
          p_customer_phone: customerDetails.phone.trim(),
          p_customer_email: customerDetails.email.trim() || null,
          p_guest_count: guestCount,
          p_notes: customerDetails.notes.trim() || null,
        }
      );

      if (holdError) throw holdError;

      const result = (Array.isArray(data) ? data[0] : data) as
        | HoldRow
        | null;

      if (!result?.reservation_id || !result?.hold_expires_at) {
        throw new Error(
          "The hold could not be confirmed. Please try again."
        );
      }

      setHold({
        reservationId: result.reservation_id,
        expiresAt: result.hold_expires_at,
      });

      setStep("confirmation");
    } catch (err) {
      console.error("Failed to create table hold:", err);

      setBookingError(
        err instanceof Error
          ? err.message
          : "We couldn't hold those tables. Please try again."
      );

      // Return to the floor plan so the customer can choose again.
      // This also triggers a fresh availability check.
      setStep("tables");
      setAvailabilityRetry((current) => current + 1);
    } finally {
      setCreatingHold(false);
    }
  }

  // ===========================================================================
  // Return to table selection after an expired hold
  // ===========================================================================

  function returnToTableSelection() {
    setHold(null);
    setRemainingSeconds(0);
    setSelectedTableIds([]);
    setBookingError(null);
    setStep("tables");
    setAvailabilityRetry((current) => current + 1);
  }

  // ===========================================================================
  // Render
  // ===========================================================================

  return (
    <main className="min-h-screen bg-[var(--color-background)]">
      <header className="flex items-center justify-between border-b border-[var(--color-border)] px-6 py-5 md:px-12">
        <Link
          href={`/preview/${theme}`}
          className="text-sm text-[var(--color-muted)] transition-colors hover:text-[var(--color-primary)]"
        >
          ← Back to restaurant
        </Link>

        <span className="text-xs font-semibold tracking-[0.25em] text-[var(--color-foreground)]">
          RESERVATIONS
        </span>

        <span className="text-xs tracking-wider text-[var(--color-muted)]">
          {isLuxury ? "FINE DINING" : "A PLACE AT THE TABLE"}
        </span>
      </header>

      <div className="mx-auto max-w-6xl px-6 py-16 md:px-12 md:py-24">
        <div className="mb-12">
          <p className="mb-4 text-xs tracking-[0.3em] text-[var(--color-primary)]">
            YOUR DINING EXPERIENCE
          </p>

          <h1 className="mb-5 text-5xl text-[var(--color-foreground)] md:text-7xl">
            Reserve Your Table
          </h1>

          <p className="max-w-xl text-sm leading-7 text-[var(--color-muted)]">
            Choose your preferred date and time, then find the perfect table
            for your visit.
          </p>
        </div>

        {bookingMethod === "whatsapp" ? (
          <div className="mx-auto max-w-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 md:p-10">
            <h2 className="mb-6 text-3xl text-[var(--color-foreground)]">
              Reservation Details
            </h2>

            <ReservationForm />
          </div>
        ) : loading ? (
          <div className="border border-[var(--color-border)] bg-[var(--color-surface)] p-10">
            <p className="text-sm text-[var(--color-muted)]">
              Loading restaurant and floor plan...
            </p>
          </div>
        ) : error ? (
          <div className="border border-red-300 bg-[var(--color-surface)] p-8">
            <h2 className="text-xl text-[var(--color-foreground)]">
              Unable to load the floor plan
            </h2>

            <p className="mt-3 text-sm text-red-600">{error}</p>
          </div>
        ) : !restaurant ? (
          <p className="text-sm text-[var(--color-muted)]">
            Restaurant information is unavailable.
          </p>
        ) : (
          <>
            {/* Progress indicator */}

            {step !== "confirmation" && (
              <div className="mb-10 flex flex-wrap items-center gap-3 text-xs tracking-wider">
                {[
                  { id: "details", label: "01 — DATE & TIME" },
                  { id: "tables", label: "02 — SELECT TABLE" },
                  { id: "customer", label: "03 — YOUR DETAILS" },
                ].map((item, index) => {
                  const stepOrder = ["details", "tables", "customer"];
                  const active = stepOrder.indexOf(step) >= index;

                  return (
                    <span
                      key={item.id}
                      className={
                        active
                          ? "text-[var(--color-primary)]"
                          : "text-[var(--color-muted)]"
                      }
                    >
                      {item.label}
                    </span>
                  );
                })}
              </div>
            )}

            {/* ============================================================= */}
            {/* STEP 1 — DATE AND TIME                                       */}
            {/* ============================================================= */}

            {step === "details" && (
              <form
                onSubmit={(event) => {
                  event.preventDefault();

                  setSelectedTableIds([]);
                  setAvailability({});
                  setBookingError(null);
                  setStep("tables");
                }}
                className="border border-[var(--color-border)] bg-[var(--color-surface)] p-6 md:p-10"
              >
                <h2 className="mb-8 text-2xl text-[var(--color-foreground)]">
                  When would you like to visit?
                </h2>

                <div className="grid gap-6 md:grid-cols-3">
                  <div className="space-y-2">
                    <label
                      htmlFor="booking-date"
                      className="text-sm text-[var(--color-foreground)]"
                    >
                      Date
                    </label>

                    <input
                      id="booking-date"
                      type="date"
                      required
                      value={bookingDetails.date}
                      onChange={(event) =>
                        setBookingDetails({
                          ...bookingDetails,
                          date: event.target.value,
                        })
                      }
                      className="w-full border border-[var(--color-border)] bg-[var(--color-background)] px-4 py-4 text-sm text-[var(--color-foreground)] outline-none focus:border-[var(--color-primary)]"
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="booking-time"
                      className="text-sm text-[var(--color-foreground)]"
                    >
                      Time
                    </label>

                    <input
                      id="booking-time"
                      type="time"
                      required
                      value={bookingDetails.time}
                      onChange={(event) =>
                        setBookingDetails({
                          ...bookingDetails,
                          time: event.target.value,
                        })
                      }
                      className="w-full border border-[var(--color-border)] bg-[var(--color-background)] px-4 py-4 text-sm text-[var(--color-foreground)] outline-none focus:border-[var(--color-primary)]"
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="booking-guests"
                      className="text-sm text-[var(--color-foreground)]"
                    >
                      Guests
                    </label>

                    <select
                      id="booking-guests"
                      value={bookingDetails.guests}
                      onChange={(event) =>
                        setBookingDetails({
                          ...bookingDetails,
                          guests: event.target.value,
                        })
                      }
                      className="w-full border border-[var(--color-border)] bg-[var(--color-background)] px-4 py-4 text-sm text-[var(--color-foreground)] outline-none focus:border-[var(--color-primary)]"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((number) => (
                        <option key={number} value={number}>
                          {number} {number === 1 ? "Guest" : "Guests"}
                        </option>
                      ))}

                      <option value="11+">More than 10 guests</option>
                    </select>
                  </div>
                </div>

                <div className="mt-10 flex justify-end">
                  <button
                    type="submit"
                    className="bg-[var(--color-primary)] px-8 py-4 text-sm font-semibold text-[var(--color-on-primary)] transition-colors hover:bg-[var(--color-primary-hover)]"
                  >
                    Find a Table →
                  </button>
                </div>
              </form>
            )}

            {/* ============================================================= */}
            {/* STEP 2 — TABLE SELECTION                                     */}
            {/* ============================================================= */}

            {step === "tables" && (
              <div className="border border-[var(--color-border)] bg-[var(--color-surface)] p-8 md:p-12">
                <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <h2 className="mb-2 text-2xl text-[var(--color-foreground)]">
                      Select Your Table
                    </h2>

                    <p className="text-sm text-[var(--color-muted)]">
                      {bookingDetails.date} · {bookingDetails.time} ·{" "}
                      {bookingDetails.guests} guests
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setSelectedTableIds([]);
                      setStep("details");
                    }}
                    className="text-sm text-[var(--color-primary)] hover:text-[var(--color-primary-hover)]"
                  >
                    ← Change details
                  </button>
                </div>

                {bookingError && (
                  <div className="mb-6 border border-red-300 bg-red-50 p-4 text-sm text-red-700">
                    {bookingError}
                  </div>
                )}

                {availabilityLoading ? (
                  <div className="border border-[var(--color-border)] p-10 text-center">
                    <p className="text-sm text-[var(--color-muted)]">
                      Checking table availability...
                    </p>
                  </div>
                ) : availabilityError ? (
                  <div className="border border-red-300 p-8">
                    <h3 className="text-lg text-[var(--color-foreground)]">
                      Unable to check availability
                    </h3>

                    <p className="mt-2 text-sm text-red-600">
                      {availabilityError}
                    </p>

                    <button
                      type="button"
                      onClick={() =>
                        setAvailabilityRetry((current) => current + 1)
                      }
                      className="mt-5 bg-[var(--color-primary)] px-6 py-3 text-sm font-semibold text-[var(--color-on-primary)] hover:bg-[var(--color-primary-hover)]"
                    >
                      Try Again
                    </button>
                  </div>
                ) : (
                  <>
                    <FloorPlan
                      width={restaurant.floorPlan.width}
                      height={restaurant.floorPlan.height}
                      tables={tables}
                      selectedTableIds={selectedTableIds}
                      onToggleTable={toggleTable}
                    />

                    <div className="mt-8 flex flex-wrap gap-5 border-t border-[var(--color-border)] pt-6 text-xs text-[var(--color-muted)]">
                      <span className="flex items-center gap-2">
                        <span className="h-3 w-3 rounded-full bg-green-500" />
                        Available
                      </span>

                      <span className="flex items-center gap-2">
                        <span className="h-3 w-3 rounded-full bg-amber-500" />
                        Temporarily held
                      </span>

                      <span className="flex items-center gap-2">
                        <span className="h-3 w-3 rounded-full bg-red-500" />
                        Reserved
                      </span>
                    </div>

                    <div className="mt-8 border-t border-[var(--color-border)] pt-6">
                      <h3 className="text-lg text-[var(--color-foreground)]">
                        Your Selection
                      </h3>

                      {selectedTables.length === 0 ? (
                        <p className="mt-2 text-sm text-[var(--color-muted)]">
                          Select one or more tables to continue.
                        </p>
                      ) : (
                        <>
                          <p className="mt-2 text-sm text-[var(--color-muted)]">
                            {selectedTables
                              .map((table) => table.name)
                              .join(", ")}
                          </p>

                          <p className="mt-2 text-sm text-[var(--color-foreground)]">
                            {selectedTables.length} tables · Seating capacity:{" "}
                            {totalCapacity}
                          </p>

                          <button
                            type="button"
                            onClick={() => setSelectedTableIds([])}
                            className="mt-3 text-sm text-[var(--color-primary)] hover:text-[var(--color-primary-hover)]"
                          >
                            Clear selection
                          </button>
                        </>
                      )}
                    </div>

                    <div className="mt-8 flex justify-end border-t border-[var(--color-border)] pt-6">
                      <button
                        type="button"
                        disabled={
                          selectedTables.length === 0 ||
                          totalCapacity < guestCount
                        }
                        onClick={() => {
                          setBookingError(null);
                          setStep("customer");
                        }}
                        className="bg-[var(--color-primary)] px-8 py-4 text-sm font-semibold text-[var(--color-on-primary)] transition-colors hover:bg-[var(--color-primary-hover)] disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        Continue to Your Details →
                      </button>
                    </div>

                    {totalCapacity < guestCount &&
                      selectedTables.length > 0 && (
                        <p className="mt-3 text-right text-sm text-red-600">
                          Your selected tables need at least {guestCount} seats.
                        </p>
                      )}
                  </>
                )}
              </div>
            )}

            {/* ============================================================= */}
            {/* STEP 3 — CUSTOMER DETAILS                                    */}
            {/* ============================================================= */}

            {step === "customer" && (
              <form
                onSubmit={createHold}
                className="border border-[var(--color-border)] bg-[var(--color-surface)] p-6 md:p-10"
              >
                <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <h2 className="mb-2 text-2xl text-[var(--color-foreground)]">
                      Your Details
                    </h2>

                    <p className="text-sm text-[var(--color-muted)]">
                      Tell us how to contact you about your reservation.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setBookingError(null);
                      setStep("tables");
                    }}
                    className="text-sm text-[var(--color-primary)] hover:text-[var(--color-primary-hover)]"
                  >
                    ← Back to tables
                  </button>
                </div>

                <div className="mb-8 border border-[var(--color-border)] p-5">
                  <p className="text-xs tracking-wider text-[var(--color-muted)]">
                    YOUR BOOKING
                  </p>

                  <p className="mt-3 text-sm text-[var(--color-foreground)]">
                    {bookingDetails.date} · {bookingDetails.time}
                  </p>

                  <p className="mt-1 text-sm text-[var(--color-muted)]">
                    {guestCount} guests ·{" "}
                    {selectedTables.map((table) => table.name).join(", ")}
                  </p>
                </div>

                {bookingError && (
                  <div className="mb-6 border border-red-300 bg-red-50 p-4 text-sm text-red-700">
                    {bookingError}
                  </div>
                )}

                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <label
                      htmlFor="customer-name"
                      className="text-sm text-[var(--color-foreground)]"
                    >
                      Full name *
                    </label>

                    <input
                      id="customer-name"
                      type="text"
                      required
                      autoComplete="name"
                      value={customerDetails.name}
                      onChange={(event) =>
                        setCustomerDetails({
                          ...customerDetails,
                          name: event.target.value,
                        })
                      }
                      className="w-full border border-[var(--color-border)] bg-[var(--color-background)] px-4 py-4 text-sm text-[var(--color-foreground)] outline-none focus:border-[var(--color-primary)]"
                      placeholder="Your full name"
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="customer-phone"
                      className="text-sm text-[var(--color-foreground)]"
                    >
                      Phone number *
                    </label>

                    <input
                      id="customer-phone"
                      type="tel"
                      required
                      autoComplete="tel"
                      value={customerDetails.phone}
                      onChange={(event) =>
                        setCustomerDetails({
                          ...customerDetails,
                          phone: event.target.value,
                        })
                      }
                      className="w-full border border-[var(--color-border)] bg-[var(--color-background)] px-4 py-4 text-sm text-[var(--color-foreground)] outline-none focus:border-[var(--color-primary)]"
                      placeholder="+263..."
                    />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <label
                      htmlFor="customer-email"
                      className="text-sm text-[var(--color-foreground)]"
                    >
                      Email address (optional)
                    </label>

                    <input
                      id="customer-email"
                      type="email"
                      autoComplete="email"
                      value={customerDetails.email}
                      onChange={(event) =>
                        setCustomerDetails({
                          ...customerDetails,
                          email: event.target.value,
                        })
                      }
                      className="w-full border border-[var(--color-border)] bg-[var(--color-background)] px-4 py-4 text-sm text-[var(--color-foreground)] outline-none focus:border-[var(--color-primary)]"
                      placeholder="you@example.com"
                    />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <label
                      htmlFor="customer-notes"
                      className="text-sm text-[var(--color-foreground)]"
                    >
                      Special requests (optional)
                    </label>

                    <textarea
                      id="customer-notes"
                      rows={4}
                      value={customerDetails.notes}
                      onChange={(event) =>
                        setCustomerDetails({
                          ...customerDetails,
                          notes: event.target.value,
                        })
                      }
                      className="w-full resize-y border border-[var(--color-border)] bg-[var(--color-background)] px-4 py-4 text-sm text-[var(--color-foreground)] outline-none focus:border-[var(--color-primary)]"
                      placeholder="Let us know if you have any special requests..."
                    />
                  </div>
                </div>

                <div className="mt-8 border-t border-[var(--color-border)] pt-6">
                  <p className="text-sm leading-6 text-[var(--color-muted)]">
                    Your selected tables will only be held once you submit
                    this form. The temporary hold will last{" "}
                    {restaurant.holdDurationMinutes} minutes.
                  </p>

                  <div className="mt-8 flex justify-end">
                    <button
                      type="submit"
                      disabled={creatingHold}
                      className="bg-[var(--color-primary)] px-8 py-4 text-sm font-semibold text-[var(--color-on-primary)] transition-colors hover:bg-[var(--color-primary-hover)] disabled:cursor-wait disabled:opacity-50"
                    >
                      {creatingHold
                        ? "Securing your tables..."
                        : "Secure My Tables →"}
                    </button>
                  </div>
                </div>
              </form>
            )}

            {/* ============================================================= */}
            {/* STEP 4 — TEMPORARY HOLD CONFIRMATION                          */}
            {/* ============================================================= */}

            {step === "confirmation" && hold && (
              <div className="mx-auto max-w-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-8 text-center md:p-12">
                {remainingSeconds > 0 ? (
                  <>
                    <p className="text-xs tracking-[0.3em] text-[var(--color-primary)]">
                      TEMPORARY HOLD CREATED
                    </p>

                    <h2 className="mt-5 text-3xl text-[var(--color-foreground)] md:text-4xl">
                      Your tables are being held.
                    </h2>

                    <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-[var(--color-muted)]">
                      We've temporarily secured your selected tables. You
                      have until the timer expires to complete the next step
                      of your reservation.
                    </p>

                    <div className="my-10 border-y border-[var(--color-border)] py-8">
                      <p className="text-xs tracking-wider text-[var(--color-muted)]">
                        TIME REMAINING
                      </p>

                      <p className="mt-3 font-mono text-5xl tabular-nums text-[var(--color-primary)]">
                        {formatCountdown(remainingSeconds)}
                      </p>

                      <p className="mt-3 text-xs text-[var(--color-muted)]">
                        Your hold expires automatically when this timer
                        reaches zero.
                      </p>
                    </div>

                    <div className="space-y-2 text-sm text-[var(--color-foreground)]">
                      <p>
                        <span className="text-[var(--color-muted)]">
                          Reservation reference:
                        </span>{" "}
                        {hold.reservationId}
                      </p>

                      <p>
                        <span className="text-[var(--color-muted)]">
                          Name:
                        </span>{" "}
                        {customerDetails.name}
                      </p>

                      <p>
                        <span className="text-[var(--color-muted)]">
                          Visit:
                        </span>{" "}
                        {bookingDetails.date} at {bookingDetails.time}
                      </p>

                      <p>
                        <span className="text-[var(--color-muted)]">
                          Tables:
                        </span>{" "}
                        {selectedTables.map((table) => table.name).join(", ")}
                      </p>
                    </div>

                    <p className="mt-8 text-xs leading-6 text-[var(--color-muted)]">
                      This is a temporary hold, not yet a confirmed
                      reservation.
                    </p>
                  </>
                ) : (
                  <>
                    <p className="text-xs tracking-[0.3em] text-red-600">
                      HOLD EXPIRED
                    </p>

                    <h2 className="mt-5 text-3xl text-[var(--color-foreground)]">
                      Your hold has expired.
                    </h2>

                    <p className="mt-4 text-sm leading-7 text-[var(--color-muted)]">
                      The temporary hold period has ended. Your tables may
                      now be available to other customers. You can check
                      availability and try again.
                    </p>

                    <button
                      type="button"
                      onClick={returnToTableSelection}
                      className="mt-8 bg-[var(--color-primary)] px-8 py-4 text-sm font-semibold text-[var(--color-on-primary)] hover:bg-[var(--color-primary-hover)]"
                    >
                      Check Availability Again →
                    </button>
                  </>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}
