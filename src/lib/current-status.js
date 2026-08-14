import { QUERY_KEYS } from "./query-keys";
import { client as sanity } from "./sanity/client";
import { useQuery } from "@tanstack/react-query";

export function useCurrentStatus() {
  const query = '*[_type == "current-status-singleton"]{ status }[0]';
  const fetcher = () => sanity.fetch(query);
  const { data, isPending, isError, error, isSuccess } = useQuery({
    queryKey: QUERY_KEYS.current_status,
    queryFn: fetcher,
  });

  const result = data?.status;
  return { data: result, isPending, isError, error, isSuccess };
}
