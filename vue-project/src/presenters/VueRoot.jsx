import InitialPagePresenter from "./initialPagePresenter.jsx";

import { createRouter, createWebHashHistory, RouterView } from "vue-router";

export function makeRouter(model) {
    // model will be needed in a MVP application
    // not used here
    return createRouter({
        history: createWebHashHistory(),
        routes: [
            {
                path: "/",
                component: <InitialPagePresenter model={model} />,
            }
        ]
    });
}


export default
    function VueRoot(props) {

    if (!props.model.ready) {return <img src="https://brfenergi.se/iprog/loading.gif" alt="loading" />;}

    return (
        <div className="flexParent">
            <div className="mainContent">
                <RouterView />
            </div>
        </div>
    );

}

