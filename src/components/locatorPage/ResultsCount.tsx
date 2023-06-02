import { useSearchState } from "@yext/search-headless-react";
import classNames from "classnames";
import * as React from "react";
import { useTranslation } from "react-i18next";
import {
  CompositionMethod,
  useComposedCssClasses,
} from "../../hooks/useComposedCssClasses";

interface ResultsCountCssClasses {
  container?: string;
  text?: string;
  number?: string;
}

const builtInCssClasses: ResultsCountCssClasses = {
  container: "pb-[2.5rem]",
  text: "text-sm",
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

export default function ResultsCount(props: Props) {
  const resultsCount =
    useSearchState((state) => state.vertical?.resultsCount) || 0;
  const resultsLength =
    useSearchState((state) => state.vertical?.results?.length) || 0;
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
  // const currentLast = offset + resultsLength;
  // const total = resultsCount;
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
