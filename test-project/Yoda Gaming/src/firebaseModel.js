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
    };
}

function persistenceToModel(data, model) {
    if (!data) {//Sets initial values
        model.setYodafyValue(false);
        model.setSearchParams({});
        //TODO return the promises from any searches
        return;
    }
    if (data.yodafy) {
        model.setYodafyValue(data.yodafy);
    }
    else { model.setYodafyValue(false); }
    return;//TODO return the promises from any searches
}

function saveToFirebase(model) {
    if (model.user && model.ready) {

        set(ref(db, PATH + "/" + model.user.uid), modelToPersistence(model));
    }
}
function readFromFirebase(model) {

    if (model.user && model.ready) {


        onValue(ref(db, PATH + "/" + model.user.uid), (snapshot) => {
            const data = snapshot.val();
            persistenceToModel(data, model);
        });

        model.ready = false;
        return getFromDatabaseACB().then(persistenceToModelACB).then(modelReadyCB);
    }

    function getFromDatabaseACB() { return get(ref(db, PATH + "/" + model.user.uid)) }
    function persistenceToModelACB(snapshot) {
        return persistenceToModel(snapshot.val(), model);
    }
    function modelReadyCB() {
        model.ready = true;
    }
}
function connectToFirebase(model, watchFunction) {

    model.ready=true;
    onAuthStateChanged(auth, authChangeACB)

    function authChangeACB(user) {
        if (user) {
            model.user = user;
            readFromFirebase(model);
            watchFunction(checkACB, effectACB);
        }
    }
    function checkACB() {
        return [model.yodafy]
    }
    function effectACB() {
        saveToFirebase(model);
    }
}
export { auth, provider, signInWithPopup, signOut };

export default connectToFirebase;

