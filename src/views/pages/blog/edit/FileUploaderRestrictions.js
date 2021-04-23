import { useState } from "react";
import Uppy from "@uppy/core";
import { DragDrop } from "@uppy/react";
import thumbnailGenerator from "@uppy/thumbnail-generator";
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  CardText,
  Button,
  Row,
  Col,
} from "reactstrap";

const FileUploaderRestrictions = () => {
  const [previewArr, setPreviewArr] = useState([]);
  const [files, setFiles] = useState([]);

  const uppy = new Uppy({
    meta: { type: "avatar" },
    autoProceed: true,
    restrictions: { maxNumberOfFiles: 8, allowedFileTypes: ["image/*"] },
  });

  uppy.use(thumbnailGenerator);

  uppy.on("thumbnail:generated", (file, preview) => {
    const arr = previewArr;
    arr.push(preview);
    setPreviewArr([...arr]);
    setFiles([...files, file]);
  });

  const renderPreview = () => {
    if (previewArr.length) {
      return previewArr.map((src, index) => (
        <Col md="4" lg="3">
          {/* <img className="rounded mt-2 mr-1" /> */}
          <Card key={index} className="text-center mb-3">
            <img key={src} className="img-fluid" src={src} alt="avatar" />
            <CardBody>
              <Button.Ripple
                key={index + 1}
                color="flat-danger"
                onClick={(e) => {
                  setPreviewArr(
                    previewArr.filter((preview) => preview !== src)
                  );
                  setFiles(
                    files.filter((file) => {
                      return file.preview !== src;
                    })
                  );
                }}
              >
                Borrar
              </Button.Ripple>
            </CardBody>
          </Card>
        </Col>
      ));
    } else {
      return null;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle tag="h4"> Subir Imagenes</CardTitle>
      </CardHeader>
      <CardBody>
        <CardText>
          Use prop <code>restrictions</code> add upload restrictions like{" "}
          <code>maxNumberOfFiles</code> &<code>allowedFileTypes</code>. Refer
          this{" "}
          <a
            href="https://uppy.io/docs/uppy/#restrictions"
            target="_blank"
            rel="noopener noreferrer"
          >
            link
          </a>{" "}
          for more info.
        </CardText>
        <DragDrop uppy={uppy} />
        {JSON.stringify(files)}
        <Row>{renderPreview()}</Row>
      </CardBody>
    </Card>
  );
};

export default FileUploaderRestrictions;
