import { initializeApp } from "firebase/app";
import { getDatabase, ref, get, set, onValue } from "firebase/database";  //  NOTE:  had to add {ref} here, it was not imported

//File mainly worked on by Erik Paulinder


//  PATH is the “root” Firebase path. NN is your TW2_TW3 group number
const PATH = "ProjectGroup56";

import firebaseConfig from "./firebaseConfig.js";

// Initialise firebase app, database, ref
const app = initializeApp(firebaseConfig)
const db = getDatabase(app)

console.log("Database")
console.log(db)

import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from "firebase/auth"
const auth = getAuth(app);

const provider = new GoogleAuthProvider();

function modelToPersistenceUserData(model) {

    return {
        yodafy: model.yodafy,
        currentPage: model.currentPage,
        savedPages: model.savedPages,
    };
}

function persistenceToModelUserData(data, model) {
    if (!data) {//Sets initial values
        model.setYodafyValue(false);
        model.setPage(null)
        model.setSavedPages([])
        return;
    }
    if (data.yodafy) {
        model.setYodafyValue(data.yodafy);
    }
    else { model.setYodafyValue(false); }

    if (data.currentPage) {
        model.setPage(data.currentPage);
    }
    else { model.setPage(null) }

    if (data.savedPages) {
        model.setSavedPages(data.savedPages);
    }
    else { model.setSavedPages([]) }
}


function saveUserDataToFirebase(model) {
    if (model.ready && model.user) {

        set(ref(db, PATH + "/" + model.user.uid), modelToPersistenceUserData(model));
    }
}
function readUserDataFromFirebase(model) {

    if (model.ready && model.user) {

        onValue(ref(db, PATH + "/" + model.user.uid), (snapshot) => {
            const data = snapshot.val();
            persistenceToModelUserData(data, model);
        });

        model.ready = false;
        return getFromDatabaseACB().then(persistenceToModelACB).then(modelReadyCB);
    }

    function getFromDatabaseACB() { return get(ref(db, PATH + "/" + model.user.uid)) }
    function persistenceToModelACB(snapshot) {
        return persistenceToModelUserData(snapshot.val(), model);
    }
    function modelReadyCB() {
        model.ready = true;
    }
}

function modelToPersistenceGlobalData(model) {

    return {
        allUpvotes:model.allUpvotes,
    };
}

function persistenceToModelGlobalData(data, model) {
    if (!data) {//Sets initial values
        model.setAllUpvotes([]);
        return;
    }
    if (data.allUpvotes) {
        model.setAllUpvotes(data.allUpvotes);
    }
    else { model.setAllUpvotes([]); }
}

function saveGlobalDataToFirebase(model) {
    if (model.ready && model.user) {

        set(ref(db, PATH + "/" + "upvotes"), modelToPersistenceGlobalData(model));
    }
}
function readGlobalDataFromFirebase(model) {

    if (model.ready && model.user) {

        onValue(ref(db, PATH + "/" + "upvotes"), (snapshot) => {
            const data = snapshot.val();
            persistenceToModelGlobalData(data, model);
        });

        model.ready = false;
        return getFromDatabaseACB().then(persistenceToModelGlobalACB).then(modelReadyCB);
    }

    function getFromDatabaseACB() { return get(ref(db, PATH + "/" + "upvotes")) }
    function persistenceToModelGlobalACB(snapshot) {
        return persistenceToModelGlobalData(snapshot.val(), model);
    }
    function modelReadyCB() {
        model.ready = true;
    }
}

function connectToFirebase(model, watchFunction) {

    model.ready = true;
    onAuthStateChanged(auth, authChangeACB)

    function authChangeACB(user) {
        if (user) {
            model.setCurrentUser(user);

            readUserDataFromFirebase(model);

            readGlobalDataFromFirebase(model);//TODO check if it should be possible to read number of upvotes if not signed in, yes no?

            watchFunction(checkUserACB, effectUserACB);//Handles updates to user data, ex saved pages or current page
            
            watchFunction(checkGlobalACB, effectGlobalACB);//Handles updates to global data, ex upvotes
        }
    }

    function checkUserACB() {
        return [model.yodafy, model.currentPage, model.savedPages,model.allUpvotes]
    }
    function effectUserACB() {
        saveUserDataToFirebase(model);
        saveGlobalDataToFirebase(model);
    }

    function checkGlobalACB() {
        return [model.allUpvotes]
    }
    function effectGlobalACB() {
        saveGlobalDataToFirebase(model);
    }
}
export { auth, provider, signInWithPopup, signOut };

export default connectToFirebase;

//TODO If time create a watch function for each element, to reduce the size of each update