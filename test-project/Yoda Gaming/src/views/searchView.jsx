import '@coreui/coreui/dist/css/coreui.min.css'
import "/src/style.css"

import { CForm, CFormInput, CButton, CFormSelect, CFormCheck } from '@coreui/vue';

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
    function searchPlatformsInput(evt) { props.onPlatformsInputChange(evt.target.value); }
    function sortOrderInput(){props.onSortAscChange();}

    function sortOrder() { 
        if (props.asc==true) {
           return <CButton onClick={sortOrderInput} type="submit" color="success">Sort In Order</CButton>
        }
        return <CButton onClick={sortOrderInput} type="submit" color="success">Sort In Reverse Order</CButton>
     }

     function linkToSearchResults(){
        if (props.searchResultsData) {
            return <div><a href='#/searchResult'>Go To Previous Search Results</a></div>
        }
    }

    return (
        <div>
            <div className='detailedSearch'>
                <CForm>
                    <CFormInput label="Search Query" type="text" value={props.query} onChange={searchQueryInputCB} id="queryForm" placeholder="Star Wars, The Force Awakens" />

                    <CFormInput label="tags" type="text" value={props.tags} onChange={searchTagsInputCB} id="queryForm" placeholder="Single Player" />

                    <CFormInput label="genres" type="text" value={props.tags} onChange={searchGenreInputCB} id="queryForm" placeholder="RPG" />

                    <label>MinMetacritic:</label><br />
                    <div>
                        <input type="range" value={props.minMetacritic} onChange={minMetacriticInputCB} className="range" min="0" max={props.maxMetacritic} />
                        {props.minMetacritic}
                    </div>
                    <label>Max Metacritic:</label><br />
                    <div>
                        <input type="range" value={props.maxMetacritic} onChange={maxMetacriticInputCB} className="range" min={props.minMetacritic} max="100" />
                        {props.maxMetacritic}
                    </div>
                    <label>Number Of Pages In Result:</label><br />
                    <div>
                        <input type="range" value={props.page_size} onChange={pageSizeInputCB} className="range" min="5" max="20" />
                        {props.page_size}
                    </div>

                    <CFormCheck value={props.exact} onChange={exactChangeCB} label="Search only for exact matches" id="formSwitchCheckDefault" />
                    <CFormCheck value={props.fuzzy} onChange={fuzzyChangeCB} label="Exclude fuzzy matches from results" id="formSwitchCheckDefault" />

                    <CFormSelect label="Sort Results By" onChange={sortByInputCB} class="mb-3" aria-label="Default select example">
                        <option value="name">Name</option>
                        <option value="released">Release Date</option>
                        <option value="added">Date Added To API</option>
                        <option value="created">Date Created In API</option>
                        <option value="updated">Date Updated In API</option>
                        <option value="rating">Rating</option>
                        <option value="metacritic">Metacritic Score</option>
                    </CFormSelect>

                    <CFormInput label="Dates" type="text" value={props.dates} onChange={searchDatesInput} id="queryForm" placeholder="2023-11-24" />
                    <CFormInput label="Platforms" type="text" value={props.platforms} onChange={searchPlatformsInput} id="queryForm" placeholder="PlayStation 4" />
                    <CButton onClick={searchButtonPressedCB} type="submit" color="success">Search!</CButton>
                    {sortOrder()}
                    {linkToSearchResults()}
                </CForm>
            </div>
        </div>
    )

}

export { SearchView }
