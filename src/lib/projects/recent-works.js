import { client as strapi } from "../strapi/client";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../query-keys";

export function useWorksListsForId(workslists_id) {
  const fetchData = () =>
    strapi.collection("meta-work-lists").find({
      filters: {
        name: {
          $eq: workslists_id,
        },
      },
      populate: "*",
    });

  const { data, isSuccess, isPending, isError, error } = useQuery({
    queryKey: QUERY_KEYS.workslistsFor(workslists_id),
    queryFn: fetchData,
  });

  return {
    data: data?.data[0]?.project_lists,
    isPending,
    isError,
    isSuccess,
    error,
  };
}

export function useCardsDataFor(coll_id) {
  const fetcher = () =>
    strapi.collection("project-lists").find({
      filters: {
        documentId: {
          $eq: coll_id,
        },
      },
      populate: {
        cards_collection: {
          populate: {
            cards: {
              populate: {
                img_url: {
                  fields: ["url"],
                },
              },
            },
          },
        },
      },
    });

  const { data, isPending, isError, isSuccess, error } = useQuery({
    queryKey: QUERY_KEYS.cards_collection_for(coll_id),
    queryFn: fetcher,
  });

  const result_cards = [];
  for (let cdata of data?.data[0]?.cards_collection?.cards ?? []) {
    const new_url = new URL(cdata?.img_url?.url, strapi.baseURL).href;
    result_cards.push({
      ...cdata,
      img_url: new_url,
    });
  }

  const result = {
    cards: result_cards,
    hasMore: false,
    count: result_cards.length,
  };

  return { data: result, isPending, isError, isSuccess, error };
}
