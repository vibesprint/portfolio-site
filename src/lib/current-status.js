import { QUERY_KEYS } from "./query-keys";
import { client as strapi } from "./strapi/client";
import { useQuery } from "@tanstack/react-query";

export function useCurrentStatus() {
  const fetcher = () => strapi.single("status").find();
  const { data, isPending, isError, error, isSuccess } = useQuery({
    queryKey: QUERY_KEYS.current_status,
    queryFn: fetcher,
  });

  const result = data?.data?.current_status;
  console.log("raw result for current status", data);
  console.log("parsed result", result);
  return { data: result, isPending, isError, error, isSuccess };
}
