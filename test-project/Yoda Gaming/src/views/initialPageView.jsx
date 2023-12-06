import '@coreui/coreui/dist/css/coreui.min.css'
import "/src/style.css"


function InitialPageView(props) {

    return (
        <div>

            <div>Query : {props.model.searchParams.query}</div>
            <div>Tags : {props.model.searchParams.type}</div>
            <div>Genre : {props.model.searchParams.genre}</div>
            <div>Sort By : {props.model.searchParams.SortBy}</div>
            <div>MinMetacritic : {props.model.searchParams.minMetacritic}</div>
            <div>MaxMetacritic : {props.model.searchParams.maxMetacritic}</div>
            
            <div>Page Size : {props.model.searchParams.page_size}</div>
            <div>Fuzzy : {props.model.searchParams.fuzzy}</div>
            <div>Exact : {props.model.searchParams.exact}</div>

        </div>
    )

}

export { InitialPageView }