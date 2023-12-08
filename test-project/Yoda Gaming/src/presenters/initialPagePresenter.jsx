import { InitialPageView } from "../views/initialPageView";

export default
    function InitialPagePresenter(props) {
    return (
        <div>
            <InitialPageView searchParams={props.model.searchParams }/>
        </div>
    );
}