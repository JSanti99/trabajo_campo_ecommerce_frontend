// ** React Imports
import { Fragment } from "react";

// ** Product components
import ProductCards from "./ProductCards";
import ProductsHeader from "./ProductsHeader";
import ProductsSearchbar from "./ProductsSearchbar";

// ** Third Party Components
import classnames from "classnames";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";
import { _limit } from "../../../../utility/Utils";

const ProductsPage = (props) => {
  // ** Props
  const {
    activeView,
    setActiveView,
    store,
    sidebarOpen,
    id,
    getProducts,
    dispatch,
    addToCart,
    addToWishlist,
    getCartItems,
    deleteWishlistItem,
    deleteCartItem,
    setSidebarOpen,
  } = props;

  // ** Handles pagination
  const handlePageChange = (val) => {
    if (val === "next") {
      if (id) {
        dispatch(
          getProducts(
            { id },
            { ...store.params, _start: store.params._start + _limit }
          )
        );
      } else {
        dispatch(
          getProducts({ ...store.params, _start: store.params._start + _limit })
        );
      }
    } else if (val === "prev") {
      if (id) {
        dispatch(
          getProducts(
            { id },
            { ...store.params, _start: store.params._start - _limit }
          )
        );
      } else {
        dispatch(
          getProducts({ ...store.params, _start: store.params._start - _limit })
        );
      }
    } else {
      if (id) {
        dispatch(getProducts({ id }, { ...store.params, _start: val }));
      } else {
        dispatch(getProducts({ ...store.params, _start: val }));
      }
    }
  };

  // ** Render pages
  const renderPageItems = () => {
    const arrLength =
      store.totalProducts !== 0 && store.products.length !== 0
        ? Number(store.totalProducts) / store.products.length
        : 3;
    return new Array(Math.ceil(arrLength)).fill().map((item, index) => {
      return (
        <PaginationItem
          key={index}
          active={store.params._start === index + _limit}
          onClick={() => handlePageChange(index + _limit)}
        >
          <PaginationLink href="/" onClick={(e) => e.preventDefault()}>
            {index + 1}
          </PaginationLink>
        </PaginationItem>
      );
    });
  };

  // ** handle next page click
  const handleNext = () => {
    if (
      store.params._start !==
      Number(store.totalProducts) / store.products.length
    ) {
      handlePageChange("next");
    }
  };

  const handlePrev = () => {
    if (store.params._start > 1) {
      handlePageChange("prev");
    }
  };

  return (
    <div className="content-detached content-right">
      <div className="content-body">
        <ProductsHeader
          store={store}
          dispatch={dispatch}
          activeView={activeView}
          getProducts={getProducts}
          setActiveView={setActiveView}
          setSidebarOpen={setSidebarOpen}
        />
        <div
          className={classnames("body-content-overlay", {
            show: sidebarOpen,
          })}
          onClick={() => setSidebarOpen(false)}
        ></div>
        <ProductsSearchbar
          id={id}
          dispatch={dispatch}
          getProducts={getProducts}
          store={store}
        />
        {store.products.length ? (
          <Fragment>
            <ProductCards
              store={store}
              dispatch={dispatch}
              addToCart={addToCart}
              activeView={activeView}
              products={store.products}
              getProducts={getProducts}
              getCartItems={getCartItems}
              addToWishlist={addToWishlist}
              deleteCartItem={deleteCartItem}
              deleteWishlistItem={deleteWishlistItem}
            />
            <Pagination className="d-flex justify-content-center">
              <PaginationItem
                className="prev-item"
                onClick={() => handlePrev()}
                disabled={store.params._start <= 0}
              >
                <PaginationLink
                  href="/"
                  onClick={(e) => e.preventDefault()}
                ></PaginationLink>
              </PaginationItem>
              {renderPageItems()}
              <PaginationItem
                className="next-item"
                onClick={() => handleNext()}
                disabled={
                  store.params._start ===
                  Number(store.totalProducts) / store.products.length
                }
              >
                <PaginationLink
                  href="/"
                  onClick={(e) => e.preventDefault()}
                ></PaginationLink>
              </PaginationItem>
            </Pagination>
          </Fragment>
        ) : (
          <div className="d-flex justify-content-center mt-2">
            <p>No Results</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;
