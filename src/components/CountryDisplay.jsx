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

  const [apiData, setApidata] = useState([]);
  const [filteredResult, setFilteredresult] = useState([]);
  const [searchInput, setSearchinput] = useState("");

  const searchCountry1 = () => {
    return axios.get(`https://restcountries.com/v3.1/all`);
  };

  const onSuccessSearch = (searchValue) => {
    setApidata(data.data);
    console.log("onsearch data", data.data);
    setSearchinput(searchValue);
    if (searchInput !== "") {
      const filteredCountry = apiData.filter((country) => {
        return Object.values(country)
          .join("")
          .toLowerCase()
          .includes(searchInput.toLowerCase());
      });

      setFilteredresult(filteredCountry);
    }
  };
  const onerror = () => {
    console.log("hfhfh");
  };
  const { Error } = useQuery("countrySearch", searchCountry1, {
    onSuccessSearch,
  });
  if (Error) {
    return <h1>uchii hadhaishee diddem</h1>;
  }

  /////////////////////////
  // useEffect(() => {
  //   axios.get(`https://restcountries.com/v3.1/all`).then((res) => {
  //     setApidata(res.data);
  //   });
  //   setApidata;
  // }, []);

  // const searchCountry = (searchValue) => {
  //   setSearchinput(searchValue);
  //   if (searchInput !== "") {
  //     const filteredCountry = apiData.filter((country) => {
  //       return Object.values(country)
  //         .join("")
  //         .toLowerCase()
  //         .includes(searchInput.toLowerCase());
  //     });
  //     setFilteredresult(filteredCountry);
  //   }
  // };

  // Filter by region
  const [regionApiData, setRegionApidata] = useState([]);
  const [regionFilteredResult, setRegionFilteredresult] = useState([]);
  const [regionSearchInput, setRegionSearchinput] = useState("");
  useEffect(() => {
    axios.get(`https://restcountries.com/v3.1/all`).then((res) => {
      setRegionApidata(res.data);
    });
    setRegionApidata;
  }, []);

  const RegionsearchCountry = (e) => {
    const value = e.target.value;
    console.log("value", value);

    if (value !== "All") {
      const RfilteredCountry = regionApiData.filter((country) => {
        return Object.values(country)
          .join("")
          .toLowerCase()
          .includes(regionSearchInput.toLowerCase());
      });
      setRegionFilteredresult(RfilteredCountry);
      console.log("Rfiltered country", regionFilteredResult);
    }
    setRegionSearchinput(value);
  };

  // //////////////////////

  const getCountries = () => {
    return axios.get("https://restcountries.com/v3.1/all");
  };

  const onSuccess = (data) => {
    const endOffset = itemOffset + itemsPerPage;
    setcurrentCountries(data.data.slice(itemOffset, endOffset));
  };

  const { isLoading, error, data } = useQuery("country", getCountries, {
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
            onChange={(e) => onSuccessSearch(e.target.value)}
          />
        </div>
        <div className="mr-8 p-2">
          <select
            className="border p-3 mt-4 bg-white rounded dark:bg-slate-800 dark:text-white dark:border-slate-700 dark:shadow-slate-900 "
            name="continent"
            id=""
            onChange={RegionsearchCountry}
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
        {regionSearchInput.length !== regionSearchInput.length
          ? currentCountries &&
            currentCountries.map((country) => {
              return (
                <Link to={`Countrydetails/${country.name.common}`}>
                  <FechCountry country={country} key={country.cca2} />
                </Link>
              );
            })
          : regionFilteredResult.map((country) => {
              return (
                <Link to={`Countrydetails/${country.name.common}`}>
                  <FechCountry country={country} key={country.cca2} />
                </Link>
              );
            })}

        {searchInput.length < 1
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
            })}
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
