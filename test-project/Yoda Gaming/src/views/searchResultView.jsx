import "/src/style.css"
import { CForm, CFormInput, CButton, CFormSelect, CFormCheck } from '@coreui/vue';

function SearchResultView(props) {

    function backToSavedPagesCB() {window.location.hash = "#/"; }
    return(
    <div className="searchResults">
        <span>{props.searchResult}</span>
        <CButton onClick={backToSavedPagesCB} className="searchResultInitial">back to initial</CButton>
        {props.searchResults.map(searchResultsMapCB)}
        <div>hi</div>
    </div>
    )

    function searchResultsMapCB(game){
        function onSearchResultClickCB(){
            props.chosenGame(game);
            window.location.hash = "#/details"
        }

        return (
            <div onClick={onSearchResultClickCB} className="searchResult">
                <div class="titleAndInfo">
                    <div className="searchResultTitle">{game.name}</div>
                    <span className="searchResultInfo">Here goes some game info about each game Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam tincidunt pharetra nibh ut egestas. Sed eros enim, laoreet vitae enim eget, facilisis dapibus ipsum. Morbi quam libero, ultrices quis efficitur in, imperdiet in diam. Morbi auctor ante quis aliquet interdum. Praesent ex massa, tristique mollis mauris feugiat, vulputate sollicitudin enim. Ut et efficitur arcu. Cras tincidunt ut metus quis iaculis. Duis lacus nisi, feugiat sed tellus a, vehicula blandit lectus. Nunc blandit ac eros at molestie. Nam bibendum aliquam arcu et malesuada. Proin suscipit elementum egestas. Pellentesque eget malesuada nisl.</span>
                </div>
                <img className="searchResultImage" src={game.background_image} width="150"></img>
            </div>
        )
    }


}

export {SearchResultView};
