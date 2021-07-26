import React, { useReducer, useEffect } from "react";
import { useParams } from "react-router";
import { Cast } from "../components/shows/Cast";
import { Details } from "../components/shows/Details";
import { Seasons } from "../components/shows/Seasons";
import { ShowMainData } from "../components/shows/ShowMainData";
import { ShowPageWrapper } from "../components/styled";
import { getAPI } from "../misc/Config";
const reducer = (prevState, action) => {
  switch (action.type) {
    case "FETCH_SUCCESS": {
      return { isLoading: false, error: null, show: action.show };
    }
    case "FETCH_FAILED": {
      return { ...prevState, isLoading: false, error: action.error };
    }
    default:
      return prevState;
  }
};
const initialState = {
  show: null,
  isLoading: true,
  error: null,
};
const Show = () => {
  const [{ show, isLoading, error }, dispatch] = useReducer(
    reducer,
    initialState
  );
  const { id } = useParams();
  useEffect(() => {
    let isMounted = true;
    getAPI(`shows/${id}?embed[]=seasons&embed[]=cast`)
      .then((results) => {
        if (isMounted) {
          dispatch({ type: "FETCH_SUCCESS", show: results });
        }
      })
      .catch((err) => {
        if (isMounted) {
          dispatch({ type: "FETCH_FAILED", error: err.message });
        }
      });
    return () => {
      isMounted = false;
    };
  }, [id]);
  console.log(show);
  if (isLoading) {
    return <div>Page is Loading</div>;
  }
  if (error) {
    return <div>Error Occured:{error}</div>;
  }
  return (
    <ShowPageWrapper>
      <ShowMainData
        image={show.image}
        name={show.name}
        rating={show.rating}
        summary={show.summary}
        tags={show.genres}
      />
      <div>
        <h2>Details</h2>
        <Details
          status={show.status}
          network={show.network}
          premiered={show.premiered}
        />
      </div>
      <div>
        <h2>Seasons</h2>
        <Seasons seasons={show._embedded.seasons} />
      </div>
      <div>
        <h2>Cast</h2>
        <Cast cast={show._embedded.cast} />
      </div>
    </ShowPageWrapper>
  );
};

export default Show;
