// ─── Image base URLs ──────────────────────────────────────────────────────────
// NOTE: Numbered project images (1-1.jpg etc) are at /2025/07/ — NOT /2025/06/
const WP6 = "https://rcgestatesconstruction.com/wp-content/uploads/2025/06";
const WP7 = "https://rcgestatesconstruction.com/wp-content/uploads/2025/07";

// ─── All confirmed-working image URLs ────────────────────────────────────────
export const images = {
  // ── Logo & UI ──
  logo: `${WP6}/Group-31-1.png`,

  // ── Hero / generic house exteriors (all at /06/) ──
  houseFinished:  `${WP6}/custom-house-finished_.jpg`,
  houseBuild:     `${WP6}/custom-house-build.jpg`,
  houseByRCG:     `${WP6}/custom-house-by-rcg-estates.jpg`,
  houseEntrance:  `${WP6}/custom-house-entrance.jpg`,
  houseBuildRCG:  `${WP6}/custom-home-build-rcg-esates.jpg`,

  // ── Interior shots ──
  livingRoom:     `${WP6}/custom-living-room-rcg-estates.jpg`,
  luxuryLiving:   `${WP7}/luxury-living-room-ecg-estates.jpg`,   // moved to /07/
  bathroom:       `${WP7}/bathroom-construction-rcg-estaes.jpg`,  // /07/
  bathroomBuild:  `${WP6}/custom-bathroom-build-rcg-estates.jpg`,

  // ── Home page real house photos ──
  house53ea:      `${WP6}/53ea357d-d76c-4b8f-bde4-b3753e1f76ee.jpg`,
  imageJun26a:    `${WP6}/image-2025-06-26T011915.817.png`,
  imageJun26b:    `${WP6}/image-2025-06-26T020012.794.png`,
  imageJun26c:    `${WP6}/image-2025-06-26T015925.892.png`,
  house5fe3:      `${WP6}/5fe3bce4-4160-4b1b-bde2-b6d35115bc23-Copy-Copy.jpg`,
  house5fe3b:     `${WP6}/5fe3bce4-4160-4b1b-bde2-b6d35115bc23.jpg`,
  houseb267:      `${WP6}/b2677a67-5a73-4c8f-8b8c-45b231aefa04.jpg`,
  houseb267b:     `${WP6}/b2677a67-5a73-4c8f-8b8c-45b231aefa04-Copy-Copy.jpg`,
  housebdb5:      `${WP6}/bdb50afd-f9ac-4a16-a0e3-c7e3712bb937-Copy-Copy.jpg`,
  housef375:      `${WP6}/f3758674-c5d6-4741-8004-ea81239cf5dd.jpg`,
  house06b1:      `${WP6}/06b13e36-dadc-40f8-a9f9-a2b83542048a-Copy-Copy.jpg`,
  housea0df:      `${WP6}/a0df1ba9-5ecc-49ae-b0e0-356e04f22d38-Copy.jpg`,

  // ── Gallery custom homes (/07/) ──
  galleryCustom1: `${WP7}/custom-home-build-rcg-esates.jpg`,
  galleryCustom2: `${WP7}/custom-house-build.jpg`,
  galleryCustom3: `${WP7}/custom-house-by-rcg-estates.jpg`,
  galleryCustom4: `${WP7}/custom-house-entrance.jpg`,

  // ── 816 N Trinity — 9 images (ALL at /07/) ──
  trinity816: [
    `${WP7}/1-4.jpg`,
    `${WP7}/2-4-scaled.jpg`,
    `${WP7}/3-4-scaled.jpg`,
    `${WP7}/4-4-scaled.jpg`,
    `${WP7}/5-4-scaled.jpg`,
    `${WP7}/6-4-scaled.jpg`,
    `${WP7}/7-4-scaled.jpg`,
    `${WP7}/8-4-scaled.jpg`,
    `${WP7}/9-4-scaled.jpg`,
  ],

  // ── 1003 Bette — 9 images (ALL at /07/) ──
  bette1003: [
    `${WP7}/1-1.jpg`,
    `${WP7}/2-1.jpg`,
    `${WP7}/3-1.jpg`,
    `${WP7}/4-1.jpg`,
    `${WP7}/5-1.jpg`,
    `${WP7}/6-1.jpg`,
    `${WP7}/7-1.jpg`,
    `${WP7}/8-1.jpg`,
    `${WP7}/9-1.jpg`,
  ],

  // ── 1005 Bette — 9 images (ALL at /07/) ──
  bette1005: [
    `${WP7}/1-2.jpg`,
    `${WP7}/2-2.jpg`,
    `${WP7}/3-2.jpg`,
    `${WP7}/4-2.jpg`,
    `${WP7}/5-2.jpg`,
    `${WP7}/6-2.jpg`,
    `${WP7}/7-2.jpg`,
    `${WP7}/8-2.jpg`,
    `${WP7}/9-2.jpg`,
  ],

  // ── 1007 Bette — 9 images (ALL at /07/) ──
  bette1007: [
    `${WP7}/1-3-scaled.jpg`,
    `${WP7}/2-3-scaled.jpg`,
    `${WP7}/3-3-scaled.jpg`,
    `${WP7}/4-3-scaled.jpg`,
    `${WP7}/5-3-scaled.jpg`,
    `${WP7}/6-3-scaled.jpg`,
    `${WP7}/7-3-scaled.jpg`,
    `${WP7}/8-3-scaled.jpg`,
    `${WP7}/9-3-scaled.jpg`,
  ],

  // ── Testimonial avatars ──
  avatarMaria: `${WP6}/Ellipse-23-1.png`,
  avatarDavid: `${WP6}/Ellipse-25.png`,
  avatarSandra: `${WP6}/Ellipse-27.png`,
};

