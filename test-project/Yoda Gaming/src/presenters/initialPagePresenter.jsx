import { InitialPageView } from "../views/initialPageView";
import NoDataFoundView from "../views/noDataFoundView.jsx";
import { LoadingView } from "../views/loadingView.jsx";

//file mainly worked on by William Ma Jönsson
export default
    function InitialPagePresenter(props) {
        //{props.model.searchParams.search="TESTSEARCH"};
    
        function recentlyReleasedCategoryClickedACB(){
            props.model.setCurrentCat(1);
            props.model.nullifySearchParams();
            props.model.setSearchMinMetacritic(10);
            props.model.setSearchMaxMetacritic(100);
            props.model.setDates("2023-01-01,2023-12-31");
            props.model.doSearch(true);
        }
        function bestLastYearCategoryClickedACB(){
            //{props.model.setSearchTags("singleplayer")};
            props.model.setCurrentCat(2);
            props.model.nullifySearchParams();
            props.model.setSearchMinMetacritic(90);
            props.model.setSearchMaxMetacritic(100);
            props.model.setDates("2022-01-01,2022-12-31");
            props.model.doSearch(true);
        }
        function best2021CategoryClickedACB(){
            props.model.setCurrentCat(3)
            props.model.nullifySearchParams();
            props.model.setSearchMinMetacritic(90);
            props.model.setSearchMaxMetacritic(100);
            props.model.setDates("2021-01-01,2021-12-31");
            props.model.doSearch(true);
        }
        function seasonalCategoryClickedACB(){
            props.model.setCurrentCat(4);
            
            props.model.nullifySearchParams();
            props.model.setSearchQuery("santa");
            props.model.setSearchMinMetacritic(80);
            props.model.setSearchMaxMetacritic(100);
            props.model.setDates("2022-01-01,2023-12-31");
            props.model.doSearch(true);
        }

        function aboutCategoryClickedACB(){
            props.model.setCurrentCat(5);
            props.model.setShowAbout(true);
        }

        function thisMonthCategoryClickedACB(){
            props.model.setCurrentCat(6);
            props.model.setSearchQuery(null);
            props.model.setShowAbout(false);
            props.model.setSearchTags(null);
            props.model.setSearchGenres(null);
            props.model.setPlatform(null);
            props.model.setSearchMinMetacritic(0);
            props.model.setSearchMaxMetacritic(100);
            props.model.setDates("2023-12-01,2023-12-31");
            props.model.doSearch(true);
        }

        function clickedOnGameACB(game){
            props.model.setShowAbout(false);
            console.log("Fired Custom Event Click on game");
            props.model.setPage(game.id);
            props.model.changeUpdateViewHistoryValue(true); //time to update view history
        }

    return (
        <div>
            {initialSetup()}
        </div>
    );
        function initialSetup(){
            if (!props.model.searchResultsPromiseState.promise){
                return <NoDataFoundView/>
            }

            if(props.model.searchResultsPromiseState.data){
                return(
                
                    <div>
                        {console.log(props.model.searchResultsPromiseState.data)}
                        <InitialPageView
                        searchResults={props.model.searchResultsPromiseState.data}
                        searchParams={props.model.searchParams}
                        recentlyReleasedCategory={recentlyReleasedCategoryClickedACB}
                        gameDetails={clickedOnGameACB}
                        bestLastYearCategory={bestLastYearCategoryClickedACB}
                        best2021Category={best2021CategoryClickedACB}
                        seasonalCategory={seasonalCategoryClickedACB}
                        aboutCategory={aboutCategoryClickedACB}
                        thisMonthCategory={thisMonthCategoryClickedACB}
                        About={props.model.showAbout}
                        currentCat={props.model.currentCat}
                        promiseState={props.model.promiseState}
                        />
                    </div>
                
                )
            }

            if(!props.model.searchResultsPromiseState.error){
                return(
                    <div className="cursorLoading">
                        <LoadingView/>
                    </div>
                )
            }

            console.log(props.model.searchResultsPromiseState.error)
            return(
                <div className='homepageError'>
                    <div>Error!</div>
                    <div>{props.model.searchResultsPromiseState.error}</div>
                </div>
                
            )
            
            
        }
}