import React, { useState } from "react";
import axios from "axios";
import { useUserContext } from "../../Context/UserContext";
import { useGlobalContext } from "../../Context/GlobalContextOne";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import { TfiThought } from "react-icons/tfi";
import { FaAngleDoubleDown, FaAngleDoubleUp } from "react-icons/fa";
import { IoIosCreate } from "react-icons/io";
import { FaUser } from "react-icons/fa";

function NewThread({ onThreadCreated }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState(null);
  const [show, setShow] = useState(false);
  const { user } = useUserContext();
  const { setThreadData } = useGlobalContext();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  console.log(user);
  const handleCrateThreadShow = () => {
    setShow(!show);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    if (!selectedCategory || selectedCategory === "Discussion category") {
      alert("Please select a category");
      return;
    }

    axios
      .post(
        "https://railwaymcq.com/railwaymcq/RailPariksha/post_thread_api.php",
        {
          uid: user?.id,
          uname: user?.name,
          title,
          content,
          category: selectedCategory,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log("Thread created:", response.data);
        setTitle("");
        setContent("");
        setSelectedCategory("");
        setError(null);
        onThreadCreated(); // Call the callback to notify that the thread is created
      })
      .catch((error) => {
        console.error("There was an error creating the thread!", error);
        setError(error.message);
      });
  };

  return (
    <form onSubmit={handleSubmit} className="text-start">
      <h6>
        <FaUser />
        {user ? user?.name : "Guest user"}
      </h6>
      <div className="row position-relative">
        <hr />
        <div
          className=" position-absolute  me-2"
          style={{
            left: "70%",
            top: "-17px",
            background: "White",
            maxWidth: "130px",
          }}
        >
          <div className="d-flex justify-content-center">
            {!show && (
              <button
                onClick={() => handleCrateThreadShow()}
                className=" d-flex btn-sm btn btn-outline-dark Subject"
              >
                New Post <FaAngleDoubleDown className="m-1" />
              </button>
            )}
            {show && (
              <button
                onClick={() => handleCrateThreadShow()}
                className=" btn-sm btn btn-outline-dark Subject"
              >
                Post <FaAngleDoubleUp />
              </button>
            )}
          </div>
        </div>
      </div>
      <div className={`p-2 Div-transition ${show ? "show" : ""}`}>
        {show && (
          <div className="accordion-body">
            <Form.Group className="mb-1 text-start">
              <Form.Control
                style={{ border: "none", borderBottom: "2px solid black" }}
                type="text"
                className="Subject"
                placeholder="Enter title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-1 text-start">
              <Form.Control
                as="textarea"
                style={{ border: "none", borderBottom: "2px solid black" }}
                className="Subject"
                rows={3}
                placeholder="Enter content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
              />
            </Form.Group>
            <div className="d-flex justify-content-between">
              <div className="col-5 m-2">
                <div
                  className="dropdown "
                  style={{ zIndex: 1, position: "absolute" }}
                >
                  <button
                    className="btn btn-sm btn-outline-dark Subject dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {selectedCategory || "Category"}
                  </button>
                  <ul className="dropdown-menu papaDive">
                    {["Vision", "Vacancy", "Issue", "Question", "Other"].map(
                      (category) => (
                        <li key={category} className="Subject mb-1">
                          <a
                            className="dropdown-item"
                            href="#"
                            onClick={() => handleCategorySelect(category)}
                          >
                            {category}
                          </a>
                        </li>
                      )
                    )}
                  </ul>
                </div>
              </div>{" "}
              <button
                className="btn btn-outline-dark Subject btn-sm col-5 m-2"
                type="submit"
              >
                <IoIosCreate /> Create Thread
              </button>
            </div>
            {error && (
              <Alert variant="danger" className="mt-3">
                Error: {error}
              </Alert>
            )}
          </div>
        )}
      </div>
    </form>
  );
}

export default NewThread;
