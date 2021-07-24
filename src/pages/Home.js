import React, { useState } from "react";
import MainPageLayout from "../components/MainPageLayout";
import { getAPI } from "../misc/Config";
const Home = () => {
  const [input, setInput] = useState("");
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
          {result[0].show
            ? result.map((item) => (
                <div key={item.show.id}>{item.show.name}</div>
              ))
            : result.map((item) => (
                <div key={item.person.id}>{item.person.name}</div>
              ))}
        </div>
      );
    } else {
      return null;
    }
  };
  const radioChange = (ev) => {
    setSearchOptions(ev.target.value);
    console.log(searchOptions);
  };
  return (
    <MainPageLayout>
      <input
        type="text"
        onChange={inputChange}
        onKeyDown={onKeyDown}
        value={input}
      />
      <div>
        <label htmlFor="show-search">
          Show
          <input
            id="show-search"
            type="radio"
            value="shows"
            checked={isSearchOption}
            onChange={radioChange}
          />
        </label>
        <label htmlFor="actor-search">
          Actor
          <input
            id="actor-search"
            type="radio"
            checked={!isSearchOption}
            value="people"
            onChange={radioChange}
          />
        </label>
      </div>
      <button onClick={onSearch}>Search</button>
      {renderResult()}
    </MainPageLayout>
  );
};

export default Home;
