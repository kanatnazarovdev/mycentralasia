export type CountryCode = "UZ" | "KZ" | "KG" | "TJ" | "TM";

export interface CountryProfile {
  slug: string;
  code: CountryCode;
  name: string;
  tagline: string;
  capital: string;
  coords: string;
  bestSeason: string;
  visaSummary: string;
  accentHex: string;
  heroPlate: string;
  summary: string;
  highlights: string[];
  signatureDish: {
    name: string;
    origin: string;
    description: string;
  };
}

export interface ArticleItem {
  slug: string;
  title: string;
  subtitle: string;
  category: "HISTORY" | "CUISINE" | "CULTURE" | "DISPATCH" | "EXPEDITIONS";
  country: string;
  countryCode: CountryCode;
  publishedAt: string;
  readTime: string;
  author: string;
  excerpt: string;
  content: string[];
  seoKeywords: string[];
}

export interface HistoryEra {
  period: string;
  yearRange: string;
  title: string;
  region: string;
  summary: string;
  keyArtifact: string;
}

export interface ExpeditionPackage {
  id: string;
  title: string;
  countries: string[];
  duration: string;
  difficulty: "Moderate" | "Challenging" | "Cultural";
  season: string;
  priceFrom: string;
  summary: string;
  bookingUrl: string;
}

export const COUNTRIES: CountryProfile[] = [
  {
    slug: "kyrgyzstan",
    code: "KG",
    name: "Kyrgyzstan",
    tagline: "The Celestial Tian Shan & Nomadic Heartland",
    capital: "Bishkek",
    coords: "41°50'29\"N 75°07'43\"E",
    bestSeason: "June – September (High Alpine Passes)",
    visaSummary: "Visa-free up to 60 days for 60+ nationalities including US, UK, EU.",
    accentHex: "#E8112D",
    heroPlate: "PLATE I — SONG-KUL ALPINE BASIN",
    summary:
      "Over 90% mountainous, Kyrgyzstan preserves living nomadic pastoralism across high-altitude jailoo pastures, glacial lakes like Song-Kul and Kel-Suu, and ancient Silk Road caravanserais.",
    highlights: [
      "Song-Kul Lake High-Altitude Yurt Camps (3,016m)",
      "Karakol Dungan & Uyghur Culinary Corridor",
      "Tash Rabat 15th-Century Stone Caravanserai",
      "Altyn-Arashan & Ala-Kul Glacial Trekking",
    ],
    signatureDish: {
      name: "Karakol Ashlyan-Fu & Beshbarmak",
      origin: "Issyk-Kul & Naryn",
      description:
        "Cold spicy starch-noodle soup brought by Dungan migrants alongside slow-simmered nomadic lamb served over hand-rolled pasta sheets.",
    },
  },
  {
    slug: "uzbekistan",
    code: "UZ",
    name: "Uzbekistan",
    tagline: "Timurid Geometry & The Oasis Cities of the Silk Road",
    capital: "Tashkent",
    coords: "39°39'15\"N 66°57'35\"E",
    bestSeason: "March – May & September – November",
    visaSummary: "Visa-free or streamlined e-Visa for most global travelers.",
    accentHex: "#0099B5",
    heroPlate: "PLATE II — REGISTAN, SAMARKAND",
    summary:
      "Home to Samarkand, Bukhara, and Khiva—the monumental intellectual and architectural crossroads where astronomers, poets, and merchants connected East Asia to the Mediterranean.",
    highlights: [
      "Registan Square & Shah-i-Zinda Necropolis (Samarkand)",
      "Historic Walled City of Itchan Kala (Khiva)",
      "Lyabi-Hauz & Trading Domes of Bukhara",
      "High-Speed Afrosiyob Silk Road Rail Corridor",
    ],
    signatureDish: {
      name: "Samarkand Zighir Plov",
      origin: "Samarkand & Fergana Valley",
      description:
        "Layered heirloom rice cooked in copper kazans with flaxseed oil, yellow carrots, chickpeas, cumin, and tender lamb.",
    },
  },
  {
    slug: "kazakhstan",
    code: "KZ",
    name: "Kazakhstan",
    tagline: "Infinite Steppe, Red Canyons & Modern Eurasian Hub",
    capital: "Astana",
    coords: "43°21'08\"N 79°04'44\"E",
    bestSeason: "April – October",
    visaSummary: "Visa-free up to 30 days for US, EU, UK, UAE, and ASEAN citizens.",
    accentHex: "#FEC50C",
    heroPlate: "PLATE III — CHARYN CANYON",
    summary:
      "The world's ninth-largest nation spans dramatic red-rock canyons, alpine lakes outside Almaty, subterranean mosques in Mangystau, and a rapidly growing tech and creative capital.",
    highlights: [
      "Charyn Canyon Valley of Castles",
      "Kolsai & Kaindy Submerged Forest Lakes",
      "Bozjyra Chalk Formations (Mangystau)",
      "Almaty Specialty Coffee & Neo-Nomadic Gastronomy",
    ],
    signatureDish: {
      name: "Qazy & Baursak",
      origin: "Great Steppe",
      description:
        "Artisanal cured horse-meat delicacy served with golden pillowy fried dough and fermented mare's milk (Kymyz).",
    },
  },
  {
    slug: "tajikistan",
    code: "TJ",
    name: "Tajikistan",
    tagline: "The Roof of the World & Wakhan Corridor",
    capital: "Dushanbe",
    coords: "37°29'23\"N 71°33'11\"E",
    bestSeason: "June – September",
    visaSummary: "E-Visa + GBAO Pamir Permit easily obtainable online.",
    accentHex: "#1EB53A",
    heroPlate: "PLATE IV — PAMIR HIGHWAY (M41)",
    summary:
      "Anchored by the Pamir Mountains—known for millennia as Bam-i-Dunya (Roof of the World)—Tajikistan offers ancient Sogdian ruins, Wakhi hospitality, and passes exceeding 4,600 meters.",
    highlights: [
      "M41 Pamir Highway & Ak-Baital Pass (4,655m)",
      "Wakhan Valley Fortresses overlooking the Hindu Kush",
      "Fann Mountains & Seven Lakes (Haft Kul)",
      "Ancient Sogdian Murals of Penjikent",
    ],
    signatureDish: {
      name: "Qurutob",
      origin: "Dushanbe & Khatlon",
      description:
        "Flaky layered flatbread soaked in tangy melted qurut cheese sauce, topped with caramelized onions, fresh herbs, and flax oil.",
    },
  },
  {
    slug: "turkmenistan",
    code: "TM",
    name: "Turkmenistan",
    tagline: "Karakum Desert & Ancient Parthian Capitals",
    capital: "Ashgabat",
    coords: "40°15'09\"N 58°26'22\"E",
    bestSeason: "March – May & October – November",
    visaSummary: "Requires Letter of Invitation (LOI) via licensed regional operator.",
    accentHex: "#2DD4BF",
    heroPlate: "PLATE V — DARVAZA, KARAKUM",
    summary:
      "From the Bronze Age oasis of Merv to the marble avenues of Ashgabat and the burning Darvaza gas crater in the Karakum Desert, Turkmenistan remains Central Asia's most enigmatic frontier.",
    highlights: [
      "Ancient Merv UNESCO Archaeological Park",
      "Darvaza Desert Crater Overnight Camp",
      "Yangykala Canyon Crimson Cliffs",
      "Akhal-Teke Golden Horse Heritage",
    ],
    signatureDish: {
      name: "Ichlekli & Chorek",
      origin: "Karakum Oasis",
      description:
        "Desert meat-and-onion pie traditionally baked beneath hot sand and embers alongside tamdyr flatbread.",
    },
  },
];

