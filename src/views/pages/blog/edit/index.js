import React, { useState, useEffect } from "react";
import axios from "axios";
import { v4 } from "uuid";

import Select from "react-select";
import { selectThemeColors } from "@utils";
import Avatar from "@components/avatar";
import Breadcrumbs from "@components/breadcrumbs";
import {
  Row,
  Col,
  Card,
  CardBody,
  CardText,
  Media,
  Form,
  Label,
  Input,
  FormGroup,
  CustomInput,
  Button,
} from "reactstrap";
import { X, Plus } from "react-feather";

import { isUserLoggedIn } from "@utils";

import "@styles/react/libs/react-select/_react-select.scss";
import "@styles/base/pages/page-blog.scss";
import "uppy/dist/uppy.css";

import { useForm, useFieldArray, Controller, useWatch } from "react-hook-form";

const BlogEdit = () => {
  const { register, control, handleSubmit, reset, watch, getValues } = useForm({
    defaultValues: {
      title: "asd",
      variations: [{ measures: [{ value: "XS", label: "XS" }] }],
      featuredImg: "",
      category: {},
      slug: "",
    },
  });
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control,
      name: "variations",
    }
  );

  const onSubmit = (data) => console.log("data", data);

  const sizes = [
    { value: "XS", label: "XS" },
    { value: "S", label: "S" },
    { value: "M", label: "M" },
    { value: "L", label: "L" },
  ];

  const [userData, setUserData] = useState(null);
  const [auxFeaturedImg, setAuxFeaturedImg] = useState(null);
  const [category, setCategory] = useState([]);

  useEffect(() => {
    axios.get("/blog/list/data/edit").then((res) => {
      setAuxFeaturedImg(res.data.featuredImage);
    });

    axios.get("http://localhost:1337/category").then((res) => {
      setCategory(res.data);
    });

    if (isUserLoggedIn() !== null) {
      setUserData(JSON.parse(localStorage.getItem("userData")));
    }
  }, []);

  const handleImg = (e) => {
    console.log({ a: e.target.files[0] });
    var file = e.target.files[0];
    var reader = new FileReader();

    reader.onloadend = function () {
      setAuxFeaturedImg(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    } else {
      setAuxFeaturedImg("");
    }
  };

  const handleTitle = (e) => {
    console.log("a", e.target.value);
    if (e.target.value) {
      console.log({ values: getValues() });
      reset({
        ...getValues(),
        slug: e.target.value
          .toString()
          .toLowerCase()
          .replace(/\s+/g, "-") // Replace spaces with -
          .replace(/[^\w\-]+/g, "") // Remove all non-word chars
          .replace(/\-\-+/g, "-") // Replace multiple - with single -
          .replace(/^-+/, "") // Trim - from start of text
          .replace(/-+$/, ""), // Trim - from end of text)
      });
    }
  };

  return (
    <div className="blog-edit-wrapper">
      <Breadcrumbs
        breadCrumbTitle="Crear Producto"
        breadCrumbParent="Pages"
        breadCrumbParent2="Producto"
        breadCrumbActive="Crear"
      />
      <Row>
        <Col sm="12">
          <Card>
            <CardBody>
              {userData ? (
                <Media>
                  <Avatar
                    className="mr-75"
                    img={
                      userData.userImg
                        ? `http://localhost:1337${userData.userImg.url}`
                        : ""
                    }
                    width="38"
                    height="38"
                  />
                  <Media body>
                    <h6 className="mb-25">{userData.username}</h6>
                    <CardText>
                      {new Date().toJSON().slice(0, 10).replace(/-/g, "/")}
                    </CardText>
                  </Media>
                </Media>
              ) : null}
              <form onSubmit={handleSubmit(onSubmit)}>
                <Row>
                  <Col className="mb-2" sm="12">
                    <div className="border rounded p-2">
                      <h4 className="mb-1">Imagen destacada</h4>
                      <Media className="flex-column flex-md-row">
                        <img
                          className="rounded mr-2 mb-1 mb-md-0"
                          src={auxFeaturedImg}
                          alt="featured img"
                          style={{ objectFit: "contain" }}
                          height="110"
                        />
                        <Media body>
                          <small className="text-muted">
                            Resolución requerida de la imagen 800x400, tamaño de
                            la imagen 10mb.
                          </small>

                          <p className="my-50">
                            <a href="/" onClick={(e) => e.preventDefault()}>
                              {`C:/fakepath/`}
                            </a>
                          </p>
                          <div className="d-inline-block">
                            <Controller
                              control={control}
                              name={"featuredImg"}
                              render={({
                                onChange,
                                onBlur,
                                value,
                                name,
                                ref,
                              }) => (
                                <CustomInput
                                  onChange={handleImg}
                                  checked={value}
                                  inputref={ref}
                                  type="file"
                                  id="exampleCustomFileBrowser"
                                  accept=".jpg, .png, .gif"
                                />
                              )}
                            />
                          </div>
                        </Media>
                        {/* <input
                          onChange={handleImg}
                          type="file"
                          name="featuredImg"
                          ref={register}
                        /> */}
                      </Media>
                    </div>
                  </Col>
                  <Col md="6">
                    <Label for="title">Nombre Producto</Label>
                    <Controller
                      control={control}
                      name={`title`}
                      defaultValue={"title"}
                      render={({ onChange, onBlur, value, ref }) => (
                        <Input id="title" onChange={handleTitle} />
                      )}
                    />
                  </Col>
                  <Col md="6">
                    <FormGroup className="mb-2">
                      <Label for="category">Categoria</Label>
                      <Controller
                        id="category"
                        as={Select}
                        control={control}
                        isClearable={false}
                        theme={selectThemeColors}
                        options={category}
                        className="react-select"
                        classNamePrefix="select"
                        name={"category"}
                      />
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <Label for="slug">Slug</Label>
                    <Controller control={control} name={`slug`} as={Input} />
                  </Col>
                  <Col>
                    {fields.map((item, index) => {
                      return (
                        <Row
                          key={item.id}
                          className="justify-content-between align-items-center"
                        >
                          <Col md={4}>
                            <Label for={`size-${index}`}>Tallas</Label>
                            <Controller
                              as={Select}
                              control={control}
                              options={sizes}
                              name={`variations[${index}].measures`}
                              defaultValue={fields[index].measures[0].value}
                              isMulti
                              theme={selectThemeColors}
                              className="react-select"
                              classNamePrefix="select"
                            />
                          </Col>

                          <Col md={2}>
                            <Button
                              color="danger"
                              className="text-nowrap px-1"
                              outline
                              onClick={() => remove(index)}
                            >
                              <X size={14} className="mr-50" />
                              <span>Delete</span>
                            </Button>
                          </Col>
                        </Row>
                      );
                    })}
                  </Col>
                </Row>
                <section>
                  <Button.Ripple
                    type="button"
                    className="btn-icon"
                    color="primary"
                    onClick={() => {
                      append({ measures: [{ label: "M", value: "M" }] });
                    }}
                  >
                    <Plus size={14} />
                    <span className="align-middle ml-25">Agregar Variedad</span>
                  </Button.Ripple>
                </section>

                <input type="submit" />
              </form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};
export default BlogEdit;
