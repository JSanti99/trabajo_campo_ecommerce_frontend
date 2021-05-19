// ** Utils
import { isObjEmpty } from "@utils";

// ** Third Party Components
import classnames from "classnames";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import {
  Form,
  Input,
  Card,
  Label,
  FormGroup,
  CardHeader,
  CardTitle,
  CardBody,
  CardText,
  Button,
  Row,
  Col,
} from "reactstrap";
import ButtonEpayco from "../../../../pages/epayco/ButtonEpayco";

const Address = (props) => {
  // ** Props
  const { stepper, getCartItems, products } = props;

  // ** Vars
  const { register, errors, handleSubmit, trigger } = useForm();

  const [userData, setUserData] = useState(null);
  const [address, setAddress] = useState(null);
  const [description, setDescription] = useState(null);
  const [taxBase, setTaxBase] = useState(null);

  useEffect(() => {
    setUserData(JSON.parse(localStorage.getItem("userData")));
    if (products) {
      let precio = 0,
        desc = "";
      products.forEach((producto) => {
        precio = precio + +producto.price * +producto.qty * 1000;
        desc = `${desc} , ${producto.name}`;
      });
      console.log({ precio });
      setTaxBase(precio);
      setDescription(desc);
    }
  }, [products]);

  // ** On form submit if there are no errors then go to next step
  const onSubmit = () => {
    trigger();
    if (isObjEmpty(errors)) {
      stepper.next();
    }
  };

  return (
    <Form
      className="list-view product-checkout"
      onSubmit={handleSubmit(onSubmit)}
    >
      {/* <Card>
        <CardHeader className='flex-column align-items-start'>
          <CardTitle tag='h4'>Add New Address</CardTitle>
          <CardText className='text-muted mt-25'>
            Be sure to check "Deliver to this address" when you have finished
          </CardText>
        </CardHeader>
        <CardBody>
          <Row>
            <Col md='6' sm='12'>
              <FormGroup className='mb-2'>
                <Label for='checkout-name'>Full Name:</Label>
                <Input
                  name='checkout-name'
                  id='checkout-name'
                  placeholder='John Doe'
                  innerRef={register({ required: true })}
                  className={classnames({ 'is-invalid': errors['checkout-name'] })}
                />
              </FormGroup>
            </Col>
            <Col md='6' sm='12'>
              <FormGroup className='mb-2'>
                <Label for='checkout-number'>Number:</Label>
                <Input
                  type='number'
                  name='checkout-number'
                  id='checkout-number'
                  placeholder='0123456789'
                  innerRef={register({ required: true })}
                  className={classnames({ 'is-invalid': errors['checkout-number'] })}
                />
              </FormGroup>
            </Col>
            <Col md='6' sm='12'>
              <FormGroup className='mb-2'>
                <Label for='checkout-apt-number'>Flat, House No:</Label>
                <Input
                  type='number'
                  name='checkout-apt-number'
                  id='checkout-apt-number'
                  placeholder='9447 Glen Eagles Drive'
                  innerRef={register({ required: true })}
                  className={classnames({ 'is-invalid': errors['checkout-apt-number'] })}
                />
              </FormGroup>
            </Col>
            <Col md='6' sm='12'>
              <FormGroup className='mb-2'>
                <Label for='checkout-landmark'>Landmark e.g. near apollo hospital:</Label>
                <Input
                  name='checkout-landmark'
                  id='checkout-landmark'
                  placeholder='Near Apollo Hospital'
                  innerRef={register({ required: true })}
                  className={classnames({ 'is-invalid': errors['checkout-landmark'] })}
                />
              </FormGroup>
            </Col>
            <Col md='6' sm='12'>
              <FormGroup className='mb-2'>
                <Label for='checkout-city'>Town/City:</Label>
                <Input
                  name='checkout-city'
                  id='checkout-city'
                  placeholder='Tokyo'
                  innerRef={register({ required: true })}
                  className={classnames({ 'is-invalid': errors['checkout-city'] })}
                />
              </FormGroup>
            </Col>
            <Col md='6' sm='12'>
              <FormGroup className='mb-2'>
                <Label for='checkout-pincode'>Pincode:</Label>
                <Input
                  type='number'
                  name='checkout-pincode'
                  id='checkout-pincode'
                  placeholder='201301'
                  innerRef={register({ required: true })}
                  className={classnames({ 'is-invalid': errors['checkout-pincode'] })}
                />
              </FormGroup>
            </Col>
            <Col md='6' sm='12'>
              <FormGroup className='mb-2'>
                <Label for='checkout-state'>State:</Label>
                <Input
                  name='checkout-state'
                  id='checkout-state'
                  placeholder='California'
                  innerRef={register({ required: true })}
                  className={classnames({ 'is-invalid': errors['checkout-state'] })}
                />
              </FormGroup>
            </Col>
            <Col md='6' sm='12'>
              <FormGroup className='mb-2'>
                <Label for='add-type'>Address Type:</Label>
                <Input type='select' name='add-type' id='add-type'>
                  <option value='home'>Home</option>
                  <option value='work'>Work</option>
                </Input>
              </FormGroup>
            </Col>
            <Col sm='12'>
              <Button.Ripple type='submit' className='btn-next delivery-address' color='primary'>
                Save And Deliver Here
              </Button.Ripple>
            </Col>
          </Row>
        </CardBody>
      </Card> */}
      <div className="customer-card">
        <Card>
          <CardHeader>
            <CardTitle tag="h4">John Doe</CardTitle>
          </CardHeader>
          <CardBody>
            <Col md="6" sm="12">
              <FormGroup className="mb-2">
                <Label for="address">Direccion:</Label>
                <Input
                  name="address"
                  id="address"
                  placeholder="Direccion"
                  onChange={(e) => setAddress(e.target.value)}
                />
              </FormGroup>
            </Col>
            {taxBase * 1.19} |{taxBase} |{taxBase * 0.19}
            {description}
            {taxBase && description && (
              <ButtonEpayco
                tax={taxBase * 0.19}
                taxBase={taxBase}
                amount={taxBase * 1.19}
                description={description}
              />
            )}
          </CardBody>
        </Card>
      </div>
    </Form>
  );
};

export default Address;