export const ARTICLES: ArticleItem[] = [
  {
    slug: "dungan-culinary-trail-karakol",
    title: "The Dungan Culinary Trail: How 19th-Century Silk Road Migrants Shaped Karakol's Kitchens",
    subtitle: "Tracing hand-pulled lagman, cold ashlyan-fu, and Sichuan-Tian Shan spice fusions along Issyk-Kul.",
    category: "CUISINE",
    country: "Kyrgyzstan",
    countryCode: "KG",
    publishedAt: "2026-11-24",
    readTime: "7 MIN READ",
    author: "Editorial Desk • Bishkek",
    excerpt:
      "At dawn in Karakol's Bugu Bazaar, bowls of chilled starch noodles doused in fiery garlic vinegar tell a story of migration across the Tian Shan passes.",
    content: [
      "Every morning before 7:00 AM in Karakol, on the eastern shore of Lake Issyk-Kul, steam rises from aluminum cauldrons while trays of translucent, hand-cut starch noodles cool on wooden counters. This is the epicenter of Ashlyan-Fu—a dish that exists nowhere else in the world in quite this form.",
      "Brought across the Bedel and Torugart mountain passes in the late 1870s by Dungan families migrating from Shaanxi and Gansu provinces, Dungan cuisine fused northwestern Chinese noodle craft with high-altitude Kyrgyz mountain produce, wild garlic, and coriander.",
      "For travelers crossing Central Asia, understanding Karakol's table is essential: it reveals that the Silk Road was never a single highway, but an intimate exchange of seeds, fermentation techniques, and hearth traditions that still define daily life today.",
    ],
    seoKeywords: [
      "Dungan cuisine Karakol",
      "Central Asian food guide",
      "Ashlyan-fu Kyrgyzstan recipe",
      "Silk Road culinary history",
    ],
  },
  {
    slug: "timurid-astronomy-samarkand-ulugh-beg",
    title: "Stone & Starlight: How Ulugh Beg Built the World's Most Accurate Observatory in 1420",
    subtitle: "Inside Samarkand's golden age of mathematics, turquoise tilework, and celestial cartography.",
    category: "HISTORY",
    country: "Uzbekistan",
    countryCode: "UZ",
    publishedAt: "2026-11-22",
    readTime: "9 MIN READ",
    author: "Archive Division • Samarkand",
    excerpt:
      "Decades before European telescopes, Timurid scholars in Samarkand calculated the length of the sidereal year to within 58 seconds.",
    content: [
      "While most visitors to Samarkand gaze upward at the soaring turquoise pishtaks of Registan Square, one of the city's greatest intellectual monuments plunges deep into the bedrock of Kuhak Hill.",
      "Constructed in the 1420s under the ruler-astronomer Ulugh Beg, the Samarkand Observatory housed a subterranean marble sextant with a radius of 40 meters. Working alongside mathematician Jamshid al-Kashi, Ulugh Beg cataloged 1,018 stars in the Zij-i Sultani—the most comprehensive astronomical table produced between Ptolemy and Tycho Brahe.",
      "The geometry seen on Samarkand's madrasahs is not merely decorative; it is applied mathematics rendered in glazed terracotta and lapis lazuli.",
    ],
    seoKeywords: [
      "Samarkand history",
      "Ulugh Beg observatory",
      "Silk Road architecture Uzbekistan",
      "Timurid renaissance",
    ],
  },
  {
    slug: "overland-border-guide-almaty-bishkek-tashkent",
    title: "2026 Overland Field Dispatch: Navigating the Almaty – Bishkek – Tashkent Corridor",
    subtitle: "Border crossings, high-speed rail connections, seasonal mountain passes, and SIM logistics.",
    category: "DISPATCH",
    country: "Kazakhstan",
    countryCode: "KZ",
    publishedAt: "2026-11-20",
    readTime: "6 MIN READ",
    author: "Field Operations",
    excerpt:
      "Planning a multi-country Silk Road itinerary requires timing mountain pass openings with lowland rail schedules. Here is our verified field protocol.",
    content: [
      "The classic Central Asian overland arc connects Kazakhstan's cultural capital Almaty, Kyrgyzstan's alpine basin around Bishkek and Song-Kul, and Uzbekistan's architectural triad of Tashkent, Samarkand, and Bukhara.",
      "The Korday land border between Almaty and Bishkek remains the fastest transit point (3.5 to 4.5 hours door-to-door), while overnight sleeper trains and regional flights bridge Bishkek to Tashkent in under 90 minutes.",
      "When combining high-altitude horse trekking in Kyrgyzstan with cultural exploration in Uzbekistan, schedule your alpine segments between mid-June and mid-September when passes above 3,000 meters are free of snowpack.",
    ],
    seoKeywords: [
      "Central Asia travel itinerary",
      "Almaty to Bishkek border crossing",
      "Silk Road overland route",
      "Best time to visit Central Asia",
    ],
  },
  {
    slug: "pamir-highway-wakhan-corridor-protocol",
    title: "Crossing the Roof of the World: Field Notes from the M41 Pamir Highway",
    subtitle: "Altitude acclimatization, GBAO permits, and homestay etiquette along the Panj River.",
    category: "EXPEDITIONS",
    country: "Tajikistan",
    countryCode: "TJ",
    publishedAt: "2026-11-18",
    readTime: "8 MIN READ",
    author: "High-Altitude Unit",
    excerpt:
      "Tracing the Panj River border with Afghanistan's Wakhan Corridor reveals ancient Kushan fortresses and unmatched Pamiri hospitality.",
    content: [
      "Stretching from Dushanbe through Khorog and Murghab to Osh in Kyrgyzstan, the M41 Pamir Highway climbs over Ak-Baital Pass at 4,655 meters—making it the second-highest international highway in the world.",
      "Traveling the southern Wakhan loop rewards slow pacing: staying in traditional Pamiri chid homes built around five symbolic wooden pillars representing Zoroastrian and Ismaili heritage.",
    ],
    seoKeywords: [
      "Pamir Highway guide",
      "Wakhan Corridor Tajikistan",
      "GBAO permit Tajikistan",
      "Central Asia expedition",
    ],
  },
];

