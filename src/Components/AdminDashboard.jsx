import React, { useEffect, useState } from "react";
import "./AdminDashboard.css"; // Import your CSS file for styling
import Graph from "./Graph";
import axios from "axios";
import { useLocation } from "react-router-dom";

const AdminDashboard = () => {
  const location = useLocation();
  const data = location.state?.data || null;

  const [chargeCustomers, setChargeCustomers] = useState(data.charge_customers);
  const [customAmount, setCustomAmount] = useState(
    data.amount.category_6.toString()
  );
  const [regularAmounts, setRegularAmounts] = useState([
    data.amount.category_7.toString(),
    data.amount.category_8.toString(),
    data.amount.category_9.toString(),
    data.amount.category_10.toString(),
  ]);
  const [saveButtonDisabled, setSaveButtonDisabled] = useState(true);

  useEffect(() => {
    // Check conditions for Save button

    const isSaveButtonDisabled =
      chargeCustomers &&
      parseInt(customAmount, 10) > 99 &&
      regularAmounts.every(
        (amount, index) => parseInt(amount, 10) > [79, 59, 39, 19][index]
      );

    //   console.log(chargeCustomers,customAmount,regularAmounts,isSaveButtonDisabled);

    setSaveButtonDisabled(!isSaveButtonDisabled);
  }, [chargeCustomers, customAmount, regularAmounts]);

  const handleChargeCustomersChange = (event) => {
    setChargeCustomers(event.target.value === "option1");
  };

  const handleRegularAmountChange = (event, index) => {
    const newRegularAmounts = [...regularAmounts];
    newRegularAmounts[index] = event.target.value;
    setRegularAmounts(newRegularAmounts);
  };

  const handleCustomAmountChange = (event) => {
    setCustomAmount(event.target.value);
  };

  const handleSaveClick = async (event) => {
    event.preventDefault();
    // console.log('Save button',saveButtonDisabled)
    if (saveButtonDisabled == true) {
      return;
    }
    const amount = {
      category_6: parseInt(customAmount, 10),
      category_7: parseInt(regularAmounts[0], 10),
      category_8: parseInt(regularAmounts[1], 10),
      category_9: parseInt(regularAmounts[2], 10),
      category_10: parseInt(regularAmounts[3], 10),
    };
    const body = { amount };

    await axios
      .put(`https://stg.dhunjam.in/account/admin/${data.id}`, body)
      .then((response) => {
        // console.log(response.data);
        getAdminDetails(data.id);
      })
      .catch((error) => {
        console.error("Error while saving:", error);
      });
  };

  const getAdminDetails = async (id) => {
    // console.log(id);
    await axios
      .get(`https://stg.dhunjam.in/account/admin/${id}`)
      .then((response) => {
        // console.log('Admin Details', response.data);
        const res = response.data.data;
        setCustomAmount(res.amount.category_6.toString());
        setRegularAmounts([
          res.amount.category_7.toString(),
          res.amount.category_8.toString(),
          res.amount.category_9.toString(),
          res.amount.category_10.toString(),
        ]);
      })
      .catch((error) => {
        console.error("Error during admin:", error);
      });
  };

  return (
    <div className="admin-container">
      <div className="heading">
        {data.name}, {data.location} on Dhun Jam
      </div>
      <form className="form-container">
        <div className="form-item">
          <label className="label">
            Do you want to charge your customers for requesting songs?
          </label>
          <div className="radio-buttons">
            <input
              type="radio"
              name="yes"
              value="option1"
              checked={chargeCustomers}
              className={`${!chargeCustomers ? "radioButtonDisabled" : ""}`}
              onChange={handleChargeCustomersChange}
            />{" "}
            Yes{" "}
            <input
              type="radio"
              name="no"
              value="option2"
              className={`${!chargeCustomers ? "radioButtonDisabled" : ""}`}
              checked={!chargeCustomers}
              onChange={handleChargeCustomersChange}
            />{" "}
            No
          </div>
        </div>

        <div className="form-item">
          <label className="label">Custom song request amount-</label>
          <input
            type="number"
            placeholder="Enter Amount"
            className={`custom-text-field ${
              !chargeCustomers ? "disabled" : ""
            }`}
            value={customAmount}
            onChange={handleCustomAmountChange}
            disabled={!chargeCustomers}
            min="99"
          />
        </div>
        <div className="form-item">
          <label className="label">
            Regular song request amounts, from high to low-
          </label>
          <div className="text-fields">
            {regularAmounts.map((amount, index) => (
              <input
                key={index}
                type="number"
                placeholder=""
                className={`regular-text-field ${
                  !chargeCustomers ? "disabled" : ""
                }`}
                value={amount}
                onChange={(event) => handleRegularAmountChange(event, index)}
                disabled={!chargeCustomers}
                min={[79, 59, 39, 19][index]}
              />
            ))}
          </div>
        </div>
        <div className="graph">
          {chargeCustomers && (
            <Graph
              customAmount={customAmount}
              regularAmounts={regularAmounts}
            />
          )}
        </div>

        <div className="form-item">
          <button
            type="submit"
            className={`save-button ${saveButtonDisabled ? "disabled" : ""}`}
            disabled={saveButtonDisabled}
            onClick={handleSaveClick}
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminDashboard;
