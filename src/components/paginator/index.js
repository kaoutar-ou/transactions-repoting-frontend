import React from "react";
import { Pagination } from "react-bootstrap";
import "./style.css";

function Paginator(props) {
  let active = props.active ? props.active : 1;
  let numPages = props.numPages ? props.numPages : 1;
  let pages = [];
  let first = 1;
  let last = numPages;
  let min =
    active - 3 > 1
      ? active - 3
      : active - 2 > 1
      ? active - 2
      : active - 1 > 1
      ? active - 1
      : active;
  let max =
    active + 3 < numPages
      ? active + 3
      : active + 2 < numPages
      ? active + 2
      : active + 1 < numPages
      ? active + 1
      : active;
  if (numPages >= 1 && numPages <= 13) {
    for (let number = 1; number <= numPages; number++) {
      pages.push(
        <div
          key={number}
          className={
            number === active
              ? "pagination-item active-page px-3 py-2"
              : "pagination-item px-3 py-2"
          }
        >
          {number}
        </div>
        // <Pagination.Item className='pagination-item' key={number} active={number === active}>
        //     {number}
        // </Pagination.Item>,
      );
    }
  } else {
    if (numPages > 13) {
      if (first !== active) {
        pages.push(
          <div
            key={first}
            className={
              first === active
                ? "pagination-item active-page px-3 py-2"
                : "pagination-item px-3 py-2"
            }
          >
            {first}
          </div>
        );
      }
      if (active - first > 4) {
      pages.push(
        <div
          key={0}
          className={"pagination-item-dots px-3 py-2"}
        >
          ...
        </div>
      );}
      for (let number = min; number <= max; number++) {
        pages.push(
          <div
            key={number}
            className={
              number === active
                ? "pagination-item active-page px-3 py-2"
                : "pagination-item px-3 py-2"
            }
          >
            {number}
          </div>
        );
      }
      if (last - active > 4) {
      pages.push(
        <div
          key={0}
          className={"pagination-item-dots px-3 py-2"}
        >
          ...
        </div>
      );
      }
      if (last !== active) {
        pages.push(
          <div
            key={last}
            className={
              last === active
                ? "pagination-item active-page px-3 py-2"
                : "pagination-item px-3 py-2"
            }
          >
            {last}
          </div>
        );
      }
    }
  }
  return (
    <>
      {numPages > 1 ? (
        <div className="pagination-container d-flex">{pages}</div>
      ) : // <Pagination>{pages}</Pagination>
      null}
    </>
  );
}

export default Paginator;