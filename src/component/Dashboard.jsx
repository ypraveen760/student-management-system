import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCourse, removeCourse, updateCourse } from "../constant/courseSlice";
import { useNavigate } from "react-router-dom";
import StudentDashboard from "./StudentDashboard";

const Dashboard = () => {
  const [courseType, setCourseType] = useState("");
  const [course, setCourse] = useState("");
  const [indexEdit, setIndexEdit] = useState();
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const data = useSelector((store) => store.course);
  const isLogin = useSelector((store) => store.password);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogin.isVerified) {
      navigate("/login");
    }
  }, []);

  const handleSubmit = () => {
    if (!course || !courseType) {
      setError("Cannot Submit Empty Field ");
      return;
    }
    dispatch(addCourse({ courseType, course }));
    clearForm();
  };
  const handleUpdate = () => {
    if (!course || !courseType) {
      setError("Cannot Submit Empty Field ");
      return;
    }
    dispatch(
      updateCourse({ index: indexEdit, updatedCourse: { courseType, course } })
    );
    clearForm();
  };
  const clearForm = () => {
    setCourse("");
    setCourseType("");
    setError("");
  };
  const handleDelete = (index) => {
    dispatch(removeCourse(index));
  };

  return (
    <div>
      <div className="text-center  mt-3 text-2xl">Dashboard For Management</div>
      <div className="mx-5 ">
        <div className="divider my-10">
          {" "}
          Current Course Offering to Students
        </div>
        <div className="mt-4 ml-5">
          Create new course offering{" "}
          <button
            className="btn "
            onClick={() => document.getElementById("my_modal_1").showModal()}
          >
            Add
          </button>
          <dialog id="my_modal_1" className="modal">
            <div className="modal-box">
              <h3 className="font-bold text-lg">Add New Course Offering</h3>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Course Types:</span>
                  <span className="label-text-alt text-red-500 font-semibold">
                    {error}
                  </span>
                </div>
                <input
                  type="text"
                  value={courseType}
                  placeholder="e.g., Individual, Group, Special."
                  className="input input-bordered w-full max-w-xs"
                  onChange={(e) => setCourseType(e.target.value)}
                />
              </label>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Courses:</span>
                  <span className="label-text-alt"></span>
                </div>
                <input
                  type="text"
                  value={course}
                  placeholder="e.g., Hindi, English, Urdu."
                  className="input input-bordered w-full max-w-xs"
                  onChange={(e) => setCourse(e.target.value)}
                />
              </label>
              <div className="my-5 ">
                <button
                  className="btn btn-outline mr-8 btn-success"
                  onClick={handleSubmit}
                >
                  Submit
                </button>
                <button
                  className="btn btn-outline btn-error"
                  onClick={clearForm}
                >
                  Clear
                </button>
              </div>
              <div className="modal-action">
                <form method="dialog">
                  <button className="btn" onClick={clearForm}>
                    Close
                  </button>
                </form>
              </div>
            </div>
          </dialog>
        </div>

        <div>
          <div className=" border my-2 ">
            <table className="table">
              <thead>
                <tr className="border">
                  <th className="border">Sr.no</th>
                  <th className="border">Course Type</th>
                  <th className="border">Courses</th>
                  <th className="border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.course.map((data, index) => (
                  <tr key={index}>
                    <th className="border">{index + 1}</th>
                    <td className="border"> {data.courseType}</td>
                    <td className="border">{data.course}</td>
                    <td className="border">
                      <button
                        className="mr-4 "
                        onClick={() => {
                          setCourseType(data.courseType);
                          setCourse(data.course);
                          setIndexEdit(index);
                          document.getElementById("update_modal").showModal();
                        }}
                      >
                        ✏️
                      </button>
                      <dialog id="update_modal" className="modal">
                        <div className="modal-box">
                          <h3 className="font-bold text-lg">
                            Update Course Offering
                          </h3>
                          <label className="form-control w-full max-w-xs">
                            <div className="label">
                              <span className="label-text">Course Types:</span>
                              <span className="label-text-alt text-red-500 font-semibold">
                                {error}
                              </span>
                            </div>
                            <input
                              type="text"
                              value={courseType}
                              placeholder="e.g., Individual, Group, Special."
                              className="input input-bordered w-full max-w-xs"
                              onChange={(e) => setCourseType(e.target.value)}
                            />
                          </label>
                          <label className="form-control w-full max-w-xs">
                            <div className="label">
                              <span className="label-text">Courses:</span>
                              <span className="label-text-alt"></span>
                            </div>
                            <input
                              type="text"
                              value={course}
                              placeholder="e.g., Hindi, English, Urdu."
                              className="input input-bordered w-full max-w-xs"
                              onChange={(e) => setCourse(e.target.value)}
                            />
                          </label>
                          <div className="my-5 ">
                            <button
                              className="btn btn-outline mr-8 btn-success"
                              onClick={handleUpdate}
                            >
                              Update
                            </button>
                            <button
                              className="btn btn-outline btn-error"
                              onClick={clearForm}
                            >
                              Clear
                            </button>
                          </div>
                          <div className="modal-action">
                            <form method="dialog">
                              <button className="btn" onClick={clearForm}>
                                Close
                              </button>
                            </form>
                          </div>
                        </div>
                      </dialog>
                      <button onClick={() => handleDelete(index)}>❌</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="divider my-10">Student Registrations Dashboard</div>
      <StudentDashboard />
    </div>
  );
};

export default Dashboard;
