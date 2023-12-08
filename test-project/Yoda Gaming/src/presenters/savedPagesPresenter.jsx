import {SavedPagesView} from "../views/savedPagesView";

//file mainly worked on by Eliaz Biderstrand

export default
    function SavedPagesPresenter(props) {
    return (
        <div>
            <SavedPagesView
                savedPages={props.model.savedPages}
            />
        </div>
    );
}