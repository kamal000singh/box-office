import React from "react";
import ShowCard from "./ShowCard";
import IMAGE_NOT_FOUND from "../../images/not-found.png";
import { FlexGrid } from "../styled";
import { useShows } from "../../misc/custom-hooks.js";
const ShowGrid = ({ data }) => {
  const [starredShows, dispatchedStarred] = useShows();
  return (
    <FlexGrid>
      {data.map((item) => {
        const isStarred = starredShows.includes(item.show.id);
        const onStarClick = () => {
          if (isStarred) {
            dispatchedStarred({ type: "REMOVE", showId: item.show.id });
          } else {
            dispatchedStarred({ type: "ADD", showId: item.show.id });
          }
        };
        return (
          <ShowCard
            key={item.show.id}
            id={item.show.id}
            name={item.show.name}
            image={item.show.image ? item.show.image.medium : IMAGE_NOT_FOUND}
            summary={item.show.summary}
            onStarClick={onStarClick}
            isStarred={isStarred}
          />
        );
      })}
    </FlexGrid>
  );
};

export default ShowGrid;
