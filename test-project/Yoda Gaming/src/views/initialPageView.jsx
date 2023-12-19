import '@coreui/coreui/dist/css/coreui.min.css'
import "/src/style.css"

//file mainly worked on by William Ma Jönsson
function InitialPageView(props) {

    function asc ()
    {
        if (props.searchParams.asc) { return <div>Reverse Sort : true</div>}
        return <div>Reverse Sort : false</div>
    }

    function recentlyReleasedHandlerACB(){
        props.recentlyReleasedCategory();
    }
    function bestLastYearHandlerACB(){
        props.bestLastYearCategory();
    }
    function best2021HandlerACB(){
        props.best2021Category();
    }
    function aboutHandlerACB(){
        props.aboutCategory();
    }
    function displayGameCB(game){
        return(
            <div className='homepageGame' onClick={clickedOnGameHandlerACB} key={game.id}>
                <img className='homepageImage' src={game.background_image} height="400" width="600"></img>
                <div>{game.name}</div>
            </div>
        )
        function clickedOnGameHandlerACB(){
            props.gameDetails(game);
            window.location.hash="/details";
        }
    }
    
    if(props.About){
        return(
            <div>
                <div> {console.log("about:"+props.About)}
                <button className='homepageButton' onClick={recentlyReleasedHandlerACB}>Best this year</button>
                <button className='homepageButton' onClick={bestLastYearHandlerACB}>Best 2022</button>
                <button className='homepageButton' onClick={best2021HandlerACB}>Best 2021</button>
                <button className='homepageButton'>Seasonal(not done)</button>
                <button className='homepageButton' disabled={props.currentCat===5} onClick={aboutHandlerACB}>About</button>
            </div>
                <div className='homepageAbout'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                 incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
                  nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
                   dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia 
                   deserunt mollit anim id est laborum.</div>
            </div>
            
        )
    }
    
    return(
        
        <div>
            <div> {console.log("about:"+props.About)}
                <button className='homepageButton' disabled={props.currentCat === 1} onClick={recentlyReleasedHandlerACB}>Best this year</button>
                <button className='homepageButton' disabled={props.currentCat === 2} onClick={bestLastYearHandlerACB}>Best 2022</button>
                <button className='homepageButton' disabled={props.currentCat === 3} onClick={best2021HandlerACB}>Best 2021</button>
                <button className='homepageButton' disabled={props.currentCat === 4} >Seasonal(not done)</button>
                <button className='homepageButton' onClick={aboutHandlerACB}>About</button>
            </div>
        
            <div class='homepageScroller'>
                {props.searchResults.map(displayGameCB)}
            </div>
        </div>
    )
    /*
    return (
        <div>
            <div> Popular singleplayer games </div>
            <div>Query : {props.searchParams.search}</div>
            <div>Tags : {props.searchParams.tags}</div>
            <div>Genre : {props.searchParams.genres}</div>
            <div>Sort By : {props.searchParams.ordering}</div>
            {asc()}
            <div>MinMetacritic : {props.searchParams.minMetacritic}</div>
            <div>MaxMetacritic : {props.searchParams.maxMetacritic}</div>
            <div>Page Size : {props.searchParams.page_size}</div>
            <div>Fuzzy : {props.searchParams.fuzzy}</div>
            <div>Exact : {props.searchParams.exact}</div>
            <div>Dates : {props.searchParams.dates}</div>
            <div>Platforms : {props.searchParams.platforms}</div>

        </div >
    )*/

}

export { InitialPageView }