import './Dashboard.css';
import React from 'react';
import worker from '../../../image/skills.png';
import patient from '../../../image/patient.png';
import list from "../../../image/to-do-list.png";
import group from '../../../image/group-chat.png';
import appointment from '../../../image/schedule.png';

export const Dashboard = () => {

    // Temporary signup data
    const recentSignUps = [
        { name: "Ahmed", role: "Doctor", timestamp: new Date(Date.now() - 1 * 60 * 1000) }, // 1 minute ago
        { name: "Sara Ali", role: "Receptionist", timestamp: new Date(Date.now() - 10 * 60 * 1000) }, // 10 minutes ago
        { name: "Mohamed Youssef", role: "Patient", timestamp: new Date(Date.now() - 60 * 60 * 1000) } // 1 hour ago
    ];

    // Function to calculate time ago
    const getTimeAgo = (timestamp) => {
        const now = new Date();
        const diffMs = now - new Date(timestamp);
        const diffMinutes = Math.floor(diffMs / (1000 * 60));
        const diffHours = Math.floor(diffMinutes / 60);

        if (diffMinutes < 1) return "Just now";
        if (diffMinutes < 60) return `${diffMinutes} minute${diffMinutes > 1 ? "s" : ""} ago`;
        return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
    };

    return (
        <div className="dashboard">
            <div className="data2">
                <div className='title2'>
                    <p>Dashboard</p>
                </div>
                <hr id="split" />
            </div>

            <div className="details">
                <div className="up2">
                    <div className="docInfo">
                        <div className="Info1">
                            <img src={worker} alt="" style={{ width: "40px", height: "40px" }} />
                            <div>
                                <p>100</p>
                                <p style={{ color: "rgba(3, 3, 76, 0.6)" }}>Pending Approvals</p>
                            </div>
                        </div>
                        <div className="Info1">
                            <img src={group} alt="" style={{ width: "50px", marginTop: "-8px" }} />
                            <div>
                                <p>20</p>
                                <p style={{ color: "rgba(3, 3, 76, 0.6)" }}>Total Staff</p>
                                <p style={{ color: "rgba(3, 3, 76, 0.5)", fontSize: "13px" }}>12 Doctors, 8 Receptionists</p>
                            </div>
                        </div>
                        <div className="Info1">
                            <img src={patient} alt="" style={{ width: "50px" }} />
                            <div>
                                <p>2</p>
                                <p style={{ color: "rgba(3, 3, 76, 0.6)" }}>Total Patients</p>
                            </div>
                        </div>
                        <div className="Info1">
                            <img src={appointment} alt="" style={{ width: "50px" }} />
                            <div>
                                <p>2</p>
                                <p style={{ color: "rgba(3, 3, 76, 0.6)" }}>Today's Appointments</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="down2">
                    <div className="recentSignUps">
                        <div className="header">
                            <h3>Recent Sign-ups</h3>
                            <button className="viewAll">View All</button>
                        </div>
                        {recentSignUps.length > 0 ? (
                            recentSignUps.map((person, index) => (
                                <div key={index} className="signupEntry">
                                    <div className="userInfo">
                                        <div className="avatar">
                                            {person.name.charAt(0)}
                                        </div>
                                        <div className="details1">
                                            <span className="name">{person.name}</span>
                                            <span className="role">
                                                {person.role === "Doctor"
                                                    ? "Signed up as Doctor"
                                                    : person.role === "Receptionist"
                                                    ? "Signed up as Receptionist"
                                                    : "Registered as Patient"}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="date">{getTimeAgo(person.timestamp)}</div>
                                </div>
                            ))
                        ) : (
                            <p style={{color:"rgba(55, 55, 55, 0.57)", fontWeight:"600", fontSize:"18px"}}>No recent sign-ups.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
