import axios from 'axios';

import { useState } from 'react';

import { useFormik } from 'formik';
import { Button } from 'primereact/button';
import { classNames } from 'primereact/utils';
import { Password } from 'primereact/password';
import { InputText } from 'primereact/inputtext';

const Register = () => {
    const [isProcessing, setIsProcessing] = useState(false)
    const [serverErrorOccurred, setServerErrorOccurred] = useState(false)
    const [invalidInputs, setInvalidInputs] = useState(false)
    const [isInvalidEmail, setIsInvalidEmail] = useState(false)

    const handleSubmit = async (formik) => {
        // const id = "648a6ec0003e17e49fdf269f"
        setIsProcessing(true)
        setServerErrorOccurred(false)
        setInvalidInputs(false)
        setIsInvalidEmail(false)

        const requestData = {
            firstName: formik.values.firstName,
            lastName: formik.values.lastName,
            email: formik.values.email,
            password: formik.values.password,
            phone: formik.values.phone,
            role: 'guest-user'
        }

        if ((Object.keys(formik.errors).length > 0) || (Object.values(formik.values)).includes("") || (formik.values.password !== formik.values.confirmPassword)) {
            setInvalidInputs(true)
            setIsProcessing(false)
            return
        }

        try {
            const response = await axios.post(`http://localhost:4000/api/users`, requestData)
            console.log('Finished updating email in mongoDB database.', response.data.exists, response)

            if (response.status === 201) {
                setIsProcessing(false)
                window.location.href = '/completion'
                return
            } 

        } catch (error) {

            if ((error.response.status === 400) && (error.response.data.message === 'It seems you already have an account, please log in instead.')) {
                setIsInvalidEmail(true)
            }

            setIsProcessing(false)
            return
        }
    }
// const response = await axios.put(`http://localhost:4000/api/users/${id}/password`, requestData)
    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
            phone: '',
        },
        validate: async (data) => {
            let errors = {};

            if (!data.firstName) {
                errors.firstName = 'First Name is required.'
            }

            if (!data.lastName) {
                errors.lastName = 'Last Name is required.'
            }

            if (!data.email) {
                errors.email = 'Email is required.'
            }

            else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email)) {
                errors.email = 'Invalid email address. e.g. example@email.com'
            }

            if (!data.password) {
                errors.password = 'Password is required.'
            }

            if (!data.confirmPassword) {
                errors.confirmPassword = 'Please retype your password.'
            } 
            
            else if (data.password !== data.confirmPassword) {
                errors.confirmPassword = 'Passwords must match.'
            }

            if (!data.phone) {
                errors.phone = 'Phone Number is requred.'
            }

            else if ((!/^\d{10}$/.test(data.phone)) && (!/^\d{3}-\d{3}-\d{4}$/.test(data.phone))) {
                errors.phone = 'Invalid phone number. e.g. 999-999-9999'
            }

            return errors;
        },

        onSubmit: (data) => {
            console.log(data)
            // setFormData(data);
            // setShowMessage(true);

            formik.resetForm();
        }
    })
    
    const isFormFieldValid = (name) => !!(formik.touched[name] && formik.errors[name])
    const getFormErrorMessage = (name) => {
        return isFormFieldValid(name) && <small className="p-error" style={{ display: "block" }} >{formik.errors[name]}</small>;
    }

    return (
        <div className="container-alt">

            <div className="main-content-auth">

                <div>

                    <div>
                        <h1 className="auth-header">
                            Create an account.
                        </h1>
                    </div>

                    <div>
                        <p className="auth-description">
                            Enter your credentials below to create your account!
                        </p>
                    </div>

                    <div className="col-content content">

                        <div className="name-input" style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                            <div className="field" style={{ paddingRight: "0.25rem" }}>
                                <span className="p-float-label">
                                    <InputText id="firstName" name="firstName" value={formik.values.firstName} onChange={formik.handleChange} onBlur={formik.handleBlur} 
                                    className={classNames({ 'p-invalid': isFormFieldValid('firstName'), 'p-valid': !isFormFieldValid('firstName') })} />
                                    <label htmlFor="firstName">First Name</label>
                                </span>
                                {getFormErrorMessage('firstName')}
                            </div>
                            <div className="field" style={{ paddingLeft: "0.25rem" }}>
                                <span className="p-float-label">
                                    <InputText id="lastName" name="lastName" value={formik.values.lastName} onChange={formik.handleChange} onBlur={formik.handleBlur} 
                                    className={classNames({ 'p-invalid': isFormFieldValid('lastName'), 'p-valid': !isFormFieldValid('lastName') })} />
                                    <label htmlFor="lastName">Last Name</label>
                                </span>
                                {getFormErrorMessage('lastName')}
                            </div>
                        </div>

                        <div className="email-input">
                            <div className="field">
                                <span className="p-float-label p-input-icon-right">
                                <i className="pi pi-envelope" />
                                    <InputText id="email" name="email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur}
                                        className={classNames({ 'p-invalid': isFormFieldValid('email'), 'p-valid': !isFormFieldValid('email') })} />
                                    <label htmlFor="email">Email</label>
                                </span>
                                {getFormErrorMessage('email')}
                            </div>
                        </div>

                        <div className="password-input">
                            <div className="field">
                                <span className="p-float-label">
                                    <Password id="password" name="password" value={formik.values.password} toggleMask onChange={formik.handleChange} onBlur={formik.handleBlur} 
                                        className={classNames({ 'p-invalid': isFormFieldValid('password'), 'p-valid': !isFormFieldValid('password') })} 
                                        style={{ '--p-password-panel-padding': '0', width: "100%" }} inputStyle={{ width: "100%" }} feedback={false} />
                                    <label htmlFor="password">Password</label>
                                </span>
                                {getFormErrorMessage('password')}
                            </div>
                        </div>

                        <div className="confirm-password-input">
                            <div className="field">
                                <span className="p-float-label">
                                    <Password id="confirmPassword" name="confirmPassword" value={formik.values.confirmPassword} toggleMask onChange={formik.handleChange} onBlur={formik.handleBlur}
                                        className={classNames({ 'p-invalid': isFormFieldValid('confirmPassword'), 'p-valid': !isFormFieldValid('confirmPassword') })} 
                                        style={{ '--p-password-panel-padding': '0', width: "100%" }} inputStyle={{ width: "100%" }} feedback={false} />
                                    <label htmlFor="confirmPassword">Confirm Password</label>
                                </span>
                                {getFormErrorMessage('confirmPassword')}
                            </div>
                        </div>

                        <div className="phone-input">
                            <div className="field">
                                <span className="p-float-label p-input-icon-right">
                                <i className="pi pi-phone" />
                                    <InputText id="phone" name="phone" value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur}
                                        className={classNames({ 'p-invalid': isFormFieldValid('phone'), 'p-valid': !isFormFieldValid('email') })} />
                                    <label htmlFor="phone">Phone No.</label>
                                </span>
                                {getFormErrorMessage('phone')}
                            </div>
                        </div>

                        <Button className="auth-button" label="Register" onClick={() => handleSubmit(formik)} disabled={isProcessing} />
                        {
                            serverErrorOccurred ? 
                            <small className="p-error" style={{ display: "block" }} >A server error occurred while trying to create your account. Please try again.</small> 
                            : <></>
                        }
                        {
                            invalidInputs ? 
                            <small className="p-error" style={{ display: "block" }} >Please make sure you've typed in valid account credentials.</small> 
                            : <></>
                        }
                        {
                            isInvalidEmail ? 
                            <small className="p-error" style={{ display: "block" }} >It seems you already have an account, please log in instead.</small> 
                            : <></>
                        }

                    </div>

                </div>


                <a className="auth-hyperlink" href='/forgot-password' style={{ marginTop: "10px", marginBottom: "15px" }}>Forgot Password?</a>
                <a className="auth-hyperlink" href='/login'>Already have an account? Log in.</a>

            </div>
            
        </div>
    )
}

export default Register