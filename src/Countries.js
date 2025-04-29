import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaGlobe, FaSearch, FaMapMarkerAlt, FaFlag } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'; // Create and link custom CSS for additional hover and animation effects
// import'./index.css';

const Countries = () => {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [region, setRegion] = useState('all');

  useEffect(() => {
    let url = 'https://restcountries.com/v3.1/all';
    if (region !== 'all') {
      url = `https://restcountries.com/v3.1/region/${region}`;
    }
    axios.get(url)
      .then(response => {
        setCountries(response.data);
      })
      .catch(error => {
        console.error('Error fetching the data', error);
      });
  }, [region]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredCountries = countries.filter(country =>
    country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container-fluid p-0">
      {/* Header */}
      <header className="bg-primary text-white text-center py-5 ">
        <h1 style={{textShadow: '3px 3px #000000'}}><FaGlobe /> Country Explorer</h1>
        <p style={{textAlign:'center', fontSize:'20px', color:'#ffffff',}}> Welcome to the Country Explorer...! </p>
        <marquee class="marq" bgcolor="Black"
          direction="left" loop="" style={{  marginTop:'30px',}}>
          <div style={{
            fontSize: '28px',
            fontWeight: 'normal',
            color: 'white',
            paddingBottom: '10px',
            letterSpacing:1,
          
            paddingTop: '30px',
            paddingBottom: '30px'
          }}>
          
          <p>
             Here you can get information of any country all around the world. Isn't that great? So Enjoy searching. 
            </p>
          </div>
        </marquee>
      </header>

      {/* Search and Filter Section */}
      <div className="container my-4">
        <div className="row mb-3">
          <div className="col-md-6">
            <div className="input-group">
              <span className="input-group-text"><FaSearch /></span>
              <input
                type="text"
                className="form-control"
                placeholder="Search for a country"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
          </div>
          <div className="col-md-6">
            <select
              className="form-select"
              onChange={(e) => setRegion(e.target.value)}
            >
              <option value="all">All Regions</option>
              <option value="Africa">Africa</option>
              <option value="Americas">Americas</option>
              <option value="Asia">Asia</option>
              <option value="Europe">Europe</option>
              <option value="Oceania">Oceania</option>
            </select>
          </div>
        </div>

        {/* Country Cards */}
        <div className="row">
          {filteredCountries.map((country) => (
            <div className="col-md-4 mb-4" key={country.cca3}>
              <div className="card h-100 border-0 shadow-sm hover-effect">
                <img
                  src={country.flags.png}
                  className="card-img-top"
                  alt={country.name.common}
                />
                <div className="card-body">
                  <h5 className="card-title">{country.name.common}</h5>
                  <p className="card-text">
                    <FaMapMarkerAlt /> Capital: {country.capital ? country.capital[0] : 'N/A'} <br />
                    <FaFlag /> Population: {country.population.toLocaleString()}
                  </p>
                </div>
                <div className="card-footer text-muted">
                  Region: {country.region}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-dark text-white text-center py-3">
        <p>Country Explorer © 2024</p>
      </footer>
    </div>
  );
};

export default Countries;
