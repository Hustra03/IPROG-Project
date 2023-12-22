import ViewingHistoryView from "../views/viewingHistoryView";
//file mainly worked on by William Ma Jönsson
export default
    function ViewingHistoryPresenter(props) {
    return (
        <ViewingHistoryView 
        viewHistory={props.model.viewHistory}
        />
    );
}