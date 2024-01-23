import React, { useState } from 'react';
import axios from 'axios';
import './form.css'

const StudentForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    percentage: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
        const response = await axios.post('http://localhost:3001/api/students', formData);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }    console.log('Form submitted:', formData);
  };

  return (
    <div className="form-container">
      <h2>Student Details Form</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Student Name:
          <input type="text" name="name" value={formData.name} onChange={handleChange} />
        </label>

        <label>
          Email:
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
        </label>

        <label>
          Phone:
          <input type="tel" name="phone" value={formData.phone} onChange={handleChange} />
        </label>

        <label>
          Address:
          <textarea name="address" value={formData.address} onChange={handleChange} />
        </label>

        <label>
          Percentage Obtained:
          <input type="number" name="percentage" value={formData.percentage} onChange={handleChange} />
        </label>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default StudentForm;
