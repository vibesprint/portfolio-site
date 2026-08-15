import { useWorksListsForId } from "../../lib/projects";
import { ProjectCard } from "../../components/ProjectCard";
import { ProjectList } from "../../components/ProjectList";
import { useCardsDataFor } from "../../lib/projects";
import { Button } from "../../components/Button";
import { useState } from "react";
import { DotsIndicator } from "../../components/DotsIndicator";
import { ErrorText, NeutralText } from "../../components/TextMessageUtils";

export function WorksListsForId({
  workslists_id,
  loading_state,
  err_state,
  empty_state,
}) {
  const { data, isPending, isError } = useWorksListsForId(workslists_id);

  if (isPending) {
    return loading_state;
  }

  if (isError) {
    return err_state;
  }

  const results = [];
  for (const [index, project_list] of data?.entries() ?? []) {
    const proj = <WorksListsForIdLevel2 key={index} proj_data={project_list} />;

    results.push(proj);
  }

  if (results.length < 1) return empty_state;

  return <>{results}</>;
}

const COUNT_INC_SIZE = 4;

function WorksListsForIdLevel2({ proj_data }) {
  const { data: cards, isPending, isError } = useCardsDataFor(proj_data);
  const [count, setCount] = useState(4);

  const card_comps = [];
  for (const [index, card] of cards?.slice(0, count).entries() ?? []) {
    card_comps.push(<ProjectCard key={index} {...card} />);
  }

  const loadMoreHandler = () => {
    setCount(count + COUNT_INC_SIZE);
  };

  let final_cards_list;
  if (isPending) {
    const msg = `Loading projects for '${proj_data.title}`;
    final_cards_list = [<DotsIndicator key={0} text={msg} />];
  } else if (isError) {
    final_cards_list = [
      <ErrorText key={0} text="Error: couldn't load projects" />,
    ];
  } else {
    final_cards_list = card_comps;
  }

  if (final_cards_list.length === 0) {
    const err_msg = `No projects found for '${proj_data.title}'!`;
    final_cards_list = [<NeutralText key={0} text={err_msg} />];
  }

  const projlist = <ProjectList {...proj_data} cards={final_cards_list} />;

  const hasMore = cards.length > count;
  if (hasMore) {
    return (
      <div className="flex flex-col gap-[64px]">
        {projlist}
        <div className="self-center">
          <Button
            action={loadMoreHandler}
            data-umami-event="load-more"
            data-umami-event-count={count + COUNT_INC_SIZE}
            data-umami-event-projlist={proj_data?.title}
          >
            Load more
          </Button>
        </div>
      </div>
    );
  } else return projlist;
}
