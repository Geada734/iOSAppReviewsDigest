import {useState} from 'react';

function PaginationControl(props) {
    function previousPage(event) {
        props.pagingAction(props.page - 1);
    };

    function nextPage(event) {
        props.pagingAction(props.page + 1);
    };
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