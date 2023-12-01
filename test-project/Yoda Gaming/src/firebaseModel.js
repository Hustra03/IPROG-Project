import { initializeApp } from "firebase/app";
import { getDatabase, ref, get, set, onValue } from "firebase/database";  //  NOTE:  had to add {ref} here, it was not imported

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

function modelToPersistence(model) {

    return {
        yodafy: model.yodafy,
        searchParam: model.searchParam,
    };
}

function persistenceToModel(data, model) {
    if (!data) {//Sets initial values
        model.setYodafyValue(false);
        model.setSearchParams({});
        //TODO return the promises from any searches
        return;
    }
    model.setYodafyValue(data.yodafy);
    if (data.searchParam) {

        model.setSearchParams(data.searchParam);
    }
    else { model.setSearchParams({}); }
    return;
}

function saveToFirebase(model) {
    if (model.user) {

        set(ref(db, PATH + "/model" + "/" + auth.currentUser.uid), modelToPersistence(model));
    }
}
function readFromFirebase(model) {

    if (model.user) {


        onValue(ref(db, PATH + "/model" + "/" + auth.currentUser.uid), (snapshot) => {
            const data = snapshot.val();
            persistenceToModel(data, model);
        });

        model.ready = false;
        return getFromDatabaseACB().then(persistenceToModelACB).then(modelReadyCB);
    }

    function getFromDatabaseACB() { return get(ref(db, PATH + "/model" + "/" + auth.currentUser.uid)) }
    function persistenceToModelACB(snapshot) {
        return persistenceToModel(snapshot.val(), model);
    }
    function modelReadyCB() {
        model.ready = true;
    }
}
function connectToFirebase(model, watchFunction) {

    onAuthStateChanged(auth, authChangeACB)

    function authChangeACB(user) {
        if (user) {
            model.user = user;
            readFromFirebase(model);
            watchFunction(checkACB, effectACB);
        }
    }
    function checkACB() {
        return [model.searchParam, model.yodafy]
    }
    function effectACB() {
        saveToFirebase(model);
    }
}
export { auth, provider, signInWithPopup, signOut };

export default connectToFirebase;

