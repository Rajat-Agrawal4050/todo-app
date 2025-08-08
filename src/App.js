import "./App.css";
import { useEffect, useState } from "react";
import ListItem from "./ListItem";

function App() {
  const [all_list, setState] = useState(() => {
    const value = localStorage.getItem("list");
    return value ? JSON.parse(value) : [];
  });

  useEffect(() => {
    window.localStorage.setItem("list", JSON.stringify(all_list));
  }, [all_list]);

  function add_item() {
    let title = document.getElementById("title").value;
    // console.log('t: '+title)
    let description = document.getElementById("description").value;
    if (title.trim() === "") {
      alert("Please Enter title");
    } else if (description.trim() === "") {
      alert("Please Enter Decription");
    } else {
      let obj = {
        id: Date.now(),
        title: title,
        description: description,
        markAsRead: false,
      };

      setState((prev) => [...prev, obj]);
      console.log(all_list);
    }
  }

  function deleteItem(event) {
    let id = event.target.getAttribute("data-id");
    // console.log(id)
    // console.log(all_list)
    // return
    setState((prev) => prev.filter((item) => item.id !== parseInt(id)));
    alert("Item Deleted!");
  }

  function editItem(event) {
    let id = event.target.id;
    alert("edit:" + id);
  }

  function markRead(id, e) {
    //  console.log(e.target)
    //  console.log(id)
    let ele = e.target;
    let parentEle = ele.parentElement.parentElement;

    let title = parentEle.querySelector(".left_div h5");
    let para = parentEle.querySelector(".left_div p");
    if (ele.checked === true) {
      title.style.textDecoration = "line-through";
      para.style.textDecoration = "line-through";
    } else {
      title.style.textDecoration = "none";
      para.style.textDecoration = "none";
    }

    setState((prev) => {
      let obj = prev.filter((item) => item.id === id);
      obj[0].markAsRead = ele.checked ? true : false;
      // console.log(obj[0])
      let all_items = prev.filter((item) => item.id !== id);
      let arr = [...all_items, obj[0]];
      arr.sort(function (a, b) {
        return a.id - b.id;
      });
      return arr;
    });
  }
  return (
    <>
      <div className="container text-center" style={{ marginTop: "4%" }}>
        <h3>To-Do List</h3>
      </div>

      <div className="form_container card">
        <div className="row">
          <div className="col-md-12">
            <label className="form-label" htmlFor="title">
              Title{" "}
            </label>
            <input
              type="text"
              id="title"
              placeholder=""
              className="form-control custom-input w-50"
            />
          </div>
          <div className="col-md-12 my-3">
            <label className="form-label" htmlFor="title">
              Description{" "}
            </label>
            <textarea
              id="description"
              className="custom-input form-control"
              placeholder=""
            ></textarea>
          </div>

          <div className="col-md-12 text-center">
            <button
              type="button"
              onClick={() => add_item()}
              className="mt-2 btn btn-success"
            >
              Add Item
            </button>
          </div>
        </div>
      </div>

      <div className="form_container2 container">
        <div className="row">
          {all_list.map((ele) => {
            console.log("list:" + ele.id);
            return (
              <ListItem
                key={`list_item${ele.id}`}
                delfunc={deleteItem}
                editfunc={editItem}
                title={ele.title}
                desc={ele.description}
                id={ele.id}
                markasread={ele.markAsRead}
                markread={markRead}
              ></ListItem>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
