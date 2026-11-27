import { createClient } from "@sanity/client";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "rgsy2l30",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2026-03-24",
  token: 'skYSSdkw0iZ7MARNx543e00lfy001N2WOsn7dgd4tRK5XmB9OUz31zt3untxIz5cg3qpGSpM9sAHTAFosAtbgPycb667Owqe3PYj3q1HY74zGT9dQF4BdY5BoqhnbYunAdDgE7bGoE96NC5GqOiebTiEn6OaMo1YcCQlyDcxewgcInDHNyDZ', // Editor/Write token from sanity.io/manage
  useCdn: false,
});

const post = {
  _id: "journal-kyrgyzstan-10-to-14-day-expedition-guide",
  _type: "post", // Change to "article" or "journal" if your schema uses a different document name
  title: "Kyrgyzstan Expedition Planning & Logistics: What 10 to 14 Days Really Entails",
  slug: {
    _type: "slug",
    current: "kyrgyzstan-expedition-planning-10-to-14-day-guide",
  },
  category: "KYRGYZSTAN • EXPEDITION LOGISTICS",
  publishedAt: new Date().toISOString(),
  readTime: "8 MIN READ",
  excerpt:
    "Understanding high-altitude 4x4 transport, family-run jailoo yurt stays, border permits, and mountain guide logistics before planning a two-week Tian Shan expedition.",
  body: [
    {
      _type: "block",
      _key: "intro-1",
      style: "normal",
      children: [
        {
          _type: "span",
          _key: "s-1",
          text: "Traveling through the high-altitude wilderness of Kyrgyzstan is unlike conventional European or East Asian journeys. Where snow-capped Tian Shan peaks rise above 4,000 meters and paved roads give way to remote nomadic tracks, planning is less about hotel tiers and more about expedition infrastructure, terrain accessibility, and local safety support.",
        },
      ],
    },
    {
      _type: "block",
      _key: "intro-2",
      style: "normal",
      children: [
        {
          _type: "span",
          _key: "s-2",
          text: "A well-paced 10 to 14-day journey allows you to experience the full geographic spectrum of the country: from the bustling markets of Bishkek to the alpine expanse of Song-Kul Lake, the red sandstone formations of Jeti-Oguz, and the high mountain passes above Karakol and Ala-Kul.",
        },
      ],
    },
    {
      _type: "block",
      _key: "h2-pillars",
      style: "h2",
      children: [
        {
          _type: "span",
          _key: "s-3",
          text: "The Four Pillars of a Tian Shan Expedition",
        },
      ],
    },
    {
      _type: "block",
      _key: "pillar-1",
      style: "normal",
      children: [
        {
          _type: "span",
          _key: "s-4a",
          marks: ["strong"],
          text: "1. High-Clearance Mountain Transport: ",
        },
        {
          _type: "span",
          _key: "s-4b",
          text: "Reaching pristine summer pastures (jailoos) requires dedicated 4x4 vehicles—such as modified UAZ vans or Toyota Land Cruisers—operated by mountain drivers experienced with river crossings and steep gravel switchbacks.",
        },
      ],
    },
    {
      _type: "block",
      _key: "pillar-2",
      style: "normal",
      children: [
        {
          _type: "span",
          _key: "s-5a",
          marks: ["strong"],
          text: "2. Licensed Mountain & Cultural Guides: ",
        },
        {
          _type: "span",
          _key: "s-5b",
          text: "Navigating fast-shifting high-pass weather, coordinating pack horses, and bridging local Kyrgyz and Russian dialects require seasoned regional expedition leaders.",
        },
      ],
    },
    {
      _type: "block",
      _key: "pillar-3",
      style: "normal",
      children: [
        {
          _type: "span",
          _key: "s-6a",
          marks: ["strong"],
          text: "3. Guesthouses & Family Yurt Camps: ",
        },
        {
          _type: "span",
          _key: "s-6b",
          text: "Combining boutique guesthouses in Bishkek and Karakol with authentic family-run yurt camps at Song-Kul or Tash Rabat balances comfort with genuine nomadic hospitality.",
        },
      ],
    },
    {
      _type: "block",
      _key: "pillar-4",
      style: "normal",
      children: [
        {
          _type: "span",
          _key: "s-7a",
          marks: ["strong"],
          text: "4. Border Zone Permits & Park Logistics: ",
        },
        {
          _type: "span",
          _key: "s-7b",
          text: "Remote frontier corridors—such as Enilchek, Karkyra, or southern Naryn near the Chinese border—require official border-zone permits processed several weeks prior to arrival.",
        },
      ],
    },
    {
      _type: "block",
      _key: "h2-inclusions",
      style: "h2",
      children: [
        {
          _type: "span",
          _key: "s-8",
          text: "What a Managed 10 to 14-Day Route Covers",
        },
      ],
    },
    {
      _type: "block",
      _key: "inc-1",
      style: "normal",
      children: [
        {
          _type: "span",
          _key: "s-9",
          text: "Rather than piecing together shared marshrutka minibuses and walk-in lodging on tight mountain schedules, a fully supported overland itinerary coordinates private airport transfers from Manas International Airport (FRU), full-board regional meals (from home-cooked beshbarmak and kuurdak to fresh tandyr bread), saddle horses with local horsemen, and direct cultural visits with eagle hunters in Bokonbaevo and felt artisans in Kochkor.",
        },
      ],
    },
    {
      _type: "block",
      _key: "cta-block",
      style: "blockquote",
      children: [
        {
          _type: "span",
          _key: "s-10",
          text: "Planning a private or small-group route? Contact our Bishkek field office via the Expeditions page or footer contacts to request a tailored itinerary proposal for your dates and group size.",
        },
      ],
    },
  ],
};

async function run() {
  if (!process.env.SANITY_API_WRITE_TOKEN) {
    console.error("Missing SANITY_API_WRITE_TOKEN in your environment.");
    process.exit(1);
  }

  const result = await client.createOrReplace(post);
  console.log("Published journal post to Sanity:", result._id);
}

run().catch((err) => {
  console.error("Failed to seed journal post:", err.message);
  process.exit(1);
});