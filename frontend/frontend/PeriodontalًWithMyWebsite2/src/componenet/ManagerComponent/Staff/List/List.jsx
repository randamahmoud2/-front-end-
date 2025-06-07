import './List.css';
import React, { useState, useEffect } from 'react';
import group from '../../../../image/group-chat.png';
import search from '../../../../image/loupe.png';

const StaffList = () => {
    const [staffData, setStaffData] = useState([
        {
            name: "Dr. Sarah Johnson",
            email: "sarahj@example.com",
            role: "Doctor",
            joined: "1/15/2023",
            status: "Active",
        },
        {
            name: "Robert Williams",
            email: "robertw@example.com",
            role: "Receptionist",
            joined: "2/22/2023",
            status: "Active",
        },
        {
            name: "Emily Davis",
            email: "emilyd@example.com",
            role: "Receptionist",
            joined: "4/5/2023",
            status: "Inactive",
        },
        {
            name: "John Davis",
            email: "John@example.com",
            role: "Receptionist",
            joined: "1/12/2023",
            status: "Inactive",
        }
    ]);

    const [totalActive, setTotalActive] = useState(0);
    const [activeDoc, setActiveDoc] = useState(0);
    const [activeRes, setActiveRes] = useState(0);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterRole, setFilterRole] = useState("");

    useEffect(() => {
        const activeStaff = staffData.filter(staff => staff.status === "Active");
        setTotalActive(activeStaff.length);
        setActiveDoc(activeStaff.filter(staff => staff.role === "Doctor").length);
        setActiveRes(activeStaff.filter(staff => staff.role === "Receptionist").length);
    }, [staffData]);

    const remove = (staffToRemove) => {
        setStaffData(prev => prev.filter(s => s !== staffToRemove));
    };

    const filteredStaff = staffData.filter(staff => {
        const matchesSearch =
            staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            staff.email.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesRole = filterRole === "" || staff.role === filterRole;

        return matchesSearch && matchesRole;
    });

    return (
        <div className="container1">
            <div className="data2">
                <div className="title2">
                    <p>Staff List</p>
                </div>
                <hr id="split" />
            </div>

            <div className="docInfo">
                {[
                    { label: "Total Active Staff", count: totalActive },
                    { label: "Doctors", count: activeDoc },
                    { label: "Receptionists", count: activeRes },
                ].map((item, idx) => (
                    <div className="Info1" key={idx}>
                        <img src={group} alt="" />
                        <div>
                            <p style={{ color: "rgba(3, 3, 76, 0.6)" }}>{item.label}</p>
                            <p>{item.count}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="search1">
                <div>
                    <img src={search} alt="" style={{ width: "20px" }} />
                    <input
                        type="text"
                        placeholder="Search by name or email..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <select name="Roles" id="Role" value={filterRole} onChange={(e) => setFilterRole(e.target.value)}>
                    <option value="">All Roles</option>
                    <option value="Doctor">Doctors Only</option>
                    <option value="Receptionist">Receptionists Only</option>
                </select>
            </div>

            <table className="staff-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Role</th>
                        <th>Email</th>
                        <th>Joined</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody className="tbody">
                    {filteredStaff.length === 0 ? (
                        <></>
                    ) : (
                        filteredStaff.map((staff, index) => (
                            <tr key={index} className="row">
                                <td>{staff.name}</td>
                                <td>
                                    <span className={`role-badge ${staff.role.toLowerCase()}`}>
                                        {staff.role}
                                    </span>
                                </td>
                                <td>{staff.email}</td>
                                <td>{staff.joined}</td>
                                <td>
                                    <span className={`status-badge ${staff.status.toLowerCase()}`}>
                                        {staff.status}
                                    </span>
                                </td>
                                <td>
                                    <button className="rm-btn" onClick={() => remove(staff)}>
                                        Remove
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default StaffList;
