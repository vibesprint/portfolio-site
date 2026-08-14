import { QUERY_KEYS } from "./query-keys";
import { client as sanity } from "./sanity/client";
import { useQuery } from "@tanstack/react-query";

export function useExperience() {
  const query = '*[_type == "experience_singleton"][0]';
  const fetcher = () => sanity.fetch(query);
  const { data, isPending, isError, error, isSuccess } = useQuery({
    queryKey: QUERY_KEYS.experience,
    queryFn: fetcher,
  });

  if (isError) console.log("Error while getting experience:", error);

  const result = data?.text;

  return { data: result, isPending, isError, error, isSuccess };
}
