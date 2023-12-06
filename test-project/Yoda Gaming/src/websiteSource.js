import { API_KEY, BASE_URL, YODA_URL, YODA_API_KEY } from "./apiConfig";

function getResultsSearch(searchParams)
{

    let URL = BASE_URL + "games?key=" + API_KEY + "&search_precise=true%search_exact=true";

    if (searchParams.search){ 
        URL += "&search=" + searchParams.search;
    }
    if (searchParams.genres){
        URL += "&genres=" + searchParams.genres;
    }
    if (searchParams.tags){
        URL += "&tags=" + searchParams.tags;
    }
    if (searchParams.metacritic_min){
        if (searchParams.metacritic_max){
            URL += "&metacritic=" + searchParams.metacritic_min + "," + searchParams.metacritic_max;
        }
        else{
            URL += "&metacritic=" + searchParams.metacritic_min + ",100";
        }
    }
    if (searchParams.ordering){
        URL += "&ordering=" + searchParams.ordering; // Add "-" before the order variable to reverse the order
    }
    if (searchParams.page_size){
        URL += "&page_size=" + searchParams.page_size;
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
        return json.results;
    }
    return fetch(GAME_DETAILS_URL).then(getTheJSON_ACB).then(giveOnlyRelevantInfoACB)
}

function yodafyText(text){
    const YODA_SEARCH_URL = YODA_URL + encodeURIComponent(text);

    function getTheJSON_ACB(respons){
        if(!respons.ok){
            throw new Error("Something went wrong with the Yoda API call.");
        }
        return respons.json();
    }

    function giveOnlyRelevantInfoACB(json){
        //console.log(json); //Uncomment to see the the api response object
        return json.results;
    }
    return fetch(YODA_SEARCH_URL, {
        "method": "POST",
        "headers": {
            "x-RapidAPI-Key": YODA_API_KEY,
            "x-RapidAPI-Host": "yodish.p.rapidapi.com"
        },
    }).then(getTheJSON_ACB).then(giveOnlyRelevantInfoACB)
}


export { getResultsSearch, getGameDetails, yodafyText};