import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { getAPI } from "../misc/Config";
const Show = () => {
  const [show, setShow] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    let isMounted = true;
    getAPI(`shows/${id}?embed[]=seasons&embed[]=cast`)
      .then((results) => {
        setTimeout(() => {
          if (isMounted) {
            setShow(results);
            setIsLoading(false);
          }
        }, 3000);
      })
      .catch((err) => {
        if (isMounted) {
          setError(err);
          setIsLoading(false);
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
