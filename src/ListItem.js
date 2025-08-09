import React from "react";
import "./App.css";

export default function ListItem(props) {
  return (
    <>
      <div className="col-md-12 content_div">
        <div className="left_div">
          <h5 className={props.markasread ? "line-through" : ""}>
            {props.title}
          </h5>
          <p className={props.markasread ? "line-through" : ""}>
            {" "}
            {props.desc}
          </p>
        </div>
        <div className="right_div">
          <div className="check_div">
          <input
            type="checkbox"
            name="custom_check"
            key={`checkbox${props.id}`}
            id={"check" + props.id}
            className="customCheckbox"
            onChange={(ev) => props.markread(props.id, ev)}
            checked={props.markasread}
          />{" "}
          <span className="markAsReadText">Mark as Read</span>
          </div>
          <div className="btn_div">
          <button
            type="button"
            data-title={props.title}
            data-desc={props.desc}
            style={{ marginLeft: "25px !important" }}
            data-id={props.id}
            onClick={(ev) => props.editfunc(props.id, ev)}
            className="btn edit_btn btn-primary ml-4 "
          >
            Edit
          </button>
          <button
            type="button"
            data-id={props.id}
            onClick={props.delfunc}
            className="btn delete_btn btn-danger mx-1"
          >
            Delete
          </button>
          </div>
        </div>
      </div>
    </>
  );
}
