import React, { useState } from 'react';
import { FaPills, FaPlus, FaClock, FaEdit, FaTrash, FaTimes } from 'react-icons/fa';

function Medications() {
  const [medications, setMedications] = useState([
    { id: 1, name: 'Lisinopril', dose: '10mg', frequency: 'Daily', time: '8:00 AM' },
    { id: 2, name: 'Metformin', dose: '500mg', frequency: 'Twice daily', time: '8:00 AM, 6:00 PM' },
    { id: 3, name: 'Atorvastatin', dose: '20mg', frequency: 'Night', time: '9:00 PM' },
    { id: 4, name: 'Aspirin', dose: '75mg', frequency: 'Daily', time: '8:00 AM' },
    { id: 5, name: 'Omeprazole', dose: '20mg', frequency: 'Daily', time: '7:00 AM' },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingMed, setEditingMed] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    dose: '',
    frequency: '',
    time: ''
  });

  const handleAddClick = () => {
    setEditingMed(null);
    setFormData({ name: '', dose: '', frequency: '', time: '' });
    setShowModal(true);
  };

  const handleEditClick = (med) => {
    setEditingMed(med);
    setFormData({
      name: med.name,
      dose: med.dose,
      frequency: med.frequency,
      time: med.time
    });
    setShowModal(true);
  };

  const handleDeleteClick = (id) => {
    if (window.confirm('Are you sure you want to delete this medication?')) {
      setMedications(medications.filter(med => med.id !== id));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.dose || !formData.frequency || !formData.time) {
      alert('Please fill in all fields');
      return;
    }

    if (editingMed) {
      // Update existing medication
      setMedications(medications.map(med => 
        med.id === editingMed.id 
          ? { ...med, ...formData }
          : med
      ));
    } else {
      // Add new medication
      const newMed = {
        id: Math.max(...medications.map(m => m.id), 0) + 1,
        ...formData
      };
      setMedications([...medications, newMed]);
    }

    setShowModal(false);
    setFormData({ name: '', dose: '', frequency: '', time: '' });
    setEditingMed(null);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setFormData({ name: '', dose: '', frequency: '', time: '' });
    setEditingMed(null);
  };

  return (
    <div style={styles.medicationsPage}>
      <div style={styles.medicalPatternBg}></div>
      
      <div style={styles.pageHeader}>
        <h2 style={styles.pageTitle}>
          <FaPills style={styles.pageTitleIcon} /> My Medications
        </h2>
        <div 
          role="button" 
          tabIndex="0" 
          style={styles.addBtn} 
          onClick={handleAddClick}
          onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleAddClick()}
        >
          <FaPlus style={styles.btnIcon} /> Add Medicine
        </div>
      </div>

      <div style={styles.medicineList}>
        {medications.map((med) => (
          <div key={med.id} style={styles.medicineCard}>
            <div style={styles.cardHeader}>
              <div style={styles.iconWrapper}>
                <FaPills style={styles.medicineIcon} />
              </div>
              <h3 style={styles.medicineName}>{med.name}</h3>
            </div>
            
            <div style={styles.cardBody}>
              <div style={styles.medicineDetail}>
                <span style={styles.detailLabel}>Dose:</span>
                <span style={styles.detailValue}>{med.dose}</span>
              </div>
              <div style={styles.medicineDetail}>
                <span style={styles.detailLabel}>Frequency:</span>
                <span style={styles.detailValue}>{med.frequency}</span>
              </div>
              <div style={styles.medicineDetail}>
                <FaClock style={styles.clockIcon} />
                <span style={styles.detailValue}>{med.time}</span>
              </div>
            </div>

            <div style={styles.cardActions}>
              <div 
                role="button"
                tabIndex="0"
                style={styles.editBtn}
                onClick={() => handleEditClick(med)}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleEditClick(med)}
              >
                <FaEdit /> Edit
              </div>
              <div 
                role="button"
                tabIndex="0"
                style={styles.deleteBtn}
                onClick={() => handleDeleteClick(med.id)}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleDeleteClick(med.id)}
              >
                <FaTrash /> Delete
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div style={styles.modalOverlay} onClick={handleCloseModal}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <h3 style={styles.modalTitle}>
                {editingMed ? 'Edit Medication' : 'Add New Medication'}
              </h3>
              <div 
                role="button" 
                tabIndex="0" 
                style={styles.closeBtn} 
                onClick={handleCloseModal}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleCloseModal()}
              >
                <FaTimes />
              </div>
            </div>

            <form onSubmit={handleSubmit} style={styles.form}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Medication Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  style={styles.input}
                  placeholder="Enter medication name"
                  required
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Dose</label>
                <input
                  type="text"
                  name="dose"
                  value={formData.dose}
                  onChange={handleInputChange}
                  style={styles.input}
                  placeholder="e.g., 10mg"
                  required
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Frequency</label>
                <select
                  name="frequency"
                  value={formData.frequency}
                  onChange={handleInputChange}
                  style={styles.input}
                  required
                >
                  <option value="">Select frequency</option>
                  <option value="Daily">Daily</option>
                  <option value="Twice daily">Twice daily</option>
                  <option value="Three times daily">Three times daily</option>
                  <option value="Night">Night</option>
                  <option value="As needed">As needed</option>
                </select>
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Time</label>
                <input
                  type="text"
                  name="time"
                  value={formData.time}
                  onChange={handleInputChange}
                  style={styles.input}
                  placeholder="e.g., 8:00 AM"
                  required
                />
              </div>

              <div style={styles.modalActions}>
                <div 
                  role="button" 
                  tabIndex="0" 
                  style={styles.cancelBtn}
                  onClick={handleCloseModal}
                  onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleCloseModal()}
                >
                  Cancel
                </div>
                <div 
                  role="button" 
                  tabIndex="0" 
                  style={styles.submitBtn}
                  onClick={handleSubmit}
                  onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleSubmit(e)}
                >
                  {editingMed ? 'Update' : 'Add'} Medication
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}