export const HISTORY_TIMELINE: HistoryEra[] = [
  {
    period: "BRONZE AGE & OXUS CIVILIZATION",
    yearRange: "2200 – 1700 BCE",
    title: "The Bactria–Margiana Archaeological Complex (BMAC)",
    region: "Turkmenistan • Uzbekistan • Tajikistan",
    summary:
      "Fortified mud-brick oasis settlements in the Karakum and Amu Darya basin pioneer sophisticated irrigation, bronze metallurgy, and early trans-Eurasian trade.",
    keyArtifact: "Gonur Depe Royal Necropolis & Altyndepe Seals",
  },
  {
    period: "SOGDIAN MERCHANT NETWORKS",
    yearRange: "4th – 8th Century CE",
    title: "Masters of the Silk Road",
    region: "Samarkand • Penjikent • Bukhara",
    summary:
      "Sogdian city-states establish the lingua franca of Silk Road commerce from Constantinople to Chang'an, patronizing vibrant fresco art and religious pluralism.",
    keyArtifact: "Afrasiab Royal Ambassadors Murals, Samarkand",
  },
  {
    period: "ISLAMIC GOLDEN AGE & KARAKHANIDS",
    yearRange: "9th – 12th Century CE",
    title: "The Transoxiana Enlightenment",
    region: "Bukhara • Balasagun • Uzgen",
    summary:
      "Polymaths Ibn Sina (Avicenna), Al-Khwarizmi, and Al-Biruni revolutionize medicine, algebra, and astronomy while Karakhanid minarets rise across the Tian Shan foothills.",
    keyArtifact: "Burana Tower & Kalyan Minaret",
  },
  {
    period: "THE TIMURID RENAISSANCE",
    yearRange: "1370 – 1507 CE",
    title: "Architecture of Cobalt & Gold",
    region: "Samarkand • Shakhrisabz • Herat",
    summary:
      "Artisans from across Asia converge on Samarkand to construct monumental ribbed domes, glazed muqarnas vaults, and Ulugh Beg's astronomical observatory.",
    keyArtifact: "Registan Ensemble & Gur-e-Amir Mausoleum",
  },
  {
    period: "NOMADIC CONFEDERATIONS & MODERN SOVEREIGNTY",
    yearRange: "18th Century – Present",
    title: "Steppe, Mountain & Modern Eurasia",
    region: "Kazakhstan • Kyrgyzstan • Uzbekistan • Tajikistan • Turkmenistan",
    summary:
      "Preservation of oral epics like the Trilogy of Manas, nomadic horsemanship, and the emergence of five independent nations shaping modern Eurasian connectivity.",
    keyArtifact: "Epic of Manas & World Nomad Games Heritage",
  },
];

