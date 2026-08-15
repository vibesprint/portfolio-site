const QUESTIONS_AND_ANSWERS = [
  {
    question: "What is lorem ipsum ?",
    answer: "Something something something lorem ipsum".repeat(3),
  },
  {
    question: "What is lorem ipsum ?",
    answer: "Something something something lorem ipsum".repeat(3),
  },
  {
    question: "What is lorem ipsum ?",
    answer: "Something something something lorem ipsum".repeat(3),
  },
];

import { useQuery } from "@tanstack/react-query";
import { client as sanity } from "./sanity/client";
import { QUERY_KEYS } from "./query-keys";

export function useFAQQuestions() {
  const query = '*[_type == "faq"]';
  const fetcher = () => sanity.fetch(query);
  const { data, isPending, isError, isSuccess, error } = useQuery({
    queryKey: QUERY_KEYS.faqs,
    queryFn: fetcher,
  });

  return { data: data ?? [], isPending, isError, isSuccess, error };
}
