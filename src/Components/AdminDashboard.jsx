import React, { useEffect, useState } from 'react';
import './AdminDashboard.css'; // Import your CSS file for styling
import Graph from './Graph';
import axios from 'axios';

const AdminDashboard = ({data}) => {
    console.log(data);

    const [chargeCustomers, setChargeCustomers] = useState(false);
  const [customAmount, setCustomAmount] = useState(data.amount.category_6.toString());
  const [regularAmounts, setRegularAmounts] = useState([data.amount.category_7.toString(), data.amount.category_8.toString(), data.amount.category_9.toString(), data.amount.category_10.toString()]);
  const [saveButtonDisabled, setSaveButtonDisabled] = useState(true);

  useEffect(() => {
    // Check conditions for Save button
    const isSaveButtonDisabled =
      (chargeCustomers && parseInt(customAmount, 10) <= 99) ||
      !regularAmounts.every((amount, index) => parseInt(amount, 10) > [79, 59, 39, 19][index]);

    setSaveButtonDisabled(isSaveButtonDisabled);
  }, [chargeCustomers, customAmount, regularAmounts]);

  const handleChargeCustomersChange = (event) => {
    setChargeCustomers(event.target.value === 'option1');
  };

  const handleRegularAmountChange = (event, index) => {
    const newRegularAmounts = [...regularAmounts];
    newRegularAmounts[index] = event.target.value;
    setRegularAmounts(newRegularAmounts);
  };

  const handleCustomAmountChange = (event) => {
    setCustomAmount(event.target.value);
  };

  return (
    <div className="admin-container">
      <h1 className="heading">{data.name}, {data.location} on Dhun Jam</h1>
      <form className="form-container">
        <div className="form-item">
          <label className="label">Do you want to charge your customers for requesting songs?</label>
          <div className="radio-buttons">
          <input type="radio"
            name="q1"
            value="option1"
            checked={chargeCustomers}
            onChange={handleChargeCustomersChange} /> Yes{' '}
            <input type="radio"
            name="q1"
            value="option2"
            checked={!chargeCustomers}
            onChange={handleChargeCustomersChange} /> No
          </div>
        </div>

        <div className="form-item">
          <label className="label">Custom song request amount-</label>
          <input type="number"
          placeholder="Enter Amount"
          className="custom-text-field"
          value={customAmount}
          onChange={handleCustomAmountChange}
          disabled={!chargeCustomers}
          min="99" />
        </div>
        <div className="form-item">
          <label className="label">Regular song request amounts, from high to low-</label>
          <div className="text-fields">
          {regularAmounts.map((amount, index) => (
            <input
              key={index}
              type="number"
              placeholder=""
              className="regular-text-field"
              value={amount}
              onChange={(event) => handleRegularAmountChange(event, index)}
              disabled={!chargeCustomers}
              min={[79, 59, 39, 19][index]}
            />
          ))}
          {/* <input type="text" placeholder="" className="regular-text-field" />
          <input type="text" placeholder="" className="regular-text-field" />
          <input type="text" placeholder="" className="regular-text-field" />
          <input type="text" placeholder="" className="regular-text-field" /> */}
        </div>
        </div>
        <div className="graph">
        {chargeCustomers && <Graph customAmount={customAmount} regularAmounts={regularAmounts} />}
        </div>


        <div className="form-item">
          <button type="submit" className="save-button" disabled={saveButtonDisabled}>Save</button>
        </div>
      </form>
    </div>
  );
};

export default AdminDashboard;
