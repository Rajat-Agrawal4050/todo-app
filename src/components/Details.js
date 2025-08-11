import "../App.css";
import React from "react";
import { useParams } from "react-router-dom";

export default function Details() {
  let { itemId } = useParams();
  console.log(itemId);

  let arr = localStorage.getItem("list");
  arr = arr ? JSON.parse(arr) : [];

  arr = arr.filter((item) => item.id === parseInt(itemId));
  console.log(arr);
  // let data=useContext(noteContext);
  // console.log(data)

  // const location = useLocation()
  // console.log(location);

  return (
    <>
      <div className="custom_div text-center">
        <div className="heading_div">
          <h2 className="mt-4">{arr[0].title}</h2>
        </div>
        <div className="para_div">
          <p className="mt-4 para">{arr[0].description}</p>
        </div>
      </div>
    </>
  );
}
