import React, { useEffect, useState } from "react";
import { useParams, NavLink, Link } from "react-router-dom";
import axios from "axios";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'

interface UserData {
  id: number;
  name: string;
  image: string;
  status: string;
  gender: string;
  species: string;
  location: {
    name: string;
  };
}

interface CharacterData {
  id: number;
  name: string;
  image: string;
  gender: string;
  status: string;
  species: string;
}

const Detail: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const [userData, setUserData] = useState<UserData | null>(null);
  const [otherCharacters, setOtherCharacters] = useState<CharacterData[]>([]);
  const [loading, setLoading] = useState(true); // Add loading state

  let { name, image, status, gender, species, location } = userData || {};

  let api = `https://rickandmortyapi.com/api/character/${id}`;
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get<UserData>(api);
        setUserData(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false); // Update loading state once data is fetched
      }
    }
    fetchData();
  }, [api]);

  useEffect(() => {
    async function fetchOtherCharacters() {
      try {
        const response = await axios.get<CharacterData[]>(
          "https://rickandmortyapi.com/api/character"
        );
        // @ts-ignore
        setOtherCharacters(response.data.results);
      } catch (error) {
        console.error(error);
      }
    }
    fetchOtherCharacters();
  }, []);

  if (loading) {
    // Render skeleton loaders while data is being fetched
    return (
      <div className="container text-center p-3">
        <Skeleton height={400} width={300} />
        <Skeleton count={4} height={30} width={200} />
      </div>
    );
  }
  return (
    <>
      <div className="container text-center p-3">
        <nav className="navbar">
          <div className="container justify-content-center">
            <NavLink className="navbar-brand" to="/">
              <div className="logo-container my-auto">
                <img src="/rickmorty.svg" alt="rick and morty" width="150" />
              </div>
            </NavLink>
          </div>
        </nav>

        <div className="row">
          <div className="col-12 col-md-4 mt-5">
            <div className="d-flex flex-column">
              <div className="image">
                <img
                  src={image}
                  className="rounded detail-img"
                  width="300"
                  alt=""
                />
              </div>

              <div className="detail">
                <h6>{name}</h6>

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
                  <span className="mb-5">{status}</span>-<span>{species}</span>
                  <p className="card-text" style={{ marginTop: "10px" }}>
                    {gender}
                  </p>
                  <p
                    className="card-text"
                    style={{ marginTop: "-10px", marginBottom: "100px" }}
                  >
                    {location?.name}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-8 mt-5">
            <div className="row">
              <h5>Other Characters</h5>
              {otherCharacters
                .filter((character) => character.status === status)
                .map((character) => (
                  <Link
                    to={`../character/${character.id}`}
                    className="col-6 col-md-6 mb-4 otherCharStyle"
                    key={character.id}
                  >
                    <div>
                      <div className="d-flex flex-column">
                        <div className="d-flex">
                          <img
                            src={character.image}
                            className=" rounded"
                            width="70"
                            alt={character.name}
                          />
                          <h6 className="mt-2 mr-2 character-h6">
                            {character.name}
                          </h6>
                        </div>
                        <p className="character-p">
                          {character.gender}-{character.species}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Detail;
