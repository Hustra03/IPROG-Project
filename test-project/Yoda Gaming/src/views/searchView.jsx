import '@coreui/coreui/dist/css/coreui.min.css'
import "/src/style.css"

import { CForm, CFormInput, CButton, CFormSelect, CFormCheck } from '@coreui/vue';

// Custom component, https://coreui.io/vue/docs/forms/form-control.html 

function SearchView(props) {

    function searchInputCB(evt) { props.onQueryInputChange(evt.target.value); }

    function searchButtonPressedCB() { props.searchCustomEvent(); window.location.hash = "#/savedPages"; }//TODO fix to instead point towards searchResult when implemented

    function exactChangeCB(evt){props.onExactChange(evt.target.value)}
    function fuzzyChangeCB(evt){props.onFuzzyChange(evt.target.value)}

    function minMetacriticInputCB(evt) { props.onMinMetacriticChange(evt.target.value) }
    function maxMetacriticInputCB(evt) { props.onMaxMetacriticChange(evt.target.value) }

    return (
        <div>
            <div className='detailedSearch'>
                <CForm>
                    <CFormInput label="Search Query" type="text" value={props.query} onChange={searchInputCB} id="queryForm" placeholder="Star Wars, The Force Awakens" />

                    <CFormInput label="tags" type="text" value={props.tags} onChange={searchInputCB} id="queryForm" placeholder="RPG" />
                    
                    <CFormInput label="genres" type="text" value={props.tags} onChange={searchInputCB} id="queryForm" placeholder="RPG" />

                    <label>Min And Max Metacritic:</label><br />
                    <div>
                        <input type="range" value={props.minMetacritic} onChange={minMetacriticInputCB} className="range" list="values" min="0" max={props.maxMetacritic} />
                        {props.minMetacritic}
                    </div>
                    <div>
                        <input type="range" value={props.maxMetacritic} onChange={maxMetacriticInputCB} className="range" list="values" min={props.minMetacritic} max="100" />
                        {props.maxMetacritic}
                    </div>

                    <CFormCheck value = {props.exact} onChange={exactChangeCB} label="Search only for exact matches" id="formSwitchCheckDefault" />
                    <CFormCheck value = {props.fuzzy} onChange={fuzzyChangeCB} label="Exclude fuzzy matches from results" id="formSwitchCheckDefault" />

                    <CFormSelect label="Sort Results By" class="mb-3" aria-label="Default select example">
                        <option value="name">Name</option>
                        <option value="released">Release Date</option>
                        <option value="added">Date Added To API</option>
                        <option value="created">Date Created In API</option>
                        <option value="updated">Date Updated In API</option>
                        <option value="rating">Rating</option>
                        <option value="metacritic">Metacritic Score</option>
                    </CFormSelect>
                    <CFormCheck label="Order results in ascending order" id="formSwitchCheckDefault" />

                    <CButton onClick={searchButtonPressedCB} type="submit">Search!</CButton>
                </CForm>
            </div>
        </div>
    )

}

export { SearchView }