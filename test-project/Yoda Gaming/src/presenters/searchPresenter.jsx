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
                onQueryInputChangeCustomEventCB={onQueryInputChangeCustomEventHandlerACB}
                onTagsInputChangeCustomEventCB={onTagsInputChangeCustomEventHandlerACB}
                onGenreInputChangeCustomEventCB={onGenreInputChangeCustomEventHandlerACB}
                onSortByInputChangeCustomEventCB={onSortByInputChangeCustomEventHandlerACB}
                onMinMetacriticChangeCustomEventCB={onMinMetacriticChangeCustomEventHandlerACB}
                onMaxMetacriticChangeCustomEventCB={onMaxMetacriticChangeCustomEventHandlerACB}
                onPageSizeChangeCustomEventCB={onPageSizeChangeCustomEventHandlerACB}
                onExactChangeCustomEventCB={onExactInputChangeCustomEventHandlerACB}
                onFuzzyChangeCustomEventCB={onFuzzyInputChangeCustomEventHandlerACB}
                onDatesInputChangeCustomEventCB={onDatesInputChangeCustomEventHandlerACB}
                onPlatformsInputChangeCustomEventCB={onPlatformsInputChangeCustomEventHandlerACB}
                onSortAscChangeCustomEventCB={onSortByAscInputChangeCustomEventHandlerACB}
                searchCustomEventCB={onSearchButtonPressCustomEventHandlerACB} />
        </div>
    );
    function onQueryInputChangeCustomEventHandlerACB(query) {
        props.model.setSearchQuery(query);
    }

    function onTagsInputChangeCustomEventHandlerACB(tags) { props.model.setSearchTags(tags); }

    function onGenreInputChangeCustomEventHandlerACB(genres) { props.model.setSearchGenres(genres); }

    function onMinMetacriticChangeCustomEventHandlerACB(number) { props.model.setSearchMinMetacritic(number); }

    function onMaxMetacriticChangeCustomEventHandlerACB(number) { props.model.setSearchMaxMetacritic(number); }
    function onPageSizeChangeCustomEventHandlerACB(pageSize) { props.model.setSearchPageLimit(pageSize); }
    function onExactInputChangeCustomEventHandlerACB(exact) { props.model.setSearchExactOnlyDisabled(exact) }
    function onFuzzyInputChangeCustomEventHandlerACB(fuzzy) { props.model.setSearchFuzzyDisabled(fuzzy) }
    function onDatesInputChangeCustomEventHandlerACB(dates) { props.model.setDates(dates); }
    function onPlatformsInputChangeCustomEventHandlerACB(platform) { props.model.setPlatform(platform); }
    function onSortByInputChangeCustomEventHandlerACB(ordering) { props.model.setSearchOrdering(ordering); }
    function onSortByAscInputChangeCustomEventHandlerACB() { props.model.setAsc(!props.model.searchParams.asc); }

    function onSearchButtonPressCustomEventHandlerACB() {
        props.model.doSearch(true);
    }
}