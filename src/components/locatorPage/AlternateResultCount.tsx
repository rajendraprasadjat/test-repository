import { useSearchState } from "@yext/search-headless-react";
import classNames from "classnames";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { CompositionMethod, useComposedCssClasses } from "../../hooks/CompositionMethod";
interface ResultsCountCssClasses {
  container?: string;
  text?: string;
  number?: string;
}

const builtInCssClasses: ResultsCountCssClasses = {
  container: "pb-0 md:pb-0 pl-2 number-count",
  text: "max-[425px]:text-[0.625rem] leading-[initial] text-xs md:text-sm text-gray-700",
  number: "font-medium",
};

interface Props {
  customCssClasses?: ResultsCountCssClasses;
  cssCompositionMethod?: CompositionMethod;
}

export interface ResultsCountConfig {
  resultsCount?: number;
  resultsLength?: number;
  offset?: number;
  customCssClasses?: ResultsCountCssClasses;
  cssCompositionMethod?: CompositionMethod;
}

export default function AlternateResultsCount(props: Props) {
  const resultsCount =
  useSearchState(state => state.vertical?.noResults?.allResultsForVertical.resultsCount) || 0;
  const resultsLength =
  useSearchState(state => state.vertical?.noResults?.allResultsForVertical.results?.length) || 0;
  const offset = useSearchState((state) => state.vertical?.offset) || 0;
  

  return (
    <ResultsCountDisplay
      resultsCount={resultsCount}
      resultsLength={resultsLength}
      offset={offset}
      {...props}
    />
  );
}

export function ResultsCountDisplay({
  resultsCount = 0,
  resultsLength = 0,
  offset = 0,
  customCssClasses,
  cssCompositionMethod,
}: ResultsCountConfig): JSX.Element | null {
  const cssClasses = useComposedCssClasses(
    builtInCssClasses,
    customCssClasses,
    cssCompositionMethod
  );
  const { t } = useTranslation();
  if (resultsLength === 0) {
    return null;
  }
  const currentFirst = 1;
  const messageArray = [
    t("Showing Result Count", {
      currentFirst,
      currentLast: offset + resultsLength,
      total: resultsCount,
    }),
  ];

  const spanArray = messageArray.map((value, index) => {
    const isNumber = typeof value === "number";

    const classes = classNames(cssClasses.text, {
      [cssClasses.number ?? ""]: isNumber,
    });

    return (
      <span key={`${index}-${value}`} className={classes}>
        {value}
      </span>
    );
  });

  return <div className={cssClasses.container}>{spanArray}</div>;
}
