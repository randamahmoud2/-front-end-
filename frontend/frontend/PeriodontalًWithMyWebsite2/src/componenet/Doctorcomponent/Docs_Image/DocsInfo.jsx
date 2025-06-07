import "./DocsInfo.css";
import "./Imagepatient.css";
import DatePicker from "react-datepicker";
import Delete from "../../../image/delete.png"
import { FaCalendarAlt } from "react-icons/fa";
import React, { useState, useRef } from "react";
import Patients from '../../../PatientData.json';
import upload from "../../../image/upload-file.png";
import { useParams, useNavigate } from 'react-router-dom';

export const DocsInfo = () => {
    const dateTimeRef = useRef(null);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [files, setFiles] = useState([]);
    const navigate = useNavigate();
    const { id } = useParams();
    const patient = Patients.find((p) => String(p.id) === id);

    function handleFileUpload(e) {
    const uploadedFiles = Array.from(e.target.files).map((file) => ({
        file,
        url: URL.createObjectURL(file), 
        uploadedDate : new Date()
    }));
    setFiles([...files, ...uploadedFiles]);
    }
    
    // Handle file deletion
    function handleDeleteFile(indexToDelete) {
        // Filter out the file at the specified index
        const updatedFiles = files.filter((_, index) => index !== indexToDelete);
        // Revoke the object URL to prevent memory leaks
        URL.revokeObjectURL(files[indexToDelete].url);
        // Update the state
        setFiles(updatedFiles);
    }

    return (
        <div className="docsPatient">
            <div className="data2">
                <div className='title2'>
                    <p>Document</p>
                    <p id="name">{patient.name} / {patient.id}</p>
                </div>
            </div>
            <hr id="split" />
    
            <div className="uploadphoto">
                <div className="photo">
                    <div>
                        <img src={upload} alt="" />
                        <h3>Upload Document</h3>
                    </div>
                    <button className="addPhoto">
                        <label className="custom-file-label" htmlFor="fileInput">
                            Select Files
                        </label>
                    </button>
                    <input
                        type="file"
                        id="fileInput"
                        className="file-upload"
                        multiple
                        onChange={handleFileUpload}
                    />
                </div>
        
                <div className="imageInfo">
                    <div className="info">
                        <p>Document Information</p>
                        <hr className="split" />
                    </div>
        
                    <div className="info2">
                        <p>Uploaded On</p>
                        <div className="picker">
                            <DatePicker
                                selected={selectedDate}
                                onChange={(date) => setSelectedDate(date)}
                                dateFormat="dd/MM/yyyy"
                                className="datetime"
                                ref={dateTimeRef}
                                readOnly
                            />
                            <FaCalendarAlt
                                className="calender"
                                onClick={() => dateTimeRef.current.setOpen(true)}
                            /> 
                        </div>

                        <p>
                            Uploaded By <span style={{ marginLeft: "66px" }}>Doctor name</span>
                        </p>

                        <div
                            className="doctype"
                            style={{
                            display: "flex",
                            gap: "44px",
                            paddingBottom: "15px",
                            color: "#042d6687",
                            fontSize: "16px",
                            fontWeight: "600",
                            alignItems: "center",
                            }}>
                            <label htmlFor="docType">Document Type</label>
                            <select
                                id="docType"
                                style={{
                                width: "195px",
                                height: "30px",
                                padding: "4px",
                                fontSize: "15px",
                                fontWeight: "600",
                                color: "#042d6687",
                                border: "1px solid gray",
                            }}>
                                <option value="All">All</option>
                                <option value="EOB">EOB</option>
                                <option value="Forms">Forms</option>
                                <option value="Patient Treatment">Patient Treatment</option>
                                <option value="Patient Information">Patient Information</option>
                                <option value="Patient Health Histroy">Patient Health Histroy</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
                
            {/* Display uploaded files */}
            <div className="display">
                <table className="table3">
                    <thead>
                        <tr style={{background:"rgba(216, 211, 211, 0.851)"}}>
                            <th><div></div></th>
                            <th>Name</th>
                            <th>Time</th>
                        </tr>
                    </thead>
                    <tbody>
                    {files.map((fileData, index) => (
                            <tr key={index}>
                                <td>
                                    <img 
                                        src={Delete} 
                                        alt="Delete" 
                                        onClick={() => handleDeleteFile(index)}
                                        style={{ cursor: 'pointer' }}
                                    />
                                </td>
                                <td>
                                    <a
                                        href={fileData.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="file-link">
                                        {fileData.file.name} - {(fileData.file.size / 1024).toFixed(2)} KB
                                    </a>
                                </td>
                                <td>
                                    <DatePicker
                                    selected={fileData.uploadedDate} // Unique time per file
                                    showTimeSelect
                                    onChange={(date) => {
                                        const updatedFiles = [...files];
                                        updatedFiles[index].uploadedDate = date;
                                        setFiles(updatedFiles);
                                    }}
                                    dateFormat="hh:mm:ss aa"
                                    className="datetime"
                                    readOnly
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                
            </div>
        </div>
    );
};

export default DocsInfo;
