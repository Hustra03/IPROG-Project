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
            return <SearchResultView model={props.model} searchResults={props.model.searchResultsPromiseState.data}/>
        }

        if (!props.model.searchResultsPromiseState.error){
            return <div>loading</div>
        }
        console.log(props.model.searchResultsPromiseState.error)
        return <div>{props.model.searchResultsPromiseState.error}</div>
    }
}