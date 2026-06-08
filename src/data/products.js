export const products = [
  {
    id: "qala-dress",
    name: "Qala One Piece Ethnic Dress",
    price: 3899,
    sizes: ["XS", "S", "M", "L", "XL", "2XL"],
    category: "Ethnic Dresses",
    collection: "Basant Bahaar",
    aspectRatio: "landscape", // 4:3
    images: [
      "/qala-one-pirce-ethenic-dress/image-1.jpg",
      "/qala-one-pirce-ethenic-dress/image-2.jpg",
      "/qala-one-pirce-ethenic-dress/image-3.jpg",
      "/qala-one-pirce-ethenic-dress/image-4.jpg",
      "/qala-one-pirce-ethenic-dress/image-5.jpg",
      "/qala-one-pirce-ethenic-dress/image-6.jpg",
      "/size-chart.png"
    ],
    video: "https://res.cloudinary.com/dhufjjp9t/video/upload/v1780861762/video-8_anklft.mp4",
    composition: "100% Mal-Chander (40% Pure Silk + 60% Pure Cotton)",
    lining: "Included (Cotton Malmal)",
    fit: "Flowy A-Line Fit",
    print: "Solid Ivory",
    details: "Embroidered Multicolour Elephant Motif on yoke",
    description: "An ethereal one-piece silhouette crafted from our signature premium Mal-Chander fabric. Featuring a solid ivory drop that flows into an A-line drape, it is adorned with an exquisite, intricately embroidered multicoloured elephant motif. A perfect blend of heritage and contemporary style for the modern desi muse.",
    care: "Dry Clean Only. Iron on reverse. Store in a cool, dry place wrapped in soft muslin.",
    inStock: true
  },
  {
    id: "geet-farshi-set",
    name: "Geet Farshi Set 2 Piece",
    price: 4499,
    sizes: ["XS", "S", "M", "L", "XL", "2XL"],
    category: "Farshi Salwars Collection",
    collection: "Basant Bahaar",
    aspectRatio: "portrait", // 3:4
    images: [
      "/geet-kurta-set-2pc/image-2.jpg",
      "/geet-kurta-set-2pc/image-4.jpg",
      "/geet-kurta-set-2pc/image-6.jpg",
      "/geet-kurta-set-2pc/image-8.jpg",
      "/geet-kurta-set-2pc/image-10.jpg",
      "/geet-kurta-set-2pc/image-12.jpg",
      "/size-chart.png"
    ],
    video: "https://res.cloudinary.com/dhufjjp9t/video/upload/v1780861949/video-1_bndukx.mp4",
    composition: "100% Mal-Chander (Kurtis) & Premium Shantoon (Farshi)",
    lining: "Included",
    fit: "Flowy Relaxed Fit",
    print: "Solid Mint Green shirt with Ivory White Farshi Salwar",
    details: "Hand Embroidered Floral Motif on yoke",
    description: "Revisiting Y2K era nostalgia with a modern ethnic edge. The Geet Farshi Set is painted in a soothing mint green with a flowy, relaxed-fit Kurti, intricately detailed with hand-embroidered floral motifs. Pair it with the premium shantoon Farshi salwar that puddle elegantly at your feet.",
    care: "Gentle dry clean recommended. Do not wring. Cool iron on reverse.",
    inStock: true
  },
  {
    id: "hania-farshi-set",
    name: "Hania Farshi Set 2 Piece",
    price: 4599,
    sizes: ["XS", "S", "M", "L", "XL", "2XL"],
    category: "Farshi Salwars Collection",
    collection: "Basant Bahaar",
    aspectRatio: "landscape", // 4:3
    images: [
      "/hania-kurta-set-2pc/image-1.jpg",
      "/hania-kurta-set-2pc/image-2.jpg",
      "/hania-kurta-set-2pc/image-3.jpg",
      "/hania-kurta-set-2pc/image-4.jpg",
      "/hania-kurta-set-2pc/image-5.jpg",
      "/hania-kurta-set-2pc/image-6.jpg",
      "/hania-kurta-set-2pc/image-7.jpg",
      "/hania-kurta-set-2pc/image-8.jpg",
      "/hania-kurta-set-2pc/image-9.jpg",
      "/hania-kurta-set-2pc/image-10.jpg",
      "/hania-kurta-set-2pc/image-11.jpg",
      "/hania-kurta-set-2pc/image-12.jpg",
      "/hania-kurta-set-2pc/image-13.jpg",
      "/hania-kurta-set-2pc/image-14.jpg",
      "/hania-kurta-set-2pc/image-15.jpg",
      "/size-chart.png"
    ],
    video: "https://res.cloudinary.com/dhufjjp9t/video/upload/v1780861868/video-5_fhyl9z.mp4",
    composition: "100% Mal-Chander (Kurtis) & Premium Shantoon (Farshi)",
    lining: "Included",
    fit: "Flowy Relaxed Fit",
    print: "Solid Rust shirt with Ivory White Farshi Salwar",
    details: "Embroidered Floral Motifs on yoke and sleeves",
    description: "Bold rust tones meet soft traditional craftsmanship. Crafted from soft, breathable Mal-Chander, this set features a relaxed rust kurta embedded with delicate floral embroidery, complete with a flowing premium Shantoon salwar. For the desi muse who still pauses for poetry.",
    care: "Gentle dry clean. Iron with steam on low settings.",
    inStock: true
  }
];

export const collections = [
  {
    id: "basant-bahaar",
    name: "Basant Bahaar",
    tagline: "❀ Wear Your Soul ❀",
    description: "A celebration of ethnic roots and modern Y2K nostalgia. Tailored flowy silhouettes, hand embroidered motifs, and premium breathable fabrics.",
    status: "active",
    image: "/basant-bahar.jpg"
  },
  {
    id: "floral-affaire-nargis",
    name: "Floral Affairé — NARGÍS",
    tagline: "❀ Coming 15 June ❀",
    description: "Sensory tales of handwoven textures and romantic summer prints. An upcoming narrative of organic luxury.",
    status: "coming-soon",
    launchDate: "15 June 2026",
    image: "/nargis-profile.jpg"
  }
];

export const categories = [
  { id: "farshi-salwars-collection", name: "Farshi Salwars Collection", slug: "farshi-salwars-collection", tagline: "❀ Nostalgic Desi Drapes ❀", description: "Revisiting Y2K era nostalgia with a modern ethnic edge. Exquisite drapes featuring hand embroidered details.", image: "/hania-kurta-set-2pc/image-14.jpg" },
  { id: "kurti-collection", name: "Kurti Collection", slug: "kurti-collection", tagline: "❀ Summer Silhouettes ❀", description: "Soft, breathable Mal-Chander Kurtis for hot summer days, detailed with premium embroidery.", image: "/geet-kurta-set-2pc/image-6.jpg" },
  { id: "kurti-sets", name: "Kurti Sets", slug: "kurti-sets", tagline: "❀ Handcrafted Elegance ❀", description: "2-piece kurta and salwar sets designed for ease and quiet luxury.", image: "/geet-kurta-set-2pc/image-4.jpg" },
  { id: "ethnic-dresses", name: "Ethnic Dresses", slug: "ethnic-dresses", tagline: "❀ Ethereal Drape ❀", description: "Beautiful one-piece silhouettes crafted from premium signature fabric.", image: "/qala-one-pirce-ethenic-dress/image-1.jpg" },
  { id: "new-collection", name: "New Collection", slug: "new-collection", tagline: "❀ Fresh Narrative ❀", description: "Explore the latest designs and silhouettes from our label archives.", image: "/nargis-profile.jpg" }
];
