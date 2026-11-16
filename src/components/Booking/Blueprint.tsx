"use client";

import type { RestaurantTable } from "@/TypesShared/bookings";

interface FloorPlanProps {
  width: number;
  height: number;
  tables: RestaurantTable[];
  selectedTableIds: string[];
  onToggleTable: (tableId: string) => void;
}

interface ChairPosition {
  x: number;
  y: number;
  rotation: number;
}

function getChairPositions(
  capacity: number,
  visualType: string,
): ChairPosition[] {
  // Round tables: distribute chairs evenly around the table.
  if (visualType.startsWith("table-round")) {
    const radius = 39;

    return Array.from({ length: capacity }, (_, index) => {
      const angle = -90 + (360 / capacity) * index;
      const radians = (angle * Math.PI) / 180;

      return {
        x: Math.cos(radians) * radius,
        y: Math.sin(radians) * radius,
        rotation: angle + 90,
      };
    });
  }

  // Square tables: place chairs around the four sides.
  if (visualType.startsWith("table-square")) {
    const positions: Record<number, ChairPosition[]> = {
      1: [{ x: 0, y: -29, rotation: 0 }],
      2: [
        { x: 0, y: -29, rotation: 0 },
        { x: 0, y: 29, rotation: 180 },
      ],
      3: [
        { x: 0, y: -29, rotation: 0 },
        { x: -29, y: 0, rotation: -90 },
        { x: 29, y: 0, rotation: 90 },
      ],
      4: [
        { x: 0, y: -29, rotation: 0 },
        { x: 29, y: 0, rotation: 90 },
        { x: 0, y: 29, rotation: 180 },
        { x: -29, y: 0, rotation: -90 },
      ],
    };

    return positions[capacity] ?? positions[4];
  }

  // Bar seats are represented by the stool itself.
  if (visualType === "table-bar") {
    return [];
  }

  return [];
}

function DynamicChairs({
  capacity,
  visualType,
}: {
  capacity: number;
  visualType: string;
}) {
  const chairs = getChairPositions(capacity, visualType);

  return (
    <g className="dynamic-chairs">
      {chairs.map((chair, index) => (
        <g
          key={index}
          transform={`translate(${chair.x}, ${chair.y}) rotate(${chair.rotation})`}
        >
          <rect x="-7" y="-5" width="14" height="10" rx="3" className="chair" />

          <path
            d="M -5,-3 L 5,-3"
            fill="none"
            stroke="var(--chair-stroke, #cbd5e0)"
            strokeWidth="1"
          />
        </g>
      ))}
    </g>
  );
}

