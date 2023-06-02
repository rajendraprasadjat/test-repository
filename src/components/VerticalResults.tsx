
import classNames from 'classnames';
import { CompositionMethod, useComposedCssClasses } from '../hooks/useComposedCssClasses';
import { useSearchState, Result } from "@yext/search-headless-react";
import * as React from 'react';

type CardComponentProps = any
interface VerticalResultsCssClasses {
  container?: string,
  labelContainer?: string,
  label?: string,
  selectedLabel?: string,
  leftIconContainer?: string,
  rightIconContainer?: string,
  icon?: string,
  results___loading?: string
  _site: any;
}

const builtInCssClasses: VerticalResultsCssClasses = {
  results___loading: 'opacity-50',
  _site: ""
}

interface VerticalResultsDisplayProps {
  CardComponent: CardComponentProps;
  cardConfig?: any;
  isLoading?: boolean;
  results: Result[];
  customCssClasses?: VerticalResultsCssClasses;
  cssCompositionMethod?: CompositionMethod;
  activeIndex: number | null;
  _site: any;
}

export function VerticalResultsDisplay(props: VerticalResultsDisplayProps): JSX.Element | null {
  const { _site, CardComponent, results, cardConfig = {}, isLoading = false, customCssClasses, cssCompositionMethod, activeIndex, } = props;
  const cssClasses = useComposedCssClasses(builtInCssClasses, customCssClasses, cssCompositionMethod);

  if (results.length === 0) {
    return null;
  }

  const resultsClassNames = classNames({
    [cssClasses.results___loading ?? '']: isLoading
  });

  return (
    <div className={resultsClassNames}>
      {results && results.map((result, index) => renderResult(CardComponent, cardConfig, result, _site, index + 1,
        activeIndex))}
    </div>
  )
}

function renderResult(CardComponent: CardComponentProps, cardConfig: any, result: Result, _site: any, index: number,
  activeIndex: number | null): JSX.Element {
  return <CardComponent result={result} configuration={cardConfig} key={result.id || result.index} index={index}
    activeIndex={activeIndex} _site={_site} />;
}

interface VerticalResultsProps {
  CardComponent: CardComponentProps,
  cardConfig?: any,
  displayAllOnNoResults?: boolean,
  customCssClasses?: VerticalResultsCssClasses,
  cssCompositionMethod?: CompositionMethod,
  locationResults: [],
  _site: any;
  activeIndex: number | null;
}

export default function VerticalResults(props: VerticalResultsProps): JSX.Element | null {

  const { displayAllOnNoResults = false, ...otherProps } = props;
  const verticalResults = props.locationResults || [];
  const allResultsForVertical = useSearchState(state => state.vertical?.noResults?.allResultsForVertical.results) || [];
  const isLoading = useSearchState(state => state.searchStatus.isLoading);

  let results: any = verticalResults;
  if (verticalResults.length === 0 && displayAllOnNoResults) {
    results = allResultsForVertical;
  }

  return (
    <>
      <VerticalResultsDisplay results={results} isLoading={isLoading} {...otherProps} />
    </>
  );
}


