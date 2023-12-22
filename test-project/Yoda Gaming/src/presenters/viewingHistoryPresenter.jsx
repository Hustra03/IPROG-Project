import ViewingHistoryView from "../views/viewingHistoryView";
//file mainly worked on by William Ma Jönsson
export default
    function ViewingHistoryPresenter(props) {

        function clickedGameInHistory(game){
            props.model.setShowAbout(false); //hide about page so if youre in about page and click game in history and return to homepage about will be hidden
            props.model.setPage(game.id); //set current page
            props.model.changeUpdateViewHistoryValue(true); //updates view history
        }

        function clickedShowHistory(){
            props.model.changeShowHistoryValue();
        }

    return (
        <ViewingHistoryView 
        viewHistory={props.model.viewHistory}
        getGameDetails={clickedGameInHistory}
        showHistoryButton={clickedShowHistory}
        showHistory={props.model.showHistory}
        />
    );
}