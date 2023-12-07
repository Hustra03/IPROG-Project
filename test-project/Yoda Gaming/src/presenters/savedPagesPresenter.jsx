import {SavedPagesView} from "../views/savedPagesView";

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