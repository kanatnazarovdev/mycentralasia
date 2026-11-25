import { defineField, defineType } from 'sanity';

export const journalType = defineType({
  name: 'journal',
  title: 'Field Journal & Cultural Archive',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Dispatch / Article Title',
      type: 'string',
      description: 'e.g., "The Nomadic Philosophy: Why the Yurt Represents the Cosmos"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'seoTitle',
      title: 'SEO Title',
      type: 'string',
    }),
    defineField({
      name: 'language',
      title: 'Language',
      type: 'string',
      initialValue: 'en',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'issueNumber',
      title: 'Issue / Volume Tag',
      type: 'string',
      initialValue: 'ISSUE NO. 01 — DISPATCH',
      description: 'e.g., "ISSUE NO. 01 — CULTURE" or "HERITAGE ARCHIVE"',
    }),
    defineField({
      name: 'contentType',
      title: 'Article Format',
      type: 'string',
      options: {
        list: [
          { title: 'Cultural Essay & Traditions', value: 'culture' },
          { title: 'Historical Deep Dive', value: 'history' },
          { title: 'Wilderness & Ecosystems', value: 'nature' },
          { title: 'Gastronomy & Culinary Heritage', value: 'food' },
          { title: 'Expedition Log & Field Guide', value: 'guide' },
          { title: 'Photo Essay / Visual Archive', value: 'photo-essay' },
        ],
      },
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published Date',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alt Text (SEO)',
        },
        {
          name: 'caption',
          type: 'string',
          title: 'Image Caption / Photo Credit',
        },
      ],
    }),
    defineField({
      name: 'excerpt',
      title: 'Meta Description / Summary',
      type: 'text',
      rows: 3,
      description: 'Used for Google search snippets and social cards (150–160 chars).',
      validation: (Rule) => Rule.max(160),
    }),
    defineField({
      name: 'region',
      title: 'Geographic Focus (Optional)',
      type: 'string',
      options: {
        list: [
          { title: 'Tian Shan Mountains', value: 'tian-shan' },
          { title: 'Song-Kul Highlands', value: 'song-kul' },
          { title: 'Issyk-Kul Basin', value: 'issyk-kul' },
          { title: 'Naryn & Central Pamir', value: 'naryn' },
          { title: 'Osh & Fergana Valley', value: 'osh' },
          { title: 'Bishkek & Chuy Region', value: 'bishkek' },
          { title: 'Nationwide / Historical', value: 'national' },
        ],
      },
    }),
    defineField({
      name: 'readingTime',
      title: 'Estimated Reading Time',
      type: 'string',
      placeholder: '7 MIN READ',
    }),
    // Accept 'body' directly from Make.com payloads
    defineField({
      name: 'body',
      title: 'Article Body (from Automation)',
      type: 'array',
      of: [
        { type: 'block' },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            { name: 'caption', type: 'string', title: 'Caption' },
            { name: 'alt', type: 'string', title: 'Alt Text' },
          ],
        },
      ],
    }),
    // Keep 'content' for manual studio edits
    defineField({
      name: 'content',
      title: 'Article Body (Studio Manual)',
      type: 'array',
      of: [
        { type: 'block' },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            { name: 'caption', type: 'string', title: 'Caption' },
            { name: 'alt', type: 'string', title: 'Alt Text' },
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'contentType',
      media: 'coverImage',
    },
  },
});