import { API_KEY, BASE_URL } from "./apiConfig";

function getResultsSearch(searchParams)
{

    const URL = BASE_URL + "games?key=" + API_KEY + "&search=" + searchParams + "&search_precise=true";


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


export { getResultsSearch};