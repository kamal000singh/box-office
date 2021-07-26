import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { getAPI } from "../misc/Config";
const Show = () => {
  const [show, setShow] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    return getAPI(`shows/${id}?embed[]=seasons&embed[]=cast`).then(
      (results) => {
        setShow(results);
      }
    );
  }, [id]);
  console.log(show);
  return <div>hello</div>;
};

export default Show;
