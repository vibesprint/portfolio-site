import { useQuery } from "@tanstack/react-query";
import { client as sanity } from "./sanity/client";
import { QUERY_KEYS } from "./query-keys";
export function useContactsList() {
  const query = '*[_type == "contacts"]{ contact }';
  const fetcher = () => sanity.fetch(query);
  const { data, isPending, isSuccess, isError, error } = useQuery({
    queryKey: QUERY_KEYS.contacts,
    queryFn: fetcher,
  });

  return {
    data: data?.map((cont) => cont.contact),
    isPending,
    isSuccess,
    isError,
    error,
  };
}
