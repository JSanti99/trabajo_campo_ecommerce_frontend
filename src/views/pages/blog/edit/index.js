import React, { useState, useEffect } from "react";
import axios from "axios";

import { Editor } from "react-draft-wysiwyg";
import Select from "react-select";
import { selectThemeColors } from "@utils";
import Avatar from "@components/avatar";
import Breadcrumbs from "@components/breadcrumbs";
import Uppy from "@uppy/core";
import { DragDrop } from "@uppy/react";
import thumbnailGenerator from "@uppy/thumbnail-generator";

import {
  Row,
  Col,
  Card,
  CardBody,
  CardText,
  Media,
  Label,
  Input,
  FormGroup,
  CustomInput,
  Button,
} from "reactstrap";
import { X, Plus } from "react-feather";

import { isUserLoggedIn } from "@utils";

import "@styles/react/libs/editor/editor.scss";
import "@styles/base/plugins/forms/form-quill-editor.scss";
import "@styles/react/libs/react-select/_react-select.scss";
import "@styles/base/pages/page-blog.scss";
import "uppy/dist/uppy.css";

import "@uppy/status-bar/dist/style.css";
import "@styles/react/libs/file-uploader/file-uploader.scss";
import "react-slidedown/lib/slidedown.css";

import { useForm, useFieldArray, Controller, useWatch } from "react-hook-form";

