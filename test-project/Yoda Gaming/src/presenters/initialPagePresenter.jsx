import { InitialPageView } from "../views/initialPageView";
//file mainly worked on by William Ma Jönsson
export default
    function InitialPagePresenter(props) {
        //{props.model.searchParams.search="TESTSEARCH"};
    
    function recentlyReleasedCategoryClicked(){
        props.model.setCurrentCat(1);
        props.model.searchParams.search=null;
        props.model.setShowAbout(false);
        props.model.setSearchMinMetacritic(10);
        props.model.setSearchMaxMetacritic(100);
        props.model.setDates("2023-01-01,2023-12-31");
        props.model.doSearch(true);
    }
    function bestLastYearCategoryClicked(){
        //{props.model.setSearchType("singleplayer")};
        props.model.setCurrentCat(2);
        props.model.searchParams.search=null;
        props.model.setShowAbout(false);
        props.model.setSearchMinMetacritic(90);
        props.model.setSearchMaxMetacritic(100);
        props.model.setDates("2022-01-01,2022-12-31");
        props.model.doSearch(true);
    }
    function best2021CategoryClicked(){
        props.model.setCurrentCat(3);
        props.model.searchParams.search=null;
        props.model.setShowAbout(false);
        props.model.setSearchMinMetacritic(90);
        props.model.setSearchMaxMetacritic(100);
        props.model.setDates("2021-01-01,2021-12-31");
        props.model.doSearch(true);
    }
    function aboutCategoryClicked(){
        props.model.setCurrentCat(5);
        props.model.setShowAbout(true);
    }
    function clickedOnGame(game){
        props.model.setShowAbout(false);
        console.log("Fired Custom Event Click on game");
        props.model.setPage(game.id);
    }

    return (
        <div>
            {initialSetup()}
        </div>
    );
        function initialSetup(){
            if (!props.model.searchResultsPromiseState.promise){
                return <div>no data</div>
            }

            if(props.model.searchResultsPromiseState.data){
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
                        aboutCategory={aboutCategoryClicked}
                        About={props.model.showAbout}
                        currentCat={props.model.currentCat}
                        promiseState={props.model.promiseState}
                        />
                    </div>
                
                )
            }

            if(!props.model.searchResultsPromiseState.error){
                return(
                    <div>
                        
                        <div>Loading...</div>
                    </div>
                )
            }

            console.log(props.model.searchResultsPromiseState.error)
            return(
                <div>{props.model.searchResultsPromiseState.error}</div>
            )
            
            
        }
}