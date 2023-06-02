import { useSearchState } from "@yext/search-headless-react";
import { limit } from "../config/globalConfig";

const useResultCount = () => {
  const resultsCount =
    useSearchState((state) => state.vertical?.resultsCount) || 0;
  const resultsLength =
    useSearchState((state) => state.vertical?.results?.length) || 0;
  const resutlOffset = useSearchState((state) => state.vertical?.offset) || 0;

  const alternateResultsCount =
    useSearchState(
      (state) => state.vertical?.noResults?.allResultsForVertical.resultsCount
    ) || 0;
  const alternateResultsLength =
    useSearchState(
      (state) =>
        state.vertical?.noResults?.allResultsForVertical.results?.length
    ) || 0;
  const pageLimit = useSearchState((state) => state.vertical.limit) || limit;

  const totalRecord = resultsCount > 0 ? resultsCount : alternateResultsCount;
  const showingCount =
    (resultsLength > 0 ? resultsLength : alternateResultsLength) + resutlOffset;
  const totalPage = Math.ceil(totalRecord / pageLimit);
  const currentPage = Math.ceil(showingCount / pageLimit);
  const isLastPage = currentPage === totalPage;
  const offset = pageLimit * currentPage;
  const returnData = {
    totalRecord,
    showingCount,
    offset,
    totalPage,
    currentPage,
    isLastPage,
    pageLimit,
  };

  return returnData;
};

export default useResultCount;
