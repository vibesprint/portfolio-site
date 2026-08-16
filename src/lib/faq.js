import { useQuery } from "@tanstack/react-query";
import { client as sanity } from "./sanity/client";
import { QUERY_KEYS } from "./query-keys";

export function useFAQQuestions() {
  const query = '*[_type == "faq"] | order(rank asc)';
  const fetcher = () => sanity.fetch(query);
  const { data, isPending, isError, isSuccess, error } = useQuery({
    queryKey: QUERY_KEYS.faqs,
    queryFn: fetcher,
  });

  return { data: data ?? [], isPending, isError, isSuccess, error };
}
