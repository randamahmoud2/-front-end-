import React, { useState, useEffect } from 'react';
import "./Dashboard.css";
import money from '../../../image/money.png';
import profile from '../../../image/user.png';
import cancel from '../../../image/cancel.png';
import correct from '../../../image/checked.png';
import patient from '../../../image/patient.png';
import appointment from '../../../image/appointment.png';
import list from '../../../image/to-do-list.png';

const API_BASE_URL = "https://localhost:44320/api/Dashboard";

export const DashBoardInfo = () => {
    const [bookings, setBookings] = useState([]);
    const [stats, setStats] = useState({
        earnings: 0,
        appointmentsCount: 0,
        patientsCount: 0
    });
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const doctorId = 1; // Replace with actual doctor ID from authentication

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                setIsLoading(true);
                setError(null);
                
                // Fetch stats and bookings in parallel
                const [statsResponse, bookingsResponse] = await Promise.all([
                    fetch(`${API_BASE_URL}/stats/${doctorId}`),
                    fetch(`${API_BASE_URL}/bookings/${doctorId}`)
                ]);
                
                if (!statsResponse.ok) throw new Error('Failed to load dashboard stats');
                if (!bookingsResponse.ok) throw new Error('Failed to load bookings');
                
                const statsData = await statsResponse.json();
                const bookingsData = await bookingsResponse.json();
                
                // Transform the data to match the frontend structure
                const transformedBookings = bookingsData.map(booking => ({
                    ...booking,
                    // Use patientName (camelCase) to match API response
                    patientName: booking.patientName || `Patient ${booking.patientId}`,
                    time: booking.time ? booking.time.split('.')[0] : '00:00'
                }));

                setStats({
                    earnings: statsData.totalEarnings,
                    appointmentsCount: statsData.appointmentsCount,
                    patientsCount: statsData.patientsCount
                });
                
                setBookings(transformedBookings);
            } catch (err) {
                console.error("Error loading dashboard data:", err);
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };
        
        fetchDashboardData();
    }, [doctorId]);

    const handleStatusChange = async (id, newStatus) => {
        try {
            setIsLoading(true);
            setError(null);
            
            const response = await fetch(`${API_BASE_URL}/booking/status`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    bookingId: id,
                    status: newStatus
                })
            });
            
            if (!response.ok) throw new Error('Failed to update booking status');
            
            // Update local state
            setBookings(prev => prev.map(booking =>
                booking.id === id ? { ...booking, status: newStatus } : booking
            ));
            
            // Update stats if payment was completed
            if (newStatus === "completed") {
                const booking = bookings.find(b => b.id === id);
                if (booking && booking.isPaid) {
                    setStats(prev => ({
                        ...prev,
                        earnings: prev.earnings + booking.paymentAmount
                    }));
                }
            }
        } catch (err) {
            console.error("Error updating booking status:", err);
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const formatTime = (timeString) => {
        if (!timeString) return "12:00 AM";
        
        // If time is in "HH:MM:SS" format
        if (timeString.includes(':')) {
            const [hours, minutes] = timeString.split(':');
            const time = new Date();
            time.setHours(parseInt(hours), parseInt(minutes), 0);
            return time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        }
        
        return timeString; // Return as-is if not in expected format
    };

    if (isLoading) {
        return <div className="dashboard-loading">Loading dashboard data...</div>;
    }

    if (error) {
        return <div className="dashboard-error">Error: {error}</div>;
    }

    return (
        <div className="dashboard1">
            <div className="data2">
                <div className='title2'><p>Dashboard</p></div>
                <hr id="split" />
            </div>

            <div className="details">
                <div className="up1">
                    <div className="docInfo">
                        <div className="Info1">
                            <img src={money} alt="money" style={{ width: "40px" }} />
                            <div>
                                <p>$ {stats.earnings.toFixed(2)}</p>
                                <p style={{ color: "rgba(3, 3, 76, 0.416)" }}>Earnings</p>
                            </div>
                        </div>

                        <div className="Info1">
                            <img src={appointment} alt="appointments" style={{ width: "40px" }} />
                            <div>
                                <p>{stats.appointmentsCount}</p>
                                <p style={{ color: "rgba(3, 3, 76, 0.416)" }}>Appointments</p>
                            </div>
                        </div>

                        <div className="Info1">
                            <img src={patient} alt="patients" style={{ width: "40px" }} />
                            <div>
                                <p>{stats.patientsCount}</p>
                                <p style={{ color: "rgba(3, 3, 76, 0.416)" }}>Patients</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="down1">
                    <div className='title1' style={{ width: "100%" }}>
                        <div>
                            <img src={list} alt="list" style={{ width: "30px" }} />
                            <p>Latest Bookings</p>
                        </div>
                        <hr />
                    </div>

                    {bookings.map((booking) => (
                        <div key={booking.id} className='appointment1'>
                            <div className="description">
                                <img src={profile} alt="profile" style={{ width: "30px", height: "30px" }} />
                                <div>
                                    <p style={{ fontWeight: "600" }}>{booking.patientName}</p>
                                    <p>Booking on {formatDate(booking.date)}</p>
                                    <p>Time at {formatTime(booking.time)}</p>
                                    {booking.isPaid ? (
                                        <p style={{ color: "green", fontSize: "14px" }}>Paid: ${booking.paymentAmount}</p>
                                    ) : (
                                        <p style={{ color: "orange", fontSize: "14px" }}>Pending: ${booking.paymentAmount}</p>
                                    )}
                                </div>
                            </div>

                            <div className="complete1">
                                {(!booking.status || booking.status === "Pending") && (
                                    <>
                                        <button 
                                            onClick={() => handleStatusChange(booking.id, "cancelled")}
                                            disabled={isLoading}
                                        >
                                            <img src={cancel} alt="Cancel" style={{ width: "30px" }} />
                                        </button>
                                        <button 
                                            onClick={() => handleStatusChange(booking.id, "completed")}
                                            disabled={isLoading}
                                        >
                                            <img src={correct} alt="Complete" style={{ width: "25px" }} />
                                        </button>
                                    </>
                                )}

                                {booking.status === "completed" && (
                                    <p style={{ color: "green", fontWeight: "600", fontSize: "18px" }}>Completed</p>
                                )}

                                {booking.status === "cancelled" && (
                                    <p style={{ color: "red", fontWeight: "600", fontSize: "18px" }}>Cancelled</p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DashBoardInfo;