import React from "react";
import ActorCard from "./ActorCard";
import IMAGE_NOT_FOUND from "../../images/not-found.png";
import { FlexGrid } from "../styled";
const ActorGrid = ({ data }) => {
  return (
    <FlexGrid>
      {data.map((item) => (
        <ActorCard
          key={item.person.id}
          id={item.person.id}
          name={item.person.name}
          gender={item.person.gender}
          country={item.person.country ? item.person.country.name : null}
          birthday={item.person.birthday}
          deathday={item.person.deathday}
          image={item.person.image ? item.person.image.medium : IMAGE_NOT_FOUND}
        />
      ))}
    </FlexGrid>
  );
};

export default ActorGrid;
