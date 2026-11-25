import type { StructureResolver } from "sanity/structure";

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Wild Kyrgyzstan Archive")
    .items([
      // 1. Primary Focus: Field Journal & Dispatches
      S.documentTypeListItem("journal").title("Field Journal Dispatches"),

      S.divider(),

      ...S.documentTypeListItems().filter(
        (item) =>
          item.getId() &&
          !["journal"].includes(item.getId()!),
      ),
    ]);
