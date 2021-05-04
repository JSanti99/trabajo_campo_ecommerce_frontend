import React, { useEffect } from "react";
import { useQuery } from "./utils/useQuery";

const Epayco = () => {
  let query = useQuery();
  useEffect(() => {
    fetch(
      `https://secure.epayco.co/validation/v1/reference/${query.get(
        "ref_payco"
      )}`
    ).then(async (r) => {
      console.log(await r.json());
    });
  }, [query]);
  return <div>{query.get("ref_payco")}</div>;
};

export default Epayco;
