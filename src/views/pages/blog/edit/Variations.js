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

import { v4 } from "uuid";

import { useFieldArray } from "react-hook-form";

const VariacionesForm = ({ control, register, setValue, getValues }) => {
  const { fields, append, remove, prepend } = useFieldArray({
    control,
    name: "test",
  });
  const [count, setCount] = useState(1),
    [sizes, setSizes] = useState([
      { value: "XS", label: "XS" },
      { value: "S", label: "S" },
      { value: "M", label: "M" },
      { value: "L", label: "L" },
    ]);

  // [productSizes, setproductSizes] = useState([]),
  // [measures, setMeasures] = useState(
  //   "Contorno de Pecho (CM): 88.5 - 92.5 | Contorno de Cintura"
  // );

  const handleSelectMeasures = (data, i) => {
    setVariations(
      variations.map((v, j) => {
        if (j !== i) return v;
        return { ...v, measures: data };
      })
    );
  };

  const increaseCount = () => {
    setCount(count + 1);
    variations.push({
      stock: 0,
      measures: [],
      productSizes: [],
      status: "",
    });
    setVariations(variations);
  };

  const deleteVariation = (e, i) => {
    e.preventDefault();
    setVariations([...variations.filter((v, j) => j !== i)]);
  };

  return (
    <>
      <h4 className="card-title">Variaciones del Producto</h4>
      {fields.map((variation, i) => (
        <Row
          key={v4()}
          mb={2}
          className="justify-content-between align-items-center"
        >
          <Col md={2}>
            <Label for={`size-${i}`}>Tallas</Label>
            <Select
              id={`size-${i}`}
              theme={selectThemeColors}
              value={variation.measures}
              isMulti
              options={sizes}
              className="react-select"
              classNamePrefix="select"
              ref={register()}
            />
          </Col>
          <Col md={2}>
            <Button
              color="danger"
              className="text-nowrap px-1"
              outline
              onClick={() => remove(i)}
            >
              <X size={14} className="mr-50" />
              <span>Delete</span>
            </Button>
          </Col>
        </Row>
      ))}

      <br></br>
      <br></br>
      <Button.Ripple
        className="btn-icon"
        color="primary"
        onClick={() => {
          append({ measures: [{ value: "XS", label: "XS" }] });
        }}
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
