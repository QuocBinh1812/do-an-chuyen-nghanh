import {
  Box,
  Container,
  Grid,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useMemo, useState } from "react";
import { useHistory, useLocation } from "react-router";
import queryString from "query-string";
import FilmItem from "./FilmItem";
import { useSnackbar } from "notistack";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getAllFilm } from "../components/filmSlice";
import SideBar from "../components/SideBar";
const useStyles = makeStyles((theme) => ({
  root: {},
  left: {
    width: "250px",
  },

  right: {
    flex: "1 1 0",
  },

  pagination: {
    display: "flex",
    flexFlow: "row nowrap",
    justifyContent: "center",
    padding: "30px 0 20px",
  },
  usertitle: {},
}));

function FilmListPage(props) {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  const [Film, setFilm] = useState({
    tenphim: "",
    mota: "",
    theloai: "",
    hinhanh: null,
  });
  let dataList = [];
  useEffect(() => {
    (async () => {
      try {
        dispatch(getAllFilm());
        console.log(dataList);
        //console.log(`data: ${data} paganation ${pagination}`);
      } catch (error) {
        console.log("Failed to fetch product list: ", error);
      }
    })();
    setLoading(false);
  }, []);
  //   const list = useSelector((state) => {
  //     return state.user?.userList;
  //   });
  //   //console.log("list: ", list);
  const handleSubmit = (event) => {
    //event.preventDefault();
    let formData = new FormData();
    const token = localStorage.getItem("token");

    Object.keys(Film).forEach((key) => {
      formData.append(key, Film[key]);
    });
    console.log(Film.tenphim);
    console.log("token", token);
    console.log("form data", formData);
    axios
      .post("http://localhost:7000/api/movies/", formData, {
        headers: {
          "Content-type": "multipart/form-data",
          token: `${JSON.parse(localStorage.getItem("token"))}`,
        },
      })
      .then((res) => {
        enqueueSnackbar("th??m th??nh c??ng", { variant: "success" });
        console.log(`Success` + res.data);
      })
      .catch((err) => {
        enqueueSnackbar("th???t b???i ", { variant: "error" });
        console.log(err);
      });
  };

  function handleChange(event) {
    const { name, value } = event.target;
    setFilm({
      ...Film, // ????? ????? thu???c t??nh
      [name]: value,
    });
    console.log(Film);
  }
  const handleImagePreview = (e) => {
    let image_as_files = e.target.files[0];
    const { name } = e.target;
    setFilm({
      ...Film,
      [name]: image_as_files,
    });
  };
  return (
    <>
      <SideBar />
      <div className="page-content p-5" id="content">
        <div className="separator" />
        <div className="row text-gray">
          <div className="col-12">
            <h1>Qu???n l?? Phim</h1>
            <button
              type="button"
              class="btn btn-primary"
              data-toggle="modal"
              data-target="#staticBackdrop"
            >
              Th??m
            </button>
            <table class="table">
              <thead class="thead-dark">
                <tr>
                  {/* <th scope="col">id</th> */}
                  <th scope="col">T??n phim</th>
                  <th scope="col">m?? t???</th>
                  <th scope="col">th??? lo???i</th>
                  <th scope="col">h??nh ???nh</th>
                  <th scope="col">control</th>
                </tr>
              </thead>
              {<FilmItem />}
            </table>
            <div
              className="modal fade"
              id="staticBackdrop"
              data-backdrop="static"
              data-keyboard="false"
              tabIndex={-1}
              aria-labelledby="staticBackdropLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="staticBackdropLabel">
                      th??m phim
                    </h5>
                    <button
                      type="button"
                      className="close"
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">??</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    <form noValidate onSubmit={handleSubmit}>
                      <div className="form-group">
                        <label htmlFor="exampleInputEmail1">t??n phim</label>
                        <input
                          type="text"
                          name="tenphim"
                          onChange={handleChange}
                          className="form-control"
                          id="exampleInputEmail1"
                          aria-describedby="emailHelp"
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="exampleInputEmail1">m?? t???</label>
                        <input
                          type="text"
                          name="mota"
                          className="form-control"
                          onChange={handleChange}
                          id="exampleInputEmail1"
                          aria-describedby="emailHelp"
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="exampleInputEmail1">h??nh ???nh</label>
                        <input
                          type="file"
                          onChange={handleImagePreview}
                          name="hinhanh"
                          className="form-control"
                          id="exampleInputEmail1"
                          aria-describedby="emailHelp"
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Th??? lo???i</label>
                        <input
                          type="text"
                          name="theloai"
                          onChange={handleChange}
                          className="form-control"
                          id="exampleInputPassword1"
                        />
                      </div>

                      <button type="submit" className="btn btn-primary">
                        Th??m
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default FilmListPage;
