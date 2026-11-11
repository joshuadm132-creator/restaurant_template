export const restaurantConfig = {
  // ================================================================================
  //                                 NAVBAR

  navigation: {
    links: [
      { label: "Home", href: "/" },
      { label: "Our Story", href: "#about" },
      { label: "Menu", href: "#menu" },
      { label: "Gallery", href: "#gallery" },
      { label: "Contact", href: "#contact" },
    ],

    button: {
      label: "Explore Our Menu",
      href: "#menu",
    },
  },

  // =================================================================================
  //                          Company
  name: "The Garden Table",
  tagline: "Good food. Great company.",

  description:
    "A welcoming place to enjoy thoughtfully prepared food, good company and memorable dining experiences.",

  // ==============================================================================================
  //                            HERO

  hero: {
    eyebrow: "WELCOME TO THE GARDEN TABLE",

    heading: "A place to gather, eat and enjoy.",

    description:
      "Discover fresh flavours, carefully prepared dishes and an atmosphere that makes every visit special.",

    primaryButton: {
      label: "Explore Our Menu",
      href: "#menu",
    },

    secondaryButton: {
      label: "Our Story",
      href: "#about",
    },

    images: {
      rustic: {
        src: "/images/restaurant/Rustic.jpg",
        alt: "A beautifully presented meal in a warm restaurant setting",
      },

      luxury: {
        src: "/images/restaurant/Luxury.jpeg",
        alt: "An elegant fine dining experience with beautifully presented food",
      },
    },
  },
  // =============================================================================
  //                  MENU

  menu: {
    eyebrow: "FRESH FROM OUR KITCHEN",
    title: "A Taste of the Garden",
    description:
      "Explore a selection of thoughtfully prepared dishes, made with fresh ingredients and served with care.",

    categories: [
      {
        id: "starters",
        name: "Starters",
        description: "A little something to begin.",
        items: [
          {
            id: "garden-soup",
            name: "Garden Vegetable Soup",
            description:
              "A seasonal blend of fresh vegetables, herbs and toasted sourdough.",
            price: "6.00",
            image: {
              src: "https://placehold.co/900x700?text=Garden+Vegetable+Soup",
              alt: "A bowl of garden vegetable soup with fresh herbs",
              label: "View dish",
            },
          },
          {
            id: "bruschetta",
            name: "Tomato Bruschetta",
            description:
              "Grilled sourdough topped with ripe tomatoes, basil and olive oil.",
            price: "7.50",
            image: {
              src: "https://placehold.co/900x700?text=Garden+Vegetable+Soup",
              alt: "A bowl of garden vegetable soup with fresh herbs",
              label: "View dish",
            },
          },
        ],
      },
      {
        id: "mains",
        name: "Main Courses",
        description: "The heart of the experience.",
        items: [
          {
            id: "herb-chicken",
            name: "Herb-Roasted Chicken",
            description:
              "Roasted chicken with garden herbs, seasonal vegetables and a creamy pan sauce.",
            price: "16.00",
            image: {
              src: "https://placehold.co/900x700?text=Garden+Vegetable+Soup",
              alt: "A bowl of garden vegetable soup with fresh herbs",
              label: "View dish",
            },
          },
          {
            id: "grilled-fish",
            name: "Grilled Catch of the Day",
            description:
              "Freshly grilled fish served with lemon butter and your choice of sides.",
            price: "18.00",
            image: {
              src: "https://placehold.co/900x700?text=Garden+Vegetable+Soup",
              alt: "A bowl of garden vegetable soup with fresh herbs",
              label: "View dish",
            },
          },
          {
            id: "garden-pasta",
            name: "Garden Vegetable Pasta",
            description:
              "Pasta tossed with seasonal vegetables, garlic, herbs and parmesan.",
            price: "14.00",
            image: {
              src: "https://placehold.co/900x700?text=Garden+Vegetable+Soup",
              alt: "A bowl of garden vegetable soup with fresh herbs",
              label: "View dish",
            },
          },
        ],
      },
      {
        id: "desserts",
        name: "Desserts",
        description: "Something sweet to finish.",
        items: [
          {
            id: "chocolate-cake",
            name: "Chocolate Cake",
            description:
              "Rich chocolate cake served with a scoop of vanilla ice cream.",
            price: "7.00",
            image: {
              src: "https://placehold.co/900x700?text=Garden+Vegetable+Soup",
              alt: "A bowl of garden vegetable soup with fresh herbs",
              label: "View dish",
            },
          },
          {
            id: "seasonal-fruit",
            name: "Seasonal Fruit Tart",
            description:
              "A delicate pastry filled with cream and topped with fresh seasonal fruit.",
            price: "6.50",
            image: {
              src: "https://placehold.co/900x700?text=Garden+Vegetable+Soup",
              alt: "A bowl of garden vegetable soup with fresh herbs",
              label: "View dish",
            },
          },
        ],
      },
      {
        id: "drinks",
        name: "Drinks",
        description: "A refreshing accompaniment.",
        items: [
          {
            id: "fresh-lemonade",
            name: "Fresh Lemonade",
            description: "Freshly squeezed lemons with a touch of sweetness.",
            price: "4.00",
            image: {
              src: "https://placehold.co/900x700?text=Garden+Vegetable+Soup",
              alt: "A bowl of garden vegetable soup with fresh herbs",
              label: "View dish",
            },
          },
          {
            id: "garden-iced-tea",
            name: "Garden Iced Tea",
            description: "House-brewed iced tea with fresh herbs and citrus.",
            price: "4.50",
            image: {
              src: "https://placehold.co/900x700?text=Garden+Vegetable+Soup",
              alt: "A bowl of garden vegetable soup with fresh herbs",
              label: "View dish",
            },
          },
        ],
      },
    ],
  },
  // ========================================================================================
  //                                      ABOUT

  about: {
    eyebrow: "OUR STORY",
    title: "More Than Just a Place to Eat",
    subtitle: "A place where good food and good company come together.",

    paragraphs: [
      "At The Garden Table, we believe that great food is about more than what's on the plate. It's about the people we share it with, the conversations we have and the memories we create.",
      "Inspired by fresh ingredients and a love for bringing people together, we've created a space where everyone can feel welcome. Whether you're joining us for a quick lunch, a family gathering or a special evening, there's always a place for you at our table.",
    ],

    image: {
      src: "https://placehold.co/1200x1400?text=Restaurant+Story",
      alt: "A welcoming restaurant dining space surrounded by natural greenery",
    },

    quote: {
      text: "Good food tastes better when shared.",
      attribution: "The Garden Table",
    },
  },
  // ======================================================================================================
  //                              GALLERY
  gallery: {
    eyebrow: "A VISUAL TASTE",
    title: "Moments Around the Table",
    description:
      "A glimpse into our food, our space and the experiences we create.",

    images: [
      {
        id: "gallery-1",
        src: "/images/gallery/restaurant-interior.jpg",
        alt: "Warm and welcoming restaurant interior",
        caption: "Our dining space",
        layout: "feature",
      },
      {
        id: "gallery-2",
        src: "/images/gallery/signature-dish.jpg",
        alt: "A freshly prepared signature dish",
        caption: "Made with care",
        layout: "portrait",
      },
      {
        id: "gallery-3",
        src: "/images/gallery/restaurant-food.jpg",
        alt: "Freshly prepared food served at the restaurant",
        layout: "landscape",
      },
      {
        id: "gallery-4",
        src: "/images/gallery/dining-experience.jpg",
        alt: "Guests enjoying a dining experience",
        layout: "square",
      },
      {
        id: "gallery-5",
        src: "/images/gallery/chef-preparing.jpg",
        alt: "Chef preparing a meal in the kitchen",
        layout: "portrait",
      },
      {
        id: "gallery-6",
        src: "/images/gallery/food-detail.jpg",
        alt: "Close-up of a freshly prepared dish",
        layout: "landscape",
      },
    ],
  },

  // ===================================================================================

  //contact

  contact: {
    eyebrow: "GET IN TOUCH",
    title: "We'd Love to Welcome You",
    description:
      "Whether you're planning a visit, arranging a gathering or simply have a question, we'd love to hear from you.",

    details: {
      telephone: "0712345678",
      email: "",
      address: "",
      whatsapp: "0712345678",
    },

    location: {
      mapUrl: "",
      directionsLabel: "Get Directions",
    },

    openingHours: [
      { days: "Monday – Friday", hours: "09:00 – 22:00" },
      { days: "Saturday – Sunday", hours: "10:00 – 23:00" },
    ],

    reservation: {
      eyebrow: "RESERVATIONS",
      title: "Reserve Your Table",
      description:
        "Planning a visit? Send us a reservation request and we'll get back to you.",

      fields: {
        name: true,
        email: true,
        telephone: true,
        date: true,
        time: true,
        guests: true,
        message: true,
      },

      submitLabel: "Request a Reservation",
    },
  },

  // ============================================================================
  //                 Footer

  footer: {
    closingMessage: "Good food brings us together.",

    description:
      "A welcoming place to enjoy thoughtfully prepared food and memorable dining experiences.",

    links: [
      { label: "Home", href: "/" },
      { label: "Our Story", href: "#about" },
      { label: "Menu", href: "#menu" },
      { label: "Gallery", href: "#gallery" },
      { label: "Contact", href: "#contact" },
    ],

    contact: {
      address: "",
      telephone: "",
      email: "",
    },

    social: [
      { platform: "Instagram", href: "" },
      { platform: "Facebook", href: "" },
    ],

    openingHours: [
      { days: "Monday – Friday", hours: "09:00 – 22:00" },
      { days: "Saturday – Sunday", hours: "10:00 – 23:00" },
    ],

    reservation: {
      label: "Reserve a Table",
      href: "#booking",
    },
  },
};
