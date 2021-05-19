// ** Custom Hooks
import { useRTL } from "@hooks/useRTL";

// ** Third Party Components
import wNumb from "wnumb";
import classnames from "classnames";
import { Star } from "react-feather";
import Nouislider from "nouislider-react";
import { Card, CardBody, Row, Col, CustomInput, Button } from "reactstrap";

// ** Styles
import "@styles/react/libs/noui-slider/noui-slider.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import { endpoint } from "../../../../utility/Utils";

const Sidebar = (props) => {
  // ** Props
  const { id, sidebarOpen, store, dispatch, getProducts } = props;

  // ** Hooks
  const [isRtl, setIsRtl] = useRTL();
  const [brands, setBrands] = useState(null);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [categories, setCategories] = useState(null);

  // ** Array of categories
  useEffect(() => {
    axios
      .get(`${endpoint}/category`)
      .then((response) =>
        setCategories(response.data.map((b) => ({ id: b.id, title: b.label })))
      );
  }, []);

  // ** Array of brands
  useEffect(() => {
    axios
      .get(`${endpoint}/tiendas`)
      .then((response) => setBrands(response.data.map((b) => b.companyName)));
  }, []);

  const deletePricesParams = () => {
    let params = store.params;
    for (let key in params) {
      if (key.includes("price")) {
        delete params[key];
      }
    }
    return params;
  };
  const deleteBrandsParams = () => {
    let params = store.params;
    for (let key in params) {
      if (key.includes("tienda")) {
        delete params[key];
      }
    }
    return params;
  };
  const deleteCategoriesParams = () => {
    let params = store.params;
    for (let key in params) {
      if (key.includes("categoria")) {
        delete params[key];
      }
    }
    return params;
  };

  const deleteParams = () => {
    let params = store.params;
    for (let key in params) {
      if (key !== "_start" || key !== "_limit") {
        delete params[key];
      }
    }
    console.log({ params });
    return params;
  };

  return (
    <div className="sidebar-detached sidebar-left">
      <div className="sidebar">
        <div
          className={classnames("sidebar-shop", {
            show: sidebarOpen,
          })}
        >
          <Row>
            <Col sm="12">
              <h6 className="filter-heading d-none d-lg-block"> Filtros</h6>
            </Col>
          </Row>
          <Card>
            <CardBody>
              <div className="multi-range-price">
                <h6 className="filter-title mt-0">Rango múltiple</h6>
                <ul className="list-unstyled price-range">
                  <li>
                    <CustomInput
                      id="all"
                      name="price-range-radio"
                      type="radio"
                      label="All"
                      onChange={() => {
                        if (id) {
                          dispatch(getProducts({ id }, { ...deleteParams() }));
                        } else {
                          dispatch(
                            getProducts({
                              ...deleteParams(),
                            })
                          );
                        }
                      }}
                      defaultChecked
                    />
                  </li>
                  <li>
                    <CustomInput
                      id="10-dollars-below"
                      type="radio"
                      label="<=$10"
                      name="price-range-radio"
                      onChange={() => {
                        if (id) {
                          dispatch(
                            getProducts(
                              { id },
                              {
                                ...deleteParams(),
                                "_where[0][price_lt]": 10,
                              }
                            )
                          );
                        } else {
                          dispatch(
                            getProducts({
                              ...deleteParams(),
                              "_where[0][price_lt]": 10,
                            })
                          );
                        }
                      }}
                    />
                  </li>
                  <li>
                    <CustomInput
                      id="10-100-dollars"
                      name="price-range-radio"
                      type="radio"
                      label="$10-$100"
                      onChange={() => {
                        if (id) {
                          dispatch(
                            getProducts(
                              { id },
                              {
                                ...deleteParams(),
                                "_where[0][price_gt]": 10,
                                "_where[0][price_lt]": 100,
                              }
                            )
                          );
                        } else {
                          dispatch(
                            getProducts({
                              ...deleteParams(),
                              "_where[0][price_gt]": 10,
                              "_where[0][price_lt]": 100,
                            })
                          );
                        }
                      }}
                    />
                  </li>
                  <li>
                    <CustomInput
                      id="100-500-dollars"
                      name="price-range-radio"
                      type="radio"
                      label="$100-$500"
                      onChange={() => {
                        if (id) {
                          dispatch(
                            getProducts(
                              { id },
                              {
                                ...deleteParams(),
                                "_where[0][price_gt]": 100,
                                "_where[0][price_lt]": 500,
                              }
                            )
                          );
                        } else {
                          dispatch(
                            getProducts({
                              ...deleteParams(),
                              "_where[0][price_gt]": 100,
                              "_where[0][price_lt]": 500,
                            })
                          );
                        }
                      }}
                    />
                  </li>
                  <li>
                    <CustomInput
                      id="500-dollars-above"
                      name="price-range-radio"
                      type="radio"
                      label=">=$500"
                      onChange={() => {
                        if (id) {
                          dispatch(
                            getProducts(
                              { id },
                              {
                                ...deleteParams(),
                                "_where[0][price_gt]": 500,
                              }
                            )
                          );
                        } else {
                          dispatch(
                            getProducts({
                              ...deleteParams(),
                              "_where[0][price_gt]": 500,
                            })
                          );
                        }
                      }}
                    />
                  </li>
                </ul>
              </div>
              <div className="price-slider">
                <h6 className="filter-title">Rango de precios</h6>
                <div className="price-slider">
                  <Nouislider
                    className="range-slider mt-2"
                    direction={isRtl ? "rtl" : "ltr"}
                    start={[1500, 3500]}
                    connect={true}
                    tooltips={[true, true]}
                    format={wNumb({
                      decimals: 0,
                    })}
                    range={{
                      min: 51,
                      max: 5000,
                    }}
                    onChange={(data) => {
                      if (id) {
                        dispatch(
                          getProducts(
                            { id },
                            {
                              ...deleteParams(),
                              "_where[0][price_gt]": data[0],
                              "_where[0][price_lt]": data[1],
                            }
                          )
                        );
                      } else {
                        dispatch(
                          getProducts({
                            ...deleteParams(),
                            "_where[0][price_gt]": data[0],
                            "_where[0][price_lt]": data[1],
                          })
                        );
                      }
                    }}
                  />
                </div>
              </div>
              <div id="product-categories">
                <h6 className="filter-title">Categorias</h6>
                <ul className="list-unstyled categories-list">
                  {categories &&
                    categories.map((category) => {
                      return (
                        <li key={category.id}>
                          <CustomInput
                            type="radio"
                            id={category.id}
                            label={category.title}
                            name="category-radio"
                            defaultChecked={category.defaultChecked}
                            onChange={() => {
                              if (id) {
                                dispatch(
                                  getProducts(
                                    { id },
                                    {
                                      ...deleteParams(),
                                      "_where[0][category.label_in]":
                                        category.title,
                                    }
                                  )
                                );
                              } else {
                                dispatch(
                                  getProducts({
                                    ...deleteParams(),
                                    "_where[0][category.label_in]":
                                      category.title,
                                  })
                                );
                              }
                            }}
                          />
                        </li>
                      );
                    })}
                </ul>
              </div>
              {!id && (
                <div className="brands">
                  <h6 className="filter-title">Tiendas</h6>
                  <ul className="list-unstyled brand-list">
                    {brands &&
                      brands.map((brand) => {
                        return (
                          <li key={brand}>
                            <CustomInput
                              name="brand-range-radio"
                              type="radio"
                              id={brand}
                              label={brand}
                              onChange={() => {
                                if (id) {
                                  dispatch(
                                    getProducts(
                                      { id },
                                      {
                                        ...deleteParams(),
                                        "_where[0][brand.companyName_in]":
                                          brand,
                                      }
                                    )
                                  );
                                } else {
                                  dispatch(
                                    getProducts({
                                      ...deleteParams(),
                                      "_where[0][brand.companyName_in]": brand,
                                    })
                                  );
                                }
                              }}
                            />
                          </li>
                        );
                      })}
                  </ul>
                </div>
              )}
              {/* <div id="ratings">
                <h6 className="filter-title">Ratings</h6>
                {ratings.map((item) => {
                  return (
                    <div key={item.total} className="ratings-list">
                      <a href="/" onClick={(e) => e.preventDefault()}>
                        <ul className="unstyled-list list-inline">
                          {new Array(5).fill().map((listItem, index) => {
                            return (
                              <li
                                key={index}
                                className="ratings-list-item mr-25"
                              >
                                <Star
                                  className={classnames({
                                    "filled-star": index + 1 <= item.ratings,
                                    "unfilled-star": index + 1 > item.ratings,
                                  })}
                                />
                              </li>
                            );
                          })}
                          <li>& up</li>
                        </ul>
                      </a>
                      <div className="stars-received">{item.total}</div>
                    </div>
                  );
                })}
              </div> */}
              <div id="clear-filters">
                <Button.Ripple
                  color="primary"
                  onClick={() => {
                    if (id) {
                      dispatch(
                        getProducts(
                          { id },
                          {
                            ...deleteParams(),
                          }
                        )
                      );
                    } else {
                      dispatch(
                        getProducts({
                          ...deleteParams(),
                        })
                      );
                    }
                  }}
                  block
                >
                  Borrar todos los filtros
                </Button.Ripple>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