// ─── Owner / Company ─────────────────────────────────────────────────────────
export const owner = {
  name: "Raul Ceron",
  title: "Founder & Managing Principal",
  credentials: [
    "Licensed Texas Real Estate Agent",
    "Custom Home Builder — RGV",
    "RE/MAX Platinum RGV · Imperio Real Estate",
  ],
  bio: `Raul Ceron is the founder and managing principal of RCG Estates Construction & Development. A licensed Texas real estate agent and experienced custom home builder, Raul operates a fully integrated model — acquiring premium lots through his LLC, overseeing every phase of construction, and listing the finished estates himself. The result: one trusted professional from raw land to closing table.`,
  bioParagraph2: `His builds include the Bette Street collection in Mission and 816 N Trinity in McAllen — with finish selections sourced through his partnership with Royal Decor Gallery at 4003 W US Hwy 83, McAllen.`,
  partner: {
    name: "Royal Decor Gallery",
    address: "4003 W US Hwy 83, McAllen, TX",
    note: "Exclusive source of Italian luxury wallpaper and artisan hardware featured in every RCG Estates premium build.",
  },
};

// ─── Company Info ─────────────────────────────────────────────────────────────
export const companyInfo = {
  name: "RCG Estates Construction & Development",
  tagline: "Custom Home Builder in the Rio Grande Valley",
  subTagline: "Licensed agent and builder — one person from lot purchase through construction to move-in.",
  about: `If you've never built before, the hardest part isn't the construction — it's knowing who to trust, whether the lot is any good, and who's actually responsible when something goes wrong. Raul Ceron is a licensed Texas real estate agent and custom home builder. You work with one person for the land, the build, and the close.`,
  mission: `Every home in our portfolio is at a real address you can drive to. That's the standard we hold ourselves to.`,
  founded: "2024",
  principles: [
    {
      title: "One Person, Start to Finish",
      desc: "No handoff between an agent who sold you the lot and a builder you've never met. Raul handles both.",
    },
    {
      title: "Check the Lot Before You Buy",
      desc: "Soil, utilities, flood zone, and setbacks — evaluated before you commit. A bad lot costs more than it saves.",
    },
    {
      title: "Straight Answers on Budget",
      desc: "Financing, permits, and finish selections discussed early — so you're not surprised halfway through the build.",
    },
    {
      title: "Built Here, Not Outsourced",
      desc: "McAllen, Mission, and the wider RGV — local codes, local subs, local knowledge of what actually works in South Texas heat and clay soil.",
    },
  ],
  stats: [
    { value: "6", label: "Completed Builds" },
    { value: "1", label: "Contact, Lot to Keys" },
    { value: "Licensed", label: "TX Real Estate Agent" },
    { value: "RGV", label: "McAllen · Mission · More" },
  ],
  cities: ["McAllen", "Mission", "Pharr", "Harlingen", "Brownsville", "Edinburg"],
  hours: {
    weekdays: "Mon – Fri: 9 AM – 5 PM",
    saturday: "Saturday: By Appointment",
    sunday: "Sunday: Closed",
  },
};

