import React, { useState } from "react";
import ActorGrid from "../components/actor/ActorGrid";
import MainPageLayout from "../components/MainPageLayout";
import ShowGrid from "../components/shows/ShowGrid";
import { getAPI } from "../misc/Config";
import { useLastQuery } from "../misc/custom-hooks";
import {
  SearchInput,
  RadioInputsWrapper,
  SearchButtonWrapper,
} from "./Home.styled.js";
import CustomRadio from "./CustomRadio.js";
const Home = () => {
  const [input, setInput] = useLastQuery("");
  const [result, setResult] = useState(null);
  const [searchOptions, setSearchOptions] = useState("shows");
  const isSearchOption = searchOptions === "shows";
  const onSearch = () => {
    getAPI(`search/${searchOptions}?q=${input}`).then((results) => {
      setResult(results);
    });
  };
  const inputChange = (ev) => {
    setInput(ev.target.value);
  };
  const onKeyDown = (ev) => {
    if (ev.keyCode === 13) {
      onSearch();
    }
  };
  const renderResult = () => {
    if (result && result.length === 0) {
      return <div>No Result Found</div>;
    }
    if (result && result.length > 0) {
      return (
        <div>
          {result[0].show ? (
            <ShowGrid data={result} />
          ) : (
            <ActorGrid data={result} />
          )}
        </div>
      );
    } else {
      return null;
    }
  };
  const radioChange = (ev) => {
    setSearchOptions(ev.target.value);
  };
  return (
    <MainPageLayout>
      <SearchInput
        type="text"
        onChange={inputChange}
        onKeyDown={onKeyDown}
        value={input}
      />
      <RadioInputsWrapper>
        <div>
          <CustomRadio
            label="Shows"
            id="show-search"
            value="shows"
            checked={isSearchOption}
            onChange={radioChange}
          />
        </div>
        <div>
          <CustomRadio
            label="Actor"
            id="actor-search"
            checked={!isSearchOption}
            value="people"
            onChange={radioChange}
          />
        </div>
      </RadioInputsWrapper>
      <SearchButtonWrapper>
        <button onClick={onSearch}>Search</button>
      </SearchButtonWrapper>
      {renderResult()}
    </MainPageLayout>
  );
};

export default Home;