export default function FloorPlan({
  width,
  height,
  tables,
  selectedTableIds,
  onToggleTable,
}: FloorPlanProps) {
  const selectedTables = tables.filter((table) =>
    selectedTableIds.includes(table.id),
  );

  const totalCapacity = selectedTables.reduce(
    (total, table) => total + table.capacity,
    0,
  );

  return (
    <div className="space-y-6">
      {/* Floor plan and legend */}
      <div className="overflow-hidden border border-[var(--color-border)] bg-[var(--color-surface)] p-4 md:p-6">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs tracking-[0.2em] text-[var(--color-muted)]">
              RESTAURANT LAYOUT
            </p>
            <p className="mt-1 text-sm text-[var(--color-foreground)]">
              Select your preferred seating
            </p>
          </div>

          <div className="flex flex-wrap gap-4 text-xs text-[var(--color-muted)]">
            <span className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full border border-gray-400 bg-white" />
              Available
            </span>

            <span className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-[var(--color-primary)]" />
              Selected
            </span>

            <span className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-[#f6bd60]" />
              Temporarily held
            </span>

            <span className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-[#cf6262]" />
              Reserved
            </span>
          </div>
        </div>

        {/* SVG artwork */}
        <div className="w-full overflow-x-auto">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox={`0 0 ${width} ${height}`}
            className="h-auto w-full min-w-[600px]"
            role="group"
            aria-label="Interactive restaurant floor plan"
          >
            <defs>
              {/* Floor gradients */}
              <linearGradient
                id="floorGrad"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#fdfbf7" />
                <stop offset="100%" stopColor="#f4eee1" />
              </linearGradient>

              <linearGradient
                id="patioGrad"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#e8f3ec" />
                <stop offset="100%" stopColor="#d3e8db" />
              </linearGradient>

              <linearGradient id="barGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#4a3b32" />
                <stop offset="100%" stopColor="#2c221c" />
              </linearGradient>

              <linearGradient
                id="kitchenGrad"
                x1="0%"
                y1="0%"
                x2="0%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#f5f7fa" />
                <stop offset="100%" stopColor="#e4e8f0" />
              </linearGradient>

              {/* Shadows */}
              <filter
                id="dropShadow"
                x="-30%"
                y="-30%"
                width="160%"
                height="160%"
              >
                <feDropShadow
                  dx="1"
                  dy="2"
                  stdDeviation="2"
                  floodColor="#000000"
                  floodOpacity="0.12"
                />
              </filter>

              {/* Reusable table styles */}

              <style>{`
  .bookable-table {
    cursor: pointer;
    outline: none;

    /* Default table appearance */
    --table-surface-fill: #ffffff;
    --table-surface-stroke: #cbd5e0;
    --chair-fill: #edf2f7;
    --chair-stroke: #cbd5e0;
  }

  /* Table surfaces inherit these values through SVG use */
  .table-surface {
    fill: var(--table-surface-fill, #ffffff);
    stroke: var(--table-surface-stroke, #cbd5e0);
    stroke-width: 1.8;
    transition: fill 0.2s ease, stroke 0.2s ease;
  }

  .chair {
    fill: var(--chair-fill, #edf2f7);
    stroke: var(--chair-stroke, #cbd5e0);
    stroke-width: 1.4;
    stroke-linejoin: round;
    transition: fill 0.2s ease, stroke 0.2s ease;
  }

  /* Hover: subtle blue highlight */
  .bookable-table:hover {
    --table-surface-fill: #ebf8ff;
    --table-surface-stroke: #3182ce;
    --chair-fill: #ebf8ff;
    --chair-stroke: #3182ce;
  }

  /* Selected: use the restaurant theme */
  .bookable-table.is-selected {
    --table-surface-fill: var(--color-primary, #A65D42);
    --table-surface-stroke: var(--color-primary, #A65D42);
    --chair-fill: var(--color-primary, #A65D42);
    --chair-stroke: var(--color-primary, #A65D42);
  }

  /* Temporarily held tables */
.bookable-table.is-held {
  --table-surface-fill: #f6bd60;
  --table-surface-stroke: #d99526;
  --chair-fill: #fce4b2;
  --chair-stroke: #d99526;
  cursor: not-allowed;
}

/* Reserved tables */
.bookable-table.is-reserved {
  --table-surface-fill: #cf6262;
  --table-surface-stroke: #a93636;
  --chair-fill: #edb0b0;
  --chair-stroke: #a93636;
  cursor: not-allowed;
}

/* Prevent unavailable tables from showing the available hover effect */
.bookable-table:not(.is-held):not(.is-reserved):hover {
  --table-surface-fill: #ebf8ff;
  --table-surface-stroke: #3182ce;
  --chair-fill: #ebf8ff;
  --chair-stroke: #3182ce;
}

  /* Table labels */
  .table-label {
    fill: #2d3748;
    font-family: Arial, sans-serif;
    font-size: 11px;
    font-weight: 700;
    text-anchor: middle;
    pointer-events: none;
    transition: fill 0.2s ease;
  }

  .bookable-table.is-selected .table-label {
    fill: var(--color-on-primary, #ffffff);
  }

  /* Keyboard focus */
  .bookable-table:focus-visible .table-surface {
    stroke: #3182ce;
    stroke-width: 4;
  }

  .wall {
    fill: #2d3748;
    stroke: #1a202c;
    stroke-width: 2;
  }

  .furniture {
    fill: #ffffff;
    stroke: #718096;
    stroke-width: 1.4;
    stroke-linejoin: round;
  }

  .furniture-light {
    fill: #edf2f7;
    stroke: #a0aec0;
    stroke-width: 1.2;
  }

  .door-arc {
    fill: none;
    stroke: #718096;
    stroke-width: 1.5;
    stroke-dasharray: 3,3;
  }

  .door-leaf {
    fill: #ffffff;
    stroke: #4a5568;
    stroke-width: 1.8;
  }

  .dashed {
    fill: none;
    stroke: #a0aec0;
    stroke-width: 1.2;
    stroke-dasharray: 5,4;
  }

  .text-room {
    font-family: Arial, sans-serif;
    font-size: 14px;
    font-weight: 700;
    fill: #4a5568;
    text-anchor: middle;
    letter-spacing: 1px;
  }

  .text-label {
    font-family: Arial, sans-serif;
    font-size: 13px;
    font-weight: 600;
    fill: #2d3748;
    text-anchor: middle;
  }

  .text-sub {
    font-family: Arial, sans-serif;
    font-size: 11px;
    font-weight: 600;
    fill: #718096;
    text-anchor: middle;
  }
`}</style>

              {/* Round tables */}
              <g id="table-round-4">
                <circle
                  cx="0"
                  cy="0"
                  r="24"
                  className="table-surface"
                  filter="url(#dropShadow)"
                />
              </g>

              <g id="table-round-3">
                <circle
                  cx="0"
                  cy="0"
                  r="24"
                  className="table-surface"
                  filter="url(#dropShadow)"
                />
              </g>

              <g id="table-round-2">
                <circle
                  cx="0"
                  cy="0"
                  r="22"
                  className="table-surface"
                  filter="url(#dropShadow)"
                />
              </g>

              {/* Square tables */}
              <g id="table-square-2">
                <rect
                  x="-18"
                  y="-20"
                  width="36"
                  height="40"
                  rx="4"
                  className="table-surface"
                  filter="url(#dropShadow)"
                />
              </g>

              <g id="table-square-3">
                <rect
                  x="-20"
                  y="-18"
                  width="40"
                  height="36"
                  rx="4"
                  className="table-surface"
                  filter="url(#dropShadow)"
                />
              </g>

              <g id="table-square-4">
                <rect
                  x="-20"
                  y="-20"
                  width="40"
                  height="40"
                  rx="4"
                  className="table-surface"
                  filter="url(#dropShadow)"
                />
              </g>

              {/* Bar stool */}
              <g id="table-bar">
                <circle
                  cx="0"
                  cy="0"
                  r="11"
                  className="table-surface"
                  filter="url(#dropShadow)"
                />

                <path
                  d="M 9,-8 Q 16,0 9,8"
                  fill="none"
                  stroke="#718096"
                  strokeWidth="1.5"
                />
              </g>
            </defs>

            {/* Floor background */}
            <rect width="960" height="660" fill="url(#floorGrad)" />

            {/* Floor tile pattern */}
            <g stroke="#e2e8f0" strokeWidth="0.5" opacity="0.6">
              <path d="M 78,100 L 645,100 M 78,200 L 645,200 M 78,300 L 645,300 M 78,400 L 645,400 M 78,500 L 645,500" />
              <path d="M 150,45 L 150,575 M 250,45 L 250,575 M 350,45 L 350,575 M 450,45 L 450,575 M 550,45 L 550,575" />
            </g>

            {/* Outdoor patio */}
            <g id="outdoor-patio">
              <rect
                x="645"
                y="218"
                width="210"
                height="337"
                fill="url(#patioGrad)"
              />

              <g stroke="#cbd5e0" strokeWidth="0.7" opacity="0.5">
                <line x1="645" y1="250" x2="855" y2="250" />
                <line x1="645" y1="300" x2="855" y2="300" />
                <line x1="645" y1="350" x2="855" y2="350" />
                <line x1="645" y1="400" x2="855" y2="400" />
                <line x1="645" y1="450" x2="855" y2="450" />
                <line x1="645" y1="500" x2="855" y2="500" />
              </g>

              <rect x="645" y="218" width="210" height="6" className="wall" />
              <rect x="645" y="549" width="210" height="6" className="wall" />
              <rect x="850" y="218" width="6" height="337" className="wall" />

              <rect
                x="742"
                y="215"
                width="12"
                height="12"
                fill="#2d3748"
                rx="2"
              />
              <rect
                x="847"
                y="215"
                width="12"
                height="12"
                fill="#2d3748"
                rx="2"
              />
              <rect
                x="847"
                y="380"
                width="12"
                height="12"
                fill="#2d3748"
                rx="2"
              />
              <rect
                x="847"
                y="546"
                width="12"
                height="12"
                fill="#2d3748"
                rx="2"
              />
              <rect
                x="742"
                y="546"
                width="12"
                height="12"
                fill="#2d3748"
                rx="2"
              />

              <circle cx="665" cy="238" r="10" fill="#48bb78" opacity="0.8" />
              <circle cx="665" cy="238" r="6" fill="#38a169" />
              <circle cx="665" cy="532" r="10" fill="#48bb78" opacity="0.8" />
              <circle cx="665" cy="532" r="6" fill="#38a169" />

              <text x="735" y="340" className="text-room" fill="#2f855a">
                OUTDOOR TERRACE
              </text>
              <text x="705" y="360" className="text-sub">
                Select a table
              </text>
            </g>

            {/* Main building shell */}
            <g id="building-walls">
              <rect
                x="78"
                y="45"
                width="567"
                height="530"
                fill="none"
                stroke="#1a202c"
                strokeWidth="10"
              />
              <rect
                x="78"
                y="45"
                width="567"
                height="530"
                fill="none"
                stroke="#ffffff"
                strokeWidth="6"
              />
              <rect
                x="78"
                y="45"
                width="567"
                height="530"
                fill="none"
                stroke="#2d3748"
                strokeWidth="1.5"
              />

              {/* Windows */}
              <rect
                x="112"
                y="571"
                width="115"
                height="8"
                fill="#e2e8f0"
                stroke="#4a5568"
                strokeDasharray="4 2"
              />
              <rect
                x="445"
                y="571"
                width="150"
                height="8"
                fill="#e2e8f0"
                stroke="#4a5568"
                strokeDasharray="4 2"
              />
              <rect
                x="641"
                y="330"
                width="8"
                height="175"
                fill="#e2e8f0"
                stroke="#4a5568"
                strokeDasharray="4 2"
              />

              {/* Main entrance */}
              <rect
                x="265"
                y="568"
                width="116"
                height="14"
                fill="#ffffff"
                stroke="none"
              />
              <line
                x1="265"
                y1="569"
                x2="265"
                y2="581"
                stroke="#2d3748"
                strokeWidth="2"
              />
              <line
                x1="381"
                y1="569"
                x2="381"
                y2="581"
                stroke="#2d3748"
                strokeWidth="2"
              />
              <path d="M 265,575 Q 265,522 323,522" className="door-arc" />
              <line x1="265" y1="575" x2="323" y2="522" className="door-leaf" />
              <path d="M 381,575 Q 381,522 323,522" className="door-arc" />
              <line x1="381" y1="575" x2="323" y2="522" className="door-leaf" />

              {/* Patio glass door */}
              <rect
                x="638"
                y="242"
                width="14"
                height="54"
                fill="#ffffff"
                stroke="none"
              />
              <path d="M 645,296 Q 592,296 592,242" className="door-arc" />
              <line x1="645" y1="296" x2="592" y2="242" className="door-leaf" />
            </g>

            {/* Interior walls */}
            <g id="interior-walls">
              <rect x="83" y="218" width="275" height="6" className="wall" />
              <rect x="408" y="218" width="12" height="6" className="wall" />
              <rect x="415" y="50" width="6" height="174" className="wall" />
              <rect x="421" y="95" width="75" height="5" className="wall" />

              <rect x="435" y="93" width="46" height="9" fill="#ffffff" />
              <path d="M 435,97 Q 435,115 458,115" className="door-arc" />
              <line x1="435" y1="97" x2="458" y2="115" className="door-leaf" />
              <path d="M 481,97 Q 481,115 458,115" className="door-arc" />
              <line x1="481" y1="97" x2="458" y2="115" className="door-leaf" />

              <rect x="495" y="50" width="6" height="115" className="wall" />
              <rect x="495" y="205" width="6" height="19" className="wall" />
              <rect x="501" y="146" width="139" height="5" className="wall" />
              <rect x="501" y="160" width="139" height="5" className="wall" />
              <rect x="501" y="218" width="139" height="6" className="wall" />

              <rect x="421" y="156" width="54" height="5" className="wall" />
              <rect x="430" y="154" width="42" height="9" fill="#ffffff" />
              <path d="M 430,158 Q 470,158 470,118" className="door-arc" />
              <line x1="430" y1="158" x2="430" y2="118" className="door-leaf" />

              <path d="M 498,142 Q 536,142 536,106" className="door-arc" />
              <line x1="498" y1="142" x2="536" y2="142" className="door-leaf" />
              <path d="M 498,168 Q 536,168 536,204" className="door-arc" />
              <line x1="498" y1="168" x2="536" y2="168" className="door-leaf" />
              <path d="M 358,221 Q 358,172 408,172" className="door-arc" />
              <line x1="408" y1="221" x2="408" y2="172" className="door-leaf" />
            </g>

            {/* Kitchen - staff only */}
            <g id="kitchen-area">
              <rect
                x="85"
                y="52"
                width="328"
                height="163"
                fill="url(#kitchenGrad)"
                rx="4"
                opacity="0.3"
              />
              <path
                d="M 88,55 L 365,55 L 365,92 L 128,92 L 128,175 L 88,175 Z"
                className="furniture-light"
              />
              <polyline points="106,168 106,74 358,74" className="dashed" />

              <rect
                x="92"
                y="106"
                width="32"
                height="44"
                className="furniture"
              />
              <line
                x1="92"
                y1="106"
                x2="124"
                y2="150"
                stroke="#a0aec0"
                strokeWidth="1"
              />
              <line
                x1="124"
                y1="106"
                x2="92"
                y2="150"
                stroke="#a0aec0"
                strokeWidth="1"
              />

              <rect
                x="88"
                y="175"
                width="40"
                height="43"
                className="furniture"
              />
              <rect
                x="172"
                y="58"
                width="44"
                height="36"
                className="furniture"
              />
              <circle cx="183" cy="68" r="4" fill="#cbd5e0" />
              <circle cx="205" cy="68" r="4" fill="#cbd5e0" />
              <circle cx="183" cy="84" r="4" fill="#cbd5e0" />
              <circle cx="205" cy="84" r="4" fill="#cbd5e0" />

              <rect
                x="256"
                y="58"
                width="52"
                height="34"
                className="furniture"
              />
              <rect
                x="260"
                y="63"
                width="20"
                height="24"
                rx="3"
                className="furniture"
              />
              <rect
                x="284"
                y="63"
                width="20"
                height="24"
                rx="3"
                className="furniture"
              />

              <rect
                x="308"
                y="55"
                width="57"
                height="37"
                className="furniture"
              />
              <rect
                x="368"
                y="55"
                width="44"
                height="48"
                className="furniture"
              />
              <rect
                x="200"
                y="172"
                width="150"
                height="38"
                className="furniture"
              />
              <rect
                x="205"
                y="224"
                width="138"
                height="12"
                className="furniture-light"
              />

              <text x="245" y="128" className="text-room" fill="#a0aec0">
                KITCHEN (STAFF)
              </text>
            </g>

            {/* Restrooms */}
            <g id="restrooms">
              <rect
                x="528"
                y="55"
                width="38"
                height="24"
                className="furniture"
              />
              <ellipse
                cx="547"
                cy="67"
                rx="12"
                ry="7"
                className="furniture-light"
              />
              <rect
                x="596"
                y="55"
                width="22"
                height="10"
                rx="2"
                className="furniture"
              />
              <ellipse cx="607" cy="78" rx="8" ry="12" className="furniture" />
              <circle cx="602" cy="112" r="28" className="dashed" />
              <text x="585" y="115" className="text-sub">
                WC
              </text>

              <rect
                x="545"
                y="165"
                width="38"
                height="24"
                className="furniture"
              />
              <ellipse
                cx="564"
                cy="177"
                rx="12"
                ry="7"
                className="furniture-light"
              />
              <rect
                x="630"
                y="182"
                width="10"
                height="22"
                rx="2"
                className="furniture"
              />
              <ellipse cx="617" cy="193" rx="12" ry="8" className="furniture" />
              <text x="556" y="200" className="text-sub">
                WC
              </text>
            </g>

            {/* Bar and host area */}
            <g id="bar-and-host">
              <rect
                x="85"
                y="250"
                width="210"
                height="235"
                fill="#edf2f7"
                rx="6"
                opacity="0.4"
              />

              <rect
                x="92"
                y="280"
                width="32"
                height="175"
                className="furniture"
              />
              <line
                x1="108"
                y1="286"
                x2="108"
                y2="449"
                stroke="#cbd5e0"
                strokeWidth="1"
              />
              <line
                x1="116"
                y1="286"
                x2="116"
                y2="449"
                stroke="#cbd5e0"
                strokeWidth="1"
              />

              <rect
                x="175"
                y="280"
                width="46"
                height="175"
                fill="url(#barGrad)"
                rx="4"
                filter="url(#dropShadow)"
              />
              <rect
                x="175"
                y="418"
                width="22"
                height="37"
                className="furniture"
              />

              <text
                x="142"
                y="370"
                className="text-room"
                transform="rotate(-90, 142, 370)"
              >
                BAR LOUNGE
              </text>

              <path
                d="M 88,495 L 122,495 L 122,535 L 222,535 L 222,568 L 88,568 Z"
                className="furniture"
              />
              <text x="155" y="548" className="text-label">
                WELCOME / HOST
              </text>
            </g>

            {/* Main dining room label */}
            <g id="dining-area">
              <text x="465" y="285" className="text-room">
                MAIN DINING SALON
              </text>
              <path
                d="M 390,292 L 540,292"
                stroke="#cbd5e0"
                strokeWidth="1.5"
                strokeDasharray="4,4"
              />
              <text x="323" y="535" className="text-room">
                ENTRANCE
              </text>
            </g>

            {/* Decorative plants */}
            <g id="plants">
              <circle
                cx="240"
                cy="545"
                r="8"
                fill="#48bb78"
                filter="url(#dropShadow)"
              />
              <circle cx="240" cy="545" r="4" fill="#2f855a" />
              <circle
                cx="615"
                cy="315"
                r="8"
                fill="#48bb78"
                filter="url(#dropShadow)"
              />
              <circle cx="615" cy="315" r="4" fill="#2f855a" />
              <circle
                cx="395"
                cy="242"
                r="7"
                fill="#48bb78"
                filter="url(#dropShadow)"
              />
              <circle cx="395" cy="242" r="3" fill="#2f855a" />
            </g>

            {/* Dynamic bookable tables */}

            {/* Dynamic bookable tables */}
            <g id="bookable-tables">
              {tables.map((table) => {
                const isSelected = selectedTableIds.includes(table.id);
                const isUnavailable = table.status !== "available";

                const tableClass = isUnavailable
                  ? `is-${table.status}`
                  : isSelected
                    ? "is-selected"
                    : "";

                return (
                  <g
                    key={table.id}
                    transform={`translate(${table.x}, ${table.y})`}
                    className={`bookable-table ${tableClass}`}
                    role="button"
                    tabIndex={isUnavailable ? -1 : 0}
                    aria-label={`${table.name}, seats ${table.capacity}, ${table.status}`}
                    aria-pressed={isSelected}
                    aria-disabled={isUnavailable}
                    onClick={() => {
                      if (!isUnavailable) {
                        onToggleTable(table.id);
                      }
                    }}
                    onKeyDown={(event) => {
                      if (
                        !isUnavailable &&
                        (event.key === "Enter" || event.key === " ")
                      ) {
                        event.preventDefault();
                        onToggleTable(table.id);
                      }
                    }}
                  >
                    <DynamicChairs
                      capacity={table.capacity}
                      visualType={table.visualType}
                    />

                    <use href={`#${table.visualType}`} />

                    <text x="0" y="4" className="table-label">
                      {table.label}
                    </text>
                  </g>
                );
              })}
            </g>
          </svg>
        </div>

        <p className="mt-4 text-center text-xs text-[var(--color-muted)]">
          Tap a table to select it. Tap again to remove it.
        </p>
      </div>

      {/* Selection summary */}
      <div className="border-b border-[var(--color-border)] pb-6">
        {selectedTables.length > 0 ? (
          <div>
            <p className="mb-3 text-xs tracking-widest text-[var(--color-muted)]">
              YOUR SELECTED TABLES
            </p>

            <div className="flex flex-wrap gap-3">
              {selectedTables.map((table) => (
                <button
                  key={table.id}
                  type="button"
                  onClick={() => onToggleTable(table.id)}
                  className="border border-[var(--color-primary)] bg-[var(--color-primary)] px-4 py-2 text-sm text-[var(--color-on-primary)] transition-opacity hover:opacity-80"
                >
                  {table.name} ×
                </button>
              ))}
            </div>

            <p className="mt-4 text-sm text-[var(--color-muted)]">
              {selectedTables.length} selected · Seating capacity:{" "}
              {totalCapacity} guests
            </p>
          </div>
        ) : (
          <p className="text-sm text-[var(--color-muted)]">
            Select one or more tables from the floor plan.
          </p>
        )}
      </div>
    </div>
  );
}
