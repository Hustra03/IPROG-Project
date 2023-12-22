import {SearchResultView} from "../views/searchResultView";

//file mainly worked on by Eliaz Biderstrand

export default
    function SearchResultPresenter(props) {
        return (
            <div>
                {showResult()}
            </div>
        );

    function showResult(){
        if (!props.model.searchResultsPromiseState.promise) {
            return <div>no data found</div>
        }

        if (props.model.searchResultsPromiseState.data) {
            if (props.model.searchResultsPromiseState.data.length == 0){
                return <div className="searchResultNoGameFound">No Games Matching Your Search Could Be Found, Maybe Try Extending The Release Period?</div>
            }
            console.log(props.model.searchResultsPromiseState.data)
            return <SearchResultView 
                pages = {props.model.searchParams.page_size}
                search={props.model.search}
                searchResults={props.model.searchResultsPromiseState.data} 
                chosenGame={chosenGameCustomEventHandlerACB}
                loadMoreGames={loadMoreGamesCustomEventHandlerACB}
            />
        }

        if (!props.model.searchResultsPromiseState.error){
            return <div className="searchResultLoading">Games are loading</div>
        }

        console.log(props.model.searchResultsPromiseState.error)
        return <div>{props.model.searchResultsPromiseState.error}</div>
    }

    function chosenGameCustomEventHandlerACB(game){
        props.model.setPage(game.id)
        props.model.changeUpdateViewHistoryValue(true);
    }

    function loadMoreGamesCustomEventHandlerACB(){
        console.log(props.model.searchParams.page_size)
        if (props.model.searchParams.page_size < 40 ){
            props.model.setSearchPageLimit(props.model.searchParams.page_size + 10);
            props.model.doSearch(true);
        }
    }
}
