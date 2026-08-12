import { useQuery } from "@tanstack/react-query";
import { client as strapi } from "./strapi/client.js";
import { QUERY_KEYS } from "./query-keys";

export function useHeroData() {
  const { data, isError, isPending, isSuccess, error } = useQuery({
    queryKey: QUERY_KEYS.hero,
    queryFn: () => strapi.single("hero-section").find(),
  });

  return { data, isError, isPending, isSuccess, error };
}
