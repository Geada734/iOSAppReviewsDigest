
/* 
* Component that controls the page the app is currently on.    
*/
function PaginationControl(props) {

    // Sets the page to the previous one.
    function previousPage(event) {
        props.pagingAction(props.page - 1);
    };

    // Sets the page to the next one.
    function nextPage(event) {
        props.pagingAction(props.page + 1);
    };

    // If the nextPage value is false, the 'next' button gets disabled,
    // and if the app is on the first page, the 'previous' button gets disabled.
    return(
        <div>
            <button disabled={props.page === 1 ? true: false} onClick={e => previousPage(e)} >
                {'<'}
            </button>
            <span>{'Page: ' + props.page}</span>
            <button disabled={!props.nextPage ? true: false} onClick={e => nextPage(e)}>
                {'>'}
            </button>
        </div>
    );

};

export default PaginationControl;