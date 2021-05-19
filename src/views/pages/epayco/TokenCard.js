import React, { useState, Fragment } from "react";
import Avatar from "@components/avatar";
import Cards from "react-credit-cards";
import { Row, Col, Input, Button, FormGroup } from "reactstrap";
import { Bell, Check, X, AlertTriangle, Info } from "react-feather";
import axios from "axios";

import { useHistory } from "react-router-dom";

import "react-credit-cards/es/styles-compiled.css";

import { toast } from "react-toastify";

const ProgressToast = ({ status }) => (
  <Fragment>
    <div className="toastify-header">
      <div className="title-wrapper">
        <Avatar
          size="sm"
          color={status == "success" ? "success" : "danger"}
          icon={<Check size={12} />}
        />
        <h6 className="toast-title">
          {status == "success"
            ? "Usuario epayco creado!"
            : "Ha ocurrido un error"}
        </h6>
      </div>
      <small className="text-muted">Ahora</small>
    </div>
    <div className="toastify-body">
      <span role="img" aria-label="toast-text">
        {status == "success"
          ? "👋 Hemos creado un usuario con tu email y la tarjeta ingresada."
          : "Ocurrió un error al crear tu usuario epayco."}
      </span>
    </div>
  </Fragment>
);

const epayco = require("epayco-sdk-node")({
  apiKey: "323b2dcf18b7ba6732292fe5b617f3ec",
  privateKey: "9227585f9787dbf6ef9c7f3480429a81",
  lang: "ES",
  test: true,
});

const TokenCard = ({ userData }) => {
  const history = useHistory();

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
                .then((user) => {
                  toast.success(<ProgressToast status="success" />);
                  setTimeout(
                    function () {
                      history.push("/epayco");
                    }.bind(this),
                    4000
                  );
                  localStorage.setItem("userData", JSON.stringify(user.data));
                })
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
            .then((customer) => {
              toast.success(<ProgressToast status="success" />);
              setTimeout(
                function () {
                  history.push("/epayco");
                }.bind(this),
                4000
              );
            });
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
