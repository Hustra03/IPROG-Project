import {CButton,COffcanvas,COffcanvasHeader,COffcanvasTitle,COffcanvasBody} from '@coreui/vue';
function ViewingHistoryView(props) {
//file mainly worked on by William Ma Jönsson
    function displayHistoryACB(game){
        
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
    function showHistoryHandlerACB(){
        props.showHistoryButton();
    }
    if(props.showHistory){
        return(
            <div className="ViewingHistory">
            <CButton onClick={showHistoryHandlerACB} color="secondary">Hide History</CButton>
            {[...props.viewHistory].reverse().map(displayHistoryACB)}
        </div>
        )
    }
    return (
        <div className="ViewingHistory">
            <CButton onClick={showHistoryHandlerACB} color="secondary">Show History</CButton>
        </div>
        
    )

}

export default ViewingHistoryView
/*

*/