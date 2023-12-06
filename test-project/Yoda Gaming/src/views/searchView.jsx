import { CForm, CFormInput, CFormLabel, CFormSelect, CButton, CSpinner } from '@coreui/vue';
function SearchView(props) {

    function searchInputCB(evt) { props.onSearchInputChange(evt.target.value); }

    function searchButtonPressedCB()
    {props.searchCustomEvent();}
    
    return (
        <div>
            <CForm>
                <CFormInput label="Search Query" type="text" value={props.text} onChange={searchInputCB} id="queryForm" placeholder="Star Wars, The Force Awakens" />
                <CButton onClick={searchButtonPressedCB} type="submit">Search!</CButton>
            </CForm>
        </div>
    )

}

export { SearchView }