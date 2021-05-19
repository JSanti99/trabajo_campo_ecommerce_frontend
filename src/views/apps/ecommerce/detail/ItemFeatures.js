// ** React Imports
import { Row, Col, CardText } from "reactstrap";
import { Award, Clock, Shield } from "react-feather";

const ItemFeatures = () => {
  return (
    <div className="item-features">
      <Row className="text-center">
        <Col className="mb-4 mb-md-0" md="4" xs="12">
          <div className="w-75 mx-auto">
            <Award />
            <h4 className="mt-2 mb-1">ENVÍO GRATIS A PARTIR DE $149.900</h4>
            <CardText>Por + $14.990 solicita el envío express</CardText>
          </div>
        </Col>
        <Col className="mb-4 mb-md-0" md="4" xs="12">
          <div className="w-75 mx-auto">
            <Clock />
            <h4 className="mt-2 mb-1">DEVOLUCIONES GRATIS</h4>
            <CardText>
              ¿No es tu talla? Devuelve en un plazo de 60 días
            </CardText>
          </div>
        </Col>
        <Col className="mb-4 mb-md-0" md="4" xs="12">
          <div className="w-75 mx-auto">
            <Shield />
            <h4 className="mt-2 mb-1">PAGA SEGURO</h4>
            <CardText>Puedes pagar con tarjeta o en efectivo</CardText>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default ItemFeatures;
