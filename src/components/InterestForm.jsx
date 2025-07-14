import React, { useState } from 'react';
import './InterestForm.css';

export default function InterestForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    costGuess: '',
    secretPin: ''
  });

  const [customPrice, setCustomPrice] = useState('');
  const [useCustomPrice, setUseCustomPrice] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errors, setErrors] = useState([]);

  const handleChange = (e) => {
    let { name, value } = e.target;
    if (name === "secretPin") {
      value = value.replace(/\D/g, '').slice(0,16).replace(/(\d{4})(?=\d)/g, '$1-');
    }
    if (name === "phone") {
      value = value.replace(/\D/g, '');
    }
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    let errs = [];
    if (!formData.firstName.trim()) errs.push("First name is required.");
    if (!formData.lastName.trim()) errs.push("Last name is required.");
    if (!/^\d{10}$/.test(formData.phone)) errs.push("Phone number must be exactly 10 digits.");
    if (!/\S+@\S+\.\S+/.test(formData.email)) errs.push("Email format is invalid.");
    if (useCustomPrice) {
      if (!customPrice.trim() || isNaN(customPrice)) errs.push("Enter a valid custom price.");
    } else {
      if (!formData.costGuess) errs.push("Select a price range.");
    }
    if (!formData.secretPin || formData.secretPin.length < 19) {
      errs.push("Enter a complete 16-digit Spidr PIN.");
    }
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      setSuccessMessage('');
    } else {
      console.log("Form Data:", {
        ...formData,
        costGuess: useCustomPrice ? customPrice : formData.costGuess
      });
      setSuccessMessage("✅ Thank you! Your reservation was submitted.");
      setErrors([]);
      setTimeout(() => setSuccessMessage(''), 4000);
    }
  };

  return (
    <div className="form-container">
      <h2>Reserve Your Air Fryer</h2>
            {errors.length > 0 && (
        <div className="error-box">
          {errors.map((err, idx) => <div key={idx}>{err}</div>)}
        </div>
      )}

      {successMessage && (
        <div className="success-message fade-in">
          {successMessage}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <input type="text" name="firstName" placeholder="First Name"
          value={formData.firstName} onChange={handleChange} />

        <input type="text" name="lastName" placeholder="Last Name"
          value={formData.lastName} onChange={handleChange} />

        <input type="tel" name="phone" placeholder="Phone Number"
          value={formData.phone} onChange={handleChange} />

        <input type="email" name="email" placeholder="Email"
          value={formData.email} onChange={handleChange} />

        {useCustomPrice ? (
          <>
            <input type="number" placeholder="Enter Custom Price"
              value={customPrice} onChange={(e) => setCustomPrice(e.target.value)} />
            <button type="button" className="back-button"
              onClick={() => setUseCustomPrice(false)}>
              Back to Price Range
            </button>
          </>
        ) : (
          <div className="price-select">
            <select name="costGuess" value={formData.costGuess} onChange={handleChange}>
              <option value="">Select a Price Range</option>
              <option value="Under $50">Under $50</option>
              <option value="$50 - $100">$50 - $100</option>
              <option value="$100 - $200">$100 - $200</option>
              <option value="Over $200">Over $200</option>
            </select>
            <button type="button" onClick={() => setUseCustomPrice(true)}>
              Enter Custom Price
            </button>
          </div>
        )}

        <input type="text" name="secretPin" placeholder="####-####-####-####"
          value={formData.secretPin} onChange={handleChange} />

        <button type="submit">Submit</button>
      </form>


    </div>
  );
}
