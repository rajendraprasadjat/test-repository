import * as React from "react";
import SearchFile, { SearchFileHandle } from "./SearchFile";
import LocationCard from "./LocationCard";
import ResultsCount from "./ResultsCount";
import { Link } from "@yext/pages/components";
import VerticalResults from "../VerticalResults";
import { Wrapper } from "@googlemaps/react-wrapper";
import useFetchResults from "../../hooks/useFetchResults";
import { googleMapsConfig, limit } from "..//../config/globalConfig";
import { useSearchActions, useSearchState } from "@yext/search-headless-react";
import AlternateResultsCount from "./AlternateResultCount";
import InfiniteScroll from "react-infinite-scroll-component";
import useResultCount from "../../hooks/useResultCount";
import { GoogleMapsNew } from "./GoogleMapsNew";

export const getParams = (url: string) => {
  const urlSearchParams = new URLSearchParams(url);
  return Object.fromEntries(urlSearchParams.entries());
};

const SearchLayout = (props: any): JSX.Element => {
  const [zoomlevel, setZoomlevel] = React.useState(5);
  const searchRef = React.useRef<SearchFileHandle>(null);
  const [centerLatitude, setCenterLatitude] = React.useState(
    googleMapsConfig.centerLatitude
  );
  const [centerLongitude, setCenterLongitude] = React.useState(
    googleMapsConfig.centerLongitude
  );
  const resultCount =
    useSearchState((state) => state.vertical.resultsCount) || 0;
  const locationResults = useFetchResults() || [];
  const alternateResult =
    useSearchState(
      (s) => s.vertical.noResults?.allResultsForVertical.results
    ) || [];

  const { isLastPage, offset, showingCount } = useResultCount();
  const [check, setCheck] = React.useState(false);
  const [showNotFound, setShowNotFound] = React.useState(false);
  const [isApiLoaded, setIsApiLoaded] = React.useState(false);
  const searchActions = useSearchActions();

  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);

  const firstLoad = () => {
    const queryParams =
      typeof location !== "undefined"
        ? getParams(location?.search)
        : { query: "" };
    setCheck(true);
    /* if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        const params: any = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
        params1 = params;
        searchActions.setUserLocation(params1);
        searchActions.setVerticalLimit(limit);
        searchActions.setOffset(0);
        searchActions.executeVerticalQuery();
      });
    } */

    if (!isApiLoaded) {
      getCoordinates(queryParams.query ? queryParams.query : "");
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
        setIsApiLoaded(true);
        if (data.status === "OK") {
          data.results.map((res: any) => {
            const userlatitude = res.geometry.location.lat;
            const userlongitude = res.geometry.location.lng;
            searchActions.setOffset(0);
            searchActions.setQuery(address);
            searchActions.setVerticalLimit(limit);
            searchActions.setUserLocation({
              latitude: userlatitude,
              longitude: userlongitude,
            });
            searchActions.executeVerticalQuery();
          });
        } else {
          searchActions.setUserLocation({
            latitude: centerLatitude,
            longitude: centerLongitude,
          });
          searchActions.setOffset(0);
          searchActions.setVerticalLimit(limit);
          searchActions.setQuery(address);
          searchActions.executeVerticalQuery();
        }
      });
  }

  React.useEffect(() => {
    firstLoad();
    const defaultLatLng = props._site.c_countryFooter.find(
      (e: { language: any[] }) => {
        return e.language.find(
          (l: { languageCode: any }) =>
            l.languageCode === props._site.meta.locale
        );
      }
    );
    if (defaultLatLng) {
      setCenterLatitude(defaultLatLng.centerPoints.latitude);
      setCenterLongitude(defaultLatLng.centerPoints.longitude);
    }
  }, [searchRef.current]);

  const _site = props._site;

  const fetchMoreData = () => {
    searchActions.setOffset(offset);
    searchActions.executeVerticalQuery();
  };

  return (
    <>
      {/* {loader} */}
      <Wrapper
        apiKey={googleMapsConfig.googleMapsApiKey}
        language={"en_GB"}
        libraries={["places", "geometry"]}
      >
        <div className="locator-full-width place-content-center">
          <div className="locator-container">
            <SearchFile
              ref={searchRef}
              setCheck={setCheck}
              setShowNotFound={setShowNotFound}
              centerLatitude={centerLatitude}
              centerLongitude={centerLongitude}
              activeIndex={activeIndex}
              setActiveIndex={(i: React.SetStateAction<number | null>) =>
                setActiveIndex(i)
              }
              setZoomlevel={setZoomlevel}
              _site={_site}
              meta={props.meta}
            />
            {/* Map view and List View CTA in mobile responsive  */}
            <div className="mobile-btns">
              <Link
                className="button before-icon listBtn"
                href="/"
                onClick={(e) => {
                  e.preventDefault();
                  document.body.classList.remove("mapView");
                }}
              >
                Store List
              </Link>
              <Link
                className="button before-icon mapBtn"
                href="/"
                onClick={(e) => {
                  e.preventDefault();
                }}
              >
                Map View
              </Link>
            </div>

            {/* Map Section  */}
            <div className="map-section">
              <GoogleMapsNew
                apiKey={googleMapsConfig.googleMapsApiKey}
                centerLatitude={centerLatitude}
                centerLongitude={centerLongitude}
                defaultZoom={6}
                zoomLevel={zoomlevel}
                setZoomLevel={setZoomlevel}
                showEmptyMap={true}
                check={check}
                site={_site}
                locationResults={locationResults}
                alternateResult={alternateResult}
                activeIndex={activeIndex}
                setActiveIndex={(i: React.SetStateAction<number | null>) =>
                  setActiveIndex(i)
                }
              />
              {/* <ViewMore
                className={"button view-more before-icon"}
                idName={"listing-view-more-button"}
                buttonLabel={"Load More"}
                resetMap={() => {
                  setZoomlevel(4);
                  setActiveIndex(null);
                  $(".location-cart-element")
                    .removeClass("fixed-hover")
                    .removeClass("active");
                }}
              /> */}
            </div>

            {/* Result listing Section  */}
            <div className="result-listing">
              {resultCount > 0 ? (
                <ResultsCount />
              ) : (
                <>
                  {showNotFound && (
                    <p className="pt-2 pb-3 text-lg text-center no-lc-err-msg">
                      {_site.c_noLocationFound}
                    </p>
                  )}
                  <h3 className="title">
                    <AlternateResultsCount />
                  </h3>
                </>
              )}

              <InfiniteScroll
                dataLength={showingCount}
                next={fetchMoreData}
                hasMore={!isLastPage}
                loader={""}
                height={400}
                className="result-list"
              >
                {/* <PerfectScrollbar className="result-list"> */}
                {locationResults && locationResults.length > 0 && (
                  <div className="scrollbar-custom">
                    <VerticalResults
                      displayAllOnNoResults={false}
                      CardComponent={LocationCard}
                      locationResults={locationResults}
                      activeIndex={activeIndex}
                      _site={_site}
                    />
                  </div>
                )}
                {/* </PerfectScrollbar> */}
              </InfiniteScroll>
              {/* {locationResults && locationResults.length > 0 && (
                <ViewMore
                  className={"button view-more before-icon"}
                  idName={"listing-view-more-button"}
                  buttonLabel={"Load More"}
                  resetMap={() => {
                    setZoomlevel(4);
                    setActiveIndex(null);
                    $(".location-cart-element")
                      .removeClass("fixed-hover")
                      .removeClass("active");
                  }}
                />
              )} */}
            </div>
          </div>
        </div>
      </Wrapper>
    </>
  );
};
export default SearchLayout;
