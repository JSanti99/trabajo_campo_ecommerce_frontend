// ** React Imports
import { Link } from "react-router-dom";

// ** Third Party Components
import classnames from "classnames";
import { X, Heart, Star } from "react-feather";
import {
  Card,
  CardBody,
  CardText,
  Button,
  Badge,
  InputGroup,
  InputGroupAddon,
  Input,
  InputGroupText,
} from "reactstrap";

// ** Custom Components
import NumberInput from "@components/number-input";

const Cart = (props) => {
  // ** Props
  const {
    products,
    stepper,
    deleteCartItem,
    dispatch,
    addToWishlist,
    deleteWishlistItem,
    getCartItems,
  } = props;

  // ** Function to convert Date
  const formatDate = (
    value,
    formatting = { month: "short", day: "numeric", year: "numeric" }
  ) => {
    if (!value) return value;
    return new Intl.DateTimeFormat("en-US", formatting).format(new Date(value));
  };

  // ** Funciton Function to toggle wishlist item
  const handleWishlistClick = (id, val) => {
    if (val) {
      dispatch(deleteWishlistItem(id));
    } else {
      dispatch(addToWishlist(id));
    }
    dispatch(getCartItems());
  };

  // ** Render cart items
  const renderCart = () => {
    return products.map((item) => {
      return (
        <Card key={item.name} className="ecommerce-card">
          <div className="item-img">
            <Link to={`/apps/ecommerce/product-detail/${item.slug}`}>
              <img className="img-fluid" src={item.image} alt={item.name} />
            </Link>
          </div>
          <CardBody>
            <div className="item-name">
              <h6 className="mb-0">
                <Link to={`/apps/ecommerce/product-detail/${item.slug}`}>
                  {item.name}
                </Link>
              </h6>
              <span className="item-company">
                By
                <a
                  className="ml-25"
                  href="/"
                  onClick={(e) => e.preventDefault()}
                >
                  {item.brand}
                </a>
              </span>
              <div className="item-rating">
                <ul className="unstyled-list list-inline">
                  {new Array(5).fill().map((listItem, index) => {
                    return (
                      <li key={index} className="ratings-list-item mr-25">
                        <Star
                          className={classnames({
                            "filled-star": index + 1 <= item.rating,
                            "unfilled-star": index + 1 > item.rating,
                          })}
                        />
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
            <span className="text-success mb-1">En stock</span>
            <div className="item-quantity">
              <span className="quantity-title mr-50">Qty</span>
              <NumberInput
                value={item.qty}
                min={1}
                max={10}
                size="sm"
                style={{ width: "7rem", height: "2.15rem" }}
              />
            </div>
            <div className="delivery-date text-muted">
              Entrega por, {formatDate(item.shippingDate)}
            </div>
            <span className="text-success">
              {item.discountPercentage}% de descuento
              {/* {item.offers} */} 2 ofertas disponibles
            </span>
          </CardBody>
          <div className="item-options text-center">
            <div className="item-wrapper">
              <div className="item-cost">
                <h4 className="item-price">${item.price}</h4>
                {item.hasFreeShipping ? (
                  <CardText className="shipping">
                    <Badge color="light-success" pill>
                      Envío gratuito
                    </Badge>
                  </CardText>
                ) : null}
              </div>
            </div>
            <Button
              className="mt-1 remove-wishlist"
              color="light"
              onClick={() => dispatch(deleteCartItem(item.id))}
            >
              <X size={14} className="mr-25" />
              <span>Eliminar</span>
            </Button>
            {/* <Button
              className="btn-cart"
              color="primary"
              onClick={() => handleWishlistClick(item.id, item.isInWishlist)}
            >
              <Heart
                size={14}
                className={classnames("mr-25", {
                  "fill-current": item.isInWishlist,
                })}
              />
              <span className="text-truncate">Wishlist</span>
            </Button> */}
          </div>
        </Card>
      );
    });
  };

  return (
    <div className="list-view product-checkout">
      <div className="checkout-items">
        {products.length ? renderCart() : <h4>Tu carrito está vacio</h4>}
      </div>
      <div className="checkout-options">
        <Card>
          <CardBody>
            <label className="section-label mb-1">Opciones</label>
            <InputGroup className="input-group-merge coupons">
              <Input placeholder="Cupones" />
              <InputGroupAddon addonType="append">
                <InputGroupText className="text-primary">
                  Aplicar
                </InputGroupText>
              </InputGroupAddon>
            </InputGroup>
            <hr />
            <div className="price-details">
              <h6 className="price-title">Detalles del precio</h6>
              <ul className="list-unstyled">
                <li className="price-detail">
                  <div className="detail-title">Total</div>
                  <div className="detail-amt">$964.000</div>
                </li>
                <li className="price-detail">
                  <div className="detail-title">Descuento</div>
                  <div className="detail-amt discount-amt text-success">
                    -50000$
                  </div>
                </li>
                <li className="price-detail">
                  <div className="detail-title">Impuesto estimado</div>
                  <div className="detail-amt">$183.160</div>
                </li>
                {/* <li className="price-detail">
                  <div className="detail-title">EMI Eligibility</div>
                  <a
                    href="/"
                    className="detail-amt text-primary"
                    onClick={(e) => e.preventDefault()}
                  >
                    Details
                  </a>
                </li> */}
                <li className="price-detail">
                  <div className="detail-title">Gastos de envío</div>
                  <div className="detail-amt discount-amt text-success">
                    Gratis
                  </div>
                </li>
              </ul>
              <hr />
              <ul className="list-unstyled">
                <li className="price-detail">
                  <div className="detail-title detail-total">Total</div>
                  <div className="detail-amt font-weight-bolder">
                    $1.097.160
                  </div>
                </li>
              </ul>
              <Button.Ripple
                color="primary"
                classnames="btn-next place-order"
                block
                disabled={!products.length}
                onClick={() => stepper.next()}
              >
                Hacer un pedido
              </Button.Ripple>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default Cart;
