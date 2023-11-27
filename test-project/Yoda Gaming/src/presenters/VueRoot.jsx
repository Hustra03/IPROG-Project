import InitialPagePresenter from "./initialPagePresenter.jsx";
import { HeaderView } from "../views/headerView.jsx";

import { createRouter, createWebHashHistory, RouterView } from "vue-router";

export function makeRouter(model) {
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

    if (props.model.ready) {return <img src="https://brfenergi.se/iprog/loading.gif" alt="loading" />;}

    return (
        <div className="flexParent">
            <div className="header">
                <HeaderView />
            </div>
            <div className="mainContent">
                <RouterView />
            </div>
        </div>
    );

}

