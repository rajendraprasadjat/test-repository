import * as React from "react";
import { useState } from "react";
import { slugify } from "../../config/globalConfig";

/**
 * For
 * @param props
 * @returns
 */

const Continent = (props: any) => {
  const regionNames = new Intl.DisplayNames(["en"], { type: "region" });
  const [section, setSection] = useState(0);
  const [isActive] = useState("continent");

  const handleClick = (e: any) => {
    setSection(e.target.id);
  };

  return (
    <>
      <div className="continent's mt-[30px] flex justify-center mb-[3.75rem]">
        <div className=" w-[640px] h-[470px] relative left-12">
          <div className="absolute w-[640px] flex flex-col justify-center mt-[2rem] top-2/4 -translate-y-2/4">
            {props.child.map((item: any, index: any) => {
              return (
                <>
                  <div
                    id={index}
                    className={`flex items-center justify-between pl-4 py-6 drop-shadow-[0_0px_1px_rgba(0,0,0,0.15)] bg-white ${section == index ? isActive : ""
                      }`}
                    onClick={(e) => {
                      handleClick(e);
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    <div className="flex items-center gap-[16px]">


                      <p id={index}>{item.name}</p>
                    </div>

                  </div>
                </>
              );
            })}
          </div>
        </div>
        <div className="bg-[#F1F6FA] w-[648px] h-[472px] rounded-2xl block mt-[2rem] pl-12">
          {props.child[section].dm_directoryChildren.map(
            (res: any) => {
              return (
                <>
                  <div className="inline-block right-0 mt-[2.5rem] ml-[9rem]">
                    <p className="pt-10">
                      <a
                        href={
                          "/" +
                          props.locale +
                          "/" +
                          props.child[section].slug +
                          "/" +
                          res.slug +
                          ".html"
                        }
                      >
                        {regionNames.of(res.name)}
                      </a>
                    </p>
                  </div>

                  <div className="all-cities flex gap-x-12">
                    {res.dm_directoryChildren?.map((ress: any) => {
                      if (ress.dm_baseEntityCount != 1) {
                        return (
                          <>
                            <div className="city">
                              <p className="pt-10">
                                <a
                                  href={
                                    "/" +
                                    props.locale +
                                    "/" +
                                    props.child[section].slug +
                                    "/" +
                                    res.slug +
                                    "/" +
                                    ress.slug +
                                    ".html"
                                  }
                                >
                                  {ress.name}
                                  <sup className="ml-0.5">
                                    {ress.dm_baseEntityCount
                                      ? ress.dm_baseEntityCount
                                      : ""}
                                  </sup>
                                </a>
                              </p>
                            </div>
                          </>
                        );
                      }
                      else if (ress.dm_baseEntityCount == 1) {
                        return ress.dm_directoryChildren?.map((resloc: any) => {

                          let url = "";
                          if (resloc.slug) {
                            url = `${props.locale}/${resloc.slug}`;
                          }
                          else {
                            let slugString = resloc.id + "-" + resloc.name;
                            slugString = slugify(slugString);
                            url = `${props.locale}/${slugString}`;
                          }
                          return (
                            <>

                              <div className="city">
                                <p className="pt-10">


                                  <a
                                    href={
                                      "/" +
                                      url +
                                      ".html"
                                    }
                                  >
                                    {ress.name}
                                    <sup className="ml-0.5">
                                      {ress.dm_baseEntityCount
                                        ? ress.dm_baseEntityCount
                                        : ""}
                                    </sup>
                                  </a>
                                </p>
                              </div>


                            </>
                          );

                        })
                      }



                    })}

                  </div>
                </>
              );
            }
          )}
        </div>
      </div>
    </>
  );
};

export default Continent;
