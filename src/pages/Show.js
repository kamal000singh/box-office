import React, { useReducer, useEffect } from "react";
import { useParams } from "react-router";
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
  return <div>hello</div>;
};

export default Show;
