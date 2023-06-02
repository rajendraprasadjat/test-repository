import { useSearchState, Result } from "@yext/search-headless-react";
import * as React from "react";
import { useEffect, useRef, useState } from "react";
import {
  twMerge,
  useComposedCssClasses,
} from "..//../hooks/useComposedCssClasses";
import { useTranslation } from "react-i18next";
import Address from "../common/Address";
import { Link } from "@yext/pages/components";
import Phone from "../common/Phone";
import ByredoStore from "../../images/Byredo.svg";
import DepartmentalStore from "../../images/Departmental.svg";
import ByredoStoreHover from "../../images/Byredohover.svg";
import DepartmentalStoreHover from "../../images/DepartmentalHover.svg";
import Default from "../../images/Default.svg";
import DefaultHover from "../../images/DefaultHover.svg";

import UserMarker from "../../images/user.svg";
import { renderToString } from "react-dom/server";
import { MarkerClusterer } from "@googlemaps/markerclusterer";
import OpenCloseStatus from "../common/OpenCloseStatus";
import clustericon from "../../images/cluster1.png";
import {
  slugify,
  defaultTimeZone,
  silverMapStyle,
} from "../../config/globalConfig";
import $ from "jquery";
import useDimensions from "../../hooks/useDimensions";
let marker: any;
/**
 * CSS class interface for the {@link GoogleMaps} component
 *
 * @public
 */
export interface GoogleMapsCssClasses {
  googleMapsContainer?: string;
}

/**
 * Props for the {@link GoogleMaps} component
 *
 * @public
 */
export interface GoogleMapsProps {
  apiKey: string;
  centerLatitude: number;
  centerLongitude: number;
  defaultZoom: number;
  showEmptyMap: boolean;
  zoomLevel: number;
  setZoomLevel: any;
  check: boolean;
  providerOptions?: google.maps.MapOptions;
  customCssClasses?: GoogleMapsCssClasses;
  locationResults: any;
  alternateResult: any;
  activeIndex: number | null;
  setActiveIndex: any;
  site?: any;
}

type UnwrappedGoogleMapsProps = Omit<GoogleMapsProps, "apiKey" | "locale">;
let mapMarkerClusterer: { clearMarkers: () => void } | null = null;

const builtInCssClasses: Readonly<GoogleMapsCssClasses> = {
  googleMapsContainer:
    "w-full  h-[80vh] md:h-[calc(100vh_-_9rem)] top-0 z-[99]",
};

/**
 * A component that renders a map with markers to show result locations.
 *
 * @param props - {@link GoogleMapsProps}
 * @returns A React element conatining a Google Map
 *
 * @public
 */
let location: any;
export function GoogleMaps(props: GoogleMapsProps) {
  return (
    <div>
      <UnwrappedGoogleMaps {...props} />
    </div>
  );
}

