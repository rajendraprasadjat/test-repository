/* eslint-disable react/jsx-key */
import * as React from "react";
import { limit } from "..//../config/globalConfig";
import {
  useSearchState,
  useSearchActions,
  DisplayableFacetOption,
} from "@yext/search-headless-react";
import {
  CompositionMethod,
  useComposedCssClasses,
} from "../../hooks/useComposedCssClasses";
import Facet, { FacetConfig, FacetCssClasses } from "./Facet";

interface FacetsProps {
  searchOnChange?: boolean;
  searchable?: boolean;
  collapsible?: boolean;
  defaultExpanded?: boolean;
  facetConfigs?: Record<string, FacetConfig>;
  customCssClasses?: FacetsCssClasses;
  cssCompositionMethod?: CompositionMethod;
  setActiveFacet?: (index: number) => void;
  activeFacet?: number;
}

interface FacetsCssClasses extends FacetCssClasses {
  container?: string;
  divider?: string;
  buttonsContainer?: string;
  button?: string;
}

const builtInCssClasses: FacetsCssClasses = {
  searchableInputElement:
    "text-sm bg-white h-9 w-full outline-none p-2 mb-2 rounded-md border border-gray-300 focus:border-blue-600",
  container: "w-full",
  buttonsContainer: "flex justify-between mt-5",
  button: "border border-gray-300 px-2.5 py-1 rounded-md",
  divider: "w-full h-px bg-gray-200 my-4",
};

export default function Facets(props: FacetsProps): JSX.Element {
  const {
    searchOnChange,
    searchable,
    collapsible,
    defaultExpanded,
    facetConfigs = {},
    customCssClasses,
    cssCompositionMethod,
    setActiveFacet = () => { "" },
    activeFacet = 0,
  } = props;
  const cssClasses = useComposedCssClasses(
    builtInCssClasses,
    customCssClasses,
    cssCompositionMethod
  );
  const facets = useSearchState((state) => state.filters?.facets) || [];

  const searchAction = useSearchActions();
  const executeSearch = () => {
    searchAction.setOffset(0);
    searchAction.setVerticalLimit(limit);
    searchAction.executeVerticalQuery();
  };


  const handleFacetOptionChange = (
    fieldId: string,
    option: DisplayableFacetOption
  ) => {
    searchAction.setFacetOption(fieldId, option, !option.selected);
    if (searchOnChange) {
      executeSearch();
    }
  };

  const facetComponents = facets
    .filter((facet) => facet.options?.length > 0)
    .map((facet, index) => {
      return (
        <div className="bold text-xl pb-2">
          <button className="button" onClick={() => setActiveFacet(index)}>
            {facet.displayName}
          </button>
        </div>
      );
    });

  const facetComponentOptions = facets
    .filter((facet) => facet.options?.length > 0)
    .map((facet, index) => {
      const overrideConfig = facetConfigs?.[facet.fieldId] ?? {};
      const config = {
        searchable,
        collapsible,
        defaultExpanded,
        ...overrideConfig,
      };

      return (
        <div className="bold text-xl pb-2">
          {activeFacet === index && (
            <div key={facet.fieldId}>
              <Facet
                facet={facet}
                {...config}
                customCssclasses={cssClasses}
                onToggle={handleFacetOptionChange}
              />
            </div>
          )}
        </div>
      );
    });

  return (
    <div className="filter-wrapper">
      <div className={cssClasses.container + " filter-items"}>
        {facetComponents}
      </div>

      <div className={cssClasses.container + " filter-item-options"}>
        {facetComponentOptions}
      </div>
    </div>
  );
}
