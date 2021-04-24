import { useState, useEffect } from "react";

// ** Utils
import { isUserLoggedIn } from "@utils";

import axios from "axios";
import Select from "react-select";
import Avatar from "@components/avatar";
import htmlToDraft from "html-to-draftjs";
import { selectThemeColors } from "@utils";
import { Editor } from "react-draft-wysiwyg";
import Breadcrumbs from "@components/breadcrumbs";
import { EditorState, ContentState } from "draft-js";
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

import ProductsFileUploader from "./ProductsFileUploader";
import VariacionesForm from "./Variations";

import "@styles/react/libs/editor/editor.scss";
import "@styles/base/plugins/forms/form-quill-editor.scss";
import "@styles/react/libs/react-select/_react-select.scss";
import "@styles/base/pages/page-blog.scss";

import "uppy/dist/uppy.css";
import "@uppy/status-bar/dist/style.css";
import "@styles/react/libs/file-uploader/file-uploader.scss";
import "react-slidedown/lib/slidedown.css";

const BlogEdit = () => {
  // ** State
  const [userData, setUserData] = useState(null);

  const initialContent = `
  <p>Cupcake ipsum dolor sit. Amet dessert donut candy chocolate bar cotton dessert candy chocolate. Candy muffin danish. Macaroon brownie jelly beans marzipan cheesecake oat cake. Carrot cake macaroon chocolate cake. Jelly brownie jelly. Marzipan pie sweet roll.</p>
  <p>Liquorice dragée cake chupa chups pie cotton candy jujubes bear claw sesame snaps. Fruitcake chupa chups chocolate bonbon lemon drops croissant caramels lemon drops. Candy jelly cake marshmallow jelly beans dragée macaroon. Gummies sugar plum fruitcake. Candy canes candy cupcake caramels cotton candy jujubes fruitcake.</p>
  `;

  const contentBlock = htmlToDraft(initialContent);
  const contentState = ContentState.createFromBlockArray(
    contentBlock.contentBlocks
  );
  const editorState = EditorState.createWithContent(contentState);

  const [title, setTitle] = useState(""),
    [slug, setSlug] = useState(""),
    [categories, setCategories] = useState([]),
    [productCategories, setProductCategories] = useState([]),
    [code, setCode] = useState("AT495AT85UUGCO"),
    [gender, setGender] = useState([
      { value: "hombre", label: "Hombre" },
      { value: "mujer", label: "Mujer" },
    ]),
    [productGenres, setProductGenres] = useState([]),
    [variations, setVariations] = useState([
      {
        stock: 0,
        measures: { value: "XS", label: "XS" },
        productSizes: [],
        status: "",
      },
    ]),
    // [stock, setStock] = useState(0),
    // [status, setStatus] = useState(""),

    [content, setContent] = useState(editorState),
    [featuredImg, setFeaturedImg] = useState(null),
    [imgPath, setImgPath] = useState("banner.jpg"),
    [files, setFiles] = useState([]);

  useEffect(() => {
    axios.get("/blog/list/data/edit").then((res) => {
      setFeaturedImg(res.data.featuredImage);
    });
    setGender();
    axios.get("http://localhost:1337/categorias").then((res) => {
      setCategories(res.data);
    });

    if (isUserLoggedIn() !== null) {
      setUserData(JSON.parse(localStorage.getItem("userData")));
    }
  }, []);

  const onChange = (e) => {
    const reader = new FileReader(),
      files = e.target.files;
    setImgPath(files[0].name);
    reader.onload = function () {
      setFeaturedImg(reader.result);
    };
    reader.readAsDataURL(files[0]);
  };

  const textToSlug = (text) => {
    return text
      .toString()
      .toLowerCase()
      .replace(/\s+/g, "-") // Replace spaces with -
      .replace(/[^\w\-]+/g, "") // Remove all non-word chars
      .replace(/\-\-+/g, "-") // Replace multiple - with single -
      .replace(/^-+/, "") // Trim - from start of text
      .replace(/-+$/, ""); // Trim - from end of text)
  };

  return (
    <div className="blog-edit-wrapper">
      <Breadcrumbs
        breadCrumbTitle="Blog Edit"
        breadCrumbParent="Pages"
        breadCrumbParent2="Blog"
        breadCrumbActive="Edit"
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

              <Form className="mt-2" onSubmit={(e) => e.preventDefault()}>
                <Row>
                  <Col className="mb-2" sm="12">
                    <div className="border rounded p-2">
                      <h4 className="mb-1">Imagen destacada</h4>
                      <Media className="flex-column flex-md-row">
                        <img
                          className="rounded mr-2 mb-1 mb-md-0"
                          src={featuredImg}
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
                              {`C:/fakepath/${imgPath}`}
                            </a>
                          </p>
                          <div className="d-inline-block">
                            <FormGroup className="mb-0">
                              <CustomInput
                                type="file"
                                id="exampleCustomFileBrowser"
                                name="customFile"
                                onChange={onChange}
                                accept=".jpg, .png, .gif"
                              />
                            </FormGroup>
                          </div>
                        </Media>
                      </Media>
                    </div>
                  </Col>

                  <Col md="6">
                    <FormGroup className="mb-2">
                      <Label for="blog-edit-stock">Nombre Producto</Label>
                      <Input
                        id="blog-edit-stock"
                        value={title}
                        onChange={(e) => {
                          setTitle(e.target.value);
                          setSlug(textToSlug(e.target.value));
                        }}
                      />
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup className="mb-2">
                      <Label for="blog-edit-category">Categoria</Label>
                      <Select
                        id="blog-edit-category"
                        isClearable={false}
                        theme={selectThemeColors}
                        value={productCategories}
                        isMulti
                        name="colors"
                        options={categories}
                        className="react-select"
                        classNamePrefix="select"
                        onChange={(data) => setProductCategories(data)}
                      />
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup className="mb-2">
                      <Label for="blog-edit-slug">Slug</Label>
                      <Input
                        id="blog-edit-slug"
                        value={slug}
                        readOnly
                        onChange={(e) => setSlug(e.target.value)}
                      />
                    </FormGroup>
                  </Col>
                  <Col md="3">
                    <FormGroup className="mb-2">
                      <Label for="blog-edit-code">Codigo Articulo</Label>
                      <Input
                        id="blog-edit-code"
                        value={code}
                        onChange={(e) => {
                          setCode(e.target.value);
                        }}
                      />
                    </FormGroup>
                  </Col>

                  <Col md="3">
                    <FormGroup className="mb-2">
                      <Label for="blog-edit-size">Genero</Label>
                      <Select
                        id="blog-edit-size"
                        isClearable={false}
                        theme={selectThemeColors}
                        value={productGenres}
                        name="colors"
                        options={gender}
                        className="react-select"
                        classNamePrefix="select"
                        onChange={(data) => setProductGenres(data)}
                      />
                    </FormGroup>
                  </Col>

                  <Col sm="12">
                    <VariacionesForm
                      variations={variations}
                      setVariations={setVariations}
                      setTitle={setTitle}
                    />
                  </Col>
                  <Col sm="12">
                    <FormGroup className="mb-2">
                      {/* <Label>Descripción</Label> */}
                      <h4 className="card-title">Descripción del Producto</h4>
                      <Editor
                        editorState={content}
                        onEditorStateChange={(data) => setContent(data)}
                      />
                    </FormGroup>
                  </Col>

                  <Col sm="12">
                    <ProductsFileUploader files={files} setFiles={setFiles} />
                  </Col>
                  {JSON.stringify(files)}
                  <Col className="mt-50">
                    <Button.Ripple color="primary" className="mr-1">
                      Save Changes
                    </Button.Ripple>
                    <Button.Ripple color="secondary" outline>
                      Cancel
                    </Button.Ripple>
                  </Col>
                </Row>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default BlogEdit;
