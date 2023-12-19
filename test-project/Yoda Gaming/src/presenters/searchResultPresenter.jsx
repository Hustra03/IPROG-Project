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
            console.log(props.model.searchResultsPromiseState.data)
            return <SearchResultView 
                searchResults={props.model.searchResultsPromiseState.data} 
                chosenGame={chosenGameCustomEventHandler}
                loadMoreGames={loadMoreGamesCustomEventHandler}
            />
        }

        if (!props.model.searchResultsPromiseState.error){
            return <div className="searchResultLoading">Games are loading</div>
        }
        console.log(props.model.searchResultsPromiseState.error)
        return <div>{props.model.searchResultsPromiseState.error}</div>
    }

    function chosenGameCustomEventHandler(game){
        props.model.setPage(game.id)
    }

    function loadMoreGamesCustomEventHandler(){
        const numOfPages = props.model.searchParams.page_size;
        props.model.setSearchPageLimit(numOfPages + 10);
        props.model.doSearch(true);
    }
}

