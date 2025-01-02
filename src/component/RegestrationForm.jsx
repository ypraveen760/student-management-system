import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addStudent } from "../constant/studentSlice";

const RegestrationForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [error, setError] = useState("");
  const [courseData, setCourseData] = useState([]);
  const [course, setCourse] = useState([]);
  const [selectedCourseType, setSelectedCourseType] = useState("");
  const dispatch = useDispatch();
  const filter =
    selectedCourseType !== ""
      ? courseData.filter((item) => item.courseType === selectedCourseType)
      : [];

  const validateSubmit = () => {
    if (!name) {
      return "Name is required.";
    }
    if (!email) {
      return "Email ID is required.";
    }
    if (!dob) {
      return "Date of Birth is required";
    }
    if (!gender) {
      return "gender is required";
    }
    if (!selectedCourseType) {
      return "Course is required";
    }
    if (!course) {
      return "Course is required";
    }

    const isEmailValid = /^[a-zA-Z0-9_.±]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(
      email
    );
    if (!isEmailValid) {
      return "Email ID is not valid.";
    }

    return null; // All validations passed
  };

  useEffect(() => {
    const storedData = localStorage.getItem("course");
    if (storedData) {
      setCourseData(JSON.parse(storedData));
    }
  }, []);

  const handleSubmit = () => {
    setError("");
    const validateError = validateSubmit();
    if (validateError) {
      setError(validateError);
      return;
    }
    dispatch(
      addStudent({
        name,
        email,
        dob,
        gender,
        courseType: selectedCourseType,
        course,
      })
    );
    handleCancle();
  };
  const handleCancle = () => {
    setError("");
    setName(""), setEmail(""), setDob(""), setGender("");
    setSelectedCourseType("");
    setCourse("");
  };

  return (
    <div className="w-96 p-5 rounded-lg mt-20 border mx-auto flex flex-col gap-5">
      <span className="text-center text-lg font-semibold">
        Student Regestration Form
      </span>
      <div>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">What is your name?</span>
          </div>
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">What is your Email?</span>
          </div>
          <input
            type="email"
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">What is your Date of Birth</span>
          </div>
          <input
            type="date"
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
          />
        </label>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Gender</span>
          </div>
          <select
            className="select select-bordered"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option disabled value="">
              Gender
            </option>
            <option value={"male"}>Male</option>
            <option value={"female"}>Female</option>
          </select>
        </label>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Course Type</span>
          </div>
          <select
            className="select select-bordered"
            value={selectedCourseType}
            onChange={(e) => setSelectedCourseType(e.target.value)}
          >
            <option disabled value="">
              Course Type
            </option>
            {courseData.map((item, index) => (
              <option key={index} value={item.courseType}>
                {item.courseType}
              </option>
            ))}
          </select>
        </label>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Course</span>
          </div>
          <select
            className="select select-bordered"
            onChange={(e) => setCourse(e.target.value)}
            value={course}
          >
            <option disabled value="">
              Course
            </option>
            {filter.map((item, index) => (
              <option key={index} value={item.course}>
                {item.course}
              </option>
            ))}
          </select>
        </label>
      </div>
      <span className="text-center text-red-500 font-semibold text-sm">
        {error}
      </span>
      <div className=" flex justify-evenly">
        <button className="btn btn-success" onClick={handleSubmit}>
          Submit
        </button>
        <button className="btn btn-error" onClick={handleCancle}>
          Cancle
        </button>
      </div>
    </div>
  );
};

export default RegestrationForm;
