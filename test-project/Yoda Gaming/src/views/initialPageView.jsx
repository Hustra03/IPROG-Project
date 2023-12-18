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

    function displayGameCB(game){
        return(
            <div class='homepageGame' onClick={clickedOnGameHandlerACB} key={game.id}>
                <img src={game.background_image} height="400" width="600"></img>
                <div>{game.name}</div>
            </div>
        )
        function clickedOnGameHandlerACB(){
            props.gameDetails(game);
            window.location.hash="/details";
        }
    }

    return(
        <div>
            <div>
                <button className='homepageButton' onClick={recentlyReleasedHandlerACB}>Best this year</button>
                <button className='homepageButton' onClick={bestLastYearHandlerACB}>Best 2022</button>
                <button className='homepageButton' onClick={best2021HandlerACB}>Best 2021</button>
                <button className='homepageButton'>Seasonal</button>
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