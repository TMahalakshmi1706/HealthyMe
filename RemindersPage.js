import React, { useState, useEffect } from 'react';
import { FaClock, FaPlus, FaTrash, FaEdit, FaSave, FaTimes, FaPills, FaCalendarAlt, FaCheck } from 'react-icons/fa';
import { Bell, Pill, Calendar, AlertCircle, CheckCircle2 } from 'lucide-react';

const RemindersPage = () => {
  const [reminders, setReminders] = useState([
    {
      id: 1,
      medicineName: 'Paracetamol',
      dosage: '500mg',
      times: ['08:00', '20:00'],
      frequency: 'Daily',
      startDate: '2025-01-01',
      endDate: '2025-01-15',
      notes: 'Take after meals',
      active: true
    },
    {
      id: 2,
      medicineName: 'Metformin',
      dosage: '250mg',
      times: ['09:00', '21:00'],
      frequency: 'Daily',
      startDate: '2025-01-01',
      endDate: '2025-03-01',
      notes: 'Take with food',
      active: true
    }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    medicineName: '',
    dosage: '',
    times: [''],
    frequency: 'Daily',
    startDate: '',
    endDate: '',
    notes: '',
    active: true
  });

  const [todayReminders, setTodayReminders] = useState([]);

 useEffect(() => {
  const today = new Date().toISOString().split('T')[0];
  const todayList = [];

  reminders.forEach(reminder => {
    if (reminder.active && reminder.startDate <= today && reminder.endDate >= today) {
      reminder.times.forEach(time => {
        const [hours, minutes] = time.split(':');
        const reminderTime = new Date();
        reminderTime.setHours(parseInt(hours), parseInt(minutes), 0);

        todayList.push({
          ...reminder,
          time: time,
          status: new Date() > reminderTime ? 'taken' : 'pending'
        });
      });
    }
  });

  todayList.sort((a, b) => a.time.localeCompare(b.time));
  setTodayReminders(todayList);
}, [reminders]);

  const handleAddTime = () => {
    setFormData({
      ...formData,
      times: [...formData.times, '']
    });
  };

  const handleRemoveTime = (index) => {
    const newTimes = formData.times.filter((_, i) => i !== index);
    setFormData({ ...formData, times: newTimes });
  };

  const handleTimeChange = (index, value) => {
    const newTimes = [...formData.times];
    newTimes[index] = value;
    setFormData({ ...formData, times: newTimes });
  };

  const handleSubmit = () => {
    const validTimes = formData.times.filter(time => time !== '');
    
    if (!formData.medicineName || !formData.dosage || validTimes.length === 0) {
      alert('Please fill in all required fields');
      return;
    }

    if (editingId) {
      setReminders(reminders.map(reminder =>
        reminder.id === editingId
          ? { ...formData, id: editingId, times: validTimes }
          : reminder
      ));
      setEditingId(null);
    } else {
      setReminders([
        ...reminders,
        { ...formData, id: Date.now(), times: validTimes }
      ]);
    }

    resetForm();
  };

  const handleEdit = (reminder) => {
    setFormData(reminder);
    setEditingId(reminder.id);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this reminder?')) {
      setReminders(reminders.filter(reminder => reminder.id !== id));
    }
  };

  const toggleActive = (id) => {
    setReminders(reminders.map(reminder =>
      reminder.id === id
        ? { ...reminder, active: !reminder.active }
        : reminder
    ));
  };

  const resetForm = () => {
    setFormData({
      medicineName: '',
      dosage: '',
      times: [''],
      frequency: 'Daily',
      startDate: '',
      endDate: '',
      notes: '',
      active: true
    });
    setShowForm(false);
    setEditingId(null);
  };

  return (
    <div className="reminders-page-wrapper">
      <style>{`
        .reminders-page-wrapper {
          min-height: 100vh;
          background: #E8F6EF;
          padding: 40px 20px;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        .reminders-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .reminders-header {
          display: block;
          justify-content: space-between; /* keeps button to right */
          align-items: center;
          margin-bottom: 40px;
          padding: 30px 40px;
          background: white;
          border-radius: 15px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
          border: 1px solid rgba(16,185,129,0.2);
          animation: fadeInUp 0.6s ease forwards;
          position: relative; /* add this for absolute positioning if needed */
        }
        .reminders-header-left {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .reminders-header-icon {
          color: #10B981;
          font-size: 40px;
        }

        .reminders-title-wrapper h1 {
          font-size: 32px;
          font-weight: 700;
          color: #064E3B;
          margin: 0 0 4px 0;
          text-shadow: 0 1px 2px rgba(0,0,0,0.1);
        }

        .reminders-title-wrapper p {
          font-size: 15px;
          color: #065F46;
          margin: 0;
          opacity: 0.9;
        }

        .add-reminder-btn {
          position: relative;
          width:300px;
          background: #0F805D;
          top: 20px;
          right: 20px;
          z-index: 10;
        }


        .add-reminder-btn:hover {
          background-color: #0F805D;
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(16,185,129,0.4);
        }

        .add-reminder-btn.cancel-btn {
          background-color: #ef4444 !important; /* use !important */
          color: white !important;
          box-shadow: 0 4px 12px rgba(239,68,68,0.3) !important;
        }

        .add-reminder-btn.cancel-btn:hover {
          background-color: #dc2626 !important;
          box-shadow: 0 6px 16px rgba(239,68,68,0.4) !important;
        }

        .today-section {
          margin-bottom: 40px;
          animation: fadeInUp 0.7s ease forwards;
        }

        .today-schedule-card {
          background: white;
          padding: 40px;
          border-radius: 15px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
          border: 1px solid rgba(16,185,129,0.2);
          position: relative;
          overflow: hidden;
        }

        .today-schedule-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, rgba(16,185,129,0.05) 0%, rgba(6,182,212,0.05) 100%);
          opacity: 0;
          transition: opacity 0.3s ease;
          pointer-events: none;
        }

        .today-schedule-card:hover::before {
          opacity: 1;
        }

        .section-header {
          color: #064E3B;
          font-size: 24px;
          font-weight: 700;
          margin: 0 0 28px 0;
          display: flex;
          align-items: center;
          gap: 12px;
          text-shadow: 0 1px 2px rgba(0,0,0,0.1);
        }

        .section-header-icon {
          color: #10B981;
          font-size: 24px;
        }

        .today-reminders-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 20px;
        }

        .today-reminder-item {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 20px;
          background: linear-gradient(135deg, rgba(16,185,129,0.08) 0%, rgba(6,182,212,0.08) 100%);
          border-radius: 12px;
          border: 1px solid rgba(16,185,129,0.2);
          transition: all 0.3s ease;
        }

        .today-reminder-item:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 20px rgba(0,0,0,0.12);
          border-color: rgba(16,185,129,0.4);
        }

        .reminder-time {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #10B981;
          font-size: 15px;
          font-weight: 700;
          min-width: 95px;
        }

        .reminder-time-icon {
          font-size: 18px;
        }

        .reminder-medicine-info {
          flex: 1;
        }

        .reminder-medicine-name {
          font-size: 17px;
          font-weight: 700;
          color: #064E3B;
          margin: 0 0 4px 0;
        }

        .reminder-medicine-dose {
          font-size: 14px;
          color: #065F46;
          margin: 0;
          opacity: 0.9;
        }

        .reminder-status-badge {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 8px 16px;
          border-radius: 20px;
          font-size: 13px;
          font-weight: 600;
          text-transform: capitalize;
        }

        .reminder-status-badge.status-taken {
          background-color: rgba(16,185,129,0.15);
          color: #10B981;
        }

        .reminder-status-badge.status-pending {
          background-color: rgba(245,158,11,0.15);
          color: #f59e0b;
        }

        .empty-reminders {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 60px 20px;
          color: #94a3b8;
        }

        .empty-icon {
          font-size: 64px;
          margin-bottom: 20px;
          opacity: 0.5;
        }

        .empty-text {
          font-size: 18px;
          font-weight: 500;
          margin: 0;
        }

        .form-card {
          background: white;
          padding: 40px;
          border-radius: 15px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
          border: 1px solid rgba(16,185,129,0.2);
          margin-bottom: 40px;
          position: relative;
          overflow: hidden;
          animation: fadeInUp 0.8s ease forwards;
        }

        .form-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, rgba(16,185,129,0.03) 0%, rgba(6,182,212,0.03) 100%);
          pointer-events: none;
        }

        .form-title {
          font-size: 24px;
          font-weight: 700;
          color: #064E3B;
          margin: 0 0 32px 0;
          display: flex;
          align-items: center;
          gap: 12px;
          text-shadow: 0 1px 2px rgba(0,0,0,0.05);
        }

        .form-container {
          display: flex;
          flex-direction: column;
          gap: 24px;
          position: relative;
          z-index: 1;
        }

        .form-row {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
        }

        .form-row-three {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .form-label {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 15px;
          font-weight: 600;
          color: #064E3B;
        }

        .form-label-icon {
          font-size: 16px;
          color: #10B981;
        }

        .form-input,
        .form-select,
        .time-input {
          padding: 14px 16px;
          border: 2px solid rgba(16,185,129,0.2);
          border-radius: 12px;
          font-size: 15px;
          outline: none;
          transition: all 0.3s ease;
          background: white;
          color: #064E3B;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        .form-input:focus,
        .form-select:focus,
        .time-input:focus {
          border-color: #10B981;
          box-shadow: 0 0 0 3px rgba(16,185,129,0.1);
        }

        .form-textarea {
          padding: 14px 16px;
          border: 2px solid rgba(16,185,129,0.2);
          border-radius: 12px;
          font-size: 15px;
          outline: none;
          resize: vertical;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background: white;
          color: #064E3B;
          transition: all 0.3s ease;
          min-height: 100px;
        }

        .form-textarea:focus {
          border-color: #10B981;
          box-shadow: 0 0 0 3px rgba(16,185,129,0.1);
        }

        .time-inputs-wrapper {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .time-input-group {
          display: flex;
          gap: 12px;
          animation: fadeInUp 0.3s ease forwards;
        }

        .time-input {
          flex: 1;
        }

        .remove-time-btn {
          padding: 14px 18px;
          background-color: #fee2e2;
          color: #dc2626;
          border: none;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
        }

        .remove-time-btn:hover {
          background-color: #fecaca;
          transform: scale(1.05);
        }

        .add-time-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 14px 20px;
          background: linear-gradient(135deg, rgba(16,185,129,0.1) 0%, rgba(6,182,212,0.1) 100%);
          color: #10B981;
          border: 2px dashed rgba(16,185,129,0.3);
          border-radius: 12px;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .add-time-btn:hover {
          background: linear-gradient(135deg, rgba(16,185,129,0.15) 0%, rgba(6,182,212,0.15) 100%);
          border-color: #10B981;
          transform: translateY(-2px);
        }

        .form-actions {
          display: flex;
          gap: 16px;
          justify-content: flex-end;
          margin-top: 12px;
          padding-top: 24px;
          border-top: 1px solid rgba(16,185,129,0.1);
        }

        .form-cancel-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 14px 28px;
          background: rgba(16,185,129,0.1);
          color: #065F46;
          border: none;
          border-radius: 30px;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .form-cancel-btn:hover {
          background: rgba(16,185,129,0.15);
          transform: translateY(-2px);
        }

        .form-submit-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 14px 28px;
          background-color: #10B981;
          color: white;
          border: none;
          border-radius: 30px;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 12px rgba(16,185,129,0.3);
        }

        .form-submit-btn:hover {
          background-color: #0F805D;
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(16,185,129,0.4);
        }

        .all-reminders-section {
          background: white;
          padding: 40px;
          border-radius: 15px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
          border: 1px solid rgba(16,185,129,0.2);
          animation: fadeInUp 0.9s ease forwards;
        }

        .reminders-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
          gap: 24px;
        }

        .reminder-card {
          padding: 24px;
          background: linear-gradient(135deg, rgba(16,185,129,0.05) 0%, rgba(6,182,212,0.05) 100%);
          border: 2px solid rgba(16,185,129,0.2);
          border-radius: 15px;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .reminder-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 12px 30px rgba(0,0,0,0.15);
          border-color: rgba(16,185,129,0.4);
        }

        .reminder-card.inactive {
          opacity: 0.5;
          background: rgba(148,163,184,0.1);
          border-color: rgba(148,163,184,0.3);
        }

        .reminder-card-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 20px;
          padding-bottom: 16px;
          border-bottom: 1px solid rgba(16,185,129,0.15);
        }

        .reminder-card-header-left {
          flex: 1;
        }

        .reminder-card-name {
          font-size: 20px;
          font-weight: 700;
          color: #064E3B;
          margin: 0 0 8px 0;
          text-shadow: 0 1px 2px rgba(0,0,0,0.05);
        }

        .reminder-card-dosage {
          display: inline-block;
          padding: 6px 14px;
          background-color: rgba(16,185,129,0.15);
          color: #065F46;
          border-radius: 20px;
          font-size: 13px;
          font-weight: 600;
        }

        .reminder-card-actions {
          display: flex;
          gap: 8px;
        }

        .reminder-action-btn {
          padding: 10px;
          background: white;
          border: 2px solid rgba(16,185,129,0.2);
          border-radius: 10px;
          cursor: pointer;
          color: #065F46;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
        }

        .reminder-action-btn:hover {
          transform: scale(1.1);
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }

        .reminder-action-btn.active-btn {
          background-color: rgba(16,185,129,0.15);
          border-color: #10B981;
          color: #10B981;
        }

        .reminder-action-btn.active-btn:hover {
          background-color: rgba(16,185,129,0.25);
        }

        .reminder-action-btn.inactive-btn {
          background-color: #fee2e2;
          border-color: #fecaca;
          color: #dc2626;
        }

        .reminder-action-btn.inactive-btn:hover {
          background-color: #fecaca;
        }

        .reminder-action-btn.delete-btn {
          color: #dc2626;
        }

        .reminder-action-btn.delete-btn:hover {
          background-color: #fee2e2;
          border-color: #fecaca;
        }

        .reminder-card-details {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .reminder-detail-item {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 15px;
          color: #064E3B;
        }

        .reminder-detail-icon {
          font-size: 16px;
          color: #10B981;
          min-width: 16px;
        }

        .reminder-detail-text {
          font-weight: 500;
        }

        .reminder-note {
          font-size: 14px;
          color: #065F46;
          font-style: italic;
          padding-left: 26px;
          opacity: 0.9;
          line-height: 1.5;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media screen and (max-width: 1024px) {
          .reminders-grid {
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          }
        }

        @media screen and (max-width: 768px) {
          .reminders-header {
            flex-direction: column;
            gap: 20px;
            text-align: center;
            padding: 24px;
          }

          .reminders-header-left {
            flex-direction: column;
          }

          .today-reminders-grid {
            grid-template-columns: 1fr;
          }

          .reminders-grid {
            grid-template-columns: 1fr;
          }

          .form-row,
          .form-row-three {
            grid-template-columns: 1fr;
          }

          .form-card,
          .today-schedule-card,
          .all-reminders-section {
            padding: 24px;
          }
        }
      `}</style>

      <div className="reminders-container">
        {/* Header */}
        <div className="reminders-header">
          <div className="reminders-header-left">
            <Bell className="reminders-header-icon" />
            <div className="reminders-title-wrapper">
              <h1>Medication Reminders</h1>
              <p>Manage your medication schedule</p>
            </div>
          </div>
          <center>
          <button
            onClick={() => setShowForm(!showForm)}
            className={`add-reminder-btn ${showForm ? 'cancel-btn' : ''}`}
          >
            {showForm ? <FaTimes /> : <FaPlus />}
            <span>{showForm ? 'Cancel' : 'Add Reminder'}</span>
          </button>
          </center>
        </div>

        {/* Today's Schedule */}
        <div className="today-section">
          <div className="today-schedule-card">
            <h2 className="section-header">
              <Calendar className="section-header-icon" />
              Today's Schedule
            </h2>
            <div className="today-reminders-grid">
              {todayReminders.length > 0 ? (
                todayReminders.map((reminder, index) => (
                  <div key={index} className="today-reminder-item">
                    <div className="reminder-time">
                      <FaClock className="reminder-time-icon" />
                      {reminder.time}
                    </div>
                    <div className="reminder-medicine-info">
                      <h4 className="reminder-medicine-name">{reminder.medicineName}</h4>
                      <p className="reminder-medicine-dose">{reminder.dosage}</p>
                    </div>
                    <span className={`reminder-status-badge status-${reminder.status}`}>
                      {reminder.status === 'taken' ? <FaCheck /> : <FaClock />}
                      {reminder.status}
                    </span>
                  </div>
                ))
              ) : (
                <div className="empty-reminders">
                  <AlertCircle className="empty-icon" />
                  <p className="empty-text">No reminders scheduled for today</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Add/Edit Form */}
        {showForm && (
          <div className="form-card">
            <h3 className="form-title">
              <FaPills style={{ color: '#10B981' }} />
              {editingId ? 'Edit Reminder' : 'Add New Reminder'}
            </h3>
            <div className="form-container">
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">
                    <FaPills className="form-label-icon" />
                    Medicine Name *
                  </label>
                  <input
                    type="text"
                    value={formData.medicineName}
                    onChange={(e) => setFormData({ ...formData, medicineName: e.target.value })}
                    className="form-input"
                    placeholder="Enter medicine name"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Dosage *</label>
                  <input
                    type="text"
                    value={formData.dosage}
                    onChange={(e) => setFormData({ ...formData, dosage: e.target.value })}
                    className="form-input"
                    placeholder="e.g., 500mg"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">
                  <FaClock className="form-label-icon" />
                  Reminder Times *
                </label>
                <div className="time-inputs-wrapper">
                  {formData.times.map((time, index) => (
                    <div key={index} className="time-input-group">
                      <input
                        type="time"
                        value={time}
                        onChange={(e) => handleTimeChange(index, e.target.value)}
                        className="time-input"
                      />
                      {formData.times.length > 1 && (
                        <button
                          onClick={() => handleRemoveTime(index)}
                          className="remove-time-btn"
                        >
                          <FaTimes />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    onClick={handleAddTime}
                    className="add-time-btn"
                  >
                    <FaPlus /> Add Another Time
                  </button>
                </div>
              </div>

              <div className="form-row-three">
                <div className="form-group">
                  <label className="form-label">Frequency</label>
                  <select
                    value={formData.frequency}
                    onChange={(e) => setFormData({ ...formData, frequency: e.target.value })}
                    className="form-select"
                  >
                    <option value="Daily">Daily</option>
                    <option value="Weekly">Weekly</option>
                    <option value="Monthly">Monthly</option>
                    <option value="As Needed">As Needed</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Start Date</label>
                  <input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">End Date</label>
                  <input
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Notes</label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="form-textarea"
                  placeholder="Additional instructions..."
                  rows="3"
                />
              </div>

              <div className="form-actions">
                <button onClick={resetForm} className="form-cancel-btn">
                  <FaTimes /> Cancel
                </button>
                <button onClick={handleSubmit} className="form-submit-btn">
                  <FaSave /> {editingId ? 'Update' : 'Save'} Reminder
                </button>
              </div>
            </div>
          </div>
        )}

        {/* All Reminders List */}
        <div className="all-reminders-section">
          <h2 className="section-header">
            <Pill className="section-header-icon" />
            All Reminders ({reminders.length})
          </h2>
          <div className="reminders-grid">
            {reminders.map(reminder => (
              <div
                key={reminder.id}
                className={`reminder-card ${reminder.active ? '' : 'inactive'}`}
              >
                <div className="reminder-card-header">
                  <div className="reminder-card-header-left">
                    <h3 className="reminder-card-name">{reminder.medicineName}</h3>
                    <span className="reminder-card-dosage">{reminder.dosage}</span>
                  </div>
                  <div className="reminder-card-actions">
                    <button
                      onClick={() => toggleActive(reminder.id)}
                      className={`reminder-action-btn ${reminder.active ? 'active-btn' : 'inactive-btn'}`}
                      title={reminder.active ? 'Deactivate' : 'Activate'}
                    >
                      {reminder.active ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
                    </button>
                    <button
                      onClick={() => handleEdit(reminder)}
                      className="reminder-action-btn"
                      title="Edit"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(reminder.id)}
                      className="reminder-action-btn delete-btn"
                      title="Delete"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>

                <div className="reminder-card-details">
                  <div className="reminder-detail-item">
                    <FaClock className="reminder-detail-icon" />
                    <span className="reminder-detail-text">
                      {reminder.times.join(', ')}
                    </span>
                  </div>
                  <div className="reminder-detail-item">
                    <FaCalendarAlt className="reminder-detail-icon" />
                    <span className="reminder-detail-text">{reminder.frequency}</span>
                  </div>
                  {reminder.startDate && (
                    <div className="reminder-detail-item">
                      <Calendar size={16} className="reminder-detail-icon" />
                      <span className="reminder-detail-text">
                        {reminder.startDate} to {reminder.endDate}
                      </span>
                    </div>
                  )}
                  {reminder.notes && (
                    <div className="reminder-detail-item">
                      <p className="reminder-note">{reminder.notes}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RemindersPage;