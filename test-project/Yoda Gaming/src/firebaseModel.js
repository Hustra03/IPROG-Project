import { initializeApp } from "firebase/app";
import {getDatabase} from "firebase/database";
// you will find 2 imports already there, add the configuration and instantiate the app and database:

//  PATH is the “root” Firebase path. NN is your TW2_TW3 group number
const PATH = "ProjectGroup56";

// Add relevant imports here
import firebaseConfig from "./firebaseConfig.js";

// Initialise firebase app, database, ref
// TODO
const app = initializeApp(firebaseConfig)
//const db = getDatabase(app)

const db="nothing";

console.log("Database")
console.log(db)
const modelRef = ref(db, PATH + "/model")

function modelToPersistence(model) {

  return {
    guests: model.currentPage,
  };
}

function persistenceToModel(data, model) {
  // TODO return a promise
  if (!data) {
    model.setNumberOfGuests(2);
    model.setCurrentDish(null);
    model.dishes = [];
    model.favorites = [];
    return getMenuDetails(model.dishes).then(saveDishesToModelACB).then(getMenuDetails(model.favorites).then(saveFavoritesToModelACB));
  }
  model.setNumberOfGuests(data.guests);
  model.setCurrentDish(data.currentDish);
  if (!data.dishesID) { data.dishesID = [] }
  
  if (!data.favoritesID) { data.favoritesID = [] }
  return getMenuDetails(data.dishesID).then(saveDishesToModelACB).then(getMenuDetails(data.favoritesID).then(saveFavoritesToModelACB));
  function saveDishesToModelACB(dishes) { model.dishes = dishes; }
  function saveFavoritesToModelACB(favorites){model.favorites = favorites;}
}

function saveToFirebase(model) {
  if (model.ready) {

    set(modelRef, modelToPersistence(model));

  }
}
function readFromFirebase(model) {

  onValue(modelRef, (snapshot) => {
    const data = snapshot.val();
    persistenceToModel(data,model);
  });

  model.ready = false;
  return getFromDatabaseACB().then(persistenceToModelACB).then(modelReadyCB);

  function getFromDatabaseACB() { return get(modelRef) }
  function persistenceToModelACB(snapshot) {
    return persistenceToModel(snapshot.val(), model);
  }
  function modelReadyCB() {
    model.ready = true;
  }
}
function connectToFirebase(model, watchFunction) {
  readFromFirebase(model);
  watchFunction(checkACB, effectACB);
  // TODO
  function checkACB() {
    return [model.numberOfGuests, model.currentDish, model.dishes, model.favorites]
  }
  function effectACB() {
    saveToFirebase(model);
  }
}
// Remember to uncomment the following line:
export { modelToPersistence, persistenceToModel, saveToFirebase, readFromFirebase }

export default connectToFirebase;
