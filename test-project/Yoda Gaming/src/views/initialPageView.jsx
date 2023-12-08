import '@coreui/coreui/dist/css/coreui.min.css'
import "/src/style.css"


function InitialPageView(props) {

    return (
        <div>

            <div>Query : {props.searchParams.query}</div>
            <div>Tags : {props.searchParams.type}</div>
            <div>Genre : {props.searchParams.genre}</div>
            <div>Sort By : {props.searchParams.ordering}</div>
            <div>MinMetacritic : {props.searchParams.minMetacritic}</div>
            <div>MaxMetacritic : {props.searchParams.maxMetacritic}</div>    
            <div>Page Size : {props.searchParams.page_size}</div>
            <div>Fuzzy : {props.searchParams.fuzzy}</div>
            <div>Exact : {props.searchParams.exact}</div>

        </div>
    )

}

export { InitialPageView }