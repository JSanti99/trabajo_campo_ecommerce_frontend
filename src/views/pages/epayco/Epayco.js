import axios from "axios";
import React, { useEffect, useState } from "react";
import { useQuery } from "./utils/useQuery";

const Epayco = () => {
  const [data, setData] = useState({});
  let query = useQuery();
  useEffect(() => {
    fetch(
      `https://secure.epayco.co/validation/v1/reference/${query.get(
        "ref_payco"
      )}`
    ).then(async (r) => {
      setData(await r.json());
    });
  }, []);
  useEffect(() => {
    if (data) {
      const userData = JSON.parse(localStorage.getItem("userData"));
      console.log(data);
      if (userData) {
        axios
          .post("http://localhost:1337/facturas", {
            user: userData.id,
            total: "41650",
            ref: query.get("ref_payco"),
            fecha: new Date(),
          })
          .then((res) => {});
      }
    }
  }, [data]);
  return <pre>{data && JSON.stringify(data, null, 2)}</pre>;
};

export default Epayco;
