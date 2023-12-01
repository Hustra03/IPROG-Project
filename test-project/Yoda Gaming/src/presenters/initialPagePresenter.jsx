import { InitialPageView } from "../views/initialPageView";

export default
    function InitialPagePresenter(props) {
    return (
        <div>
            <InitialPageView model={props.model }/>
        </div>
    );
}