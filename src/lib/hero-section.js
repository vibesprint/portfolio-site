export function useHeroData() {
  return {
    data: {
      data: {
        title: "Mohammad Raza",
        body: "Something something something lorem ipsum".repeat(3),
      },
    },
    isError: false,
    isPending: false,
    isSuccess: true,
    error: null,
  };
}
