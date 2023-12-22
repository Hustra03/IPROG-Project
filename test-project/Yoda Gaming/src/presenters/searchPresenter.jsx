import { SearchView } from "../views/searchView";

//File mainly worked on by Erik Paulinder

export default
    function SearchPresenter(props) {
    let searchParams = props.model.searchParams;
    return (
        <div>
            <SearchView
                query={searchParams.query}
                tags={searchParams.tags}
                genre={searchParams.genres}
                minMetacritic={searchParams.minMetacritic}
                maxMetacritic={searchParams.maxMetacritic}
                exact={searchParams.exact}
                fuzzy={searchParams.fuzzy}
                page_size={searchParams.page_size}
                asc={searchParams.asc}
                dates={searchParams.dates}
                platform={searchParams.platforms}
                SortBy={searchParams.SortBy}
                allPlatforms={props.model.allPlatformsPromiseState.data}
                searchResultsData={props.model.searchResultsPromiseState.data}
                onQueryInputChangeCustomEventCB={onQueryInputChangeCustomEventHandler}
                onTagsInputChangeCustomEventCB={onTagsInputChangeCustomEventHandler}
                onGenreInputChangeCustomEventCB={onGenreInputChangeCustomEventHandler}
                onSortByInputChangeCustomEventCB={onSortByInputChangeCustomEventHandler}
                onMinMetacriticChangeCustomEventCB={onMinMetacriticChangeCustomEventHandler}
                onMaxMetacriticChangeCustomEventCB={onMaxMetacriticChangeCustomEventHandler}
                onPageSizeChangeCustomEventCB={onPageSizeChangeCustomEventHandler}
                onExactChangeCustomEventCB={onExactInputChangeCustomEventHandler}
                onFuzzyChangeCustomEventCB={onFuzzyInputChangeCustomEventHandler}
                onDatesInputChangeCustomEventCB={onDatesInputChangeCustomEventHandler}
                onPlatformsInputChangeCustomEventCB={onPlatformsInputChangeCustomEventHandler}
                onSortAscChangeCustomEventCB={onSortByAscInputChangeCustomEventHandler}
                searchCustomEventCB={onSearchButtonPressCustomEventHandler} />
        </div>
    );
    function onQueryInputChangeCustomEventHandler(query) {
        props.model.setSearchQuery(query);
    }

    function onTagsInputChangeCustomEventHandler(tags) { props.model.setSearchTags(tags); }

    function onGenreInputChangeCustomEventHandler(genres) { props.model.setSearchGenres(genres); }

    function onMinMetacriticChangeCustomEventHandler(number) { props.model.setSearchMinMetacritic(number); }

    function onMaxMetacriticChangeCustomEventHandler(number) { props.model.setSearchMaxMetacritic(number); }
    function onPageSizeChangeCustomEventHandler(pageSize) { props.model.setSearchPageLimit(pageSize); }
    function onExactInputChangeCustomEventHandler(exact) { props.model.setSearchExactOnlyDisabled(exact) }
    function onFuzzyInputChangeCustomEventHandler(fuzzy) { props.model.setSearchFuzzyDisabled(fuzzy) }
    function onDatesInputChangeCustomEventHandler(dates) { props.model.setDates(dates); }
    function onPlatformsInputChangeCustomEventHandler(platform) { props.model.setPlatform(platform); }
    function onSortByInputChangeCustomEventHandler(ordering) { props.model.setSearchOrdering(ordering); }
    function onSortByAscInputChangeCustomEventHandler() { props.model.setAsc(!props.model.searchParams.asc); }

    function onSearchButtonPressCustomEventHandler() {
        props.model.doSearch(true);
    }
}