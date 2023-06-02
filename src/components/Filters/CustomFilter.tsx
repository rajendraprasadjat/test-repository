import React from "react";
import { DocumentMeta } from "../../types/search/locations";
import { SelectableFilter, Matcher } from "@yext/search-headless-react";
export interface FacetConfig {
  searchable?: boolean;
  placeholderText?: string;
  label?: string;
  collapsible?: boolean;
  defaultExpanded?: boolean;
}

interface FacetsProps {
  searchOnChange?: boolean;
  searchable?: boolean;
  collapsible?: boolean;
  defaultExpanded?: boolean;
  facetConfigs?: Record<string, FacetConfig>;
  setActiveFacet?: (index: number) => void;
  activeFacet?: number;
  filters: any;
  setSelectedFilters: (selectedFilters: SelectableFilter[]) => void;
  selectedFilters: SelectableFilter[];
}

type FieldType = {
  name: string;
  meta: DocumentMeta;
  id: string;
}[];
interface FilterType {
  filterTitle: string;
  relatedField: FieldType;
}

function CustomFilter(props: FacetsProps) {
  const {
    setActiveFacet,
    activeFacet = 0,
    filters,
    setSelectedFilters,
    selectedFilters,
  } = props;

  return (
    <div className="filter-wrapper">
      <div className={"filter-items"}>
        {filters.map((e: FilterType, index: number) => {
          return (
            <React.Fragment key={index}>
              <div className="bold text-xl pb-2">
                <button
                  className="button"
                  onClick={() => {
                    if (setActiveFacet) {
                      setActiveFacet(index);
                    }
                  }}
                >
                  {e.filterTitle}
                </button>
              </div>
              {activeFacet === index && (
                <div className={"flex flex-wrap"}>
                  {e.relatedField.map((field) => {
                    const item = selectedFilters.find(
                      (e) => e.value === field.name
                    );

                    let fieldId = "c_relatedFeaturesProduct";
                    let type = "checkbox";
                    if (e.filterTitle === "Store Type") {
                      fieldId = "c_storeTypes";
                      type = "radio";
                    } else if (e.filterTitle === "Product Catagories") {
                      fieldId = "c_relatedFeaturesProduct";
                    } else if (e.filterTitle === "Services") {
                      fieldId = "c_locationServices";
                    }
                    return (
                      <div
                        className="flex items-center filter-option"
                        key={field.id}
                      >
                        <input
                          type={type}
                          value={field.id}
                          id={field.id}
                          // defaultChecked={item ? true : false}
                          checked={item ? true : false}
                          onChange={(e) => {
                            if (!item) {
                              const filter: SelectableFilter = {
                                selected: true,
                                fieldId: fieldId,
                                value: field.name,
                                matcher: Matcher.Equals,
                              };
                              if (type === "radio") {
                                const filters =
                                  selectedFilters.filter(
                                    (e) => e.fieldId !== fieldId
                                  ) || [];
                                filters.push(filter);
                                setSelectedFilters(filters);
                              } else {
                                setSelectedFilters([
                                  ...selectedFilters,
                                  filter,
                                ]);
                              }
                            } else {
                              const filters = selectedFilters.filter(
                                (e) => e.value !== field.name
                              );
                              setSelectedFilters(filters || []);
                            }
                          }}
                          className="w-3.5 h-3.5 form-checkbox cursor-pointer border border-gray-300 rounded-sm text-blue-600 focus:ring-blue-500"
                        />
                        <label
                          className={
                            "text-gray-500 text-sm font-normal cursor-pointer"
                          }
                          htmlFor={field.id}
                        >
                          {field.name}
                        </label>
                      </div>
                    );
                  })}
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}

export default CustomFilter;
