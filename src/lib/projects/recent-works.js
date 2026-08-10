import { CARDS_COLLECTION } from "./cards_collection_data";
import { WORKS_LISTS } from "./works_lists_data";

export function getWorksListsForId(workslists_id) {
  const data = WORKS_LISTS[workslists_id] || [];
  return { data };
}

export function getCardsDataFor(coll_id) {
  const data = CARDS_COLLECTION[coll_id] || {
    cards: [],
    hasMore: false,
    count: 0,
  };

  return { data };
}
