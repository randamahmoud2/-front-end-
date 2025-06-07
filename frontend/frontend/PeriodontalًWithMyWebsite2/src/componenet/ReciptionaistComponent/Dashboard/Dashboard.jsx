import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Dashboard.css";

import money from "../../../image/money.png";
import profile from "../../../image/user.png";
import cancel from "../../../image/cancel.png";
import correct from "../../../image/checked.png";
import patient from "../../../image/patient.png";
import appointment from "../../../image/appointment.png";
import list from "../../../image/to-do-list.png";

export const DashBoardInfo = () => {
    const [bookings, setBookings] = useState([]);
    const [totalFees, setTotalFees] = useState(0);

    
    useEffect(() => {
        axios.get("http://localhost:5000/api/bookings")
            .then(res => {
                setBookings(res.data);
                const earnings = res.data
                    .filter(b => b.status === "paid")
                    .reduce((acc, cur) => acc + cur.fee, 0);
                setTotalFees(earnings);
            })
            .catch(err => console.error(err));
    }, []);


    const handleStatusChange = (id, status) => {
        axios.put(`http://localhost:5000/api/bookings/${id}/status`, { status })
            .then(() => {
                setBookings(prev =>
                    prev.map(b =>
                        b.id === id ? { ...b, status } : b
                    )
                );
                if (status === "paid") {
                    const fee = bookings.find(b => b.id === id)?.fee || 0;
                    setTotalFees(prev => prev + fee);
                }
            })
            .catch(err => console.error(err));
    };

    return (
        <div className="dashboard1">
            <div className="data2">
                <div className="title2"><p>Dashboard</p></div>
                <hr id="split" />
            </div>

            <div className="details">
                <div className="up1">
                    <div className="docInfo">
                        <div className="Info1">
                            <img src={money} alt="" style={{ width: "40px" }} />
                            <div>
                                <p>$ {totalFees}</p>
                                <p style={{ color: "rgba(3, 3, 76, 0.416)" }}>Earnings</p>
                            </div>
                        </div>
                        <div className="Info1">
                            <img src={appointment} alt="" style={{ width: "40px" }} />
                            <div>
                                <p>{bookings.length}</p>
                                <p style={{ color: "rgba(3, 3, 76, 0.416)" }}>Appointments</p>
                            </div>
                        </div>
                        <div className="Info1">
                            <img src={patient} alt="" style={{ width: "40px" }} />
                            <div>
                                <p>{[...new Set(bookings.map(b => b.patient))].length}</p>
                                <p style={{ color: "rgba(3, 3, 76, 0.416)" }}>Patients</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="down1">
                    <div className="title1" style={{ width: "100%" }}>
                        <div>
                            <img src={list} alt="" style={{ width: "30px" }} />
                            <p>Latest Bookings</p>
                        </div>
                        <hr />
                    </div>


                    {bookings.length === 0 ? (
                        <p style={{ textAlign: 'center', fontSize: '16px', fontWeight:'600', color: 'gray', marginTop: '20px' }}>
                            There Is No Booking
                        </p>
                    ) : (
                        bookings.map((booking) => (
                        <div className="appointment" key={booking.id}>
                            <div className="description">
                                <img src={profile} alt="" style={{ width: "50px", height: "50px" }} />
                                <div>
                                    <p style={{ fontWeight: "600", marginBottom: "2px" }}>
                                        {booking.doctor} | {booking.patient}
                                    </p>
                                    <p>Booking on {booking.date}</p>
                                    <p>Fees : ${booking.fee}</p>
                                </div>
                            </div>
                            <div className="complete">
                                {booking.status === null && (
                                    <>
                                        <button onClick={() => handleStatusChange(booking.id, "cancelled")}>
                                            <img src={cancel} alt="Cancel" style={{ width: "40px" }} />
                                        </button>
                                        <button onClick={() => handleStatusChange(booking.id, "paid")}>
                                            <img src={correct} alt="Complete" style={{ width: "35px" }} />
                                        </button>
                                    </>
                                )}
                                {booking.status === "paid" && (
                                    <p style={{ color: "green", fontWeight: "600", fontSize: "18px" }}>Paid Successfully</p>
                                )}
                                {booking.status === "cancelled" && (
                                    <p style={{ color: "red", fontWeight: "600", fontSize: "18px" }}>Cancelled</p>
                                )}
                            </div>
                        </div>
                    )) )}
                </div>
            </div>
        </div>
    );
};

export default DashBoardInfo;
