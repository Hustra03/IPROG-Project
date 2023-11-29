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
/*
    return {
        guests: model.numberOfGuests,
        currentDish: model.currentDish,
        dishesID: model.dishes.map(dishTransformCB).sort(intCB),
    };*/
}

function persistenceToModel(data, model) {
    // TODO return a promise
    /*if (!data) {
        model.setNumberOfGuests(2);
        model.setCurrentDish(null);
        model.dishes = [];
        return getMenuDetails(model.dishes).then(saveDishesToModelACB);
    }
    model.setNumberOfGuests(data.guests);
    model.setCurrentDish(data.currentDish);
    if (!data.dishesID) { data.dishesID = [] }
    return getMenuDetails(data.dishesID).then(saveDishesToModelACB);
    function saveDishesToModelACB(dishes) { model.dishes = dishes; }*/
}

function saveToFirebase(model) {
    if (model.ready) {

        set(ref(db, PATH + "/model" + "/" + auth.currentUser.uid), modelToPersistence(model));
    }
}
function readFromFirebase(model) {

    onValue(ref(db, PATH + "/model" + "/" + auth.currentUser.uid), (snapshot) => {
        const data = snapshot.val();
        persistenceToModel(data, model);
    });

    model.ready = false;
    return getFromDatabaseACB().then(persistenceToModelACB).then(modelReadyCB);

    function getFromDatabaseACB() { return get(ref(db, PATH + "/model" + "/" + auth.currentUser.uid)) }
    function persistenceToModelACB(snapshot) {
        return persistenceToModel(snapshot.val(), model);
    }
    function modelReadyCB() {
        model.ready = true;
    }
}
function connectToFirebase(model, watchFunction) {

    onAuthStateChanged(auth,authChangeACB)

    function authChangeACB(user)
    {
        if (user) {
            model.user=user;
            readFromFirebase(model);
            watchFunction(checkACB, effectACB);
        }
    }
    function checkACB() {
        return [model.numberOfGuests, model.currentDish, model.dishes]
    }
    function effectACB() {
        saveToFirebase(model);
    }
}
export {auth,provider,signInWithPopup,signOut};

export default connectToFirebase;

