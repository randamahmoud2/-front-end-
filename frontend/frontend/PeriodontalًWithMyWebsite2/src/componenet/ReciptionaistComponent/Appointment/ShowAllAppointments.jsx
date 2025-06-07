import React, { useEffect, useState } from 'react';
import './ShowAppointment.css';

const ShowAllAppointments = () => {
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem("appointments")) || [];
        setAppointments(stored);
    }, []);

    const cancelAppointment = (indexToRemove) => {
        const updated = appointments.filter((_, i) => i !== indexToRemove);
        localStorage.setItem("appointments", JSON.stringify(updated));
        setAppointments(updated);
    };

    const AppointmentPaid = (indexToUpdate) => {
        const updated = appointments.map((appt, i) =>
            i === indexToUpdate ? { ...appt, paid: true } : appt
        );
        localStorage.setItem("appointments", JSON.stringify(updated));
        setAppointments(updated);
    };

    return (
        <div className="summary">
            <div className='data2'>
                <div className='title2'>
                    <p>Patients Appointments</p>
                </div>
            </div>
            <hr id="split" />

            {appointments.length === 0 ? (
                <h3 style={{ color: 'rgba(214, 55, 55, 0.63)', marginTop: '20px', display: "flex", justifyContent:"center"}}>
                    Oops! There Is No Appointment
                </h3>
            ) : (
                appointments.map((appt, index) => (
                    <div key={index}>
                        <div className='booking-summary'>
                            <div className='summary-doc'>
                                <div>
                                    <img src={appt.doctor.image} alt="" />
                                </div>
                                <div className='summary-info'>
                                    <p className='appointment-doc-name'>
                                        {appt.doctor.name} | {appt.name}
                                    </p>
                                    <p style={{ color: "rgba(16, 16, 145, 0.7)" }}>
                                        <strong style={{ color: "#357adb" }}>Day & Time:</strong><br />
                                        {appt.day} | {appt.time}
                                    </p>
                                </div>
                            </div>
                            
                            <div className='cancel'>
                                {appt.paid ? (
                                    <div className='paid1'>
                                        ✔ Complete
                                    </div>
                                ) : (
                                    <>
                                        <button onClick={() => AppointmentPaid(index)}>Cash Payment</button>
                                        <button onClick={() => cancelAppointment(index)}>Cancel Appointment</button>
                                    </>
                                )}
                            </div>
                        </div>
                        <hr id="split" />
                    </div>
                ))
            )}
        </div>
    );
};

export default ShowAllAppointments;
