import React from "react";
function Country({ country }) {
  return (
    <>
      {/* <div className=" bg-gray-50 dark:bg-slate-800  ">
        <div className=" m-8 dark:bg-slate-800 w-66 bg-gray-50 ">
          <div className=" border w-full m-4 shadow bg-white round dark:bg-slate-700 dark:border-slate-700 ">
            <img
              key={country.name.common}
              src={country.flags.svg}
              alt=""
              className="w-full h-48"
            />

            <div className="align-middle justify-center pl-8 ">
              <div className="mb-3">
                <div className="mt-3 mb-5">
                  <h1 className="font-bold text-xl dark:text-white">
                    {country.name.common}
                  </h1>
                </div>
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
        </div>
      </div> */}

      <section class=" ml-12 mr-4 bg-[#F3F4F6] border shadow dark:border-slate-700 dark:bg-slate-700 mt-10">
        <div class="flex flex-wrap ">
          <div class=" rounded-lg overflow-hidden mb-10">
            <img
              key={country.name.common}
              src={country.flags.svg}
              alt=""
              class="w-full aspect-[5/3]"
            />
            <div class="p-8 sm:p-9 md:p-7 xl:p-9 text-center">
              <h3>
                <h1
                  class="
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