const styles = {
  medicationsPage: {
    width: '100%',
    minHeight: '100vh',
    background: '#E8F6EF', 
    padding: '40px',
    position: 'relative',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  medicalPatternBg: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    opacity: 0.05,
    backgroundImage: `
      repeating-linear-gradient(45deg, transparent, transparent 50px, rgba(6,182,212,0.1) 50px, rgba(6,182,212,0.1) 51px),
      repeating-linear-gradient(-45deg, transparent, transparent 50px, rgba(6,182,212,0.1) 50px, rgba(6,182,212,0.1) 51px)
    `,
    pointerEvents: 'none',
  },
  pageHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '40px',
    position: 'relative',
    zIndex: 1,
  },
  pageTitle: {
    fontSize: '48px',
    fontWeight: '700',
    color: '#064E3B', // Dark green text from homepage
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    margin: 0,
    textShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  pageTitleIcon: {
    color: '#10B981', 
    fontSize: '52px',
  },
  addBtn: {
    padding: '14px 30px',
    backgroundColor: '#10B981', 
    color: '#ffffff',
    border: 'none',
    borderRadius: '30px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    transition: 'all 0.3s ease',
    boxShadow: '0 6px 20px rgba(16,185,129,0.3)',
    outline: 'none',
  },
  btnIcon: {
    fontSize: '18px',
  },
  medicineList: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
    gap: '30px',
    position: 'relative',
    zIndex: 1,
  },
  medicineCard: {
    backgroundColor: '#ffffff',
    padding: '0',
    borderRadius: '20px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
    transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
    border: '1px solid rgba(16,185,129,0.2)',
    overflow: 'hidden',
    position: 'relative',
  },
  cardHeader: {
    background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)', 
    padding: '24px',
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    borderBottom: '3px solid #065F46',
  },
  iconWrapper: {
    width: '56px',
    height: '56px',
    borderRadius: '50%',
    backgroundColor: 'rgba(255,255,255,0.2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backdropFilter: 'blur(10px)',
  },
  medicineIcon: {
    fontSize: '32px',
    color: '#ffffff',
  },
  medicineName: {
    fontSize: '24px',
    fontWeight: '700',
    color: '#ffffff',
    margin: 0,
    textShadow: '0 2px 4px rgba(0,0,0,0.2)',
  },
  cardBody: {
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  medicineDetail: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '15px',
    gap: '8px',
  },
  detailLabel: {
    fontWeight: '600',
    color: '#064E3B', 
    minWidth: '90px',
  },
  detailValue: {
    color: '#065F46', // Secondary dark green text
    fontWeight: '500',
  },
  clockIcon: {
    color: '#10B981', // Primary accent green
    fontSize: '18px',
    marginRight: '4px',
  },
  cardActions: {
    display: 'flex',
    gap: '0',
    borderTop: '1px solid rgba(16,185,129,0.2)',
  },
  editBtn: {
    flex: 1,
    padding: '14px',
    backgroundColor: '#E0F2FE', 
    color: '#0891B2',
    border: 'none',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    borderRight: '1px solid rgba(16,185,129,0.2)',
    outline: 'none',
  },
  deleteBtn: {
    flex: 1,
    padding: '14px',
    backgroundColor: '#FEE2E2', // Matches red from .btn-logout
    color: '#DC2626',
    border: 'none',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    outline: 'none',
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
    backdropFilter: 'blur(4px)',
  },
  modalContent: {
    backgroundColor: '#ffffff',
    borderRadius: '20px',
    padding: '0',
    width: '90%',
    maxWidth: '500px',
    boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
    animation: 'slideIn 0.3s ease',
    border: '2px solid rgba(16,185,129,0.3)',
  },
  modalHeader: {
    background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)', // Green gradient
    padding: '24px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: '18px 18px 0 0',
  },
  modalTitle: {
    fontSize: '24px',
    fontWeight: '700',
    color: '#ffffff',
  },
  closeBtn: {
    background: 'none',
    border: 'none',
    color: '#ffffff',
    fontSize: '24px',
    cursor: 'pointer',
    padding: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
    transition: 'all 0.3s ease',
    outline: 'none',
  },
  form: {
    padding: '32px',
  },
  formGroup: {
    marginBottom: '24px',
  },
  label: {
    display: 'block',
    fontSize: '14px',
    fontWeight: '600',
    color: '#064E3B', // Dark green text
    marginBottom: '8px',
  },
  input: {
    width: '100%',
    padding: '12px 16px',
    fontSize: '15px',
    border: '2px solid #E5E7EB',
    borderRadius: '12px',
    backgroundColor: '#F9FAFB',
    transition: 'all 0.3s ease',
    outline: 'none',
    color: '#064E3B',
  },
  modalActions: {
    display: 'flex',
    gap: '12px',
    marginTop: '32px',
  },
  cancelBtn: {
    flex: 1,
    padding: '14px',
    backgroundColor: '#F3F4F6',
    color: '#4B5563',
    border: 'none',
    borderRadius: '12px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    outline: 'none',
  },
  submitBtn: {
    flex: 1,
    padding: '14px',
    backgroundColor: '#10B981', // Primary accent green
    color: '#ffffff',
    border: 'none',
    borderRadius: '12px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 12px rgba(16,185,129,0.3)',
    outline: 'none',
  },
};

const styleSheet = document.createElement('style');
styleSheet.textContent = `
  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(-20px) scale(0.95);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }
`;
document.head.appendChild(styleSheet);

export default Medications;
