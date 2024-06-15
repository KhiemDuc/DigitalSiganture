import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

function AddPlan() {
  const [isOpen, setIsOpen] = useState(false);
  const [planId, setPlanId] = useState("");
  const [planName, setPlanName] = useState("");
  const [benefits, setBenefits] = useState([""]);

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const handlePlanIdChange = (e) => {
    setPlanId(e.target.value);
  };

  const handlePlanNameChange = (e) => {
    setPlanName(e.target.value);
  };

  const handleBenefitChange = (e, index) => {
    const newBenefits = [...benefits];
    newBenefits[index] = e.target.value;
    setBenefits(newBenefits);
  };

  const handleAddBenefit = () => {
    setBenefits([...benefits, ""]);
  };

  const handleAddPlan = () => {
    const plan = {
      id: planId,
      name: planName,
      benefits: benefits,
    };
    console.log(plan);
    setPlanId("");
    setPlanName("");
    setBenefits([""]);
    setIsOpen(false);
  };

  return (
    <div>
      <Modal open={isOpen} onClose={handleCloseModal}>
        <Box sx={{ padding: 4 }}>
          <TextField
            label="Plan ID"
            value={planId}
            onChange={handlePlanIdChange}
          />
          <TextField
            label="Plan Name"
            value={planName}
            onChange={handlePlanNameChange}
          />
          {benefits.map((benefit, index) => (
            <TextField
              key={index}
              label={`Benefit ${index + 1}`}
              value={benefit}
              onChange={(e) => handleBenefitChange(e, index)}
            />
          ))}
          <Button variant="contained" onClick={handleAddBenefit}>
            Add Benefit
          </Button>
          <Button variant="contained" onClick={handleAddPlan}>
            Add Plan
          </Button>
          <Button variant="contained" onClick={handleCloseModal}>
            Cancel
          </Button>
        </Box>
      </Modal>
    </div>
  );
}

export default AddPlan;
