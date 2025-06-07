import "../Navbarr/Navbar.css";
import { Menu } from "../Navbarr/menu";
import React, { useState } from 'react';
import logo from "../../../image/tooth.png";
import Profile from "../../../image/user.png";
import patients from '../../../PatientData.json';
import { useNavigate, useParams } from "react-router-dom";

export const Patientoption = () => {
    const { id } = useParams();
    const [patientMenu, setPatientmenu] = useState(false);
    const navigate = useNavigate();
    const patient = patients.find((item) => item.id.toString() === id);

    function click() {
        setPatientmenu(prev => !prev);
    }

    return (
        <nav className="nav1">
            <div>
                <img src={logo} alt="" />
                <h1>ToothTone</h1>
            </div>    

            <div className='patient-menu1'>
                <div className="nav1-menu">
                    <ul>
                        <li className="patientoption" onClick={() => navigate(`/Reciptionaist/Patient/${patient.id}/Book`)}>Booking</li>
                        <li className="patientoption" onClick={() => navigate(`/Reciptionaist/Patient/${patient.id}/Patient Profile `)}>Profile</li>
                        <li className="patientoption" onClick={() => navigate(`/Reciptionaist/Patient/${patient.id}/Patient Payment`)}>Payment</li>
                    </ul>
                </div>
            </div>

            <div className="profile-container1">
                <img id="userPhoto1" src={Profile} alt="Profile" onClick={click}/>
                <Menu isVisible={patientMenu} />
            </div> 
        </nav>
    );
};

export default Patientoption;
