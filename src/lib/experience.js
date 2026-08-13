import { QUERY_KEYS } from "./query-keys";
import { client as strapi } from "./strapi/client";
import { useQuery } from "@tanstack/react-query";

export function useExperience() {
  const fetcher = () => strapi.single("experience").find();
  const { data, isPending, isError, error, isSuccess } = useQuery({
    queryKey: QUERY_KEYS.experience,
    queryFn: fetcher,
  });

  if (isError) console.log("Error while getting experience:", error);

  const result = data?.data?.experience;

  return { data: result, isPending, isError, error, isSuccess };
}