const BlogEdit = () => {
  const {
    register,
    control,
    handleSubmit,
    reset,
    watch,
    getValues,
    setValue,
  } = useForm({
    defaultValues: {
      title: "",
      variations: [
        {
          sizes: { value: "XS", label: "XS" },
          measures: "",
          status: null,
          stock: null,
          price: 0,
          estado: null,
        },
      ],
      featuredImg: null,
      category: null,
      gender: null,
      slug: "",
      code: null,
      files: [],
      editor: "",
    },
  });
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control,
      name: "variations",
    }
  );

  const sizes = [
    { value: "XS", label: "XS" },
    { value: "S", label: "S" },
    { value: "M", label: "M" },
    { value: "L", label: "L" },
  ];

  const genres = [
    { value: "hombre", label: "Hombre" },
    { value: "mujer", label: "Mujer" },
  ];

  const statusOps = [
    { value: "instock", label: "En Stock" },
    { value: "outstock", label: "Fuera de Stock" },
  ];

  const [userData, setUserData] = useState(null),
    [auxFeaturedImg, setAuxFeaturedImg] = useState(null),
    [featuredImg, setFeaturedImg] = useState(null),
    [category, setCategory] = useState([]),
    [previewArr, setPreviewArr] = useState([]);

  let files = [];

  let fileAux;

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
    var file = e.target.files[0];
    fileAux = file;
    setFeaturedImg(file);
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
    if (e.target.value) {
      let title = e.target.value;
      setValue("title", title);
      setValue(
        "slug",
        e.target.value
          .toString()
          .toLowerCase()
          .replace(/\s+/g, "-") // Replace spaces with -
          .replace(/[^\w\-]+/g, "") // Remove all non-word chars
          .replace(/\-\-+/g, "-") // Replace multiple - with single -
          .replace(/^-+/, "") // Trim - from start of text
          .replace(/-+$/, "")
      ); // Trim - from end of text)));
    }
  };

  const handleCode = (e) => {
    if (e.target.value) {
      let code = e.target.value;
      setValue("code", code);
    }
  };

  const renderPreview = () => {
    if (previewArr.length) {
      return previewArr.map((src, index) => (
        <img
          key={index}
          style={{ height: "250px" }}
          className="rounded mt-2 mr-1"
          src={src}
          alt="avatar"
        />
      ));
    } else {
      return null;
    }
  };

  const handleDeleteImages = () => {
    files = [];
    setValue("files", []);
    setPreviewArr([]);
  };

  const onSubmit = async (data) => {
    let variationsAux = [];

    data.variations.map((variation) => {
      variationsAux.push({
        talla: variation.sizes.value,
        medidas: variation.measures,
        precio: Number(variation.price),
        stock: variation.stock,
      });
    });

    let images = await Promise.all(
      data.files.map(async (files) => {
        let formData = new FormData();
        formData.append("files", files.data);
        const image = await axios.post(
          "http://localhost:1337/upload",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        return image.data[0];
      })
    );

    let formData = new FormData();
    formData.append("files", featuredImg);
    const image = await axios.post("http://localhost:1337/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    const producto = {
      name: data.title,
      category: data.category,
      description: data.editor,
      genero: data.gender.value === "hombre" ? "H" : "M",
      codigo: data.code,
      slug: data.slug,
      hasFreeShipping: true,
      variedades: variationsAux,
      image: image.data,
      images,
    };

    await axios
      .post("http://localhost:1337/productos", producto)
      .then((res) => {
        console.log(res);
      });
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
                  <Col md="6">
                    <Label for="title">Nombre Producto</Label>
                    <Controller
                      control={control}
                      name={"title"}
                      render={(field) => (
                        <Input
                          {...field}
                          onChange={(e) => {
                            handleTitle(e);
                            return field.onChange(e);
                          }}
                        />
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
                  <Col md="4">
                    <Label for="slug">Slug</Label>
                    <Controller
                      control={control}
                      name={`slug`}
                      as={Input}
                      readOnly
                    />
                  </Col>

                  <Col md="4">
                    <Label for="code">Codigo Articulo</Label>

                    <Controller
                      control={control}
                      name={"code"}
                      render={(field) => (
                        <Input
                          {...field}
                          onChange={(e) => {
                            handleCode(e);
                            return field.onChange(e);
                          }}
                        />
                      )}
                    />
                  </Col>

                  <Col md="4">
                    <Label for="gender">Genero</Label>
                    <Controller
                      id="gender"
                      as={Select}
                      control={control}
                      isClearable={false}
                      theme={selectThemeColors}
                      options={genres}
                      className="react-select"
                      classNamePrefix="select"
                      name={"gender"}
                    />
                  </Col>
                  <Col sm={12}>
                    <br />
                    <br />
                  </Col>
                  <Col>
                    <h4>Variedades Producto</h4>
                    {fields.map((item, index) => {
                      return (
                        <Row
                          key={item.id}
                          className="justify-content-between align-items-center"
                        >
                          <Col md={2}>
                            <Label for={`size-${index}`}>Tallas</Label>
                            <Controller
                              as={Select}
                              control={control}
                              options={sizes}
                              name={`variations[${index}].sizes`}
                              theme={selectThemeColors}
                              className="react-select"
                              classNamePrefix="select"
                            />
                          </Col>

                          <Col md={2}>
                            <Label for={`measures`}>Medidas</Label>
                            <Controller
                              as={Input}
                              control={control}
                              name={`variations[${index}].measures`}
                              id={`measures`}
                            />
                          </Col>
                          <Col md={2}>
                            <Label for={`price`}>Precio </Label>
                            <Controller
                              as={Input}
                              type="number"
                              control={control}
                              name={`variations[${index}].price`}
                              id={`price`}
                            />
                          </Col>
                          <Col md={2}>
                            <Label for={`status`}>Estado</Label>
                            <Controller
                              id="status"
                              as={Select}
                              control={control}
                              isClearable={false}
                              theme={selectThemeColors}
                              options={statusOps}
                              className="react-select"
                              classNamePrefix="select"
                              name={`variations[${index}].status`}
                            />
                          </Col>

                          <Col md={2}>
                            <Label for={`stock`}>Cantidad Producto</Label>
                            <Controller
                              as={Input}
                              type="number"
                              control={control}
                              name={`variations[${index}].stock`}
                              id={`stock`}
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
                          <Col sm={12}>
                            <hr />
                          </Col>
                        </Row>
                      );
                    })}
                    <section>
                      <Button.Ripple
                        type="button"
                        className="btn-icon"
                        color="primary"
                        onClick={() => {
                          append({
                            sizes: { label: "XS", value: "XS" },
                            measures: "",
                          });
                        }}
                      >
                        <Plus size={14} />
                        <span className="align-middle ml-25">
                          Agregar Variedad
                        </span>
                      </Button.Ripple>
                    </section>
                  </Col>
                  <Col sm={12}>
                    <hr />
                  </Col>
                  <Col sm="12">
                    <h4 className="card-title">Descripción del Producto</h4>

                    <Controller
                      control={control}
                      name={"editor"}
                      defaultValue=""
                      render={({ value, ref }) => (
                        <Editor
                          onEditorStateChange={(data) =>
                            setValue(
                              "editor",
                              data.getCurrentContent().getPlainText()
                            )
                          }
                        />
                      )}
                    />
                  </Col>
                  <Col sm={12}>
                    <hr />
                  </Col>
                  <Col className="mb-2" sm="6">
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
                            <input
                              onChange={handleImg}
                              type="file"
                              name="featuredImg"
                              ref={register}
                            />
                            {/* <Controller
                              control={control}
                              name={"featuredImg"}
                              render={({ value, ref }) => (
                                <CustomInput
                                  onChange={handleImg}
                                  checked={value}
                                  inputref={ref}
                                  type="file"
                                  id="exampleCustomFileBrowser"
                                  accept=".jpg, .png, .gif"
                                />
                              )}
                            /> */}
                          </div>
                        </Media>
                      </Media>
                    </div>
                  </Col>

                  <Col sm="6">
                    <Controller
                      control={control}
                      name={"files"}
                      render={({ onChange, onBlur, value, name, ref }) => {
                        const uppy = new Uppy({
                          meta: { type: "avatar" },
                          autoProceed: true,
                          restrictions: {
                            maxNumberOfFiles: 8,
                            allowedFileTypes: ["image/*"],
                          },
                        });

                        uppy.use(thumbnailGenerator);

                        uppy.on("thumbnail:generated", (file, preview) => {
                          const arr = previewArr;
                          arr.push(preview);
                          setPreviewArr([...arr]);

                          files = [...files, file];
                          setValue("files", [...files]);
                        });
                        return (
                          <DragDrop
                            width="100%"
                            height="191px"
                            locale={{
                              strings: {
                                // Text to show on the droppable area.
                                // `%{browse}` is replaced with a link that opens the system file selection dialog.
                                dropHereOr: "Arrastra aquí o %{browse}",
                                // Used as the label for the link that opens the system file selection dialog.
                                browse: "Buscar",
                              },
                            }}
                            uppy={uppy}
                          />
                        );
                      }}
                    />
                  </Col>
                  <Col sm={12}>
                    <hr />
                  </Col>

                  {previewArr.length > 0 ? (
                    <Col sm={12}>
                      <Button.Ripple
                        type="button"
                        color="flat-danger"
                        onClick={handleDeleteImages}
                      >
                        Borrar Imagenes
                      </Button.Ripple>
                    </Col>
                  ) : null}

                  {renderPreview()}
                </Row>
                <Col sm={12}>
                  <hr />
                </Col>
                <Col className="mt-50">
                  <Button.Ripple type="submit" color="primary" className="mr-1">
                    Guardar Producto
                  </Button.Ripple>
                </Col>
              </form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};
export default BlogEdit;
