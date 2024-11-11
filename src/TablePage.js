import React, { useState, useEffect } from 'react';

const TablePage = () => {
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    // Load the submissions from localStorage
    const savedSubmissions = JSON.parse(localStorage.getItem('submissions')) || [];
    setSubmissions(savedSubmissions);
  }, []);

  return (
    <div>
      <h2>Table Page</h2>
      <h3>Submitted Data</h3>
      <table border="1" cellPadding="10" cellSpacing="0">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Course</th>
            <th>Subjects</th>
          </tr>
        </thead>
        <tbody>
          {submissions.length > 0 ? (
            submissions.map((submission, index) => (
              <tr key={index}>
                <td>{submission.name}</td>
                <td>{submission.email}</td>
                <td>{submission.course}</td>
                <td>{submission.subjects.join(', ')}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No data submitted yet.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TablePage;
