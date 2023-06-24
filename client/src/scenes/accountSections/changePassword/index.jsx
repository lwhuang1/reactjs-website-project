import axios from 'axios';

import { useState } from 'react';

import { useFormik } from 'formik';
import { Button } from 'primereact/button';
import { classNames } from 'primereact/utils';
import { Password } from 'primereact/password';

const ChangePassword = () => {
    const [isProcessing, setIsProcessing] = useState(false)
    const [serverErrorOccurred, setServerErrorOccurred] = useState(false)
    const [isInvalidInputs, setIsInvalidInputs] = useState(false)
    const [isInvalidEmail, setIsInvalidEmail] = useState(false)

    const handleSubmit = async (formik) => {
        // const id = "648a6ec0003e17e49fdf269f"
        setIsProcessing(true)
        setServerErrorOccurred(false)
        setIsInvalidInputs(false)
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
            setIsInvalidInputs(true)
            setIsProcessing(false)
            return
        }

        console.log("Sending requestData with new password", requestData)
        console.log(formik.errors, typeof formik.errors, formik.errors.length)

        try {
            const response = await axios.post(`http://localhost:4000/api/users`, requestData)
            console.log('Finished updating email in mongoDB database.', response.data.exists, response)

            if (response.status === 201) {
                setIsProcessing(false)
                window.location.href = '/completion'
                return
            } 

        } catch (error) {

            setServerErrorOccurred(true)
            setIsProcessing(false)
            return
        }
    }

    const formik = useFormik({
        initialValues: {
            oldPassword: '',
            newPassword: '',
            confirmNewPassword: '',
        },
        validate: async (data) => {
            let errors = {};

            if (!data.oldPassword) {
                errors.oldPassword = 'Please type in your previous password.'
            }

            if (!data.confirmNewPassword) {
                errors.newPassword = 'Please type in a new password.'
            } 
            
            if (data.newPassword !== data.confirmNewPassword) {
                errors.confirmNewPassword = 'Your passwords must match.'
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

        <div className="content">
            {/* SECTION HEADER */}
            <div className='title'>
                <h1>
                    Change Password
                    <i className="pi pi-key" style={{ fontSize: "1.25rem", paddingLeft: ".75rem" }}></i>
                </h1>
            </div>

            <div>
                <p className='subtitle'>
                    Enter your new password and previous password below.
                </p>
            </div>

            <div className="forgot-password-container">

                <div className="old-password-input">
                    <div className="field">
                        <span className="p-float-label">
                            <Password id="oldPassword" name="oldPassword" value={formik.values.oldPassword} toggleMask onChange={formik.handleChange} onBlur={formik.handleBlur} 
                                className={classNames({ 'p-invalid': isFormFieldValid('oldPassword'), 'p-valid': !isFormFieldValid('oldPassword') })} 
                                style={{ '--p-password-panel-padding': '0', width: "100%" }} inputStyle={{ width: "100%" }} feedback={false} />
                            <label htmlFor="oldPassword">Old Password</label>
                        </span>
                        {getFormErrorMessage('oldPassword')}
                    </div>
                </div>


                <div className="new-password-input">
                    <div className="field">
                        <span className="p-float-label">
                            <Password id="newPassword" name="newPassword" value={formik.values.newPassword} toggleMask onChange={formik.handleChange} onBlur={formik.handleBlur} 
                                className={classNames({ 'p-invalid': isFormFieldValid('newPassword'), 'p-valid': !isFormFieldValid('newPassword') })} 
                                style={{ '--p-password-panel-padding': '0', width: "100%" }} inputStyle={{ width: "100%" }} feedback={false} />
                            <label htmlFor="newPassword">New Password</label>
                        </span>
                        {getFormErrorMessage('newPassword')}
                    </div>
                </div>

                <div className="confirm-new-password-input">
                    <div className="field">
                        <span className="p-float-label">
                            <Password id="confirmNewPassword" name="confirmNewPassword" value={formik.values.confirmNewPassword} toggleMask onChange={formik.handleChange} onBlur={formik.handleBlur}
                                className={classNames({ 'p-invalid': isFormFieldValid('confirmNewPassword'), 'p-valid': !isFormFieldValid('confirmNewPassword') })} 
                                style={{ '--p-password-panel-padding': '0', width: "100%" }} inputStyle={{ width: "100%" }} feedback={false} />
                            <label htmlFor="confirmNewPassword">Confirm New Password</label>
                        </span>
                        {getFormErrorMessage('confirmNewPassword')}
                    </div>
                </div>

                <Button className="auth-button" label="Change Password" onClick={() => handleSubmit(formik)} disabled={isProcessing} />
                {
                    serverErrorOccurred ? 
                    <small className="p-error" style={{ display: "block" }} >A server error occurred while trying to create your account. Please try again.</small> 
                    : <></>
                }
                {
                    isInvalidInputs ? 
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
            
    )
}

export default ChangePassword;