// ─── Projects ────────────────────────────────────────────────────────────────
export type ProjectStatus = "Completed" | "In Progress" | "Coming Soon";
export type ProjectCategory = "Custom Build" | "Renovation" | "Commercial";

export interface Project {
  id: string;
  title: string;
  address: string;
  city: string;
  sqft: number;
  bedrooms: number;
  bathrooms: number;
  year: number;
  salePrice?: string;
  status: ProjectStatus;
  category: ProjectCategory;
  images: string[];
  description: string;
  features: string[];
  highlight?: string;
}

export const projects: Project[] = [
  {
    id: "trinity-816",
    title: "816 N Trinity",
    address: "816 N Trinity Ave",
    city: "McAllen, TX",
    sqft: 4_100,
    bedrooms: 4,
    bathrooms: 3.5,
    year: 2024,
    status: "Completed",
    category: "Custom Build",
    images: images.trinity816,
    description:
      "A sleek modern build featuring floor-to-ceiling windows, open-concept great room, and premium finishes throughout — one of RCG Estates' most photographed projects.",
    features: ["Floor-to-Ceiling Windows", "Open Concept", "Premium Finishes", "Outdoor Kitchen", "Custom Cabinetry"],
  },
  {
    id: "bette-1007",
    title: "1007 Bette",
    address: "1007 Bette St",
    city: "Mission, TX",
    sqft: 3_850,
    bedrooms: 4,
    bathrooms: 3,
    year: 2024,
    status: "Completed",
    category: "Custom Build",
    images: images.bette1007,
    description:
      "The capstone of the Bette Street collection — an open-concept estate with chef's kitchen, resort-style outdoor living, and RCG's signature architectural detailing.",
    features: ["Chef's Kitchen", "Resort Pool", "3-Car Garage", "Smart Home", "Custom Millwork"],
    highlight: "Bette St Collection",
  },
  {
    id: "bette-1005",
    title: "1005 Bette",
    address: "1005 Bette St",
    city: "Mission, TX",
    sqft: 3_400,
    bedrooms: 4,
    bathrooms: 3,
    year: 2024,
    status: "Completed",
    category: "Custom Build",
    images: images.bette1005,
    description:
      "A warm transitional-style home blending classic South Texas character with modern luxury finishes — built for families who demand comfort and elegance in equal measure.",
    features: ["Custom Millwork", "Spa Master Bath", "Covered Patio", "Game Room", "Mudroom"],
    highlight: "Bette St Collection",
  },
  {
    id: "bette-1003",
    title: "1003 Bette",
    address: "1003 Bette St",
    city: "Mission, TX",
    sqft: 3_200,
    bedrooms: 4,
    bathrooms: 2.5,
    year: 2024,
    status: "Completed",
    category: "Custom Build",
    images: images.bette1003,
    description:
      "Clean lines and functional luxury define this Mission custom build — designed for indoor-outdoor living with a spacious covered patio and oversized backyard.",
    features: ["Open Floor Plan", "Covered Patio", "Custom Cabinetry", "Spa Bath", "2-Car Garage"],
    highlight: "Bette St Collection",
  },
  {
    id: "bette-1001",
    title: "1001 Bette",
    address: "1001 Bette St",
    city: "Mission, TX",
    sqft: 3_100,
    bedrooms: 3,
    bathrooms: 2.5,
    year: 2024,
    status: "Completed",
    category: "Custom Build",
    images: [
      images.houseBuildRCG,
      images.houseEntrance,
      images.houseByRCG,
      images.houseBuild,
    ],
    description:
      "The first home in the Bette Street collection — setting the architectural language for the entire development block with premium finishes and custom detailing.",
    features: ["Stone Exterior", "Custom Iron Doors", "Upgraded Fixtures", "Landscaping", "Open Concept"],
    highlight: "Bette St Collection",
  },
  {
    id: "custom-luxury",
    title: "RCG Custom Luxury",
    address: "McAllen, TX",
    city: "McAllen, TX",
    sqft: 3_600,
    bedrooms: 4,
    bathrooms: 3,
    year: 2024,
    status: "Completed",
    category: "Custom Build",
    images: [
      images.houseFinished,
      images.livingRoom,
      images.luxuryLiving,
      images.house53ea,
      images.housef375,
    ],
    description:
      "A luxury custom build featuring premium interior selections, designer-level fixtures, and Italian-sourced finishes from RCG's partnership with Royal Decor Gallery.",
    features: ["Italian Finishes", "Designer Fixtures", "Chef's Kitchen", "Luxury Master Suite", "Custom Millwork"],
  },
];

