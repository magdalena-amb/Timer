const LastResults = props => {
    return(
       <div>
            <h3>Last saved</h3>
             <ul className="lastResults" >
            {props.results}
            </ul>
       </div>
    )
}