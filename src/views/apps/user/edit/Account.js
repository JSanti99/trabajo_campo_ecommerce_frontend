// ** React Imports
import { useState, useEffect, Fragment } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

// ** Custom Components
import Avatar from "@components/avatar";

// ** Third Party Components
import { Lock, Edit, Trash2 } from "react-feather";
import {
  Row,
  Col,
  Input,
  Button,
  FormGroup,
  Media,
  Label,
  Form,
} from "reactstrap";
import { Bell, Check, X, AlertTriangle, Info } from "react-feather";
import TokenCard from "../../../pages/epayco/TokenCard";

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
            ? "Usuario actualizado!"
            : "Ha ocurrido un error"}
        </h6>
      </div>
      <small className="text-muted">Ahora</small>
    </div>
    <div className="toastify-body">
      <span role="img" aria-label="toast-text">
        {status == "success"
          ? "👋 Hemos actualizado tus datos!."
          : "Ocurrió un error al actualizar tus datos."}
      </span>
    </div>
  </Fragment>
);

const UserAccountTab = ({ selectedUser }) => {
  // ** States
  const [img, setImg] = useState(null);
  const [userData, setUserData] = useState(null);
  const [doc_type, setDocType] = useState("CC");
  const [doc_number, setDocNumber] = useState(0);
  const history = useHistory();

  // ** Function to change user image
  const onChange = (e) => {
    const reader = new FileReader(),
      files = e.target.files;
    reader.onload = function () {
      setImg(reader.result);
    };
    reader.readAsDataURL(files[0]);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log({ doc_type, doc_number });
    axios
      .put(`http://localhost:1337/users/${selectedUser.id}`, {
        docType: doc_type,
        docNumber: doc_number,
      })
      .then((user) => {
        localStorage.setItem("userData", JSON.stringify(user.data));
        toast.success(<ProgressToast status="success" />);
        setTimeout(
          function () {
            history.push("/epayco");
          }.bind(this),
          4000
        );
      });
  };

  // ** Update user image on mount or change
  useEffect(() => {
    console.log({ selectedUser });
    if (
      selectedUser !== null ||
      (selectedUser !== null &&
        userData !== null &&
        selectedUser.id !== userData.id)
    ) {
      setUserData(selectedUser);
      if (selectedUser.userImg) {
        return setImg(`http://localhost:1337${selectedUser.userImg.url}`);
      } else {
        return setImg(null);
      }
    }
  }, [selectedUser]);

  // ** Renders User
  const renderUserAvatar = () => {
    if (img === null) {
      const stateNum = Math.floor(Math.random() * 6),
        states = [
          "light-success",
          "light-danger",
          "light-warning",
          "light-info",
          "light-primary",
          "light-secondary",
        ],
        color = states[stateNum];
      return (
        <Avatar
          initials
          color={color}
          className="rounded mr-2 my-25"
          content={selectedUser.username}
          contentStyles={{
            borderRadius: 0,
            fontSize: "calc(36px)",
            width: "100%",
            height: "100%",
          }}
          style={{
            height: "90px",
            width: "90px",
          }}
        />
      );
    } else {
      return (
        <img
          className="user-avatar rounded mr-2 my-25 cursor-pointer"
          src={img}
          alt="user profile avatar"
          height="90"
          width="90"
        />
      );
    }
  };

  return (
    <>
      <Row>
        <Col sm={12}>
          <TokenCard userData={userData} />
        </Col>
      </Row>
      <hr />
      <Row>
        <Col sm="12">
          <Media className="mb-2">
            {renderUserAvatar()}
            <Media className="mt-50" body>
              <h4>{selectedUser.fullName} </h4>
              <div className="d-flex flex-wrap mt-1 px-0">
                <Button.Ripple
                  id="change-img"
                  tag={Label}
                  className="mr-75 mb-0"
                  color="primary"
                >
                  <span className="d-none d-sm-block">Change</span>
                  <span className="d-block d-sm-none">
                    <Edit size={14} />
                  </span>
                  <input
                    type="file"
                    hidden
                    id="change-img"
                    onChange={onChange}
                    accept="image/*"
                  />
                </Button.Ripple>
                <Button.Ripple color="secondary" outline>
                  <span className="d-none d-sm-block">Remove</span>
                  <span className="d-block d-sm-none">
                    <Trash2 size={14} />
                  </span>
                </Button.Ripple>
              </div>
            </Media>
          </Media>
        </Col>
        <Col sm="12">
          <Form onSubmit={onSubmit}>
            <Row>
              <Col md="4" sm="12">
                <FormGroup>
                  <Label for="doc_type">Documento</Label>
                  <Input
                    type="select"
                    name="doc_type"
                    id="doc_type"
                    value={doc_type}
                    onChange={(e) => setDocType(e.target.value)}
                  >
                    <option value="CC">Cedula de ciudadania</option>
                    <option value="TI">Tarjeta de identidad</option>
                  </Input>
                </FormGroup>
              </Col>
              <Col md="4" sm="12">
                <FormGroup>
                  <Label for="doc_number">Numero de documento</Label>
                  <Input
                    type="number"
                    id="doc_number"
                    placeholder="doc_number"
                    value={doc_number}
                    onChange={(e) => setDocNumber(e.target.value)}
                  />
                </FormGroup>
              </Col>

              <Col className="d-flex flex-sm-row flex-column mt-2" sm="12">
                <Button.Ripple
                  className="mb-1 mb-sm-0 mr-0 mr-sm-1"
                  type="submit"
                  color="primary"
                >
                  Save Changes
                </Button.Ripple>
                <Button.Ripple color="secondary" outline>
                  Reset
                </Button.Ripple>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </>
  );
};
export default UserAccountTab;