function UnwrappedGoogleMaps({
  centerLatitude,
  centerLongitude,
  defaultZoom: zoom,
  showEmptyMap,
  zoomLevel,
  locationResults,
  alternateResult,
  activeIndex,
  setActiveIndex,
  providerOptions,
  customCssClasses,
  site,
}: UnwrappedGoogleMapsProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map>();
  let center: any = {
    lat: centerLatitude,
    lng: centerLongitude,
  };
  const [scrollTo, setScrollTo] = React.useState<boolean>(true);
  const bounds = new google.maps.LatLngBounds();
  const markerPins = useRef<google.maps.Marker[]>([]);
  const usermarker = useRef<google.maps.Marker[]>([]);
  const infoWindow = useRef(new google.maps.InfoWindow());

  locationResults.map((result: any, i: number) => {
    if (i == 0) {
      center = {
        lat: result.rawData.yextDisplayCoordinate
          ? result.rawData.yextDisplayCoordinate.latitude
          : result.rawData.displayCoordinate.latitude,
        lng: result.rawData.yextDisplayCoordinate
          ? result.rawData.yextDisplayCoordinate.longitude
          : result.rawData.displayCoordinate.longitude,
      };
      if (map) {
        const location = new google.maps.LatLng(center.lat, center.lng);
        bounds.extend(location);
        map.setCenter(center);
      }
    }
  });

  const { width } = useDimensions();

  const [hover, setHover] = useState(true);
  const [openInfoWindow, setOpenInfoWindow] = useState(false);
  const cssClasses = useComposedCssClasses(builtInCssClasses, customCssClasses);
  const noResults = !locationResults.length;
  let containerCssClass = cssClasses.googleMapsContainer;
  let marker_icon = {
    url: ByredoStore,
  };

  let marker_hover_icon = {
    url: DepartmentalStore,
  };
  if (noResults && !showEmptyMap) {
    containerCssClass = twMerge(cssClasses.googleMapsContainer, "hidden");
  }

  deleteMarkers();
  userdeleteMarkers();

  const userlat = useSearchState((s) => s.location.locationBias);
  let position = {
    lat: centerLatitude,
    lng: centerLongitude,
  };
  if (userlat) {
    const iplat = userlat.latitude;
    const iplong = userlat.longitude;
    position = {
      lat: parseFloat(iplat.toString()),
      lng: parseFloat(iplong.toString()),
    };
  }

  const Usermarker1 = new google.maps.Marker({
    position,
    map,
    icon: UserMarker,
  });
  usermarker.current.push(Usermarker1);

  try {
    if (mapMarkerClusterer) {
      mapMarkerClusterer.clearMarkers();
    }
  } catch (e) {
    console.error("e", e);
  }
  if (locationResults.length > 0) {
    for (const result of locationResults) {
      marker_icon = getMarkerPin(result);
      const position = getPosition(result);
      const marker = new google.maps.Marker({
        position,
        map,
        icon: marker_icon,
      });

      location = new google.maps.LatLng(position.lat, position.lng);
      bounds.extend(location);
      markerPins.current.push(marker);
    }
  } else {
    for (const result of alternateResult) {
      marker_icon = getMarkerPin(result);
      const position = getPosition(result);
      marker = new google.maps.Marker({
        position,
        map,
        icon: marker_icon,
      });

      location = new google.maps.LatLng(position.lat, position.lng);
      bounds.extend(location);
      markerPins.current.push(marker);
    }
  }
  /** Cluster color */
  if (markerPins.current.length > 0) {
    const markers = markerPins.current;
    mapMarkerClusterer = new MarkerClusterer({
      map,
      markers,
      renderer: {
        render: ({ markers, position: position }) => {
          return new google.maps.Marker({
            position: {
              lat: position.lat(),
              lng: position.lng(),
            },
            icon: clustericon,
            label: {
              text: String(markers?.length),
              color: "#fff",
              fontWeight: "500",
            },
          });
        },
      },
      onClusterClick: (event, cluster, _map) => {
        const position = cluster.position.toJSON();
        const location = new google.maps.LatLng(position.lat, position.lng);

        setTimeout(() => {
          const bound = cluster.bounds;
          bound?.extend(location);
          if (bound) {
            _map.fitBounds(bound);
          }
        }, 300);
      },
    });
  }

  useEffect(() => {
    if (ref.current && !map) {
      const options = {
        center,
        mapTypeControl: false,
        mapTypeControlOptions: {
          style: google.maps.MapTypeControlStyle.DEFAULT,
          mapTypeIds: ["roadmap"],
        },

        styles: silverMapStyle,
        ...providerOptions,
      };
      setMap(new window.google.maps.Map(ref.current, options));
    } else if (markerPins.current.length > 0 && map) {
      bounds.extend(position);
      map?.fitBounds(bounds);
    }

    if (map && !openInfoWindow) {
      map?.fitBounds(bounds);
    }

    onGridClick(markerPins, marker_hover_icon, marker_icon, locationResults);
    onGridHover(markerPins, marker_hover_icon, marker_icon);
    /** Binding Grid Listing click */
  }, [center, map, providerOptions, zoom, zoomLevel, position]);

  /** Open info window Click event*/
  for (let i = 0; i < markerPins.current.length; i++) {
    marker_icon = getMarkerPin(locationResults[i]);
    markerPins.current[i].setIcon(marker_icon);
    markerPins.current[i].addListener("click", () => {
      setActiveIndex(i);
      setHover(false);
      $(".location-cart-element")
        .removeClass("fixed-hover")
        .removeClass("active");

      locationResults.map((result: any, index: number) => {
        if (i == index) {
          const resultelement = document.getElementById(
            `result-list-inner-${index + 1}`
          );

          if (resultelement) {
            resultelement.classList.add("active", "fixed-hover");
          }

          const position = getPosition(locationResults[index]);
          InfowindowContents(i, result);
          if (scrollTo) {
            scrollToRow(index);
          } else {
            setScrollTo(true);
          }

          if (width > 700) {
            addActiveGrid(i);
          }

          const currentZoom = map?.getZoom() || 17;

          setTimeout(() => {
            bounds.extend(position);
            map?.setCenter(position);
          }, 500);

          setTimeout(() => {
            if (currentZoom && currentZoom < 19) {
              map?.setZoom(19);
            } else {
              map?.setZoom(currentZoom);
            }
          }, 800);

          // map?.setZoom(10);
          setOpenInfoWindow(true);
          infoWindow.current.open(map, markerPins.current[i]);
          marker_hover_icon = getMarkerHoverPin(locationResults[i]);
          markerPins.current[i].setIcon(marker_hover_icon);
        }
      });
    });

    markerPins.current[i].addListener("mouseover", () => {
      if (i !== activeIndex) {
        const resultelement = document.getElementById(
          `result-list-inner-${i + 1}`
        );
        if (resultelement) {
          resultelement.classList.add("active");
        }
      }
      marker_hover_icon = getMarkerHoverPin(locationResults[i]);
      markerPins.current[i].setIcon(marker_hover_icon);
      if (width > 700) {
        addActiveGrid(i);
      }
    });
    markerPins.current[i].addListener("mouseout", () => {
      if (i !== activeIndex) {
        const resultelement = document.getElementById(
          `result-list-inner-${i + 1}`
        );
        if (resultelement) {
          resultelement.classList.remove("active");
        }
        marker_icon = getMarkerPin(locationResults[i]);
        markerPins.current[i].setIcon(marker_icon);
      }
    });
  }
  /** info window Close event*/
  if (infoWindow.current != null) {
    infoWindow.current.addListener("closeclick", () => {
      setHover(true);
      setActiveIndex(null);
      setOpenInfoWindow(false);
      infoWindow.current.close();
      $(".location-cart-element")
        .removeClass("fixed-hover")
        .removeClass("active");
      onGridClick(markerPins, marker_hover_icon, marker_icon, locationResults);
      onGridHover(markerPins, marker_hover_icon, marker_icon);
      map?.fitBounds(bounds);
      // map?.setZoom(10);
    });
  }

  /** Active and Remove Grid */

  function addActiveGrid(index: number) {
    const elements = document.querySelectorAll(".result");
    for (let index = 0; index < elements.length; index++) {
      elements[index].classList.remove("active");
    }
    document.querySelectorAll(".result")[index].classList.add("active");
  }
  function removeActiveGrid(index: any) {
    const elements = document.querySelectorAll(".result");
    for (let index = 0; index < elements.length; index++) {
      elements[index].classList.remove("active");
    }
    document.querySelectorAll(".result")[index].classList.remove("active");
  }

  /** Function Grid Hover*/
  function onGridHover(
    markerPins: any,
    marker_hover_icon: any,
    marker_icon: any
  ) {
    const elements = document.querySelectorAll(".result");
    for (let index = 0; index < elements.length; index++) {
      elements[index].addEventListener("mouseover", () => {
        if (hover) {
          marker_hover_icon = getMarkerHoverPin(locationResults[index]);
          markerPins.current[index].setIcon(marker_hover_icon);
          if (width > 700) {
            addActiveGrid(index);
          }
        }
      });
      elements[index].addEventListener("mouseout", () => {
        if (hover) {
          if (elements[index].classList.contains("fixed-hover")) {
            marker_hover_icon = getMarkerHoverPin(locationResults[index]);
            markerPins.current[index].setIcon(marker_hover_icon);
          } else {
            marker_icon = getMarkerPin(locationResults[index]);
            markerPins.current[index].setIcon(marker_icon);
          }

          removeActiveGrid(index);
        }
      });
    }
  }

  function onGridClick(
    markerPins: any,
    marker_hover_icon: any,
    marker_icon: any,
    locationResults: any
  ) {
    // setActiveIndex(null);
    const elements = document.querySelectorAll(".result");
    for (let index = 0; index < elements.length; index++) {
      // markerPins.current[index].setIcon(marker_icon);
      if (!elements[index].classList.contains("markerEventBinded")) {
        elements[index].classList.add("markerEventBinded");
        elements[index].addEventListener("click", (e) => {
          if (!(e.target as HTMLElement).classList.contains("onhighLight")) {
            if (index > 0) {
              marker_icon = getMarkerPin(locationResults[index]);
              markerPins.current[index - 1].setIcon(marker_icon);
            }
            $(".result").removeClass("fixed-hover");
            locationResults.map((result: any, i: any) => {
              if (i == index) {
                setScrollTo(false);
                google.maps.event.trigger(markerPins.current[i], "click");
              }
            });
          }
        });
      }
    }
  }
  /**
   *
   * @param meters
   * @returns Distance in Miles
   */
  const metersToMiles = (meters: number) => {
    const miles = meters * 0.000621371;
    return miles.toFixed(2);
  };

  const { t } = useTranslation();
  /** Function InfowindowContents returns Html*/
  function InfowindowContents(i: number, result: any): void {
    let url = "";
    if (!result.rawData.slug) {
      const slugString = result?.id + " " + result?.name;
      const slug = slugify(slugString);
      url = `${slug}.html`;
    } else {
      url = `${result.rawData.slug.toString()}.html`;
    }
    const MarkerContent = (
      <div className="markerContent">
        <div className="miles-with-title">
          <h3 className="nameData">
            <Link href={`${url}`}>{result.name} </Link>
          </h3>
          <p className="miles">
            {metersToMiles(result.distance ?? 0)} {t("miles")}
          </p>
        </div>
        <Link
          data-ya-track="getdirections"
          eventName={`getdirections`}
          className="addressmob"
          href="/"
          onClick={(e) => e.preventDefault()}
          id="some-button"
          rel="noopener noreferrer"
        >
          <Address address={result.rawData.address} />
        </Link>
        <Phone phone={result.rawData.mainPhone} />

        {result?.rawData?.hours && (
          <>
            {Object.keys(result?.rawData?.hours).length > 1 && (
              <>
                <div className="openStatus">
                  <OpenCloseStatus
                    hours={result?.rawData?.hours}
                    site={site}
                    timezone={
                      result?.rawData?.timezone
                        ? result?.rawData?.timezone
                        : defaultTimeZone
                    }
                  />
                </div>
              </>
            )}
          </>
        )}

        <div className="buttons">
          <div className="ctaBtn">
            <Link className="button" href={`${url}`}>
              {site.c_viewStationDetails
                ? site.c_viewStationDetails
                : t("View Details")}
            </Link>
          </div>
        </div>
      </div>
    );
    const string = renderToString(MarkerContent);
    infoWindow.current.setContent(string);
  }

  function getMarkerHoverPin(result: any) {
    let hover_icon = marker_hover_icon;
    if (typeof result.rawData.c_storeType != "undefined") {
      if (result.rawData.c_storeType == "Departmental Stores") {
        hover_icon = {
          url: DepartmentalStoreHover,
        };
      } else if (result.rawData.c_storeType == "Byredo Stores") {
        hover_icon = {
          url: ByredoStoreHover,
        };
      } else {
        hover_icon = {
          url: DefaultHover,
        };
      }
    }
    return hover_icon;
  }

  function getMarkerPin(result: any) {
    let m_icon = marker_icon;
    if (typeof result.rawData.c_storeType != "undefined") {
      if (result.rawData.c_storeType == "Departmental Stores") {
        m_icon = {
          url: DepartmentalStore,
        };
      } else if (result.rawData.c_storeType == "Byredo Stores") {
        m_icon = {
          url: ByredoStore,
        };
      } else {
        m_icon = {
          url: Default,
        };
      }
    }
    return m_icon;
  }

  function deleteMarkers(): void {
    for (let i = 0; i < markerPins.current.length; i++) {
      markerPins.current[i].setMap(null);
    }
    markerPins.current = [];
  }

  function userdeleteMarkers(): void {
    for (let i = 0; i < usermarker.current.length; i++) {
      usermarker.current[i].setMap(null);
    }
    usermarker.current = [];
  }

  return (
    <>
      <div className={containerCssClass} ref={ref} />
    </>
  );
}

/* eslint-disable @typescript-eslint/no-explicit-any */
function getPosition(result: Result) {
  const lat = (result.rawData as any).yextDisplayCoordinate.latitude;
  const lng = (result.rawData as any).yextDisplayCoordinate.longitude;
  return { lat, lng };
}
export function scrollToRow(index: any) {
  const result: any = [].slice.call(
    document.querySelectorAll(`.result`) || []
  )[0];
  const offset: any = [].slice.call(document.querySelectorAll(`.result`) || [])[
    index
  ];
  const o = offset.offsetTop - result.offsetTop;
  [].slice
    .call(document.querySelectorAll(".scrollbar-container") || [])
    .forEach(function (el: any) {
      el.scrollTop = o;
    });
}
