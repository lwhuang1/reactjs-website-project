import axios from 'axios';

import { useState } from 'react';

import { useFormik } from 'formik';
import { Button } from 'primereact/button';
import { classNames } from 'primereact/utils';
import { InputText } from 'primereact/inputtext';

const ChangeEmail = () => {
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
            email: '',
        },
        validate: async (data) => {
            let errors = {};

            if (!data.email) {
                errors.email = 'An email is required.'
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
                    Change Email
                    <i className="pi pi-envelope" style={{ fontSize: "1.25rem", paddingLeft: ".75rem" }}></i>
                </h1>
            </div>

            <div>
                <p className='subtitle'>
                Enter your new email below and we will send a verification email to change it.
                </p>
            </div>

            <div className="email-container">

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

                <Button className="auth-button" label="Change Email" onClick={() => handleSubmit(formik)} disabled={isProcessing} />
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

export default ChangeEmail;