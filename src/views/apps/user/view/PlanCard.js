// ** Reactstrap
import {
  Card,
  CardHeader,
  CardBody,
  Badge,
  UncontrolledTooltip,
  Button,
} from "reactstrap";

const PlanCard = ({ selectedUser }) => {
  return (
    <Card className="plan-card border-primary">
      <CardHeader className="d-flex justify-content-between align-items-center pt-75 pb-1">
        <h5 className="mb-0">Plan actual</h5>
        <Badge id="plan-expiry-date" color="light-secondary">
          Marzo 22, {new Date().getFullYear()}
        </Badge>
        <UncontrolledTooltip placement="top" target="plan-expiry-date">
          Fecha de caducidad
        </UncontrolledTooltip>
      </CardHeader>
      <CardBody>
        <Badge className="text-capitalize" color="light-primary">
          {selectedUser !== null ? selectedUser.currentPlan : "Basic"}
        </Badge>
        <ul className="list-unstyled my-1">
          <li>
            <span className="align-middle">Productos ilimitados</span>
          </li>
          <li className="my-25">
            <span className="align-middle">Canales de venta</span>
          </li>
          <li>
            <span className="align-middle">Códigos de descuento</span>
          </li>
        </ul>
        <Button.Ripple className="text-center" color="primary" block>
          Actualizar el plan
        </Button.Ripple>
      </CardBody>
    </Card>
  );
};

export default PlanCard;
