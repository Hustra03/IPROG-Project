import "/src/teacherFetch.js"; // protection against fetch() in infinite re-render

//File mainly worked on by Erik Paulinder


// (1) ------------ application state (model) -----------
import model from "/src/websiteModel.js";
import { makeRouter } from "./VueRoot.jsx";
import { reactive, watch, createApp, h } from "vue";
// then use reactiveModel instead of model below!


// (2) ----------  display (mount) the root component in the browser page. Pass model(1) as prop. ---------
// http://localhost:8080/vue.html

window.React = { createElement: h };  // needed in the lab because it works with both React and Vue

import VueRoot from "./VueRoot.jsx";
import "/src/firebaseModel.js";
import connectToFirebase from "../firebaseModel.js";

model.ready = model.ready;
const reactiveModel = reactive(model);
const app = createApp(<VueRoot model={reactiveModel} />);
app.use(makeRouter(reactiveModel));


app.mount('#root');
// mounts the app in the page DIV with the id "root"
// to see the DIV, look at vue.html in the developer tools Sources
// vue.html, with the content <div id="root"></div> is configured in vite.config.js


reactiveModel.doSearch(false);//Performs initial search
reactiveModel.updateAvailablePlatforms();//Fetches available platforms from API
window.myModel = reactiveModel; // make the model available in the Console
connectToFirebase(reactiveModel, watch)//Initiate connection to firebase
window.addEventListener("hashchange", updateCurrentLocationACB)//Adds listener, which updates currentLocation to match window.location.hash
window.addEventListener("keydown", keydownEvent); //Adds listener, which searches if the user presses enter, but avoids repeating if the button is held in
reactiveModel.setCurrentLocation(window.location.hash);//Sets initial currentLocation to current hash, to allow breadcrumbs to be correct

function updateCurrentLocationACB()
{
    reactiveModel.setCurrentLocation(window.location.hash);
}

function keydownEvent(event)
{
    if (event.code == "Enter" && !event.repeat) {
        reactiveModel.doSearch(true);
        window.location.hash = "#/searchResult";
    }
    
}