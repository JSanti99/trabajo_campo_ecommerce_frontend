import axios from "axios";
import { endpoint } from "../../../utility/Utils";

export const getProductsTienda = ({ id, params }) => {
  return (dispatch) => {
    return axios
      .get(`${endpoint}/tienda/${id}/products`, { params })
      .then((response) =>
        dispatch({
          type: "GET_TIENDA_PRODUCTS",
          data: response.data,
          params,
        })
      );
  };
};
