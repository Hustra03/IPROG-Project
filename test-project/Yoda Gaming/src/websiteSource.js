import { API_KEY, BASE_URL } from "./apiConfig";

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

    function getTheJSON_ACB(respons){
        if(!respons.ok){
            throw new Error("Something went wrong.");
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

}


export { getResultsSearch, getGameDetails};