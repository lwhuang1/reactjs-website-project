import { useState, useEffect } from 'react'; 

import axios from 'axios';

import { useFormik } from 'formik';
import { Button } from 'primereact/button';
import { classNames } from 'primereact/utils';
import { Password } from 'primereact/password';
import { InputText } from 'primereact/inputtext';

const Login = () => {
    const [isProcessing, setIsProcessing] = useState(false)
    const [serverErrorOccurred, setServerErrorOccurred] = useState(false)
    const [invalidInputs, setInvalidInputs] = useState(false)
    const [invalidCredentials, setInvalidCredentials] = useState(false)
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    // const checkUserAuthentication = async () => {
    //     const response = await axios.get(`http://localhost:4000/api/auth/login-session`)
    //     console.log('the data', response)
    //     return response.data.loggedIn
    // }

    // useEffect(() => {
    //     const loggedIn = checkUserAuthentication()
    //     setIsLoggedIn(loggedIn)
    // })

    // if (isLoggedIn) {
    //     window.location.href = '/home'
    //     return
    // }

    const showSession = async () => {
        console.log('showing session')
        const response = await axios.get(`http://localhost:4000/api/auth/session`)
        if (response.status === 400) {
            return
        }
        return
    }

    const handleSubmit = async (formik) => {

        setIsProcessing(true)
        
        // reset error messages to false
        setInvalidInputs(false)
        setInvalidCredentials(false)
        setServerErrorOccurred(false)

        const requestData = {
            email: formik.values.email,
            password: formik.values.password
        }

        // check if the user has not inputted a valid username and password
        if ((Object.keys(formik.errors).length > 0) || (Object.values(formik.values).includes(""))) {
            setInvalidInputs(true)
            setIsProcessing(false)
            return
        }

        console.log('The data to be sent:', requestData)

        try {

            console.log('attempting to login')

            const response = await axios.post(`http://localhost:4000/api/auth/login`, requestData)

            console.log('server says ight')

            if (response.status === 200) {
                setIsProcessing(false)
                // window.location.href = '/home'
                return

            } else {
                setServerErrorOccurred(true)
            }

            setIsProcessing(false)

            return

        } catch (error) {

            if (error.response.status === 401) {
                setInvalidCredentials(true)
            }

            else if (error.response.status === 500) {
                setServerErrorOccurred(true)
            }

            setIsProcessing(false)
            return
        }
    }

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validate: async (data) => {
            let errors = {};

            if (!data.email) {
                errors.email = 'Email is required.';
            }

            else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email)) {
                errors.email = 'Invalid email address. e.g. example@email.com';
            }

            if (!data.password) {
                errors.password = 'Password is required.';
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
                            Log in to your account.
                        </h1>
                    </div>

                    <div>
                        <p className="auth-description">
                            Enter the login credentials to your account below for access.
                        </p>
                    </div>

                    <div className="col-content content">

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

                        <Button className="auth-button" label="Login" onClick={() => handleSubmit(formik)} disabled={isProcessing} />
                        <Button className="auth-button" label="Show Session" onClick={() => showSession()} />
                        {
                            serverErrorOccurred ? 
                            <small className="p-error" style={{ display: "block" }} >A server error occurred while trying to log in. Please try again.</small> 
                            : <></>
                        }
                        {
                            invalidInputs ? 
                            <small className="p-error" style={{ display: "block" }} >Please enter valid login credentials above.</small> 
                            : <></>
                        }
                        {
                            invalidCredentials ? 
                            <small className="p-error" style={{ display: "block" }} >Email or password is incorrect. Please try again.</small> 
                            : <></>
                        }

                    </div>

                </div>

                <a className="auth-hyperlink" href='/forgot-password' style={{ marginTop: "10px", marginBottom: "15px" }}>Forgot Password?</a>
                <a className="auth-hyperlink" href='/register'>Don't have an account? Sign Up.</a>

            </div>
            
        </div>
    )
}


export default Login;