import './Login.css';
import React, { useState } from 'react';
import logo from "../image/tooth.png";
import emailIcon from "../image/email.png";
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: '',
        specialty: '',
        experience: '',
        age: '',
        gender: '',
        nationalId: '',
        address: ''
    });
    const [error, setError] = useState('');

    const styles = {
        buttonGroup: {
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '10px',
        },
        backButton: {
            padding: '8px 16px',
            backgroundColor: '#e0e0e0',
            color: '#333',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontWeight: 'bold',
        },
        container: {
            height: 'auto',
            maxHeight: '100vh',
            overflow: 'hidden',
        },
        content: {
            maxWidth: '85%',
            margin: '0 auto',
            transform: 'scale(0.9)',
            transformOrigin: 'top center',
        },
        formContainer: {
            padding: '10px',
            height: 'auto',
            overflow: 'hidden',
        },
        inputGroup: {
            marginBottom: '8px',
        },
        inputField: {
            height: '32px',
        },
        logo: {
            maxWidth: '40px',
            maxHeight: '40px',
        },
        heading: {
            fontSize: '1.5rem',
            marginBottom: '10px',
        },
        label: {
            marginBottom: '2px',
            fontSize: '0.9rem',
        },
        input: {
            padding: '6px',
            height: '30px',
        },
        loginButton: {
            padding: '8px 0',
            marginTop: '10px',
        },
        welcomeContent: {
            transform: 'scale(0.9)',
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleNextStep = () => {
        if (!formData.email || !formData.password || !formData.confirmPassword || !formData.gender || !formData.role) {
            setError('Please fill all required fields');
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        setError('');
        setCurrentStep(2);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        // In a real application, you would make an API call here
        try {
            // Simulate API call
            if (formData.role === 'doctor' || formData.role === 'receptionist') {
                alert('Your signup request has been submitted. Please wait for manager approval.');
            } else {
                alert('Account created successfully!');
            }
            navigate('/');
        } catch (err) {
            setError('Failed to create account. Please try again.');
        }
    };

    const renderStepOne = () => (
        <div>
            <div className='input-group' style={styles.inputGroup}>
                <label style={styles.label}>Email</label>
                <div className='input-field' style={styles.inputField}>
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        style={styles.input}
                    />
                    <img src={emailIcon} alt="" style={{width: '16px', height: '16px'}} />
                </div>
            </div>

            <div className='input-group' style={styles.inputGroup}>
                <label style={styles.label}>Password</label>
                <div className='input-field' style={styles.inputField}>
                    <input
                        type="password"
                        name="password"
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        style={styles.input}
                    />
                </div>
            </div>

            <div className='input-group' style={styles.inputGroup}>
                <label style={styles.label}>Confirm Password</label>
                <div className='input-field' style={styles.inputField}>
                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm your password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                        style={styles.input}
                    />
                </div>
            </div>

            <div className='input-group' style={styles.inputGroup}>
                <label style={styles.label}>Gender</label>
                <div className='input-field' style={styles.inputField}>
                    <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        required
                        className="role-select"
                        style={styles.input}
                    >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                </div>
            </div>

            <div className='input-group' style={styles.inputGroup}>
                <label style={styles.label}>Role</label>
                <div className='input-field' style={styles.inputField}>
                    <select
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        required
                        className="role-select"
                        style={styles.input}
                    >
                        <option value="">Select Role</option>
                        <option value="doctor">Doctor</option>
                        <option value="receptionist">Receptionist</option>
                        <option value="manager">Manager</option>
                        <option value="patient">Patient</option>
                    </select>
                </div>
            </div>

            <button type="button" className="login-button" onClick={handleNextStep} style={styles.loginButton}>
                Next
            </button>
        </div>
    );

    const renderStepTwo = () => (
        <div>
            <div className='input-group' style={styles.inputGroup}>
                <label style={styles.label}>Full Name</label>
                <div className='input-field' style={styles.inputField}>
                    <input
                        type="text"
                        name="name"
                        placeholder="Enter your full name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        style={styles.input}
                    />
                </div>
            </div>

            {formData.role === 'doctor' && (
                <div className='input-group' style={styles.inputGroup}>
                    <label style={styles.label}>Specialty</label>
                    <div className='input-field' style={styles.inputField}>
                        <input
                            type="text"
                            name="specialty"
                            placeholder="Enter your specialty"
                            value={formData.specialty}
                            onChange={handleChange}
                            required
                            style={styles.input}
                        />
                    </div>
                </div>
            )}

            {(formData.role === 'doctor' || formData.role === 'receptionist') && (
                <div className='input-group' style={styles.inputGroup}>
                    <label style={styles.label}>Experience (years)</label>
                    <div className='input-field' style={styles.inputField}>
                        <input
                            type="text"
                            name="experience"
                            placeholder="Years of experience"
                            value={formData.experience}
                            onChange={handleChange}
                            required
                            style={styles.input}
                        />
                    </div>
                </div>
            )}

            <div className='input-group' style={styles.inputGroup}>
                <label style={styles.label}>Age</label>
                <div className='input-field' style={styles.inputField}>
                    <input
                        type="number"
                        name="age"
                        placeholder="Enter your age"
                        value={formData.age}
                        onChange={handleChange}
                        required
                        style={styles.input}
                    />
                </div>
            </div>

            <div className='input-group' style={styles.inputGroup}>
                <label style={styles.label}>National ID</label>
                <div className='input-field' style={styles.inputField}>
                    <input
                        type="text"
                        name="nationalId"
                        placeholder="Enter your national ID"
                        value={formData.nationalId}
                        onChange={handleChange}
                        required
                        style={styles.input}
                    />
                </div>
            </div>

            <div className='input-group' style={styles.inputGroup}>
                <label style={styles.label}>Address</label>
                <div className='input-field' style={styles.inputField}>
                    <input
                        type="text"
                        name="address"
                        placeholder="Enter your address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                        style={styles.input}
                    />
                </div>
            </div>

            <div style={styles.buttonGroup}>
                <button 
                    type="button" 
                    style={styles.backButton} 
                    onClick={() => setCurrentStep(1)}
                >
                    Back
                </button>
                <button type="submit" className="login-button" style={styles.loginButton}>
                    Sign Up
                </button>
            </div>
        </div>
    );

    return (
        <div className='login' style={styles.container}>
            <div className='content' style={styles.content}>
                <div className='left'>
                    <div className="login-header">
                        <img src={logo} alt="ToothTone Logo" className="login-logo" style={styles.logo} />
                        <h1 style={styles.heading}>ToothTone</h1>
                    </div>

                    <div className="login-form-container" style={styles.formContainer}>
                        <h2 style={styles.heading}>Create Account {currentStep === 1 ? '- Step 1' : '- Step 2'}</h2>
                        {error && <div className="error-message">{error}</div>}
                        
                        <form onSubmit={handleSubmit}>
                            {currentStep === 1 ? renderStepOne() : renderStepTwo()}
                        </form>

                        <div className="login-footer">
                            <p style={{fontSize: '0.9rem', marginTop: '8px'}}>Already have an account? 
                                <span onClick={() => navigate('/')} className="signup-link">
                                    Login here
                                </span>
                            </p>
                        </div>
                    </div>
                </div>

                <div className="right">
                    <div className="welcome-content" style={styles.welcomeContent}>
                        <h2 style={styles.heading}>Join ToothTone</h2>
                        <p>Your Journey to Better Dental Care Starts Here</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
