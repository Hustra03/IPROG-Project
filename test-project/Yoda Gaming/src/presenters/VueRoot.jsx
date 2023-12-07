import InitialPagePresenter from "./initialPagePresenter.jsx";
import Details from "./pageDetailsPresenter.jsx";
import { createRouter, createWebHashHistory, RouterView } from "vue-router";
import HeaderPresenter from "./headerPresenter.jsx";
import SearchPresenter from "./searchPresenter.jsx";
import SearchResultPresenter from "./searchResultPresenter.jsx";
import ViewingHistoryPresenter from "./viewingHistoryPresenter.jsx";

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
                component: <SearchPresenter model={model} />,
            },
            {
                path: "/searchResult",
                component: <SearchResultPresenter model={model} />,
            },
            {
                path: "/results",
                component: <InitialPagePresenter model={model} />,
            },
            {
                path: "/savedPages",
                component: <InitialPagePresenter model={model} />,
            },
            {
                path: "/details",
                component: <Details model={model} />,
            }
        ]
    });
}


export default
    function VueRoot(props) {

    if (!props.model.ready) {return <img src="https://brfenergi.se/iprog/loading.gif" alt="loading" />;}

    return (
        <div className="flexParent">
            <HeaderPresenter model={props.model} />
            <div className="mainContent">
                <div className="viewHistory">
                    <ViewingHistoryPresenter/>
                </div>
                <div className="mainPage">
                <RouterView /></div>
            </div>
        </div>
    );

}

