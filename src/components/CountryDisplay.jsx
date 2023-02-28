import React, { useEffect, useState } from "react";
import axios from "axios";
import { BsSearch } from "react-icons/bs";
import { Link, useParams } from "react-router-dom";
import FechCountry from "./lib/CountryFetch";
import { useQuery } from "react-query";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { TbFaceIdError } from "react-icons/tb";
const items = [...Array(250).keys()];

const Countries = () => {
  const [itemsPerPage, setperpage] = useState(8);
  const [currentCountries, setcurrentCountries] = useState(null);
  const [itemOffset, setItemOffset] = useState(0);
  const [searchInput, setSearchinput] = useState(null);
  const [regionSearchInput, setRegionSearchinput] = useState(null);
  const [Loading, setIsloading] = useState(false);

  // Load more
  const loadmore = () => {
    setperpage(itemsPerPage + 8);
    if (itemsPerPage + 8 > currentCountries.length) {
      setcurrentCountries(currentCountries.slice(0, currentCountries.length));
      return;
    }
    setcurrentCountries(currentCountries.slice(0, itemsPerPage + 8));
  };

  // for search Countries

  const searchCountry = (countryName) => {
    const endOffset = itemOffset + itemsPerPage;

    setIsloading(true);
    return axios.get(`https://restcountries.com/v3.1/name/${countryName}`).then(
      (res) => {
        setcurrentCountries(res.data.slice(itemOffset, endOffset));
      },
      (error) => {
        return <h1>{error.message}</h1>;
      }
    );
  };

  useEffect(() => {
    if (!searchInput) {
      searchCountry();
    } else {
      searchCountry(searchInput);
    }
  }, [searchInput]);

  /////////////////////////
  const searchForCountry = (e) => {
    const value = e.target.value;
    setSearchinput(value);
  };
  // //////////////////////
  //  search by reagion

  // //////////////////////

  const getCountries = () => {
    return axios.get("https://restcountries.com/v3.1/all");
  };

  const onSuccess = (data) => {
    const endOffset = itemOffset + itemsPerPage;
    setcurrentCountries(data.data.slice(itemOffset, endOffset));
  };

  const { isLoading, error, data } = useQuery("country", getCountries, {
    refetchOnMount: true,
    onSuccess,
  });
  if (isLoading) {
    return (
      <>
        <div className="flex m-96 md:m-72 sm:m-60 ">
          <AiOutlineLoading3Quarters size="2.5rem" />
          <p className="pl-4 font-bold text-xl pt-2">Loading Data...</p>;
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <div className="flex m-96 md:m-68 sm:m-60 w-full md:w-72 md:m-72">
          <TbFaceIdError size="2.5rem" />
          <p className="pl-4 font-bold text-xl pt-3 ">
            Oops! something went wrong {error.message}
          </p>
        </div>
      </>
    );
  }

  return (
    <>
      {/* search bar area */}
      <div className="flex align-center bg-gray-50 justify-between dark:bg-slate-800 ">
        <div className="flex m-4 border  w-2/5 dark:bg-slate-800 dark:text-white dark:rounded dark:border-slate-500">
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
        <div className="mr-8 p-2">
          <select
            className="border p-3 mt-4 bg-white rounded dark:bg-slate-800 dark:text-white dark:border-slate-700 dark:shadow-slate-900 "
            name="continent"
            id=""
            // onChange={RegionsearchCountry}
          >
            <option value="All">Filter By Region</option>
            <option value="Africa">Africa</option>
            <option value="Asia">Asia</option>
            <option value="America">America</option>
            <option value="Europe">Europe</option>
            <option value="Oceania">Oceania</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-3 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3  place-items-center items w-full dark:bg-slate-800 bg-gray-50 pr-9">
        {currentCountries && currentCountries.length > 0 ? (
          currentCountries.map((country) => {
            return (
              <Link to={`Countrydetails/${country.name.common}`}>
                <FechCountry country={country} key={country.cca2} />
              </Link>
            );
          })
        ) : (
          <h1>No country</h1>
        )}

        {/* {searchInput.length < 1
          ? currentCountries &&
            currentCountries.map((country, index) => {
              return (
                <Link to={`Countrydetails/${country.name.common}`}>
                  <FechCountry country={country} key={country.cca2} />;
                </Link>
              );
            })
          : filteredResult.map((country, index) => {
              return (
                <Link to={`Countrydetails/${country.name.common}`}>
                  <FechCountry country={country} key={country.cca2} />
                </Link>
              );
            })} */}
      </div>
      <div className="dark:bg-slate-800 pl-96 sm:pl-20 md:pl-60 pr-60 ">
        <button
          className="border border-black bg-slate-700 text-white hover:bg-green-500 rounded dark:bg-lime-400 dark:hover:bg-lime-500   dark:text-black p-2 mb-12  w-32 h-16"
          onClick={loadmore}
        >
          load more
        </button>
      </div>
    </>
  );
};

export default Countries;
