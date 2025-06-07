import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Appointment.css';
import { Patientoption } from '../patientData/patientoption';
import { FaCalendarAlt, FaUserMd, FaTooth, FaMoneyBillWave, FaCheck, FaClock } from 'react-icons/fa';

export const Appointment = () => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/appointments');
                setAppointments(response.data);
            } catch (err) {
                setError('Failed to load appointments. Please try again later.');
                console.error('Error fetching appointments:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchAppointments();
    }, []);

    const handlePaymentStatus = async (appointmentId, status) => {
        try {
            await axios.put(`http://localhost:5000/api/appointments/${appointmentId}/status`, { status });
            setAppointments(prev => 
                prev.map(appointment =>
                    appointment.id === appointmentId
                        ? { ...appointment, paymentStatus: status }
                        : appointment
                )
            );
        } catch (err) {
            console.error('Error updating payment status:', err);
            setError('Failed to update payment status. Please try again.');
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-EG', {
            style: 'currency',
            currency: 'EGP'
        }).format(amount);
    };

    if (loading) return <div className="loading">Loading appointments...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <div className='appointment-container'>
            <Patientoption />
            <div className='appointment-header'>
                <div className='data2'>
                    <div className='title2'>
                        <p>Appointments & Procedures</p>
                    </div>
                </div>
            </div>
            <hr id="split" />

            <div className="appointments-table-container">
                {appointments.filter(app => app.doctorName && app.procedure).length === 0 ? (
                    <p className="no-appointments">There are no procedures scheduled</p>
                ) : (
                    <table className='appointments-table'>
                        <thead>
                            <tr>
                                <th><FaCalendarAlt className="column-icon" /> Date</th>
                                <th><FaUserMd className="column-icon" /> Doctor Name</th>
                                <th><FaTooth className="column-icon" /> Procedure</th>
                                <th><FaMoneyBillWave className="column-icon" /> Total Payment</th>
                                <th>Payment Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {appointments
                                .filter(app => app.doctorName && app.procedure)
                                .map((appointment) => (
                                    <tr key={appointment.id} className={`appointment-row ${appointment.paymentStatus}`}>
                                        <td>{formatDate(appointment.date)}</td>
                                        <td>{appointment.doctorName}</td>
                                        <td>{appointment.procedure}</td>
                                        <td>{formatCurrency(appointment.totalPayment)}</td>
                                        <td>
                                            <div className="payment-status-buttons">
                                                <button
                                                    className={`status-btn paid ${appointment.paymentStatus === 'paid' ? 'active' : ''}`}
                                                    onClick={() => handlePaymentStatus(appointment.id, 'paid')}
                                                >
                                                    <FaCheck /> Paid
                                                </button>
                                                <button
                                                    className={`status-btn pending ${appointment.paymentStatus === 'pending' ? 'active' : ''}`}
                                                    onClick={() => handlePaymentStatus(appointment.id, 'pending')}
                                                >
                                                    <FaClock /> Pending
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default Appointment;