export const EXPEDITIONS: ExpeditionPackage[] = [
  {
    id: "kg-nomad-traverse",
    title: "Tian Shan High-Altitude Horse & Yurt Traverse",
    countries: ["Kyrgyzstan"],
    duration: "10 Days",
    difficulty: "Moderate",
    season: "June – September",
    priceFrom: "$1,850",
    summary:
      "Ride across alpine jailoo pastures to Song-Kul Lake (3,016m), cross glaciated passes into Kel-Suu Canyon, and dine with Dungan families in Karakol.",
    bookingUrl: "https://www.wildinkyrgyzstan.com",
  },
  {
    id: "silk-road-dual",
    title: "Nomads & Oases: Kyrgyzstan to Samarkand Overland",
    countries: ["Kyrgyzstan", "Uzbekistan"],
    duration: "14 Days",
    difficulty: "Cultural",
    season: "May – October",
    priceFrom: "$2,690",
    summary:
      "Combine wild alpine yurt camps in the Tian Shan with the Fergana Valley craft corridor and Samarkand's Timurid architectural masterpieces.",
    bookingUrl: "https://www.wildinkyrgyzstan.com",
  },
  {
    id: "pamir-sky-road",
    title: "Pamir Highway & Alay Valley Expedition",
    countries: ["Kyrgyzstan", "Tajikistan"],
    duration: "12 Days",
    difficulty: "Challenging",
    season: "July – September",
    priceFrom: "$2,450",
    summary:
      "From Osh through the 4,655m Ak-Baital Pass into the Wakhan Valley—experiencing Tajik Pamiri hospitality and dramatic 7,000m peaks.",
    bookingUrl: "https://www.wildinkyrgyzstan.com",
  },
];
