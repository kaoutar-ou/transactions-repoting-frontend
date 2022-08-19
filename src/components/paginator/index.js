import React from 'react'
import {Pagination} from 'react-bootstrap'
import './style.css'

function Paginator(props) {
    let active = props.active ? props.active : 1;
    let numPages = props.numPages ? props.numPages : 1;
    let pages = [];
    for (let number = 1; number <= numPages; number++) {
    pages.push(
        <div key={number} className={(number === active) ? "pagination-item active-page px-3 py-2" : "pagination-item px-3 py-2"}>
          {number}
        </div>
        // <Pagination.Item className='pagination-item' key={number} active={number === active}>
        //     {number}
        // </Pagination.Item>,
    );
    }
  return (
    <>
      {
        (numPages > 1) ? (
          <div className='pagination-container d-flex'>
            {pages}
          </div>
          // <Pagination>{pages}</Pagination>
        ) : null
      }
    </>
  )
}

export default Paginator