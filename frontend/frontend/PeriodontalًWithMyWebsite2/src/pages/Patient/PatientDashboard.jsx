import './PatientDashboard.css';
import profile from '../../image/user.png';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export const PatientDashboard = () => {
    const [patient, setPatient] = useState(null);
    const [appointments, setAppointments] = useState([]);
    const [activities, setActivities] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                // Get patientId from authentication (temporary fallback to 5)
                const patientId = localStorage.getItem('patientId') || 5;
                const response = await fetch(`https://localhost:44320/api/Patients/${patientId}/dashboard`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        // Add Authorization header if authentication is implemented
                        // 'Authorization': `Bearer ${localStorage.getItem('token')}`
                    },
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.error || errorData.message || 'Failed to fetch dashboard data');
                }

                const data = await response.json();
                setPatient(data.patient || {});
                setAppointments(data.upcomingAppointments || []);
                setActivities(data.recentActivities || []);
            } catch (err) {
                setError(err.message);
                console.error('Error fetching dashboard:', err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    if (isLoading) {
        return <div className="loading">Loading...</div>;
    }

    if (error) {
        return <div className="error-message">Error: {error}</div>;
    }

    return (
        <div className="patient-dashboard-portal">
            <div className="patient-header">
                <img src={profile} alt="Patient" className="patient-avatar" />
                <div className="patient-info">
                    <div className="patient-main">
                        <h2>{patient?.name || 'Unknown Patient'}</h2>
                        <span className="patient-id">ID: {patient?.patientId || 'N/A'}</span>
                        <span className="patient-dob">DOB: {patient?.dob ? new Date(patient.dob).toLocaleDateString() : 'N/A'}</span>
                        <span className="patient-status">Active</span>
                    </div>
                    <div className="patient-details">
                        <div>
                            <span className="label">Email</span>
                            <span>{patient?.email || 'N/A'}</span>
                        </div>
                        <div>
                            <span className="label">Phone</span>
                            <span>{patient?.phoneNumber || 'N/A'}</span>
                        </div>
                        <div>
                            <span className="label">Last Visit</span>
                            <span>{patient?.lastVisit ? new Date(patient.lastVisit).toLocaleDateString() : 'N/A'}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="patient-tabs">
                <div className="tab active">Dashboard</div>
                <Link to="/Patient/ShowAppointment" className="tab">Appointments</Link>
                <div className="tab">Medical History</div>
                <div className="tab">Payments</div>
            </div>

            <div className="dashboard-content">
                <div className="appointments-section">
                    <div className="appointments-header">
                        <h3>Upcoming Appointments</h3>
                        <Link to="/Patient/Doctors" className="new-appointment-btn">
                            Book New Appointment
                        </Link>
                    </div>
                    <div className="appointments-list">
                        {appointments.length === 0 ? (
                            <p>No upcoming appointments</p>
                        ) : (
                            appointments.map(appointment => (
                                <div key={appointment.id} className="appointment-card">
                                    <div>
                                        <div className="doctor-name">{appointment.doctorName}</div>
                                        <div className="specialty">{appointment.specialty}</div>
                                    </div>
                                    <div className="appointment-meta">
                                        <div>{appointment.time} - {new Date(appointment.date).toLocaleDateString()}</div>
                                        <div className="status-badge">{appointment.status}</div>
                                        <div>{appointment.price}</div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                <div className="activity-section">
                    <h3>Recent Activity</h3>
                    <div className="activity-list">
                        {activities.length === 0 ? (
                            <p>No recent activities</p>
                        ) : (
                            activities.map(activity => (
                                <div key={activity.id} className="activity-item">
                                    <div className="activity-dot"></div>
                                    <div className="activity-content">
                                        <div className="activity-title">
                                            {activity.title}
                                            <span className="activity-type">{activity.type}</span>
                                        </div>
                                        <div className="activity-status">{activity.status}</div>
                                        <div className="activity-date">{new Date(activity.date).toLocaleDateString()}</div>
                                        <div className="activity-desc">{activity.description}</div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PatientDashboard;