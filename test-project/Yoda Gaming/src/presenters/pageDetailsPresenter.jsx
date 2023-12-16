import PageDetailsView from '../views/pageDetailsView.jsx';

        //file mainly worked on by Viktor Fredlund

export default
function Details(props) {
    
    
    if(!props.model.currentPagePromiseState.promise){
        console.log("no data")
        return(
            <div>
            <p>no data</p>
            </div>
        )
    }
    if(!props.model.currentPagePromiseState.data && !props.model.currentPagePromiseState.error){
        console.log("loading")
        return(
            <div>
                <img src="https://brfenergi.se/iprog/loading.gif"></img>
            </div>
        )
    }
    if(!props.model.currentPagePromiseState.data && props.model.currentPagePromiseState.error){
        console.log("oopsie")
        return(
            <div>
                <p>{props.model.currentPagePromiseState.error}</p>
            </div>
        )
    }
    function showAllTagsCustomEventHandler(){
        props.model.toggleShowAllTags();
    }
    function addGameToSavedPagesCustomEventHandler(){
        props.model.addGameToSavedPages();
    }
    return (
        <div>
            <PageDetailsView 
            gameDetails={props.model.currentPagePromiseState.data} 
            yodafy={props.model.yodafy} showAllTags={props.model.showAllTags} 
            showAllTagsCustomEvent={showAllTagsCustomEventHandler} 
            addGameToSavedPagesCustomEvent={addGameToSavedPagesCustomEventHandler}
            loggedIn={props.model.user}/>
        </div>
    );
    
}