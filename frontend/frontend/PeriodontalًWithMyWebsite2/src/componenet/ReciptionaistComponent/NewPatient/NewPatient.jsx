import './NewPatient.css';
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaPhone, FaVenusMars, FaCalendarAlt, FaIdCard, FaMapMarkerAlt, FaNotesMedical, FaSave } from 'react-icons/fa';

const NewPatient = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [details, setDetails] = useState({
        // Personal Information
        name: "",
        email: "",
        phoneNumber: "",
        gender: "",
        age: "", 
        DOB: "",
        pregnancyStatus: "Not pregnant",
        nationalId: "",
        address: "",
        
        // Medical Information
        bloodType: "",
        allergies: "",
        chronicDiseases: "",
        
        // Insurance Information
        insuranceProvider: "",
        insuranceNumber: "",
        insuranceExpiry: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDetails(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await axios.post('http://localhost:5000/api/patients', details);
            if (response.data) {
                // Reset form
                setDetails({
                    name: "",
                    email: "",
                    phoneNumber: "",
                    gender: "",
                    age: "", 
                    DOB: "",
                    pregnancyStatus: "Not pregnant",
                    nationalId: "",
                    address: "",
                    bloodType: "",
                    allergies: "",
                    chronicDiseases: "",
                    insuranceProvider: "",
                    insuranceNumber: "",
                    insuranceExpiry: ""
                });
                
                // Navigate to patient list
                navigate('/Receptionist/PatientList');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to register patient. Please try again.');
            console.error('Error registering patient:', err);
        } finally {
            setLoading(false);
        }
    };
    

    return (
        <div className='new-patient-container'>
            <div className='data2'>
                <div className='title2'>
                    <p>New Patient Registration</p>
                </div>
                <hr id='split'/>
            </div>
            
            {error && (
                <div className="error-message">
                    {error}
                </div>
            )}
            
            <form onSubmit={handleSubmit} className='patient-form'>
                {/* Personal Information Card */}
                <div className="form-section">
                    <h3><FaUser /> Personal Details</h3>
                    <div className="form-grid">
                        <div className="form-group1">
                            <label htmlFor="name">Full Name</label>
                            <input 
                                type="text" 
                                id='name' 
                                name='name' 
                                required
                                placeholder="Enter full name"
                                value={details.name} 
                                onChange={handleChange} 
                            />
                        </div>

                        <div className="form-group1">
                            <label htmlFor="age">Age</label>
                            <input 
                                type="number" 
                                id='age' 
                                name='age' 
                                min="1" 
                                max="90" 
                                required
                                placeholder="Enter age"
                                value={details.age} 
                                onChange={handleChange} 
                            />
                        </div>

                        <div className="form-group1">
                            <label htmlFor="DOB">Birth Date</label>
                            <input 
                                type="date" 
                                id='DOB' 
                                name='DOB' 
                                required
                                value={details.DOB} 
                                onChange={handleChange} 
                            />
                        </div>

                        <div className="form-group1">
                            <label htmlFor="gender">Gender</label>
                            <select 
                                name="gender" 
                                id="gender" 
                                required
                                value={details.gender} 
                                onChange={handleChange}
                            >
                                <option value="">Select gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                        </div>

                        {details.gender === "female" && (
                            <div className="form-group1">
                                <label htmlFor="pregnancyStatus">Pregnancy Status</label>
                                <select 
                                    name="pregnancyStatus" 
                                    id="pregnancyStatus"
                                    value={details.pregnancyStatus} 
                                    onChange={handleChange}
                                >
                                    <option value="not pregnant">Not Pregnant</option>
                                    <option value="pregnant">Pregnant</option>
                                </select>
                            </div>
                        )}
                    </div>
                </div>

                {/* Contact Information Card */}
                <div className="form-section">
                    <h3><FaPhone /> Contact Information</h3>
                    <div className="form-grid">
                        <div className="form-group1">
                            <label htmlFor="email">Email Address</label>
                            <input 
                                type="email" 
                                id='email' 
                                name='email' 
                                required
                                placeholder="Enter email address"
                                value={details.email} 
                                onChange={handleChange} 
                            />
                        </div>

                        <div className="form-group1">
                            <label htmlFor="phoneNumber">Phone Number</label>
                            <input 
                                type="tel" 
                                id='phoneNumber' 
                                name='phoneNumber' 
                                required
                                placeholder="Enter phone number"
                                value={details.phoneNumber} 
                                onChange={handleChange} 
                            />
                        </div>

                        <div className="form-group1">
                            <label htmlFor="address">Address</label>
                            <input 
                                type="text" 
                                id='address' 
                                name='address' 
                                required
                                placeholder="Enter address"
                                value={details.address} 
                                onChange={handleChange} 
                            />
                        </div>

                        <div className="form-group1">
                            <label htmlFor="nationalId">National ID</label>
                            <input 
                                type="text" 
                                id='nationalId' 
                                name='nationalId' 
                                required
                                placeholder="Enter national ID"
                                value={details.nationalId} 
                                onChange={handleChange} 
                            />
                        </div>
                    </div>
                </div>

                {/* Medical Information Card */}
                <div className="form-section">
                    <h3><FaNotesMedical /> Medical Information</h3>
                    <div className="form-grid">
                        <div className="form-group1">
                            <label htmlFor="bloodType">Blood Type</label>
                            <select 
                                name="bloodType" 
                                id="bloodType"
                                value={details.bloodType} 
                                onChange={handleChange}
                            >
                                <option value="">Select blood type</option>
                                <option value="A+">A+</option>
                                <option value="A-">A-</option>
                                <option value="B+">B+</option>
                                <option value="B-">B-</option>
                                <option value="AB+">AB+</option>
                                <option value="AB-">AB-</option>
                                <option value="O+">O+</option>
                                <option value="O-">O-</option>
                            </select>
                        </div>

                        <div className="form-group1">
                            <label htmlFor="allergies">Allergies</label>
                            <input 
                                type="text" 
                                id='allergies' 
                                name='allergies'
                                placeholder="Enter allergies (if any)"
                                value={details.allergies} 
                                onChange={handleChange} 
                            />
                        </div>

                        <div className="form-group1">
                            <label htmlFor="chronicDiseases">Chronic Diseases</label>
                            <input 
                                type="text" 
                                id='chronicDiseases' 
                                name='chronicDiseases'
                                placeholder="Enter chronic diseases (if any)"
                                value={details.chronicDiseases} 
                                onChange={handleChange} 
                            />
                        </div>
                    </div>
                </div>

                {/* Insurance Information Card */}
                <div className="form-section">
                    <h3><FaIdCard /> Insurance Details</h3>
                    <div className="form-grid">
                        <div className="form-group1">
                            <label htmlFor="insuranceProvider">Insurance Provider</label>
                            <input 
                                type="text" 
                                id='insuranceProvider' 
                                name='insuranceProvider'
                                placeholder="Enter insurance provider"
                                value={details.insuranceProvider} 
                                onChange={handleChange} 
                            />
                        </div>

                        <div className="form-group1">
                            <label htmlFor="insuranceNumber">Insurance Number</label>
                            <input 
                                type="text" 
                                id='insuranceNumber' 
                                name='insuranceNumber'
                                placeholder="Enter insurance number"
                                value={details.insuranceNumber} 
                                onChange={handleChange} 
                            />
                        </div>

                        <div className="form-group1">
                            <label htmlFor="insuranceExpiry">Insurance Expiry Date</label>
                            <input 
                                type="date" 
                                id='insuranceExpiry' 
                                name='insuranceExpiry'
                                value={details.insuranceExpiry} 
                                onChange={handleChange} 
                            />
                        </div>
                    </div>
                </div>

                <div className='form-actions'>
                    <button 
                        type="submit" 
                        className="save-btn"
                        disabled={loading}
                    >
                        {loading ? 'Registering...' : (
                            <>
                                <FaSave /> Register Patient
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default NewPatient;
