import React from "react";
function FechCountry({ Country }) {
  return (
    <>
      <div className=" bg-gray-50 dark:bg-slate-800  ">
        <div className=" m-8 dark:bg-slate-800 w-66 bg-gray-50 ">
          <div className=" border w-full m-4 shadow bg-white round dark:bg-slate-700 dark:border-slate-700 ">
            <img
              key={Country.name.common}
              src={Country.flags.svg}
              alt=""
              className="w-full"
            />

            <div className="align-middle justify-center pl-8 ">
              <div className="mb-3">
                <div className="mt-3 mb-5">
                  <h1 className="font-bold text-xl dark:text-white">
                    {Country.name.common}
                  </h1>
                </div>
                <div className="flex mb-1">
                  <div className="text-sm font-bold  dark:text-white">
                    Population:
                  </div>
                  <div className="ml-1 text-sm  dark:text-white">
                    {Country.population}
                  </div>
                </div>
                <div className="flex mb-1">
                  <div className="font-bold  dark:text-white">Region:</div>
                  <div className="ml-1 text-sm  dark:text-white">
                    {Country.region}
                  </div>
                </div>
                <div className="flex">
                  <div className="font-bold text-sm  dark:text-white">
                    <h2>Capital:</h2>
                  </div>
                  <div className="ml-1 text-sm  dark:text-white">
                    {Country.capital}
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
export default FechCountry;
