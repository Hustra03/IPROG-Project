import { InitialPageView } from "../views/initialPageView";
//file mainly worked on by William Ma Jönsson
export default
    function InitialPagePresenter(props) {
        console.log("TESTTT")
        //{props.model.searchParams.search="TESTSEARCH"};
    
    function recentlyReleasedCategoryClicked(){
        {props.model.setSearchMinMetacritic(10)};
        {props.model.setSearchMaxMetacritic(100)};
        {props.model.setDates("2023-01-01,2023-12-31")};
        {props.model.doSearch(true)};
    }
    function bestLastYearCategoryClicked(){
        //{props.model.setSearchType("singleplayer")};
        {props.model.setSearchMinMetacritic(90)};
        {props.model.setSearchMaxMetacritic(100)};
        {props.model.setDates("2022-01-01,2022-12-31")};
        {props.model.doSearch(true)};
    }
    function best2021CategoryClicked(){
        {props.model.setSearchMinMetacritic(90)};
        {props.model.setSearchMaxMetacritic(100)};
        {props.model.setDates("2021-01-01,2021-12-31")};
        {props.model.doSearch(true)};
    }

    function clickedOnGame(game){
        console.log("Fired Custom Event Click on game");
        props.model.setPage(game.id);
    }

    return (
        <div>
            {initialSetup()}
        </div>
    );
        function initialSetup(){
            return(
                
                <div>
                    {console.log(props.model.searchResultsPromiseState.data)}
                    <InitialPageView
                    searchResults={props.model.searchResultsPromiseState.data}
                    searchParams={props.model.searchParams}
                    recentlyReleasedCategory={recentlyReleasedCategoryClicked}
                    gameDetails={clickedOnGame}
                    bestLastYearCategory={bestLastYearCategoryClicked}
                    best2021Category={best2021CategoryClicked}
                    />
                </div>
            
            )
            
        }
}