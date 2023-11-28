import { initializeApp } from "firebase/app";
import {getDatabase, ref} from "firebase/database";  //  NOTE:  had to add {ref} here, it was not imported

//  PATH is the “root” Firebase path. NN is your TW2_TW3 group number
const PATH = "ProjectGroup56";

import firebaseConfig from "./firebaseConfig.js";

// Initialise firebase app, database, ref
const app = initializeApp(firebaseConfig)
const db = getDatabase(app)

console.log("Database")
console.log(db)
const modelRef = ref(db, PATH + "/model")
