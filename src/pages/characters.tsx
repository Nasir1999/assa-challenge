import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, NavLink } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'

const Characters = () => {
  const [userData, setUserData] = useState([]);
  const [page, setPage] = useState(1);
  const [filteredStatus, setFilteredStatus] = useState("");
  const [totalPages, setTotalPages] = useState(1);

  let api = `https://rickandmortyapi.com/api/character/?page=${page}`;
  if (filteredStatus) {
    api += `&status=${filteredStatus}`;
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(api);
        setUserData(response.data.results);
        setTotalPages(response.data.info.pages);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, [api, page]);

  const handleFilterStatus = (status: any) => {
    setFilteredStatus(status);
  };

  return (
    <>
      <div className="main-div ">
        <nav className="navbar ">
          <div className="container justify-content-center">
            <NavLink className="navbar-brand" to="/">
              <div className="logo-container ">
                <img src="/rickmorty.svg" alt="rick and morty" width="150" />
              </div>
            </NavLink>
          </div>
        </nav>

        <div className="container">
          <div className="row">
            <div className="col-12 mt-3">
              <p className="p-text">Filter by status:</p>
              <div className="">
                <button
                  type="button"
                  className={`btn-active ${
                    filteredStatus === "Alive" ? "active" : ""
                  }`}
                  onClick={() => handleFilterStatus("Alive")}
                >
                  <div className="status-icon-g"></div>
                  Alive
                </button>
                <button
                  type="button"
                  className={`btn-dead ${
                    filteredStatus === "Dead" ? "active" : ""
                  }`}
                  onClick={() => handleFilterStatus("Dead")}
                >
                  <div className="status-icon-r "></div>
                  Dead
                </button>
                <button
                  type="button"
                  className={`btn-unkwn ${
                    filteredStatus === "unknown" ? "active" : ""
                  }`}
                  onClick={() => handleFilterStatus("unknown")}
                >
                  <div className="status-icon-unkwn"></div>
                  Unknown
                </button>
              </div>
            </div>
          </div>

          <div className="row">
            {userData.length > 0
              ? userData.map((x) => {
                  let { id, name, image, status, species } = x;

                  return (
                    <div className="col-12 col-md-3 mt-5" key={id}>
                      <div className="d-flex flex-column">
                        <Link to={`../character/${id}`} className="image">
                          <img
                            src={image}
                            className="img-fluid rounded"
                            width="200"
                            alt="img"
                          />
                        </Link>
                        <div className="mt-3">
                          <h6 className="truncate">{name}</h6>
                          <div>
                            <div
                              className={
                                status === "Dead"
                                  ? "status-icon-r"
                                  : status === "Alive"
                                  ? "status-icon-g"
                                  : "status-icon-unkwn"
                              }
                            ></div>
                            <span className="mb-5">{status}</span>-
                            <span>{species}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              : Array.from({ length: 20 }).map((_, index) => (
                  <div className="col-12 col-md-3 mt-5" key={index}>
                    <Skeleton height={200} />
                    <Skeleton count={2} />
                  </div>
                ))}
          </div>
          <Stack spacing={2} mt="120px" alignItems="center">
            <Pagination
              className="pagination"
              count={totalPages}
              page={page}
              onChange={(event, value) => setPage(value)}
              size="large"
            />
          </Stack>
        </div>
      </div>
    </>
  );
};

export default Characters;
