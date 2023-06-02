import * as React from "react";
import { useEffect, useState } from "react";
import "@splidejs/react-splide/css";
import getDirectionUrl from "../common/GetDirection";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { Link } from "@yext/pages/components";
import Address from "../common/Address";
import Phone from "../common/Phone";
import OpenCloseStatus from "../common/OpenCloseStatus";
import { useTranslation } from "react-i18next";
import "../../types/i18n";
import { defaultTimeZone, slugify } from "../../config/globalConfig";

const metersToMiles = (meters: number) => {
  const miles = meters * 0.000621371;
  return miles.toFixed(2);
};

type props = {
  prop: any;
  parents?: any;
  baseUrl: any;
  coords: any;
  slug: any;
  timezone: any;
  site: any;
};

const NearByLocation = (result: props) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const distance: any = [];
    const arr: any = [];

    distance.push(result.prop.response.distances);

    result?.prop?.response?.results?.map((i: any) => {
      arr.push({
        slug: i.data?.slug,
        address: i.data?.address,
        hours: i.data?.hours,
        mainPhone: i.data?.mainPhone,
        name: i.data?.name,
        yextDisplayCoordinate: i.data?.yextDisplayCoordinate,
        distance: i.distance,
        id: i.data.id,
        timezone: i.data.timezone,
      });
    });

    setData(arr);
  }, [setData]);
  const { t } = useTranslation();
  return (
    <>
      <div className="nearby-sec">
        <div className="w-full text-center">
          <h2 className="sec-title text-center">
            {result.site.c_nearbyLocationsHeading}
          </h2>
        </div>
        <Splide
          id="splide-nearby"
          options={{
            rewind: false,
            type: "slide",
            perPage: 3,
            perMove: 1,
            arrows: false,
            drag: false,
            pagination: false,
            lazyLoad: "nearby",
            breakpoints: {
              1279: {
                perPage: 2,
                drag: true,
                pagination: true,
                arrows: false,
                type: "splide",
              },
              766.98: {
                perPage: 1,
              },
            },
          }}
        >
          {data &&
            data.map((e: any, index: any) => {
              if (index > 0) {
                let url = "";
                if (!e.slug) {
                  const slugString = e?.id + " " + e?.name;
                  const slug = slugify(slugString);
                  url = `${slug}.html`;
                } else {
                  url = `${e.slug.toString()}.html`;
                }
                return (
                  <SplideSlide key={index}>
                    <div className="location near-location">
                      <div className="miles-with-title">
                        <h3 className="">
                          <Link href={`${url}`}>{e.name}</Link>
                        </h3>
                        <p className="miles">
                          {metersToMiles(e.distance ?? 0)}{" "}
                          {result.site.c_miles
                            ? result.site.c_miles
                            : t("miles")}
                        </p>
                      </div>

                      <Address address={e.address} />
                      <Phone phone={e.mainPhone} />

                      {e.hours && (
                        <>
                          {Object.keys(e?.hours).length > 0 && (
                            <>
                              <div className="single-line">
                                <OpenCloseStatus
                                  timezone={
                                    e.timezone ? e.timezone : defaultTimeZone
                                  }
                                  hours={e.hours}
                                  site={result.site}
                                ></OpenCloseStatus>
                              </div>
                            </>
                          )}
                        </>
                      )}

                      <div className="buttons ">
                        <div className="ctaBtn">
                          <Link className="button before-icon" href={`${url}`}>
                            {result.site.c_viewStationDetails
                              ? result.site.c_viewStationDetails
                              : t("View Details")}
                          </Link>
                        </div>
                        <div className="ctaBtn">
                          <Link
                            data-ya-track="getdirections"
                            eventName={`getdirections`}
                            className="direction button before-icon"
                            onClick={(event) => {
                              event.preventDefault();
                              getDirectionUrl(e);
                            }}
                            href="/"
                            rel="noopener noreferrer"
                          >
                            {result.site.c_getDirections
                              ? result.site.c_getDirections
                              : t("Get Direction")}
                          </Link>
                        </div>
                      </div>
                    </div>
                  </SplideSlide>
                );
              }
            })}
        </Splide>
      </div>
    </>
  );
};
export default NearByLocation;
