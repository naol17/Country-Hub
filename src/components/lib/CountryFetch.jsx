import React from "react";
function Country({ country }) {
  return (
    <>
      <section className=" ml-12 mr-4 bg-[#F3F4F6] border shadow dark:border-slate-700 dark:bg-slate-700 mt-10">
        <div className="flex flex-wrap ">
          <div className=" rounded-lg overflow-hidden mb-10">
            <img
              key={country.name.common}
              src={country.flags.svg}
              alt={country.name.common}
              className="w-full object-cover h-44"
            />
            <div className="p-8 sm:p-9 md:p-7 xl:p-9 text-center">
              <h3>
                <h1
                  className="
                        font-semibold
                        text-dark text-xl
                        sm:text-[22px]
                        md:text-xl
                        lg:text-[22px]
                        xl:text-xl
                        2xl:text-[22px]
                        mb-4
                        block
                        hover:text-primary dark:text-white
                        "
                >
                  {" "}
                  {country.name.common}
                </h1>
              </h3>
              <div className="flex mb-1">
                <div className="text-sm font-bold  dark:text-white">
                  Population:
                </div>
                <div className="ml-1 text-sm  dark:text-white">
                  {country.population}
                </div>
              </div>
              <div className="flex mb-1">
                <div className="font-bold  dark:text-white">Region:</div>
                <div className="ml-1 text-sm  dark:text-white">
                  {country.region}
                </div>
              </div>
              <div className="flex">
                <div className="font-bold text-sm  dark:text-white">
                  <h2>Capital:</h2>
                </div>
                <div className="ml-1 text-sm  dark:text-white">
                  {country.capital}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
export default Country;
