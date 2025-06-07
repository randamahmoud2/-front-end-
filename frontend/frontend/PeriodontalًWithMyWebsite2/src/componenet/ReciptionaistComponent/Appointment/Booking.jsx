import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { Patientoption } from '../patientData/patientoption'
import './Booking.css'

export const Booking = () => {
    const navigate = useNavigate();  
    const { id } = useParams();
    const [patient, setPatient] = useState(null);
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch patient data
                const patientResponse = await axios.get(`http://localhost:5000/api/patients/${id}`);
                setPatient(patientResponse.data);

                // Fetch available doctors
                const doctorsResponse = await axios.get('http://localhost:5000/api/doctors/available');
                setDoctors(doctorsResponse.data);
            } catch (err) {
                setError('Failed to load data. Please try again later.');
                console.error('Error fetching data:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);
    
    if (loading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error">{error}</div>;
    if (!patient) return <div className="error">Patient not found</div>;
    
    return (
        <div className='booking-container'>
            <Patientoption/>
            <div className='data2'>
                <div className='title2'>
                    <p>Available Doctors</p>
                </div>
            </div>
            <hr id="split"/>
            <div className='doctor-options'>
                <div className='doctor-grid'>
                    {doctors.map((doctor) => (
                        <div 
                            className='doctor-card' 
                            key={doctor.id} 
                            onClick={() => navigate(`/Receptionist/Patient/${patient.id}/Book/${doctor.id}`)}
                        >
                            <img src={doctor.image} alt={doctor.name} />
                            <div className='doctor-info'>
                                <div className='availability-status'>
                                    <span className='status-dot'></span>
                                    <span className='status-text'>Available</span>
                                </div>
                                <p className='doctor-name'>{doctor.name}</p>
                                <p className='doctor-specialty'>{doctor.specialty}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Booking;