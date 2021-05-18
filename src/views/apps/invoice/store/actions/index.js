import axios from "axios";

// ** Get data
export const getData = (params) => {
  console.log({ params });
  return (dispatch) => {
    axios.get("http://localhost:1337/facturas", { params }).then((response) => {
      console.log({ response });
      dispatch({
        type: "GET_DATA",
        allData: response.data.allData,
        data: response.data.invoices,
        totalPages: response.data.total,
        params,
      });
    });
  };
};

// ** Delete Invoice
export const deleteInvoice = (id) => {
  return (dispatch, getStore) => {
    axios
      .delete("/apps/invoice/delete", { id })
      .then((response) => {
        dispatch({
          type: "DELETE_INVOICE",
        });
      })
      .then(() => dispatch(getData(getStore().invoice.params)));
  };
};
