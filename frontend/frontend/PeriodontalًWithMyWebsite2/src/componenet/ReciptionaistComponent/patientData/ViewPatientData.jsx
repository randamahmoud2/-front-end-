import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Patientoption } from './patientoption';
import { FaUser, FaPhone, FaEnvelope, FaCalendarAlt, FaIdCard, FaNotesMedical, FaTooth } from 'react-icons/fa';
import './ViewPatientData.css';

const ViewPatientData = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [patientData, setPatientData] = useState({
        personalInfo: {
            name: "",
            age: "",
            gender: "",
            id: "",
            birthDate: ""
        },
        contactInfo: {
            phone: "",
            email: "",
            address: ""
        },
        medicalHistory: {
            bloodType: "",
            allergies: [],
            chronicConditions: [],
            medications: []
        },
        dentalHistory: {
            lastVisit: "",
            nextAppointment: "",
            procedures: []
        }
    });

    useEffect(() => {
        const fetchPatientData = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/patients/${id}`);
                const data = response.data;
                
                setPatientData({
                    personalInfo: {
                        name: data.name || "",
                        age: data.age || "",
                        gender: data.gender || "",
                        id: data.id || "",
                        birthDate: data.DOB || ""
                    },
                    contactInfo: {
                        phone: data.phoneNumber || "",
                        email: data.email || "",
                        address: data.address || ""
                    },
                    medicalHistory: {
                        bloodType: data.bloodType || "",
                        allergies: data.allergies ? data.allergies.split(',').map(a => a.trim()) : [],
                        chronicConditions: data.chronicDiseases ? data.chronicDiseases.split(',').map(d => d.trim()) : [],
                        medications: [] // This would need to be fetched from a separate endpoint
                    },
                    dentalHistory: {
                        lastVisit: data.lastVisit || "",
                        nextAppointment: data.nextAppointment || "",
                        procedures: data.procedures || []
                    }
                });
            } catch (err) {
                setError('Failed to load patient data. Please try again later.');
                console.error('Error fetching patient data:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchPatientData();
    }, [id]);

    if (loading) return <div className="loading">Loading patient data...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <div>
            <Patientoption/>
            <div className='patientdata1'>
                <div className='data2'>
                    <div className='title2'>
                        <p>Patient Profile</p>
                    </div>
                </div>
                <hr id="split"/>

                <div className="patient-container">
                    {/* Personal Information Section */}
                    <div className="info-section personal-info">
                        <div className="section-header">
                            <FaUser className="section-icon" />
                            <h3>Personal Information</h3>
                        </div>
                        <div className="info-grid">
                            <div className="info-item">
                                <span className="label">Full Name</span>
                                <span className="value">{patientData.personalInfo.name}</span>
                            </div>
                            <div className="info-item">
                                <span className="label">Age</span>
                                <span className="value">{patientData.personalInfo.age}</span>
                            </div>
                            <div className="info-item">
                                <span className="label">Gender</span>
                                <span className="value">{patientData.personalInfo.gender}</span>
                            </div>
                            <div className="info-item">
                                <span className="label">ID Number</span>
                                <span className="value">{patientData.personalInfo.id}</span>
                            </div>
                            <div className="info-item">
                                <span className="label">Birth Date</span>
                                <span className="value">
                                    {patientData.personalInfo.birthDate ? new Date(patientData.personalInfo.birthDate).toLocaleDateString() : ""}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Contact Information Section */}
                    <div className="info-section contact-info">
                        <div className="section-header">
                            <FaPhone className="section-icon" />
                            <h3>Contact Information</h3>
                        </div>
                        <div className="info-grid">
                            <div className="info-item">
                                <span className="label">Phone</span>
                                <span className="value">{patientData.contactInfo.phone}</span>
                            </div>
                            <div className="info-item">
                                <span className="label">Email</span>
                                <span className="value">{patientData.contactInfo.email}</span>
                            </div>
                            <div className="info-item full-width">
                                <span className="label">Address</span>
                                <span className="value">{patientData.contactInfo.address}</span>
                            </div>
                        </div>
                    </div>

                    {/* Medical History Section */}
                    <div className="info-section medical-history">
                        <div className="section-header">
                            <FaNotesMedical className="section-icon" />
                            <h3>Medical History</h3>
                        </div>
                        <div className="info-grid">
                            <div className="info-item">
                                <span className="label">Blood Type</span>
                                <span className="value">{patientData.medicalHistory.bloodType}</span>
                            </div>
                            <div className="info-item">
                                <span className="label">Allergies</span>
                                <span className="value">{patientData.medicalHistory.allergies.join(", ")}</span>
                            </div>
                            <div className="info-item">
                                <span className="label">Chronic Conditions</span>
                                <span className="value">{patientData.medicalHistory.chronicConditions.join(", ")}</span>
                            </div>
                            <div className="info-item">
                                <span className="label">Current Medications</span>
                                <span className="value">{patientData.medicalHistory.medications.join(", ")}</span>
                            </div>
                        </div>
                    </div>

                    {/* Dental History Section */}
                    <div className="info-section dental-history">
                        <div className="section-header">
                            <FaTooth className="section-icon" />
                            <h3>Dental History</h3>
                        </div>
                        <div className="info-grid">
                            <div className="info-item">
                                <span className="label">Last Visit</span>
                                <span className="value">
                                    {patientData.dentalHistory.lastVisit ? new Date(patientData.dentalHistory.lastVisit).toLocaleDateString() : ""}
                                </span>
                            </div>
                            <div className="info-item">
                                <span className="label">Next Appointment</span>
                                <span className="value">
                                    {patientData.dentalHistory.nextAppointment ? new Date(patientData.dentalHistory.nextAppointment).toLocaleDateString() : ""}
                                </span>
                            </div>
                            <div className="info-item full-width">
                                <span className="label">Recent Procedures</span>
                                <div className="procedures-list">
                                    {patientData.dentalHistory.procedures.length > 0 ? (
                                        patientData.dentalHistory.procedures.map((procedure, index) => (
                                            <div key={index} className="procedure-item">
                                                <span className="procedure-name">{procedure.name}</span>
                                                <span className="procedure-date">{new Date(procedure.date).toLocaleDateString()}</span>
                                            </div>
                                        ))
                                    ) : (
                                        <span className="value">No procedures recorded.</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ViewPatientData;
