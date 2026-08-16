import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../query-keys";
import { client as sanity } from "../sanity/client";

export function useWorksListsForId(workslists_id) {
  const fetcher = () =>
    sanity.fetch(
      '*[_type == "meta-works-lists" && name == $worksName]{ project_lists[]->{_id, title, desc, badge } }[0]',
      { worksName: workslists_id },
    );

  const { data, isSuccess, isPending, isError, error } = useQuery({
    queryKey: QUERY_KEYS.workslistsFor(workslists_id),
    queryFn: fetcher,
  });

  return {
    data: data?.project_lists,
    isPending,
    isError,
    isSuccess,
    error,
  };
}

export function useCardsDataFor(proj_data) {
  const coll_id = proj_data._id;
  const query =
    '*[_type == "project-list" && _id == $projid]{ cards_collection[]->{ title, desc, src_site, live_site, img_url } }[0].cards_collection[]{ ..., img_url { asset-> { url } } }';

  const fetcher = () => sanity.fetch(query, { projid: coll_id });

  const { data, isPending, isError, isSuccess, error } = useQuery({
    queryKey: QUERY_KEYS.cards_collection_for(coll_id),
    queryFn: fetcher,
  });

  const cards = [];
  for (let card of data ?? []) {
    const c = {
      ...card,
      img_url: card.img_url.asset.url,
    };

    cards.push(c);
  }

  return { data: cards, isPending, isError, isSuccess, error };
}
