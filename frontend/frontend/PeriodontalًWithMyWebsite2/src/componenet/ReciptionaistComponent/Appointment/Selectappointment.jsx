import './Appointment.css'
import React, {useState} from 'react'
import patients from '../../../PatientData.json'
import all_product from '../../Assets/all_product'
import { useParams, useNavigate } from 'react-router-dom';
import { Patientoption } from '../patientData/patientoption';

const Selectappointment = () => {
    const [selectedDay, setSelectedDay] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const navigate = useNavigate();
    
    const bookingDays = [
        { day: "Wed", date: "19 Apr 2025" },
        { day: "Thu", date: "20 Apr 2025" },
        { day: "Fri", date: "21 Apr 2025" },
        { day: "Sat", date: "22 Apr 2025" },
        { day: "Sun", date: "23 Apr 2025" },
        { day: "Mon", date: "24 Apr 2025" },
        { day: "Tue", date: "25 Apr 2025" },
    ];

    const { docId } = useParams();
    const doctor = all_product.find((item) => item.id.toString() === docId);
    const { id } = useParams();
    const patient = patients.find((pat) => pat.id.toString() === id);

    
    const timeSlots = ["01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM", "06:00 PM", "07:00 PM", "08:00 PM"];

    return (
        <div className='Appointment1'>
            <Patientoption/>
            <div className='data2'>
                <div className='title2'>
                    <p>Doctor Slots</p>
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
                                {bookingDays.map((day, index)=>
                                    <button key={index} className={selectedDay === day.date? "selected": ""}
                                    onClick={()=>setSelectedDay(day.date)}>
                                        <p>{day.day}</p>
                                        <p>{day.date.slice(0,2)}</p>
                                    </button>
                                )}
                            </div>
                            <div className='time1'>
                                {timeSlots.map((time, index)=>
                                    <button key={index} className={selectedTime === time? "button selected": "button"}
                                        onClick={()=>setSelectedTime(time)}>
                                        {time}
                                    </button>
                                )}
                            </div>
                        </div>
                        <button 
                            className='book' 
                            disabled={!selectedDay || !selectedTime}
                            onClick={() => {
                            const appointment = {
                                ID: Math.floor(Math.random() * 1000),
                                doctor,
                                name: patient.name,
                                day: selectedDay,
                                time: selectedTime
                            };
                            const existingAppointments = JSON.parse(localStorage.getItem("appointments")) || [];
                            existingAppointments.push(appointment);
                            localStorage.setItem("appointments", JSON.stringify(existingAppointments));
                            navigate('/Reciptionaist/ShowAppointment', {
                                state: appointment
                            });
                            }}
                        >                           
                            Book An Appointment
                        </button>

                    </div>
                </div>}
            </div>
        </div>
    )
}

export default Selectappointment;