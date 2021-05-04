import React, { useState } from "react";
import Cards from "react-credit-cards";
import { Row, Col, Input, Button, FormGroup } from "reactstrap";
import axios from "axios";

import "react-credit-cards/es/styles-compiled.css";

const epayco = require("epayco-sdk-node")({
  apiKey: "323b2dcf18b7ba6732292fe5b617f3ec",
  privateKey: "9227585f9787dbf6ef9c7f3480429a81",
  lang: "ES",
  test: true,
});

const TokenCard = ({ userData }) => {
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
        console.log({ userData });
        if (!userData.epaycoUserId) {
          epayco.customers
            .create({
              token_card: token.id,
              name: userData.firstNames,
              last_name: userData.lastNames,
              email: userData.email,
              doc_type: userData.docType,
              doc_number: userData.docNumber,
              default: true,
            })
            .then((customer) =>
              axios
                .put(`http://localhost:1337/users/${userData.id}`, {
                  epaycoUserId: customer.data.customerId,
                })
                .then((user) =>
                  localStorage.setItem("userData", JSON.stringify(user.data))
                )
            );
        } else {
          axios
            .put(
              `http://localhost:1337/epayco/customer/${userData.epaycoUserId}`,
              {
                token_card: token.id,
                name: userData.firstNames,
                last_name: userData.lastNames,
                email: userData.email,
              }
            )
            .then((customer) => console.log({ customer }));
        }
      });
  };
  return (
    <Row>
      <Col sm={6}>
        <Cards
          cvc={cvc}
          expiry={exp_month + exp_year}
          focused={focus}
          number={number}
          name={""}
        />
      </Col>
      <Col sm={6}>
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
                      setExp_month(
                        e.target.value.split("").slice(0, 2).join("")
                      );
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
                      setExp_year(
                        e.target.value.split("").slice(0, 2).join("")
                      );
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
      </Col>
    </Row>
  );
};

export default TokenCard;
