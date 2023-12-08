import { CForm, CFormInput, CButton, CFormSelect, CFormCheck } from '@coreui/vue';
import "/src/style.css"

function PageDetailsView(props) {
    function backToSearchResultPageCB() {
        window.location.hash = "#/searchResult";
    }

    return (
        <div className="gameDetails">

            <CButton onClick={backToSearchResultPageCB} className="backButton">Back to search results</CButton>
            <h3 className="detailsPageName">Details Page</h3>
            <h1 className="gameDetailsTitle">{props.gameDetails.name}</h1>
            <span className="gameDetailsImages"><img src={props.gameDetails.background_image} alt="game image" /><img src={props.gameDetails.background_image_additional} /></span>
            <p className="gameDetailsDescription">{props.gameDetails.description_raw}</p>
        </div>
    )

}

export default PageDetailsView