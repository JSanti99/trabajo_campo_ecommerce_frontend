import axios from "axios";

// ** Get all Data
export const getAllData = () => {
  return async (dispatch) => {
    await axios.get("/api/users/list/all-data").then((response) => {
      dispatch({
        type: "GET_ALL_DATA",
        data: response.data,
      });
    });
  };
};

// ** Get data on page or row change
export const getData = (params) => {
  return async (dispatch) => {
    await axios.get("/api/users/list/data", params).then((response) => {
      dispatch({
        type: "GET_DATA",
        data: response.data.users,
        totalPages: response.data.total,
        params,
      });
    });
  };
};

// ** Get User
export const getUser = () => {
  return async (dispatch) => {
    await axios
      .get("http://localhost:1337/users/me")
      .then((response) => {
        console.log(response.data);
        if (response.data.tienda) {
          response.data.brand = response.data.tienda.companyName;
        }

        dispatch({
          type: "GET_USER",
          selectedUser: response.data,
        });
      })
      .catch((err) => console.log(err));
  };
};

// ** Add new user
export const addUser = (user) => {
  return (dispatch, getState) => {
    axios
      .post("/apps/users/add-user", user)
      .then((response) => {
        dispatch({
          type: "ADD_USER",
          user,
        });
      })
      .then(() => {
        dispatch(getData(getState().users.params));
        dispatch(getAllData());
      })
      .catch((err) => console.log(err));
  };
};

// ** Delete user
export const deleteUser = (id) => {
  return (dispatch, getState) => {
    axios
      .delete("/apps/users/delete", { id })
      .then((response) => {
        dispatch({
          type: "DELETE_USER",
        });
      })
      .then(() => {
        dispatch(getData(getState().users.params));
        dispatch(getAllData());
      });
  };
};
