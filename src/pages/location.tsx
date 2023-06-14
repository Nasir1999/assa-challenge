import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, NavLink } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'

interface LocationData {
  id: number;
  name: string;
  type: string;
  dimension: string;
  residents: string[];
}

const LocationComponent: React.FC = () => {
  const [locations, setLocations] = useState<LocationData[]>([]);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await axios.get(
          "https://rickandmortyapi.com/api/location"
        );
        setLocations(response.data.results);
      } catch (error) {
        console.error(error);
      }
    };
    fetchLocations();
  }, []);

  return (
    <>
      <div className="container">
        <nav className="navbar">
          <div className="container justify-content-center cards">
            <NavLink className="navbar-brand" to="/">
              <div className="logo-container my-auto">
                <img src="/rickmorty.svg" alt="rick and morty" width="150" />
              </div>
            </NavLink>
          </div>
        </nav>
        <div className="row">
          {locations.length > 0
            ? locations.map((location) => (
                <div className="col-12 col-md-6 mb-4" key={location.id}>
                  <Link to={`/characters`} className="card-link">
                    <div className="card">
                      <div className="card-body">
                        <h5 className="card-title">{location.name}</h5>
                        <p className="card-text">Type: {location.type}</p>
                        <p className="card-text">
                          Dimension: {location.dimension}
                        </p>
                        <p className="card-text">
                          Resident count: {location.residents.length}
                        </p>
                      </div>
                    </div>
                  </Link>
                </div>
              ))
            : Array.from({ length: 20 }).map((_, index) => (
                <div className="col-12 col-md-6 mb-4" key={index}>
                  <div className="card">
                    <div className="card-body">
                      <Skeleton height={60} />
                      <Skeleton count={3} />
                    </div>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </>
  );
};

export default LocationComponent;
