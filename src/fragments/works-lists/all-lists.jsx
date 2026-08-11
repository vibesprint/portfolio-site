import { getWorksListsForId } from "../../lib/projects";
import { ProjectCard } from "../../components/ProjectCard";
import { ProjectList } from "../../components/ProjectList";
import { getCardsDataFor } from "../../lib/projects";
import { Button } from "../../components/Button";

export function makeAllWorksListsForId(workslists_id) {
  const { data } = getWorksListsForId(workslists_id);

  const results = [];
  for (const [index, project_list] of data.entries()) {
    const proj = makeProjectList(index, project_list);

    results.push(proj);
  }
  return results;
}

function makeProjectList(index, proj_data) {
  const cards_coll_id = proj_data["cards_collection_id"];
  const { data: cards_data } = getCardsDataFor(cards_coll_id);

  const cards = cards_data.cards;

  const card_comps = [];
  for (const [index, card] of cards.entries()) {
    card_comps.push(<ProjectCard key={index} {...card} />);
  }

  const loadMoreHandler = () => {
    console.log("To load more cards");
  };

  const projlist = (
    <ProjectList key={index} {...proj_data} cards={card_comps} />
  );

  if (cards_data.hasMore) {
    return (
      <div key={index} className="flex flex-col gap-[64px]">
        {projlist}
        <div className="self-center">
          <Button action={loadMoreHandler}>Load more</Button>
        </div>
      </div>
    );
  } else return projlist;
}
