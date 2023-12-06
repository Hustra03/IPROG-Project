import { SearchView } from "../views/searchView";
export default
    function SearchPresenter(props) {
    return (
        <div>
            <SearchView
                model={props.model}
                searchCustomEvent={onSearchButtonPressCustomEventHandler}
                onSearchInputChange={onSearchInputChangeCustomEventHandler} />
        </div>
    );
    function onSearchInputChangeCustomEventHandler(text) {
        props.model.setSearchQuery(text);
    }
    function onSearchButtonPressCustomEventHandler() {
        props.model.doSearch(props.model.searchParams);
    }
}