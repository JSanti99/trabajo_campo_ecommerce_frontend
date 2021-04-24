import { useState, useEffect } from "react";
import Repeater from "@components/repeater";
import Select from "react-select";
import { selectThemeColors } from "@utils";
import { X, Plus } from "react-feather";
import { SlideDown } from "react-slidedown";
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  CardText,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
} from "reactstrap";

const VariacionesForm = (props) => {
  const [count, setCount] = useState(1),
    [sizes, setSizes] = useState([
      { value: "XS", label: "XS" },
      { value: "S", label: "S" },
      { value: "M", label: "M" },
      { value: "L", label: "L" },
    ]);

  const variations = props.variations;
  // [productSizes, setproductSizes] = useState([]),
  // [measures, setMeasures] = useState(
  //   "Contorno de Pecho (CM): 88.5 - 92.5 | Contorno de Cintura"
  // );

  const increaseCount = () => {
    setCount(count + 1);
    variations.push({
      stock: 0,
      measures: "",
      productSizes: [],
      status: "",
    });
    props.setVariations(variations);
  };

  const deleteForm = (e) => {
    e.preventDefault();
    const slideDownWrapper = e.target.closest(".react-slidedown"),
      form = e.target.closest("form");
    if (slideDownWrapper) {
      slideDownWrapper.remove();
    } else {
      form.remove();
    }
  };

  return (
    <>
      <h4 className="card-title">Variaciones del Producto</h4>

      <Repeater count={variations.length}>
        {(i) => {
          const Tag = i === 0 ? "div" : SlideDown;
          return (
            <Tag key={i}>
              <Form>
                <Row className="justify-content-between align-items-center">
                  <Col md={2}>
                    <FormGroup className="mb-2">
                      <Label for={`blog-edit-size-${i}`}>Tallas</Label>
                      <Select
                        id="blog-edit-size"
                        theme={selectThemeColors}
                        value={variations[i].measures}
                        isMulti
                        name="colors"
                        options={sizes}
                        className="react-select"
                        classNamePrefix="select"
                        onChange={(data) => {
                          variations[i].measures = data;
                          props.setVariations(variations);
                        }}
                      />
                    </FormGroup>
                  </Col>
                  {/* <Col md={4}>
                    <FormGroup className="mb-2">
                      <Label for={`blog-edit-stock-${i}`}>Medidas</Label>
                      <Input
                        id={`blog-edit-stock-${i}`}
                        value={measures}
                        placeholder="Medidas"
                        onChange={(e) => {
                          setMeasures(e.target.value);
                        }}
                      />
                    </FormGroup>
                  </Col>

                  <Col md={2}>
                    <FormGroup className="mb-2">
                      <Label for={`blog-edit-status${i}`}>Status</Label>
                      <Input
                        type="select"
                        id={`blog-edit-status${i}`}
                        value={status}
                        onChange={(e) => {
                          setStatus(e.target.value);
                          setStock(0);
                        }}
                      >
                        <option value="inStock">En stock</option>
                        <option value="outStock">Fuera de stock</option>
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col md={2}>
                    <FormGroup className="mb-2">
                      <Label for={`blog-edit-stock-${i}`}>
                        Cantidad Producto
                      </Label>
                      <Input
                        id={`blog-edit-stock-${i}`}
                        value={stock}
                        readOnly={status === "outStock" ? true : false}
                        onChange={(e) => {
                          setStock(e.target.value);
                        }}
                      />
                    </FormGroup>
                  </Col> */}
                  <Col md={2}>
                    <Button.Ripple
                      color="danger"
                      className="text-nowrap px-1"
                      onClick={deleteForm}
                      outline
                    >
                      <X size={14} className="mr-50" />
                      <span>Delete</span>
                    </Button.Ripple>
                  </Col>
                  <Col sm={12}>
                    <hr />
                  </Col>
                </Row>
              </Form>
            </Tag>
          );
        }}
      </Repeater>
      <Button.Ripple
        className="btn-icon"
        color="primary"
        onClick={increaseCount}
      >
        <Plus size={14} />
        <span className="align-middle ml-25">Agregar Variedad</span>
      </Button.Ripple>
      <br></br>
      <br></br>
      <br></br>
    </>
  );
};

export default VariacionesForm;
