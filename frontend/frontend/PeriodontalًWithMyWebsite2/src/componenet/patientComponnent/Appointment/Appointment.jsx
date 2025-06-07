import './Appointment.css';
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import all_product from '../../Assets/all_product';

const Appointment = () => {
    const [selectedDay, setSelectedDay] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    
    const bookingDays = [
        { day: "Wed", date: "2025-04-19" },
        { day: "Thu", date: "2025-04-20" },
        { day: "Fri", date: "2025-04-21" },
        { day: "Sat", date: "2025-04-22" },
        { day: "Sun", date: "2025-04-23" },
        { day: "Mon", date: "2025-04-24" },
        { day: "Tue", date: "2025-04-25" },
    ];

    const { docId } = useParams();
    const doctor = all_product.find((item) => item.id.toString() === docId);
    
    const timeSlots = ["01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM", "06:00 PM", "07:00 PM", "08:00 PM"];

    const handleBookAppointment = async () => {
        if (!selectedDay || !selectedTime) return;

        setIsLoading(true);
        setError(null);

        try {
            // Get patient ID from your authentication system or localStorage
            const patientId = localStorage.getItem('patientId') || 5; // Replace with actual patient ID
            
            const appointmentData = {
                patientId: parseInt(patientId),
                doctorId: parseInt(docId),
                appointmentDate: selectedDay, // Format: "YYYY-MM-DD"
                timeSlot: selectedTime
            };

            const response = await fetch('https://localhost:44320/api/Appointments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(appointmentData)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to book appointment');
            }

            const appointment = await response.json();

            // Save to local storage if needed
            const existingAppointments = JSON.parse(localStorage.getItem("appointments")) || [];
            existingAppointments.push({
                ID: appointment.id,
                doctor,
                day: selectedDay,
                time: selectedTime
            });
            localStorage.setItem("appointments", JSON.stringify(existingAppointments));

            navigate('/Patient/ShowAppointment', {
                state: appointment
            });
        } catch (err) {
            setError(err.message);
            console.error('Booking error:', err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className='Appointment1'>
            <div className='data2'>
                <div className='title2'>
                    <p>Appointments</p>
                </div>
            </div>
            <hr id="split"/>
            <div>
            {doctor && 
                <div className='body'>
                    <div className='DocPhoto'>
                        <img src={doctor.image} alt="" />
                    </div>
                    <div className='bookSlots'>

                        <div className='DocInfo'>
                            <div className='info'>
                                <p className='docname'>{doctor.name}</p>
                                <div>
                                    <p className='doc-about'>About </p>
                                    <p className='doc-about-p' >
                                    {doctor.about}
                                    </p>
                                </div>
                                <p className='doc-price'>Appointment fee: {doctor.price}</p>
                            </div>
                        </div>

                        <h3 className="section-title">Booking slots</h3>
                        <div className="slots">
                            <div className='dateTime'>
                                {bookingDays.map((day, index) =>
                                    <button 
                                        key={index} 
                                        className={selectedDay === day.date ? "selected" : ""}
                                        onClick={() => setSelectedDay(day.date)}
                                    >
                                        <p>{day.day}</p>
                                        <p>{day.date.split('-')[2]}</p> {/* Display just the day number */}
                                    </button>
                                )}
                            </div>
                            <div className='time1'>
                                {timeSlots.map((time, index) =>
                                    <button 
                                        key={index} 
                                        className={selectedTime === time ? "button selected" : "button"}
                                        onClick={() => setSelectedTime(time)}
                                    >
                                        {time}
                                    </button>
                                )}
                            </div>
                        </div>
                        {error && <div className="error-message">{error}</div>}
                        <button 
                            className='book' 
                            disabled={!selectedDay || !selectedTime || isLoading}
                            onClick={handleBookAppointment}
                        >                           
                            {isLoading ? 'Booking...' : 'Book An Appointment'}
                        </button>

                    </div>
                </div>}
            </div>
        </div>
    )
}

export default Appointment;