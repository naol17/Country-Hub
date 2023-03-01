import React, { useEffect, useState } from "react";
import axios from "axios";
import { BsSearch } from "react-icons/bs";
import { Link, useParams } from "react-router-dom";
import FechCountry from "./lib/CountryFetch";
import { useQuery } from "react-query";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { TbFaceIdError } from "react-icons/tb";

const Countries = () => {
  const [itemsPerPage, setperpage] = useState(8);
  const [currentCountries, setcurrentCountries] = useState(null);
  const [itemOffset, setItemOffset] = useState(0);
  const [searchInput, setSearchinput] = useState(null);
  const [regionSearchInput, setRegionSearchinput] = useState(null);
  const [isLoading, setIsloading] = useState(false);

  // Load more
  const loadmore = () => {
    setIsloading(true);

    setperpage(itemsPerPage + 8);
    if (itemsPerPage + 8 > currentCountries.length) {
      setcurrentCountries(currentCountries.slice(0, currentCountries.length));
      setIsloading(false);

      return;
    }
    setcurrentCountries(currentCountries.slice(0, itemsPerPage + 8));
    setIsloading(false);
  };

  //  all countries
  const getCountries = () => {
    setIsloading(true);
    const endOffset = itemOffset + itemsPerPage;

    return axios.get("https://restcountries.com/v3.1/all").then((res) => {
      setcurrentCountries(res.data.slice(itemOffset, endOffset));
      setIsloading(false);
    });
  };
  // for search Countries

  const searchCountry = (countryName) => {
    const endOffset = itemOffset + itemsPerPage;

    setIsloading(true);
    return axios.get(`https://restcountries.com/v3.1/name/${countryName}`).then(
      (res) => {
        setcurrentCountries(res.data.slice(itemOffset, endOffset));
        setIsloading(false);
      },
      (error) => {
        return <h1>{error.message}</h1>;
      }
    );
  };

  const filterByRegion = (region) => {
    const endOffset = itemOffset + itemsPerPage;

    setIsloading(true);

    return axios
      .get(`https://restcountries.com/v3.1/region/${region}`)
      .then((res) => {
        setcurrentCountries(res.data.slice(itemOffset, endOffset));
        setIsloading(false);
      });
  };

  useEffect(() => {
    getCountries();
  }, []);

  useEffect(() => {
    if (!searchInput) {
      getCountries();
    } else {
      searchCountry(searchInput);
    }
  }, [searchInput]);

  useEffect(() => {
    if (!regionSearchInput) {
      getCountries();
    } else {
      filterByRegion(regionSearchInput);
    }
  }, [regionSearchInput]);

  const searchForCountry = (e) => {
    const value = e.target.value;
    setSearchinput(value);
    setRegionSearchinput(null);
  };

  const regionSearchCountry = (e) => {
    const value = e.target.value;
    setSearchinput(null);

    setRegionSearchinput(value);
  };
  // //////////////////////

  return (
    <>
      {/* search bar area */}
      <div className="flex align-center bg-gray-50 justify-between dark:bg-slate-800 ">
        <div className="flex m-4 border ml-12  w-2/5 dark:bg-slate-800 dark:text-white dark:rounded dark:border-slate-500">
          <input
            icon="search"
            className="border-none w-full p-3 focus:border-none dark:bg-slate-800 dark:text-white dark:border-slate-500 dark:rounded"
            type="text"
            name=""
            id=""
            placeholder="Search"
            value={searchInput}
            onChange={searchForCountry}
          />
        </div>
        <div className="mr-11 p-2">
          <select
            className="border p-3 mt-4 bg-white rounded dark:bg-slate-800 dark:text-white dark:border-slate-700 dark:shadow-slate-900 "
            name="continent"
            id=""
            value={regionSearchInput}
            onChange={regionSearchCountry}
          >
            <option value="null">Filter By Region</option>
            <option value="Africa">Africa</option>
            <option value="Asia">Asia</option>
            <option value="Americas">Americas</option>
            <option value="Europe">Europe</option>
            <option value="Oceania">Oceania</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-3 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3  place-items-center items w-full dark:bg-slate-800 bg-gray-50 pr-9 ">
        {isLoading && (
          <h1 className="flex m-24 md:m-16 sm:m-8 sm:text-sm md:text-md dark:m-24 dark:text-white dark:text-md text-6xl md:ml-32">
            {" "}
            <span className="m-3 sm:m-4 sm:pt-0 ">
              <AiOutlineLoading3Quarters />
            </span>{" "}
            Loading ...
          </h1>
        )}
        {!isLoading && currentCountries && currentCountries.length > 0 ? (
          currentCountries.map((country) => {
            return (
              <Link to={`Countrydetails/${country.name.common}`}>
                <FechCountry country={country} key={country.cca2} />
              </Link>
            );
          })
        ) : (
          <h1 className="m-24 sm:pt-10 dark:m-24 dark:text-white dark:text-md text-6xl dark:sm:-mt-24 sm:-mt-16  md:m-16 sm:m-10 sm:text-sm md:text-md">
            No country found
          </h1>
        )}
      </div>
      <div className="dark:bg-slate-800 pl-96 sm:pl-20 md:pl-60 pr-60 ">
        <button
          className="border border-black mt-4 dark:mt-4 bg-slate-700 text-white hover:bg-green-500 rounded dark:bg-lime-400 dark:hover:bg-lime-500   dark:text-black p-2 mb-12  w-32 h-16"
          onClick={loadmore}
        >
          {isLoading && <p>Loading...</p>}
          {!isLoading && <p>Load More</p>}
        </button>
      </div>
    </>
  );
};

export default Countries;
