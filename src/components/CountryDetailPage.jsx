import axios from "axios";
import React, { useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";

export default function Country() {
  const navigate = useNavigate();
  let { name } = useParams();

  const getCountry = () => {
    return axios.get(`https://restcountries.com/v3.1/name/${name}`);
  };

  const { isLoading, error, data } = useQuery("Countrydetails", getCountry);

  if (isLoading) {
    return <h1 className="text-xlg m-16 dark:text-white">Loading...</h1>;
  }
  if (error) {
    return (
      <h1 className="text-xlg m-16 dark:text-white">
        Hmm something Went wrong .{error.message}
      </h1>
    );
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-800 pb-44">
      <div className=" ml-16 pt-12 ">
        <button
          onClick={() => {
            navigate("/");
          }}
          className="flex pl-2 pr-3 pt-1 pb-1 border shadow dark:bg-slate-700 dark:shadow dark:border-slate-600 dark:rounded dark:text-white"
        >
          <BiArrowBack className="mt-1 pl-1" />
          <span className="pl-2">Back</span>
        </button>
      </div>
      {data?.data.map((country, index) => {
        return (
          <>
            <div className="flex align-midle justify-between mr-20 ml-16 mt-12 md:h-1/2 sm:flex-col sm:-mt-12">
              <div className=" mt-12   md:-mt-50 sm:mt-24 h-96">
                <img className="h-80 md:w-96" src={country.flags.svg} alt="" />
              </div>
              <div className="  w-2/3 p-8 md:w-1/2 md:mr-7 sm:mt-6 sm:p-0 sm:-ml-3">
                {/* Countrie Name */}
                <h2 className="pl-3  text-xl dark:text-white font-extrabold">
                  {country.name.common}
                </h2>

                {/* Detail abiut the country */}
                <div className="flex mt-6 md:pr-12 sm:flex-col  md:w-96 sm:w-1/2  ">
                  <div className=" w-1/2 ml-4 sm:w-1/2">
                    <div className="flex">
                      <h2 className="mb-2 dark:text- font-semibold dark:text-white flex ">
                        Native Name:
                      </h2>
                      <span className="ml-2 flex-row">
                        {Object.keys(country.name.nativeName).map(
                          (nativeNameKey) => (
                            <ul
                              className="pl-2 flex-row dark:text-white"
                              key={nativeNameKey}
                            >
                              {country.name.nativeName[nativeNameKey].official},
                            </ul>
                          )
                        )}
                      </span>
                    </div>
                    <div className="flex">
                      <h2 className=" mb-2 dark:text- font-semibold dark:text-white ">
                        Population:{" "}
                      </h2>
                      <p className="pl-2 dark:text-white">
                        {country.population}
                      </p>
                    </div>
                    <div className="flex">
                      <h2 className="mb-2 dark:text- font-semibold dark:text-white ">
                        Region:
                      </h2>
                      <p className="dark:text-white pl-2">{country.region}</p>
                    </div>
                    <div className="flex">
                      <h2 className="mb-2 dark:text- font-semibold dark:text-white ">
                        Sub Region:
                      </h2>
                      <p className="dark:text-white"> {country.subregion}</p>
                    </div>
                    <div className="flex">
                      <h2 className="mb-2 dark:text- font-semibold dark:text-white ">
                        Capital:
                      </h2>
                      <p className="dark:text-white pl-2"> {country.capital}</p>
                    </div>
                  </div>
                  <div className="w-1/2 ml-4 sm:w-full  md:w-full md:p-3 pl-12 p-5 md:pl-14 sm:-ml-7 sm:-mt-5">
                    <div className="flex">
                      <h2 className="mb-2 dark:text- font-semibold dark:text-white ">
                        Top Level Domain:
                      </h2>
                      <p className="dark:text-white pl-2">{country.tld}</p>
                    </div>
                    {country.currencies[Object.keys(country.currencies)] &&
                    country ? (
                      <>
                        <div className="flex">
                          <h2 className="mb-2 dark:text- font-semibold dark:text-white  ">
                            Curency:{" "}
                          </h2>
                          <p className="dark:text-white pl-1">
                            {
                              country.currencies[
                                Object.keys(country.currencies)
                              ].name
                            }
                          </p>
                        </div>
                        <div className="flex">
                          <h2 className="mb-2 dark:text- font-semibold dark:text-white ">
                            Language:{" "}
                          </h2>
                          <p className="dark:text-white pl-1">
                            {" "}
                            {country.languages[Object.keys(country.languages)]}
                          </p>
                        </div>
                      </>
                    ) : (
                      <h1></h1>
                    )}
                  </div>
                </div>

                {/* Trhe detail footer section */}
                <div className="flex mt-16 ml-5 sm:w-full">
                  <h2 className="mr-2 dark:text- font-semibold dark:text-white  ">
                    Border countries:
                  </h2>
                  <div>
                    <div className="flex" key={index}>
                      {country.borders && country ? (
                        <div className="flex" key={index}>
                          <ul className="border rounded p-1 dark:text-white ml-2">
                            {country.borders[0]}
                          </ul>
                          <ul className="border rounded p-1 dark:text-white ml-2">
                            {" "}
                            {country.borders[1]}
                          </ul>
                          <ul className="border rounded p-1 dark:text-white ml-2">
                            {" "}
                            {country.borders[2]}
                          </ul>
                        </div>
                      ) : (
                        <h1 className="dark:text-white ">
                          Have no border Countries
                        </h1>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        );
      })}
    </div>
  );
}
