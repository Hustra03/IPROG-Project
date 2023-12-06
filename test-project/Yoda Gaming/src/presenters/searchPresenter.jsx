import { SearchView } from "../views/searchView";
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
                SortBy={searchParams.SortBy}
                onQueryInputChange={onQueryInputChangeCustomEventHandler}
                onMinMetacriticChange={onMinMetacriticChangeCustomEventHandler}
                onMaxMetacriticChange={onMaxMetacriticChangeCustomEventHandler}
                
                onExactChange={onExactInputChangeCustomEventHandler}
                onFuzzyChange={onFuzzyInputChangeCustomEventHandler}
                searchCustomEvent={onSearchButtonPressCustomEventHandler} />
        </div>
    );
    function onQueryInputChangeCustomEventHandler(query) {
        props.model.setSearchQuery(query);
    }
    function onMinMetacriticChangeCustomEventHandler(number) { props.model.setSearchMinMetacritic(number); }

    function onMaxMetacriticChangeCustomEventHandler(number) { props.model.setSearchMaxMetacritic(number); }
    function onExactInputChangeCustomEventHandler(exact) { props.model.setSearchFuzzyDisabled(exact) }
    function onFuzzyInputChangeCustomEventHandler(fuzzy) { props.model.setSearchFuzzyDisabled(fuzzy) }

    function onSearchButtonPressCustomEventHandler() {
        props.model.doSearch(props.model.searchParams);
    }
}