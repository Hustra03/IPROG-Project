import '@coreui/coreui/dist/css/coreui.min.css'
import "/src/style.css"

import {CFormInput, CButton, CFormSelect, CFormCheck, CCard, CCardBody, CCardTitle, CListGroup, CListGroupItem, CFormText } from '@coreui/vue';

//File mainly worked on by Erik Paulinder

// Custom component, https://coreui.io/vue/docs/forms/form-control.html 

function SearchView(props) {

    function searchQueryInputCB(evt) { props.onQueryInputChange(evt.target.value); }

    function searchTagsInputCB(evt) { props.onTagsInputChange(evt.target.value); }

    function searchGenreInputCB(evt) { props.onGenreInputChange(evt.target.value); }

    function searchButtonPressedCB() { props.searchCustomEvent(); window.location.hash = "#/searchResult"; }

    function exactChangeCB(evt) { props.onExactChange(evt.target.value) }
    function fuzzyChangeCB(evt) { props.onFuzzyChange(evt.target.value) }

    function minMetacriticInputCB(evt) { props.onMinMetacriticChange(evt.target.value); }
    function maxMetacriticInputCB(evt) { props.onMaxMetacriticChange(evt.target.value); }
    function pageSizeInputCB(evt) { props.onPageSizeChange(evt.target.value); }

    function sortByInputCB(evt) { props.onSortByInputChange(evt.target.value); }
    function searchDatesInput(evt) { props.onDatesInputChange(evt.target.value); }
    function sortOrderInput() { props.onSortAscChange(); }

    function sortOrder() {
        if (props.asc == true) {
            return <CButton onClick={sortOrderInput} type="submit" color="primary">Sort In Order</CButton>
        }
        return <CButton onClick={sortOrderInput} type="submit" color="primary">Sort In Reverse Order</CButton>
    }

    function linkToSearchResults() {
        if (props.searchResultsData) {
            return <div><a href='#/searchResult'>Go To Previous Search Results</a></div>
        }
    }


    function searchPlatformsInput() { 

        let currentPlatformString="";
        let allPlatformOptions=document.getElementById("multiple-select").children;

        let firstElement=false;
        for (let i of allPlatformOptions) {
            if (i.selected==true) {
                if (firstElement==true) {
                    currentPlatformString+=","
                }
                currentPlatformString+=i.value;
                firstElement=true;
            }
        }

        props.onPlatformsInputChange(currentPlatformString); 
    }
    function platformOptions() {

        if (props.allPlatforms) {

            function platformMapCB(platform) {

                return <option value={platform.id}>{platform.name}</option>
            }

            return (
                <select onChange={searchPlatformsInput} id="multiple-select" value={props.platform} multiple>

                    {props.allPlatforms.map(platformMapCB)}

                </select>)
        }

        return (
            <div>This should not occur, please reload the page, and if the problem persists check if the API is currently down for maintenance.</div>
        )
    }

    return (

        <div className='detailedSearch'>
            <CCard color="success">
                <CCardBody color="success">
                    <CCardTitle>Detailed Search</CCardTitle>
                </CCardBody>
                <CListGroup flush color="success">
                    <CListGroupItem color="success"><CFormInput label="Search Query" type="text" text="Name of the game, for example Minecraft" onChange={searchQueryInputCB} id="queryForm" placeholder={props.query} /></CListGroupItem>
                    <CListGroupItem color="success"><CFormInput label="tags" type="text" text="Tags for the game, for example Singleplayer, Multiplayer" onChange={searchTagsInputCB} id="queryForm" placeholder={props.tags} /></CListGroupItem>
                    <CListGroupItem color="success"><CFormInput label="genres" type="text" text="Genres for the game, for example Action, RPG" onChange={searchGenreInputCB} id="queryForm" placeholder={props.genre} /></CListGroupItem>
                    <CListGroupItem color="success">
                        <label>Min Metacritic:</label>
                        <div>
                            <input type="range" text="Minimum Metacritic Score for a game to be shown as a result, between 0 and Max Metacritic" onChange={minMetacriticInputCB} className="range" min="0" max={props.maxMetacritic} placeholder={props.minMetacritic} />
                            {props.minMetacritic}
                        </div>
                    </CListGroupItem>
                    <CListGroupItem color="success">
                        <label>Max Metacritic:</label>
                        <div>
                            <input type="range" text="Maximum Metacritic Score for a game to be shown as a result, between Min Metacritic and 100" onChange={maxMetacriticInputCB} className="range" min={props.minMetacritic} max="100" placeholder={props.maxMetacritic} />
                            {props.maxMetacritic}
                        </div>
                    </CListGroupItem>
                    <CListGroupItem color="success">
                        <label>Number Of Pages In Result:</label>
                        <div>
                            <input type="range" text="Number of results to show, between 1 and 50" onChange={pageSizeInputCB} className="range" min="1" max="50" placeholder={props.page_size} />
                            {props.page_size}
                        </div>
                    </CListGroupItem>
                    <CListGroupItem color="success">
                        <CFormCheck onChange={exactChangeCB} label="Search only for exact matches" id="formSwitchCheckDefault" placeholder={props.exact} />
                        <CFormCheck onChange={fuzzyChangeCB} label="Exclude fuzzy matches from results" id="formSwitchCheckDefault" placeholder={props.fuzzy} />
                    </CListGroupItem>
                    <CListGroupItem color="success">

                        <CFormSelect label="Sort Results By" onChange={sortByInputCB} class="mb-3" aria-label="Default select example">
                            <option value="name">Name</option>
                            <option value="released">Release Date</option>
                            <option value="added">Date Added To API</option>
                            <option value="created">Date Created In API</option>
                            <option value="updated">Date Updated In API</option>
                            <option value="rating">Rating</option>
                            <option value="metacritic">Metacritic Score</option>
                        </CFormSelect>

                    </CListGroupItem>
                    <CListGroupItem color="success">
                        <CFormInput label="Dates" text="Specify release date range, for example 2020-10-14, 2023-10-14" type="text" value={props.dates} onChange={searchDatesInput} id="queryForm" placeholder={props.dates} />
                    </CListGroupItem>

                    <CListGroupItem color="success">
                        {platformOptions()}
                        <CFormText>Specify one or more platforms for which results should exclusivly be shown, for example PC would only show games available on PC, while PC and iOS would be games available on one or more of the selected options</CFormText>
                    </CListGroupItem>

                    <CListGroupItem color="success">
                        {sortOrder()}
                    </CListGroupItem>
                </CListGroup>
                <CCardBody color="success">
                    <CButton onClick={searchButtonPressedCB} type="submit" color="primary">Search!</CButton>
                </CCardBody>
            </CCard>
        </div>
    )
}



export { SearchView }
