import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeStudent } from "../constant/studentSlice";

const StudentDashboard = () => {
  const studentData = useSelector((store) => store.students);
  const dispatch = useDispatch();
  console.log(studentData.students);

  const handleDelete = (index) => {
    dispatch(removeStudent(index));
  };

  return (
    <div>
      <div className="overflow-x-auto lg:mx-48">
        <table className="table">
          <thead>
            <tr className="border">
              <th className="border">Sr.NO</th>
              <th className="border">Name</th>
              <th className="border">Email ID</th>
              <th className="border">Date of Birth</th>
              <th className="border">Gender</th>
              <th className="border">Course Type</th>
              <th className="border">Course</th>
              <th className="border">Action</th>
            </tr>
          </thead>
          <tbody>
            {studentData.students.map((student, index) => (
              <tr key={index}>
                <td className="border">{index + 1}</td>
                <td className="border">{student.name}</td>
                <td className="border">{student.email}</td>
                <td className="border">{student.dob}</td>
                <td className="border">{student.gender}</td>
                <td className="border">{student.courseType}</td>
                <td className="border">{student.course}</td>
                <td className="border">
                  <button onClick={() => handleDelete(index)}>❌</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentDashboard;
