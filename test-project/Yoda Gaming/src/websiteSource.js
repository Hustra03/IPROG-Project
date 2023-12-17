import { API_KEY, BASE_URL, YODA_URL, YODA_API_KEY } from "./apiConfig";

    //file mainly worked on by Viktor Fredlund

function getResultsSearch(searchParams) //Used for Search and retreiving games to display on the HomePage
{

    let URL = BASE_URL + "games?key=" + API_KEY + "&search_precise=true%search_exact=true";

    if (searchParams.search){ //String on game name, example: "Mario"
        URL += "&search=" + searchParams.search;
    }
    if (searchParams.genres){ //Integer(s) or string of genres names seperated with commas, example: 1,2 or Action
        URL += "&genres=" + searchParams.genres;
    }
    if (searchParams.tags){ //Integer or string of tag name seperated with commas, example: 1 or "singleplayer"
        URL += "&tags=" + searchParams.tags;
    }
    if (searchParams.metacritic_min){ //One integer or two integer seperated with commas, example: 70 or 60,90
        if (searchParams.metacritic_max){ //If user has set both min and max metacritic scores
            URL += "&metacritic=" + searchParams.minMetacritic + "," + searchParams.maxMetacritic;
        }
        else{ //If user has only set min metacritic score, default max to 100
            URL += "&metacritic=" + searchParams.minMetacritic + ",100";
        }
    }
    if (searchParams.ordering){
        URL += "&ordering="
        if (!searchParams.asc) {
            URL += "-"// reverses search order
        }
        URL += searchParams.ordering; // Add "-" before the order variable to reverse the order
    }
    if (searchParams.page_size){
        URL += "&page_size=" + searchParams.page_size; //integer, example: 10
    }
    if (searchParams.dates){
        URL += "&dates=" + searchParams.dates; //Format: YYYY-MM-DD,YYYY-MM-DD, example: 2015-01-01,2022-12-31
    }
    if (searchParams.platforms){
        URL += "&platforms=" + searchParams.platforms; //integer(s), example: 4,2 (PC,Xbox One)
    }
    function getTheJSON_ACB(respons){
        if(!respons.ok){
            throw new Error("Something went wrong with the Game Search API call.");
        }
        return respons.json();
    }

    function giveOnlyRelevantInfoACB(json){
        //console.log(json); //Uncomment to see the the api response object
        return json.results;
    }
    return fetch(URL).then(getTheJSON_ACB).then(giveOnlyRelevantInfoACB)
}

function getGameDetails(gameID){
    const GAME_DETAILS_URL = BASE_URL + "games/" + gameID + "?key=" + API_KEY;

    function getTheJSON_ACB(respons){
        if(!respons.ok){
            throw new Error("Something went wrong with the Game Details API call.");
        }
        return respons.json();
    }

    function giveOnlyRelevantInfoACB(json){
        //console.log(json); //Uncomment to see the the api response object
        return json;
    }
    return fetch(GAME_DETAILS_URL).then(getTheJSON_ACB).then(giveOnlyRelevantInfoACB)
}

function getAllGenres(){
    const GENRES_URL = BASE_URL + "genres?key=" + API_KEY;

    function getTheJSON_ACB(respons){
        if(!respons.ok){
            throw new Error("Something went wrong with the Game Genres API call.");
        }
        return respons.json();
    }

    function giveOnlyRelevantInfoACB(json){
        //console.log(json); //Uncomment to see the the api response object
        return json.results;
    }
    return fetch(GENRES_URL).then(getTheJSON_ACB).then(giveOnlyRelevantInfoACB)
}
/** 
function yodafyText(text){
    const YODA_SEARCH_URL = YODA_URL + encodeURIComponent(text);

    function getTheJSON_ACB(respons){
        if(!respons.ok){
            throw new Error("Something went wrong with the Yoda API call.");
        }
        return respons.json();
    }

    function giveOnlyRelevantInfoACB(json){
        console.log(json); //Uncomment to see the the api response object
        return json;
    }
    return fetch(YODA_SEARCH_URL, {
        "method": "POST",
        "headers": {
            "x-RapidAPI-Key": YODA_API_KEY,
            "x-RapidAPI-Host": "yodish.p.rapidapi.com"
        },
    }).then(getTheJSON_ACB).then(giveOnlyRelevantInfoACB)
}
*/
function yodafyText(text){
    const trimmedText = text.replace(/\n/g, '');
    const YODA_SEARCH_URL = "https://api.funtranslations.com/translate/yoda.json?text=" + encodeURIComponent(trimmedText);

    function getTheJSON_ACB(respons){
        if(!respons.ok){
            throw new Error("Something went wrong with the Yoda API call.");
        }
        return respons.json();
    }

    function giveOnlyRelevantInfoACB(json){
        //console.log(json); //Uncomment to see the the api response object
        return json.contents.translated;
    }
    return fetch(YODA_SEARCH_URL).then(getTheJSON_ACB).then(giveOnlyRelevantInfoACB)
}


function getGameScreenshots(gameID){
    const GAME_SCREENSHOTS_URL = BASE_URL + "games/" + gameID + "/screenshots" + "?key=" + API_KEY;

    function getTheJSON_ACB(respons){
        if(!respons.ok){
            throw new Error("Something went wrong with the Game Screenshots API call.");
        }
        return respons.json();
    }

    function giveOnlyRelevantInfoACB(json){
        //console.log(json.results); //Uncomment to see the the api response object
        return json.results;
    }
    return fetch(GAME_SCREENSHOTS_URL).then(getTheJSON_ACB).then(giveOnlyRelevantInfoACB)
}


export { getResultsSearch, getGameDetails, yodafyText, getAllGenres, getGameScreenshots};