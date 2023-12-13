import '@coreui/coreui/dist/css/coreui.min.css'
import "/src/style.css"


function InitialPageView(props) {

    return (
        <div>

            <div>Query : {props.searchParams.search}</div>
            <div>Tags : {props.searchParams.tags}</div>
            <div>Genre : {props.searchParams.genres}</div>
            <div>Sort By : {props.searchParams.ordering}</div>
            <div>MinMetacritic : {props.searchParams.minMetacritic}</div>
            <div>MaxMetacritic : {props.searchParams.maxMetacritic}</div>
            <div>Page Size : {props.searchParams.page_size}</div>
            <div>Fuzzy : {props.searchParams.fuzzy}</div>
            <div>Exact : {props.searchParams.exact}</div>
            <div>Dates : {props.searchParams.dates}</div>
            <div>Platforms : {props.searchParams.platforms}</div>

        </div >
    )

}

export { InitialPageView }