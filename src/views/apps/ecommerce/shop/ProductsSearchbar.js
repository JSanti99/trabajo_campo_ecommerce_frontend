// ** Third Party Components
import { Search } from "react-feather";
import {
  Row,
  Col,
  InputGroup,
  InputGroupAddon,
  Input,
  InputGroupText,
} from "reactstrap";

const ProductsSearchbar = (props) => {
  // ** Props
  const { dispatch, getProducts, id, store } = props;

  return (
    <div id="ecommerce-searchbar" className="ecommerce-searchbar">
      <Row className="mt-1">
        <Col sm="12">
          <InputGroup className="input-group-merge">
            <Input
              className="search-product"
              placeholder="Search Product"
              onChange={(e) => {
                if (id) {
                  dispatch(
                    getProducts(
                      { id },
                      {
                        "_where[0][name_contains]": e.target.value,
                      }
                    )
                  );
                } else {
                  dispatch(
                    getProducts({
                      "_where[0][name_contains]": e.target.value,
                    })
                  );
                }
              }}
            />
            <InputGroupAddon addonType="append">
              <InputGroupText>
                <Search className="text-muted" size={14} />
              </InputGroupText>
            </InputGroupAddon>
          </InputGroup>
        </Col>
      </Row>
    </div>
  );
};

export default ProductsSearchbar;