// ─── Gallery images (for the /projects gallery page) ─────────────────────────
export const galleryImages = {
  customHomes: [
    images.galleryCustom1,
    images.galleryCustom2,
    images.galleryCustom3,
    images.galleryCustom4,
    images.houseFinished,
    images.house53ea,
  ],
  interiors: [
    images.livingRoom,
    images.luxuryLiving,
    images.bathroomBuild,
    images.housea0df,
    images.houseb267,
    images.houseb267b,
  ],
  commercial: [
    images.bathroom,
    images.house5fe3b,
    images.house06b1,
    images.imageJun26c,
  ],
};

// ─── Testimonials ─────────────────────────────────────────────────────────────
export const testimonials = [
  {
    id: "1",
    name: "Amaris Ramirez",
    location: "Google Review · Home Build",
    quote: "RCG made it seamless from start to finish.",
    body: "It can be scary to start the process of building a home when you don't know where to begin, but RCG made it seamless! They were very helpful throughout the entire process, from start to finish.",
    rating: 5,
  },
  {
    id: "2",
    name: "Valeria Cantu",
    location: "Google Review · Home Build",
    quote: "Fully committed to turning my vision into reality.",
    body: "Working with RCG Estates and Construction to build my home was one of the best decisions I've made. Their team was professional, communicative, and fully committed to turning my vision into reality.",
    rating: 5,
  },
  {
    id: "3",
    name: "Noah Villarreal",
    location: "Google Review · Construction",
    quote: "Best realtor for construction and development.",
    body: "Closes deals and gets business done, best realtor for construction & development!!",
    rating: 5,
  },
];

// ─── Services ─────────────────────────────────────────────────────────────────
export interface Service {
  id: string;
  title: string;
  description: string;
  details: string[];
  icon: string;
  image: string;
}

