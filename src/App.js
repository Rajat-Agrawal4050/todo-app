import "./App.css";
import { useEffect, useRef, useState } from "react";
import ListItem from "./ListItem";

function App() {
  const [all_list, setState] = useState(() => {
    const value = localStorage.getItem("list");
    return value ? JSON.parse(value) : [];
  });

  useEffect(() => {
    window.localStorage.setItem("list", JSON.stringify(all_list));
  }, [all_list]);

  let ref = useRef(null);
  let ref2 = useRef(null);

  let [note, setNote] = useState({ id: "", title: "", description: "" });

  function onChange(e) {
    setNote({ ...note, [e.target.name]: e.target.value });
  }

  function add_item() {
    let title = document.getElementById("title").value;

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
    setState((prev) => prev.filter((item) => item.id !== parseInt(id)));
    alert("Item Deleted!");
  }

  function editItem(eid, event) {
    let title = event.target.getAttribute("data-title");
    let description = event.target.getAttribute("data-desc");
    let id = event.target.getAttribute("data-id");
    setNote({ id, title, description });
    let btn = ref.current;
    btn.click();
  }

  function handleEdit(ev) {
    setState((prev) => {
      let obj = prev.filter((item) => item.id === parseInt(note.id));
      obj[0].title = note.title;
      obj[0].description = note.description;

      let all_items = prev.filter((item) => item.id !== parseInt(note.id));
      let arr = [...all_items, obj[0]];
      arr.sort(function (a, b) {
        return a.id - b.id;
      });
      return arr;
    });
    let btn = ref2.current;
    btn.click();
  }

  function markRead(id, e) {
    let ele = e.target;
    let parentEle = ele.parentElement.parentElement.parentElement;

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
      <div
        className="container top_container text-center"
        style={{ marginTop: "4%" }}
      >
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
              className="form-control custom-input"
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

          <div className="col-12 text-center">
            <button
              type="button"
              onClick={() => add_item()}
              className="mt-2 add_btn btn btn-success"
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

      <button
        type="button"
        ref={ref}
        id="modalButton"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Open modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Edit Todo
              </h1>
              <button
                ref={ref2}
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="etitle" className="col-form-label">
                    Title:
                  </label>
                  <input
                    type="text"
                    value={note.title}
                    className="custom-input form-control"
                    id="etitle"
                    name="title"
                    onChange={onChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="edesc" className="col-form-label">
                    Description:
                  </label>
                  <textarea
                    className="custom-input form-control"
                    value={note.description}
                    id="edesc"
                    name="description"
                    onChange={onChange}
                  ></textarea>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                onClick={handleEdit}
                type="button"
                className="btn btn-primary"
              >
                Edit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
