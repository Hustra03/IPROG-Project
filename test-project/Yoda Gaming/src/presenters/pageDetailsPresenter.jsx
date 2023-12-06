import PageDetailsView from '../views/pageDetailsView.jsx';



export default
function Details(props) {
    
    return (
        <div>
            <PageDetailsView model={props.model}/>
            {console.log("testtt")}
        </div>
    );
    
}