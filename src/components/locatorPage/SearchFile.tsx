import * as React from "react";
import Geocode from "react-geocode";
import { useState, useRef } from "react";
import { Link } from "@yext/pages/components";
import { useTranslation } from "react-i18next";
import AutoSuggestions from "../common/AutoSuggestions";
import {
  SelectableFilter,
  useSearchActions,
} from "@yext/search-headless-react";
import {
  AnswerExperienceConfig,
  BaseUrl,
  googleMapsConfig,
  limit,
} from "../../config/globalConfig";
import UsemylocationPopup from "./UsemylocationPopup";
import CustomFilter from "../Filters/CustomFilter";

export type SearchFileHandle = {
  getCoordinates: (value: string) => void;
};

const SearchFile = React.forwardRef<SearchFileHandle, any>(
  (props: any, ref) => {
    const searchActions = useSearchActions();
    const inputRef = useRef<HTMLInputElement>(null);
    const [errorstatus, setErrorStatus] = useState(false);
    const [activeFacet, setActiveFacet] = React.useState(0);
    const [modelopen, setModelOpen] = React.useState(false);
    const [allowlocation, setallowLocation] = React.useState("");
    // const [isUserLocation, setIsUserLocation] = React.useState(false);
    const [selectedFilters, setSelectedFilters] = useState<SelectableFilter[]>(
      []
    );
    const setNotFound = props.setShowNotFound;
    const centerLat = props.centerLatitude;
    const centerLong = props.centerLongitude;
    const chek = props.setCheck;
    const sZoomlevel = props.setZoomlevel;

    React.useImperativeHandle(ref, () => {
      return {
        getCoordinates: (value: string) => {
          getCoordinates(value);
        },
      };
    });

    const onClick = () => {
      sZoomlevel(4);
      // setIsUserLocation(true);
      if (navigator.geolocation) {
        const error = (error: any) => {
          if (error.code == 1) {
            setallowLocation(t("Please allow your Location"));
            setModelOpen(true);
          }
        };
        navigator.geolocation.getCurrentPosition(
          function (position) {
            Geocode.setApiKey(googleMapsConfig.googleMapsApiKey);
            Geocode.fromLatLng(
              position.coords.latitude.toString(),
              position.coords.longitude.toString()
            ).then(
              (response: any) => {
                if (response.results[0]) {
                  if (inputRef.current) {
                    inputRef.current.value =
                      response.results[0].formatted_address;
                  }

                  const pacInput: any = document?.getElementById("pac-input");
                  if (pacInput) {
                    pacInput.value = response.results[0].formatted_address;
                    pacInput.focus();
                  }

                  setallowLocation("");
                  searchActions.setUserLocation({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                  });
                }
              },
              (error: any) => {
                console.error(error);
                chek(false);
              }
            );

            searchActions.setUserLocation({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
            searchActions.setVertical(AnswerExperienceConfig.verticalKey);
            searchActions.setOffset(0);
            searchActions.setVerticalLimit(limit);
            searchActions.executeVerticalQuery();
          },
          error,
          {
            timeout: 10000,
          }
        );
      }
    };

    const setFilterOnSearch = () => {
      const filters: SelectableFilter[] = [];
      if (selectedFilters.length > 0) {
        selectedFilters.forEach((element: SelectableFilter) => {
          filters.push(element);
        });
      }

      searchActions.setStaticFilters(filters);
      searchActions.setOffset(0);
      searchActions.setVerticalLimit(limit);
      searchActions.executeVerticalQuery();
    };

    const onSubmit = (
      searchKey: string,
      isBackKey = false,
      callApiOnEmpty = false
    ) => {
      // setIsUserLocation(false);
      setNotFound(false);
      setErrorStatus(false);

      if (callApiOnEmpty && searchKey.length === 0) {
        if (props.meta.mode === "development") {
          window.history.replaceState({}, "", `/locatorSearch?locale=en_GB`);
        } else {
          window.history.replaceState(
            {},
            "",
            `/${_site.meta.locale}/index.html`
          );
        }
        const bounds = new google.maps.LatLngBounds();
        bounds.extend({
          lat: googleMapsConfig.centerLatitude,
          lng: googleMapsConfig.centerLongitude,
        });
        searchActions.setUserLocation({
          latitude: centerLat,
          longitude: centerLong,
        });
        searchActions.setOffset(0);
        searchActions.executeVerticalQuery();
        getCoordinates(searchKey);
      } else if (searchKey === "" && !isBackKey) {
        setErrorStatus(true);
      }
    };

    function getCoordinates(address: string) {
      fetch(
        "https://maps.googleapis.com/maps/api/geocode/json?address=" +
          address +
          "&key=AIzaSyDZNQlSlEIkFAct5VzUtsP4dSbvOr2bE18"
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.status === "OK") {
            data.results.map((res: any) => {
              const userlatitude = res.geometry.location.lat;
              const userlongitude = res.geometry.location.lng;
              searchActions.setOffset(0);
              searchActions.setQuery(address);
              searchActions.setUserLocation({
                latitude: userlatitude,
                longitude: userlongitude,
              });
              searchActions.executeVerticalQuery();
            });
          } else {
            searchActions.setUserLocation({
              latitude: centerLat,
              longitude: centerLong,
            });
            searchActions.setOffset(0);
            searchActions.setQuery(address);
            searchActions.executeVerticalQuery();
            if (inputRef.current?.value) {
              setNotFound(true);
              setErrorStatus(false);
            }
          }
        });
    }

    const _site = props._site;
    const { t } = useTranslation();

    React.useEffect(() => {
      setFilterOnSearch();
    }, [selectedFilters]);
    return (
      <div className="search-block">
        <div className="location-with-filter">
          <h3 className="title">{t("Enter a Town or Postcode")}</h3>

          {/* Use My Location */}
          <UsemylocationPopup
            onClick={onClick}
            useMyLocation={"Use my location"}
            modelopen={modelopen}
            setModelOpen={setModelOpen}
            allowlocation={allowlocation}
          />
        </div>

        {/* Search Input by name,address  */}
        <AutoSuggestions
          _site={_site}
          errorstatus={errorstatus}
          onSubmit={onSubmit}
          getCoordinates={getCoordinates}
          setNotFound={setNotFound}
          setErrorStatus={setErrorStatus}
          meta={props.meta}
          isReload={false}
        />

        <div className="flex items-start justify-between">
          {/* <Facets
            searchOnChange={true}
            searchable={false}
            collapsible={true}
            defaultExpanded={true}
            setActiveFacet={(index) => setActiveFacet(index)}
            activeFacet={activeFacet}
          /> */}
          <CustomFilter
            filters={_site.c_locatorFilter}
            setActiveFacet={(index) => setActiveFacet(index)}
            activeFacet={activeFacet}
            setSelectedFilters={setSelectedFilters}
            selectedFilters={selectedFilters}
          />
          <div className="ctaBtn">
            <Link
              className="onhighLight button"
              href={`${BaseUrl}/en-GB/all-addresses.html`}
            >
              {props.c_allAddressCTA
                ? props.c_allAddressCTA
                : t("All Addresses")}
            </Link>
          </div>
        </div>
      </div>
    );
  }
);
SearchFile.displayName = "SearchFile";
export default SearchFile;
