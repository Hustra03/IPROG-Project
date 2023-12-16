import { SearchView } from "../views/searchView";

//File mainly worked on by Erik Paulinder

export default
    function SearchPresenter(props) {
    let searchParams = props.model.searchParams;
    return (
        <div>
            <SearchView
                query={searchParams.query}
                tags={searchParams.type}
                genre={searchParams.genre}
                minMetacritic={searchParams.minMetacritic}
                maxMetacritic={searchParams.maxMetacritic}
                exact={searchParams.exact}
                fuzzy={searchParams.fuzzy}
                page_size={searchParams.page_size}
                asc={searchParams.asc}
                SortBy={searchParams.SortBy}
                searchResultsData={props.model.searchResultsPromiseState.data}
                onQueryInputChange={onQueryInputChangeCustomEventHandler}
                onTagsInputChange={onTagsInputChangeCustomEventHandler}
                onGenreInputChange={onGenreInputChangeCustomEventHandler}
                onSortByInputChange={onSortByInputChangeCustomEventHandler}
                onMinMetacriticChange={onMinMetacriticChangeCustomEventHandler}
                onMaxMetacriticChange={onMaxMetacriticChangeCustomEventHandler}
                onPageSizeChange={onPageSizeChangeCustomEventHandler}
                onExactChange={onExactInputChangeCustomEventHandler}
                onFuzzyChange={onFuzzyInputChangeCustomEventHandler}
                onDatesInputChange={onDatesInputChangeCustomEventHandler}
                onPlatformsInputChange={onPlatformsInputChangeCustomEventHandler}
                onSortAscChange={onSortByAscInputChangeCustomEventHandler}
                searchCustomEvent={onSearchButtonPressCustomEventHandler} />
        </div>
    );
    function onQueryInputChangeCustomEventHandler(query) {
        props.model.setSearchQuery(query);
    }

    function onTagsInputChangeCustomEventHandler(tags) { props.model.setSearchType(tags); }

    function onGenreInputChangeCustomEventHandler(genres) { props.model.setSearchGenre(genres); }

    function onMinMetacriticChangeCustomEventHandler(number) { props.model.setSearchMinMetacritic(number); }

    function onMaxMetacriticChangeCustomEventHandler(number) { props.model.setSearchMaxMetacritic(number); }
    function onPageSizeChangeCustomEventHandler(pageSize) { props.model.setSearchPageLimit(pageSize); }
    function onExactInputChangeCustomEventHandler(exact) { props.model.setSearchExactOnlyDisabled(exact) }
    function onFuzzyInputChangeCustomEventHandler(fuzzy) { props.model.setSearchFuzzyDisabled(fuzzy) }
    function onDatesInputChangeCustomEventHandler(dates) { props.model.setDates(dates); }
    function onPlatformsInputChangeCustomEventHandler(platforms) { props.model.setPlatform(platforms); }
    function onSortByInputChangeCustomEventHandler(ordering) { props.model.setSearchOrdering(ordering); }
    function onSortByAscInputChangeCustomEventHandler() { props.model.setAsc(!props.model.searchParams.asc); }

    function onSearchButtonPressCustomEventHandler() {
        props.model.doSearch(true, props.model.searchParams);
    }
}