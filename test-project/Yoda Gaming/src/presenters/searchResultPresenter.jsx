import {SearchResultView} from "../views/searchResultView";

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
            return <SearchResultView searchResults={props.model.searchResultsPromiseState.data} chosenGame={chosenGameCustomEventHandler}/>
        }

        if (!props.model.searchResultsPromiseState.error){
            return <div>loading</div>
        }
        console.log(props.model.searchResultsPromiseState.error)
        return <div>{props.model.searchResultsPromiseState.error}</div>
    }

    function chosenGameCustomEventHandler(game){
        props.model.setPage(game.id)
    }
}

