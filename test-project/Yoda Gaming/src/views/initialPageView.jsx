import '@coreui/coreui/dist/css/coreui.min.css'
import "/src/style.css"


function InitialPageView(props) {

    return (
        <div>

            {props.model.searchParams.query}
            {props.model.searchParams.type}
            {props.model.searchParams.category}
            {props.model.searchParams.SortBy}

        </div>
    )

}

export { InitialPageView }