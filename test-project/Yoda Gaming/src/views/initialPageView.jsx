import '@coreui/coreui/dist/css/coreui.min.css'
import "/src/style.css"
import {CCarousel, CCarouselItem, CCarouselCaption,CButton,CButtonGroup} from '@coreui/vue';
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

    function seasonalHandlerACB(){
        props.seasonalCategory();
    }

    function aboutHandlerACB(){
        props.aboutCategory();
    }

    function displayGameACB(game){
        return(
            <CCarouselItem key={game.id}>
                <img onClick={clickedOnGameHandlerACB} src={game.background_image} className='homepageImage'/>
                <CCarouselCaption>
                    <h1 onClick={clickedOnGameHandlerACB} className='homepageGame'>{game.name}</h1>
                </CCarouselCaption>
            </CCarouselItem>
        )
        function clickedOnGameHandlerACB(){
            props.gameDetails(game);
            window.location.hash="/details";
        }
    }
    
    if(props.About){
        return(
            <div className='homepageBackground'>
                <div>
                    <CButtonGroup>
                        <CButton color="success" size="lg" onClick={recentlyReleasedHandlerACB}>Best this year</CButton>
                        <CButton color="success" size="lg" onClick={bestLastYearHandlerACB}>Best 2022</CButton>
                        <CButton color="success" size="lg" onClick={best2021HandlerACB}>Best 2021</CButton>
                        <CButton color="success" size="lg" onClick={seasonalHandlerACB}>Seasonal</CButton>
                        <CButton color="success" size="lg" disabled={props.currentCat===5} onClick={aboutHandlerACB}>About</CButton>
                    </CButtonGroup>
                </div>
            <div className='homepageAbout'>Hrrmmm. A gaming wiki created by me(Yoda<img src='https://www.shareicon.net/data/32x32/2015/07/18/71338_user_32x32.png'></img>) to learn about the best games Yoda gaming is,
                home to a large community of Jedi and Sith gamers alike it is, all equal on Yoda gaming we are.
                My children/5 ratings for games are.
            </div>
                <div className='homepagePictureOfYodaFamilyText'>A picture of my 5 children here is ↓</div>
                <img className='yodaFamily' src='https://www.shareicon.net/data/32x32/2015/07/18/71338_user_32x32.png'></img>
                <img className='yodaFamily' src='https://www.shareicon.net/data/32x32/2015/07/18/71338_user_32x32.png'></img>
                <img className='yodaFamily' src='https://www.shareicon.net/data/32x32/2015/07/18/71338_user_32x32.png'></img>
                <img className='yodaFamily' src='https://www.shareicon.net/data/32x32/2015/07/18/71338_user_32x32.png'></img>
                <img className='yodaFamily' src='https://www.shareicon.net/data/32x32/2015/07/18/71338_user_32x32.png'></img>

                <div className='homepageRealAbout'>(Website created by Yoda, Erik Paulinder, Eliaz Biderstrand, Viktor Fredlund and William Ma Jönsson. All images, un-yodafied descriptions, tags, ratings (all data on games) are from RAWG API)</div>
            </div>
            
        )
    }
    
    return(
        
        <div className='homepageBackground'>
            <div> {console.log("about:"+props.About)}
                <CButtonGroup>
                    <CButton color="success" size="lg" disabled={props.currentCat === 1} onClick={recentlyReleasedHandlerACB}>Best this year</CButton>
                    <CButton color="success" size="lg" disabled={props.currentCat === 2} onClick={bestLastYearHandlerACB}>Best 2022</CButton>
                    <CButton color="success" size="lg" disabled={props.currentCat === 3} onClick={best2021HandlerACB}>Best 2021</CButton>
                    <CButton color="success" size="lg" disabled={props.currentCat === 4} onClick={seasonalHandlerACB}>Seasonal</CButton>
                    <CButton color="success" size="lg" onClick={aboutHandlerACB}>About</CButton>
                </CButtonGroup>
                
                <a className='rawgHyperLink' href='https://rawg.io/apidocs'>Data from RAWG Api</a>
            </div>

            <div className='homepageCarouselDescription'>
            ↓TOP GAMES↓
            </div>

            <span>
                <CCarousel controls indicators>
                {props.searchResults.map(displayGameACB)}
                </CCarousel>
                
            </span>
        </div>
    )
    /*

    <div class='homepageScroller'>
                {props.searchResults.map(displayGameCB)}
            </div>


    function displayGameCB(game){
        return(
            <div className='homepageGame' onClick={clickedOnGameHandlerACB} key={game.id}>
                <img className='homepageImage' src={game.background_image} height="400" width="600"></img>
                <div>{game.name}</div>
            </div>

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