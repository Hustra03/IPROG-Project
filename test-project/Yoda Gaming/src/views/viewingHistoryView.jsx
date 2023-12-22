import {CButton,COffcanvas,COffcanvasHeader,COffcanvasTitle,COffcanvasBody} from '@coreui/vue';
function ViewingHistoryView(props) {
//file mainly worked on by William Ma Jönsson
    function displayHistoryCB(game){
        
        return(
            <div className='hoverpointer' onClick={clickedOnGameHistoryHandlerACB}>
                <img src={game.image} className='homepageImage'></img>
                {game.name}
            </div>
        )
        function clickedOnGameHistoryHandlerACB(){
            props.getGameDetails(game);
            window.location.hash="/details";
        }
    }
    function showHistoryHandler(){
        props.showHistoryButton();
    }
    if(props.showHistory){
        return(
            <div className="ViewingHistory">
            <CButton onClick={showHistoryHandler} color="secondary">Hide History</CButton>
            <h1>History</h1>
            {[...props.viewHistory].reverse().map(displayHistoryCB)}
        </div>
        )
    }
    return (
        <div className="ViewingHistory">
            <CButton onClick={showHistoryHandler} color="secondary">Show History</CButton>
            <h1>History</h1>
        </div>
        
    )

}

export default ViewingHistoryView
/*

*/