import React from 'react'
import './App.css';

export default function ListItem(props) {
  return (
    <>
    <div className="col-md-12 content_div">
            <div className="left_div">
              <h5 className={props.markasread?'line-through':''}>{props.title}</h5>
              <p className={props.markasread?'line-through':''}> {props.desc}</p>
            </div>
            <div className="right_div">
            <input type="checkbox" name='custom_check' key={`checkbox${props.id}`} id={'check'+props.id}  className='customCheckbox' onChange={(ev) => props.markread(props.id,ev)} checked={props.markasread} /> <span className='markAsReadText'>Mark as Read</span>
              <button type="button" style={{marginLeft: '25px !important'}} data-id={props.id} onClick={props.editfunc} className="btn btn-primary ml-4 ">
                Edit
              </button>
              <button type="button" data-id={props.id} onClick={props.delfunc} className="btn btn-danger mx-1">
                Delete
              </button>
            </div>
          </div>
    </>
  )
}
