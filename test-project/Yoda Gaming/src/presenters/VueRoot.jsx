import InitialPagePresenter from "./initialPagePresenter.jsx";

import { createRouter, createWebHashHistory, RouterView } from "vue-router";
import HeaderPresenter from "./headerPresenter.jsx";

export function makeRouter(model) {
    return createRouter({
        history: createWebHashHistory(),
        routes: [
            {
                path: "/",
                component: <InitialPagePresenter model={model} />,
            },
            {
                path: "/search",
                component: <searchPresenter model={model} />,
            },
            {
                path: "/results",
                component: <InitialPagePresenter model={model} />,
            },
            {
                path: "/savedPages",
                component: <InitialPagePresenter model={model} />,
            },
        ]
    });
}


export default
    function VueRoot(props) {

    //if (props.model.ready) {return <img src="https://brfenergi.se/iprog/loading.gif" alt="loading" />;}

    return (
        <div className="flexParent">
            <HeaderPresenter model={props.model} />
            <div className="mainContent">
                <RouterView />
            </div>
        </div>
    );

}