export const services: Service[] = [
  {
    id: "custom-builds",
    title: "Custom Home Construction",
    description:
      "Full-scope custom construction from pre-approval through final walkthrough. Every home designed around your lifestyle — not a template.",
    details: [
      "Financing & pre-approval assistance",
      "Lot selection across the RGV",
      "Collaborative design with your architect of choice",
      "Permit procurement & full compliance",
      "Full construction management",
      "Regular progress updates & walkthroughs",
    ],
    icon: "Home",
    image: images.houseFinished,
  },
  {
    id: "commercial",
    title: "Commercial Construction",
    description:
      "Professional, practical commercial builds tailored to your business goals — designed to stand out and perform in the real world.",
    details: [
      "Retail and office spaces",
      "Multi-use facilities",
      "Code-compliant, site-specific design",
      "Business-focused planning",
      "Structural optimization",
      "On-schedule delivery",
    ],
    icon: "Building2",
    image: images.bathroom,
  },
  {
    id: "design-consultation",
    title: "Design & Architectural Services",
    description:
      "Pre-construction design with access to premium Italian finishes via our Royal Decor Gallery partnership.",
    details: [
      "Custom floor plan development",
      "Interior & exterior design guidance",
      "Italian luxury wallpaper & hardware sourcing",
      "Royal Decor Gallery finish selections",
      "Material board & budget alignment",
      "3D rendering coordination",
    ],
    icon: "PencilRuler",
    image: images.livingRoom,
  },
  {
    id: "pre-construction",
    title: "Pre-Construction Services",
    description:
      "Front-end project infrastructure — lender coordination, permit strategy, lot advisory, and construction loan guidance.",
    details: [
      "Construction loan advisory",
      "Lender package preparation",
      "Zoning & variance research",
      "Utility infrastructure planning",
      "Geotechnical coordination",
      "Construction schedule development",
    ],
    icon: "ClipboardList",
    image: images.houseEntrance,
  },
];

// ─── Process Steps ────────────────────────────────────────────────────────────
export const processSteps = [
  {
    step: "01",
    title: "Get Pre-Approved",
    desc: "Connect with trusted local lenders and lock in construction financing before a single design decision is made.",
    detail: "As your licensed agent, Raul represents you on the land purchase — no extra fees.",
  },
  {
    step: "02",
    title: "Choose Your Location",
    desc: "We evaluate soil, utilities, flood zones, and setbacks on every parcel before you commit a dollar.",
    detail: "Bad lots cost far more than their purchase price.",
  },
  {
    step: "03",
    title: "Design Your Home",
    desc: "Design your floor plan with our architects, then select Italian-grade finishes through Royal Decor Gallery.",
    detail: "Every decision is budget-aligned from day one. No surprises at bid time.",
  },
  {
    step: "04",
    title: "Build With Confidence",
    desc: "We manage every subcontractor and inspection with weekly updates. Raul can also list and sell when you're ready.",
    detail: "One professional. From raw lot to sold sign.",
  },
];

