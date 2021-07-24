import React, { useState } from "react";
import MainPageLayout from "../components/MainPageLayout";
import { getAPI } from "../misc/Config";
const Home = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);
  const onSearch = () => {
    getAPI(`search/shows?q=${input}`).then((results) => {
      setResult(results);
      console.log(results);
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
          {result.map((item) => (
            <div key={item.show.id}>{item.show.name}</div>
          ))}
        </div>
      );
    } else {
      return null;
    }
  };
  return (
    <MainPageLayout>
      <input
        type="text"
        onChange={inputChange}
        onKeyDown={onKeyDown}
        value={input}
      />
      <button onClick={onSearch}>Search</button>
      {renderResult()}
    </MainPageLayout>
  );
};

export default Home;
