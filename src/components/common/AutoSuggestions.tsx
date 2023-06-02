import * as React from "react";
import { useEffect, useState } from "react";
import $ from "jquery";
import errorbox from "../../images/error-status-icon.png";
import { getParams } from "../locatorPage/SearchLayout";
import { useTranslation } from "react-i18next";
import PropTypes from 'prop-types';
import Searchbaricon from "../../svg_icons/SearchBarIcon";

interface AutoSuggestionsProps {
  setNotFound?: (value: boolean) => void;
  setErrorStatus?: (value: boolean) => void
  getCoordinates?: (value: string) => void
  onSubmit?: (address: string, isBackPress?: boolean, callApiOnEmpty?: boolean) => void
  errorstatus?: boolean
  _site: any
  meta: any
  isReload: boolean
}

const AutoSuggestions = ({
  setNotFound,
  setErrorStatus,
  getCoordinates,
  onSubmit,
  errorstatus = false,
  _site,
  meta,
  isReload = false,
}: AutoSuggestionsProps) => {
  const googleLib = typeof google !== "undefined" ? google : null;
  const queryParams =
    typeof location !== "undefined"
      ? getParams(location?.search)
      : { query: "" };
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState<string>(queryParams.query);
  const [autocomplete, setAutocomplete] =
    useState<google.maps.places.Autocomplete>();
  useEffect(() => {
    if (
      googleLib &&
      typeof google.maps === "object" &&
      inputRef.current &&
      !autocomplete
    ) {
      const options: any = {
        options: {
          language: ["en_GB", "fr-FR", "it-IT", "ja-JP", "de-DE"],
          //types: ["(regions)"],
          fields: ["address_component", "geometry"],
        },
      };
      const autoComplete = new google.maps.places.Autocomplete(
        inputRef.current,
        options
      );
      if (autoComplete) {
        const pacSelectFirst = (input: HTMLInputElement) => {
          const _addEventListener = input.addEventListener;
          function addEventListenerWrapper(type: string, listener: any) {
            if (type === "keydown") {
              const orig_listener = listener;

              listener = function (event: { which: number }) {
                const suggestion_selected = $(".pac-item-selected").length > 0;
                if (
                  (event.which == 13 || event.which == 9) &&
                  !suggestion_selected
                ) {
                  const simulated_downarrow = $.Event("keydown", {
                    keyCode: 40,
                    which: 40,
                  });
                  orig_listener.apply(input, [simulated_downarrow]);
                }
                orig_listener.apply(input, [event]);
              };
            }
            _addEventListener.apply(input, [type, listener]);
          }

          if (input.addEventListener) {
            input.addEventListener = addEventListenerWrapper;
          }
        };

        setAutocomplete(autoComplete);
        pacSelectFirst(inputRef.current);
        const queryParams =
          typeof location !== "undefined"
            ? getParams(location.search)
            : { query: "" };

        inputRef.current.value = queryParams.query ? queryParams.query : "";
        $("#search-location-button")
          .off("click")
          .on("click", function () {
            const keydown = document.createEvent("HTMLEvents");
            keydown.initEvent("keydown", true, false);
            Object.defineProperty(keydown, "keyCode", {
              get: function () {
                return 13;
              },
            });
            Object.defineProperty(keydown, "which", {
              get: function () {
                return 13;
              },
            });
            inputRef.current?.dispatchEvent(keydown);
          });

        google.maps.event.addListener(
          autoComplete,
          "place_changed",
          function () {
            const place = autoComplete.getPlace();

            if (setNotFound) {
              if (!place.address_components) {
                setNotFound(true);
              } else {
                setNotFound(false);
              }
            }
            if (inputRef.current?.value) {
              if (getCoordinates) { getCoordinates(inputRef.current?.value); }

              if (meta.mode === "development") {
                window.history.replaceState(
                  {},
                  "",
                  `/locatorSearch?locale=en_GB&query=${encodeURI(
                    inputRef.current?.value
                  )}`
                );
              } else {
                window.history.replaceState(
                  {},
                  "",
                  `/${_site.meta.locale}/index.html?query=${encodeURI(
                    inputRef.current?.value
                  )}`
                );
              }
              if (isReload) {
                window.location.reload();
              }
            }
          }
        );
      }
    }
    return () => {
      if (autocomplete) {
        autocomplete.unbindAll();
      }
    };
  }, [googleLib]);

  const { t } = useTranslation();
  return (
    <>
      <div className="search-form">
        <input
          id="pac-input"
          type="text"
          ref={inputRef}
          placeholder={t("Enter address, city, postalcode")}
          className="FilterSearchInput"
          onKeyUp={(evt) => {
            const value = inputRef.current?.value || "";
            if (setErrorStatus) { setErrorStatus(false); }
            if (evt.key === "Backspace" || evt.key === "Delete") {
              if (onSubmit) { onSubmit(value, true, inputValue ? true : false); }
              if (setErrorStatus) { setErrorStatus(false); }
            }
            setInputValue(value);
            if (evt.key === "Enter" && value.length === 0 && onSubmit) {
              onSubmit("");
            }
          }}
        />
        {errorstatus && (
          <span className="Error-msg">
            <img src={errorbox} />
            Please fill out this field
          </span>
        )}
        {/* Search icon Button  */}
        <button
          className="button"
          aria-label="Search bar icon"
          id="search-location-button"
        >
          <Searchbaricon/>
        </button>
      </div>
    </>
  );
};

AutoSuggestions.propTypes = {
  setNotFound: PropTypes.func,
  setErrorStatus: PropTypes.func,
  getCoordinates: PropTypes.func,
  onSubmit: PropTypes.func,
  errorstatus: PropTypes.bool,
  _site: PropTypes.object,
  meta: PropTypes.object,
  isReload: PropTypes.bool,
};

export default AutoSuggestions;
