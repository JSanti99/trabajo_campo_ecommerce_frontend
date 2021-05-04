import React, { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import Card from "./Card";
import { Button } from "reactstrap";
import { useHistory } from "react-router-dom";

const epayco = require("epayco-sdk-node")({
  apiKey: "323b2dcf18b7ba6732292fe5b617f3ec",
  privateKey: "9227585f9787dbf6ef9c7f3480429a81",
  lang: "ES",
  test: true,
});

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-gap: 40px;
  padding: 2% 10%;
  background-color: #283046;
  font-family: sans-serif;
  font-size: 1.5rem;
  border: none;
  border-radius: 0.5rem;
  color: #fff;
  text-align: center;
`;

const Form = styled.form`
  display: grid;
  grid-template-columns: subgrid;
  grid-template-rows: repeat(auto-fill, minmax(50px, 1fr));
  grid-gap: 20px;
`;

const StyledButton = styled.button`
  padding: 0.5rem 1.3rem;
  font-size: 1.3rem;
  color: #fff;
  outline: none;
  border: 1px solid transparent;
  border-collapse: separate;
  border-radius: 10px !important;
  background-color: #333;
`;

const Select = styled.select`
  background: #333;
  color: #f0f0f0;
  padding: 10px 20px;
  border: 1px solid #bdbdbd;
  border-radius: 10px !important;
`;
const Option = styled.option`
  background: #333;
  color: #f0f0f0;
  padding: 10px 20px;
`;

const Test = styled.div`
  background: #333;
`;
const P = styled.p`
  color: #fff;
`;

const EpaycoSubscribe = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    getValues,
    setValue,
  } = useForm();
  const [customer, setCustomer] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [userId, setUserId] = useState(null);
  const [condiciones, setCondiciones] = useState(false);
  const userData = JSON.parse(localStorage.getItem("userData"));
  const history = useHistory();

  const onSubmit = (data) => {
    const { token } = JSON.parse(data.number);
    epayco.subscriptions
      .create({
        id_plan: "comerciante",
        customer: customer.data.id_customer,
        token_card: token,
        doc_type: userData.docType,
        doc_number: String(userData.docNumber),
        url_confirmation: "http://localhost:3000/epayco",
        method_confirmation: "POST",
      })
      .then((subscription) => {
        console.log({ subscription });
        epayco.subscriptions
          .charge({
            id_plan: "comerciante",
            customer: customer.data.id_customer,
            token_card: token,
            doc_type: userData.docType,
            doc_number: String(userData.docNumber),
            ip: subscription.ip,
          })
          .then((paidSub) => {
            console.log(paidSub);
            if (paidSub.data.respuesta === "Aprobada") {
              axios
                .put(`http://localhost:1337/users/${userData.id}`, {
                  role: "3",
                  ability: [
                    { action: "read", subject: "ACL" },
                    { action: "manage", subject: "TIENDA" },
                  ],
                })
                .then((r) =>
                  localStorage.setItem("userData", JSON.stringify(r.data))
                );
            }
          })
          .catch((errPaid) => console.log({ errPaid }));
      })
      .catch((errSub) => console.log({ errSub }));
  };

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (userData) {
      let id = userData.epaycoUserId;
      if (id) {
        setUserId(id);
        axios.get(`http://localhost:1337/epayco/customer/${id}`).then((res) => {
          let cust = res.data;
          console.log({ cust });
          setCustomer(cust);
        });
        axios.get(`http://localhost:1337/epayco/subscriptions`).then((res) => {
          let subscriptions = res.data;
          console.log({ subscriptions });
        });
      } else {
        setUserId(null);
      }
    }
  }, [refresh]);

  const handleDeleteCard = (card) => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (userData) {
      let id = userData.epaycoUserId;
      console.log({ userData });
      axios
        .post("http://localhost:1337/epayco/subscribe", {
          ...card,
          customerId: id,
        })
        .then((res) => {
          setRefresh(!refresh);
          console.log(res.data);
        });
    }
  };

  useEffect(() => {
    setCondiciones(
      customer &&
        customer.data.id_customer &&
        userData.docType &&
        userData.docNumber
    );
  }, [customer]);
  return (
    <Container>
      {!userId && <P>No tienes un usuario Epayco</P>}

      {condiciones ? (
        <>
          {customer.data.cards[0] ? (
            <Form onSubmit={handleSubmit(onSubmit)} id="customer-form">
              <StyledButton
                type="button"
                onClick={() => handleDeleteCard(JSON.parse(getValues().number))}
              >
                Eliminar Tarjeta
              </StyledButton>
              <Select
                name="number"
                defaultValue={customer.data.cards[0].mask}
                ref={register}
              >
                {customer.data.cards.map((card, index) => (
                  <Option key={index} value={JSON.stringify(card)}>
                    {card.mask}
                  </Option>
                ))}
              </Select>
              <StyledButton type="submit">SUSCRIBIRSE</StyledButton>
            </Form>
          ) : (
            "Ingresa una tarjeta a EPAYCO"
          )}
          <Card
            setRefresh={setRefresh}
            refresh={refresh}
            customer_id={customer.data.id_customer}
          />
        </>
      ) : (
        <>
          <P>No tienes perfil completo</P>
          <Button.Ripple onClick={() => history.push("/apps/user/edit/1")}>
            Editar Perfil
          </Button.Ripple>
        </>
      )}
    </Container>
  );
};

export default EpaycoSubscribe;
