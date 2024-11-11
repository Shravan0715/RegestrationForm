import React, { useState } from 'react';
import './App.css';  // Import your CSS file

const App = () => {
  // State to hold form data and submitted data
  const [state, setState] = useState({
    name: '',
    email: '',
    course: '',
    subjects: {
      math: false,
      science: false,
      history: false,
    },
  });

  const [submittedData, setSubmittedData] = useState([]);  // Holds submitted form data

  const { name, email, course, subjects } = state;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      setState((prevState) => ({
        ...prevState,
        subjects: {
          ...prevState.subjects,
          [name]: checked,
        },
      }));
    } else if (type === 'select-one') {
      setState((prevState) => ({
        ...prevState,
        course: value,
      }));
    } else {
      setState((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Prepare the submitted data object
    const data = {
      name,
      email,
      course,
      subjects: Object.keys(subjects).filter((subject) => subjects[subject]),
    };

    // Add the submitted data to the state (which updates the table)
    setSubmittedData((prevData) => [...prevData, data]);

    // Reset form fields
    setState({
      name: '',
      email: '',
      course: '',
      subjects: {
        math: false,
        science: false,
        history: false,
      },
    });
  };

  return (
    <div className="container">
      <h2>Form Page</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={handleChange}
        />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={handleChange}
        />

        <label htmlFor="course">Course:</label>
        <select name="course" value={course} onChange={handleChange}>
          <option value="">Select a Course</option>
          <option value="math">Math</option>
          <option value="science">Science</option>
          <option value="history">History</option>
        </select>

        <label>Subjects:</label>
        <div>
          Math
          <input
            type="checkbox"
            name="math"
            checked={subjects.math}
            onChange={handleChange}
          />
          Science
          <input
            type="checkbox"
            name="science"
            checked={subjects.science}
            onChange={handleChange}
          />
          History
          <input
            type="checkbox"
            name="history"
            checked={subjects.history}
            onChange={handleChange}
          />
        </div>

        <button type="submit">Submit</button>
      </form>

      {/* Display the table of submitted data */}
      {submittedData.length > 0 && (
        <div>
          <h3>Submitted Data</h3>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Course</th>
                <th>Subjects</th>
              </tr>
            </thead>
            <tbody>
              {submittedData.map((data, index) => (
                <tr key={index}>
                  <td>{data.name}</td>
                  <td>{data.email}</td>
                  <td>{data.course}</td>
                  <td>{data.subjects.join(', ')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default App;