// ─── Blog Posts ───────────────────────────────────────────────────────────────
export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
  tags: string[];
}

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    slug: "top-5-things-before-building-rgv",
    title: "Top 5 Things to Know Before Building in the RGV",
    excerpt:
      "Building a custom home in the Rio Grande Valley comes with unique local nuances — from soil composition to permit timelines. Here's what every future homeowner must know before breaking ground.",
    body: `
# Top 5 Things to Know Before Building in the RGV

Building a custom home is one of the most significant investments you'll ever make. In the Rio Grande Valley, this process carries unique regional characteristics that can impact your timeline, budget, and final outcome.

## 1. Soil Composition Matters More Here

The RGV sits on expansive clay-rich soils that shift significantly with moisture changes. We always recommend a geotechnical report before finalizing foundation plans.

## 2. Permit Timelines Vary by Municipality

Mission, McAllen, Pharr, and Harlingen each operate their own permitting departments. We build these windows into every project schedule upfront.

## 3. Utility Infrastructure Is Your First Due Diligence Item

Before purchasing land, confirm water, sewer, gas, and electric access. Rural parcels outside city limits often require private wells and septic systems — adding $15,000–$40,000 to your budget.

## 4. HOA Restrictions Can Shape Your Design

Many premier subdivisions carry architectural review committees that dictate exterior materials, roof colors, and landscaping. Review CC&Rs before you fall in love with a lot.

## 5. Pre-Approval Is a Builder's Best Friend

Construction-to-permanent loans require a solid pre-approval and lender approval of your builder. Getting this sorted saves 4–8 weeks of delay.

At RCG Estates, Raul Ceron walks every client through each of these steps before a single design decision is made.
    `.trim(),
    category: "Planning Advice",
    author: "Raul Ceron — RCG Estates",
    date: "2025-06-25",
    readTime: "6 min read",
    image: images.houseFinished,
    tags: ["RGV", "Custom Build", "Pre-Construction", "Permits"],
  },
  {
    id: "2",
    slug: "modern-vs-traditional-home-design",
    title: "Modern vs. Traditional Home Design: What's Right for You?",
    excerpt:
      "Two dominant aesthetic philosophies define today's luxury home market. Understanding the tradeoffs will help you build a home that ages beautifully.",
    body: `
# Modern vs. Traditional Home Design: What's Right for You?

One of the first major decisions in any custom build is architectural style. At RCG Estates, we've built both — and here's what we've learned.

## What Modern Design Delivers

- Large format windows that flood interiors with natural light
- Open floor plans with clean sightlines
- Material honesty — concrete, steel, and glass as design elements
- Low-slope or flat rooflines with strong curb presence

## What Traditional Design Delivers

- Arched entries and corridors that add spatial drama
- Rich material palettes — terracotta, brick, carved wood, wrought iron
- Defined room structures with clear hierarchy
- Timeless curb appeal that holds resale value broadly

## The Honest Answer

Neither is objectively better. Our 816 N Trinity build in McAllen blends both — a modern exterior footprint with warm, custom interior finishes. That hybrid approach is increasingly what RGV luxury buyers want.

As both your builder and your agent, Raul can advise on what style commands the strongest resale in each specific neighborhood.
    `.trim(),
    category: "Design Inspiration",
    author: "Raul Ceron — RCG Estates",
    date: "2025-06-25",
    readTime: "5 min read",
    image: images.houseBuild,
    tags: ["Design", "Architecture", "Modern", "Traditional"],
  },
  {
    id: "3",
    slug: "choosing-the-right-lot-rgv",
    title: "How to Choose the Right Lot for Your Custom Home in South Texas",
    excerpt:
      "The lot you choose will shape every design decision that follows. Here's the due diligence checklist every RGV land buyer should run through before signing.",
    body: `
# How to Choose the Right Lot for Your Custom Home in South Texas

Your lot is the canvas — and a poor canvas will limit even the most talented architect.

## Orientation & Solar Exposure

South Texas heat is real. A lot that orients your home's main living spaces toward the south or west can significantly increase cooling loads.

## Flood Zone Status

Always pull the FEMA flood map for any RGV parcel. Flood Zone AE areas carry mandatory flood insurance requirements and may require elevated slab construction.

## Lot Dimensions & Setbacks

Municipal setback requirements directly constrain your buildable envelope. Know your setbacks before you design anything.

## Utilities Confirmation

Confirm water meter availability, sewer connection, gas service, and electric transformer capacity — in writing — before purchasing any lot.

## Soil Report

A geotechnical boring report ($1,500–$3,500) tells you exactly what foundation system your lot will require. It's one of the best investments you can make pre-purchase.

As a licensed Texas real estate agent, Raul Ceron can represent you directly in your land purchase — evaluating every one of these factors before you sign anything.
    `.trim(),
    category: "RGV-Specific Insights",
    author: "Raul Ceron — RCG Estates",
    date: "2025-06-25",
    readTime: "6 min read",
    image: images.houseEntrance,
    tags: ["Land", "Lot Selection", "Due Diligence", "RGV"],
  },
];
