import React, { useState } from "react";

import { Row, Col, Input, Button, FormGroup } from "reactstrap";
import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";
import { css } from "styled-components";

const epayco = require("epayco-sdk-node")({
  apiKey: "323b2dcf18b7ba6732292fe5b617f3ec",
  privateKey: "9227585f9787dbf6ef9c7f3480429a81",
  lang: "ES",
  test: true,
});

const Card = ({ setRefresh, refresh, customer_id }) => {
  const [number, setNumber] = useState("");
  const [exp_year, setExp_year] = useState("");
  const [exp_month, setExp_month] = useState("");
  const [cvc, setCvc] = useState("");
  const [focus, setFocus] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    console.log({ number, exp_year, exp_month, cvc });
    epayco.token
      .create({
        "card[number]": number,
        "card[exp_month]": exp_month,
        "card[exp_year]": exp_year,
        "card[cvc]": cvc,
      })
      .then((token) => {
        console.log({ token });
        epayco.customers
          .addNewToken({
            token_card: token.id,
            customer_id,
          })
          .then((x) => {
            console.log({ x });
            setRefresh(!refresh);
          });
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <div>
        Ingresar nueva tarjeta
        <Cards
          cvc={cvc}
          expiry={exp_month + exp_year}
          focused={focus}
          number={number}
          name={""}
        />
      </div>
      <form onSubmit={onSubmit}>
        <FormGroup>
          <Input
            type="tel"
            name="number"
            value={number}
            placeholder="Card Number"
            onChange={(e) => setNumber(e.target.value)}
            onFocus={(e) => setFocus(e.target.name)}
          />
        </FormGroup>
        <FormGroup>
          <Row>
            <Col sm={6}>
              <Input
                type="tel"
                name="expiry"
                placeholder="MM"
                value={exp_month}
                onChange={(e) => {
                  if (!exp_month.length < 2) {
                    setExp_month(e.target.value.split("").slice(0, 2).join(""));
                  } else {
                    setExp_month(e.target.value);
                  }
                }}
                onFocus={(e) => setFocus(e.target.name)}
              />
            </Col>
            <Col sm={6}>
              <Input
                type="tel"
                name="expiry"
                value={exp_year}
                placeholder="YY"
                onChange={(e) => {
                  if (!exp_year.length < 2) {
                    setExp_year(e.target.value.split("").slice(0, 2).join(""));
                  } else {
                    setExp_year(e.target.value);
                  }
                }}
                onFocus={(e) => setFocus(e.target.name)}
              />
            </Col>
          </Row>
        </FormGroup>
        <FormGroup>
          <Input
            type="tel"
            name="cvc"
            value={cvc}
            placeholder="CVC"
            onChange={(e) => {
              if (!cvc.length < 3) {
                setCvc(e.target.value.split("").slice(0, 3).join(""));
              } else {
                setCvc(e.target.value);
              }
            }}
            onFocus={(e) => setFocus(e.target.name)}
          />
        </FormGroup>
        <Button.Ripple type="submit">Ingresar</Button.Ripple>
      </form>
    </div>
  );
};

export default Card;
