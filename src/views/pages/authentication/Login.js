import { useState, useContext, Fragment } from "react";
import classnames from "classnames";
import Avatar from "@components/avatar";
import { useSkin } from "@hooks/useSkin";
import useJwt from "@src/auth/jwt/useJwt";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { toast, Slide } from "react-toastify";
import { handleLogin } from "@store/actions/auth";
import { AbilityContext } from "@src/utility/context/Can";
import { Link, useHistory } from "react-router-dom";
import InputPasswordToggle from "@components/input-password-toggle";
import { getHomeRouteForLoggedInUser, isObjEmpty } from "@utils";
import {
  Facebook,
  Twitter,
  Mail,
  GitHub,
  HelpCircle,
  Coffee,
} from "react-feather";
import {
  Alert,
  Row,
  Col,
  CardTitle,
  CardText,
  Form,
  Input,
  FormGroup,
  Label,
  CustomInput,
  Button,
  UncontrolledTooltip,
} from "reactstrap";

import "@styles/base/pages/page-auth.scss";

const ToastContent = ({ name, role }) => (
  <Fragment>
    <div className="toastify-header">
      <div className="title-wrapper">
        <Avatar size="sm" color="success" icon={<Coffee size={12} />} />
        <h6 className="toast-title font-weight-bold">Bienvenido, {name}</h6>
      </div>
    </div>
    <div className="toastify-body">
      <span>
        Has iniciado sesión exitosamente como {role} en SCom. Ahora puedes
        empezar a explorar. ¡Disfrútalo!
      </span>
    </div>
  </Fragment>
);

const Login = (props) => {
  const [skin, setSkin] = useSkin();
  const ability = useContext(AbilityContext);
  const dispatch = useDispatch();
  const history = useHistory();
  const [email, setEmail] = useState("admin@gmail.com");
  const [password, setPassword] = useState("Admin1234");

  const { register, errors, handleSubmit } = useForm();
  const illustration = skin === "dark" ? "login-v2-dark.svg" : "login-v2.svg",
    source = require(`@src/assets/images/pages/${illustration}`).default;

  const onSubmit = (data) => {
    if (isObjEmpty(errors)) {
      useJwt
        .login({ identifier: email, password })
        .then((res) => {
          const data = {
            ...res.data.user,
            accessToken: res.data.jwt,
            refreshToken: res.data.refreshToken,
          };
          dispatch(handleLogin(data));
          ability.update(res.data.user.ability);

          history.push(getHomeRouteForLoggedInUser(data.role.type));
          toast.success(
            <ToastContent
              name={data.username || "John Doe"}
              role={data.role.type || "admin"}
            />,
            { transition: Slide, hideProgressBar: true, autoClose: 2000 }
          );
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="auth-wrapper auth-v2">
      <Row className="auth-inner m-0">
        <Link className="brand-logo" to="/" onClick={(e) => e.preventDefault()}>
          <h2 className="brand-text text-primary ml-1">😎 SCom</h2>
        </Link>
        <Col className="d-none d-lg-flex align-items-center p-5" lg="8" sm="12">
          <div className="w-100 d-lg-flex align-items-center justify-content-center px-5">
            <img className="img-fluid" src={source} alt="Login V2" />
          </div>
        </Col>
        <Col
          className="d-flex align-items-center auth-bg px-2 p-lg-5"
          lg="4"
          sm="12"
        >
          <Col className="px-xl-2 mx-auto" sm="8" md="6" lg="12">
            <CardTitle tag="h2" className="font-weight-bold mb-1">
              Bienvenido a SCom! 👋
            </CardTitle>
            <CardText className="mb-2">Por favor inicia sesión</CardText>
            <Form
              className="auth-login-form mt-2"
              onSubmit={handleSubmit(onSubmit)}
            >
              <FormGroup>
                <Label className="form-label" for="login-email">
                  Correo
                </Label>
                <Input
                  autoFocus
                  type="email"
                  value={email}
                  id="login-email"
                  name="login-email"
                  placeholder="john@example.com"
                  onChange={(e) => setEmail(e.target.value)}
                  className={classnames({
                    "is-invalid": errors["login-email"],
                  })}
                  innerRef={register({
                    required: true,
                    validate: (value) => value !== "",
                  })}
                />
              </FormGroup>
              <FormGroup>
                <div className="d-flex justify-content-between">
                  <Label className="form-label" for="login-password">
                    Contraseña
                  </Label>
                  <Link to="/forgot-password">
                    <small>Olvidaste tu contraseña?</small>
                  </Link>
                </div>
                <InputPasswordToggle
                  value={password}
                  id="login-password"
                  name="login-password"
                  className="input-group-merge"
                  onChange={(e) => setPassword(e.target.value)}
                  className={classnames({
                    "is-invalid": errors["login-password"],
                  })}
                  innerRef={register({
                    required: true,
                    validate: (value) => value !== "",
                  })}
                />
              </FormGroup>
              <FormGroup>
                <CustomInput
                  type="checkbox"
                  className="custom-control-Primary"
                  id="remember-me"
                  label="Recuerdame"
                />
              </FormGroup>
              <Button.Ripple type="submit" color="primary" block>
                Iniciar Sesión
              </Button.Ripple>
            </Form>
            <p className="text-center mt-2">
              <span className="mr-25">Nuevo en nuestra plataforma?</span>
              <Link to="/register">
                <span>Crear una cuenta</span>
              </Link>
            </p>
          </Col>
        </Col>
      </Row>
    </div>
  );
};

export default Login;
