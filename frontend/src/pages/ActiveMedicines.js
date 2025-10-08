import React, { useState } from 'react';
import { FaPlus, FaPrescriptionBottleAlt } from 'react-icons/fa';
import './ActiveMedicine.css';

const ActiveMedicines = () => {
  const [medicines, setMedicines] = useState([
    { name: 'Aspirin', disease: 'Blood Thinner', amount: '90 tablets', time: '08:00' },
    { name: 'Lisinopril', disease: 'ACE Inhibitor', amount: '60 tablets', time: '09:00' },
    { name: 'Omeprazole', disease: 'PPI', amount: '30 capsules', time: '07:30' },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [medicineName, setMedicineName] = useState('');
  const [disease, setDisease] = useState('');
  const [amount, setAmount] = useState('');
  const [time, setTime] = useState('');

  const handleAddMedicine = (e) => {
    e.preventDefault();
    const newMed = { name: medicineName, disease, amount, time };
    setMedicines([...medicines, newMed]);
    setMedicineName('');
    setDisease('');
    setAmount('');
    setTime('');
    setIsModalOpen(false);
    console.log('Medicine added:', newMed);
  };

  return (
    <div className="active-medicine-container">
      {/* Card */}
      <div className="active-medicine-card">
        <div className="active-medicine-header">
          <h3 className="active-medicine-title">
            <FaPrescriptionBottleAlt className="active-medicine-title-icon" /> Active Medicines
          </h3>
        </div>

        {/* Medicine List */}
        <div className="active-medicine-list">
          {medicines.map((med, idx) => (
            <div
              key={idx}
              className="active-medicine-item"
              onMouseEnter={e => { e.currentTarget.classList.add('hover'); }}
              onMouseLeave={e => { e.currentTarget.classList.remove('hover'); }}
            >
              <div className="active-medicine-details">
                <div className="active-medicine-icon-wrapper">
                  <FaPrescriptionBottleAlt />
                </div>
                <div className="active-medicine-info">
                  <div className="active-medicine-name">{med.name}</div>
                  <small className="active-medicine-disease">{med.disease}</small>
                </div>
              </div>
              <div className="active-medicine-amount">
                <div className="active-medicine-amount-value">{med.amount}</div>
                <small className="active-medicine-time">{med.time}</small>
              </div>
            </div>
          ))}
        </div>
        <center>
         <button
            onClick={() => setIsModalOpen(true)}
            className="active-medicine-add-btn"
          >
            <FaPlus /> Add&nbsp;Medicine
          </button>
          </center>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="active-medicine-modal-overlay">
          <div className="active-medicine-modal-content">
            <div className="active-medicine-modal-header">
              <h3>Add Medicine</h3>
              <span
                className="active-medicine-modal-close"
                onClick={() => setIsModalOpen(false)}
              >
                ×
              </span>
            </div>
            <form onSubmit={handleAddMedicine} className="active-medicine-form">
              <input
                type="text"
                placeholder="Medicine Name"
                value={medicineName}
                onChange={(e) => setMedicineName(e.target.value)}
                className="active-medicine-input"
                required
              />
              <input
                type="text"
                placeholder="Disease"
                value={disease}
                onChange={(e) => setDisease(e.target.value)}
                className="active-medicine-input"
                required
              />
              <input
                type="text"
                placeholder="Amount (e.g., 30 tablets)"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="active-medicine-input"
                required
              />
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="active-medicine-input"
                required
              />
              <button type="submit" className="active-medicine-submit-btn">
                Add Medicine
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActiveMedicines;
