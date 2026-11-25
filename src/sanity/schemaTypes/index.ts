import { type SchemaTypeDefinition } from 'sanity';
import { journalType } from './journalType';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [journalType],
};