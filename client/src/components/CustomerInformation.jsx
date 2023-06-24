import React from 'react';

import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { classNames } from 'primereact/utils';
import { Divider } from 'primereact/divider';

const CustomerInformation = ({ formik, isFormFieldValid, getFormErrorMessage, formData, setFormData, showMessage, setShowMessage }) => {
    const passwordHeader = <h6>Pick a password</h6>;
    const passwordFooter = (
        <React.Fragment>
            <Divider />
            <p className="mt-2">Requirements</p>
            <ul className="pl-2 ml-2 mt-0" style={{ lineHeight: '1.5' }}>
                <li>At least one lowercase</li>
                <li>At least one uppercase</li>
                <li>At least one numeric</li>
                <li>Minimum 8 characters</li>
            </ul>
        </React.Fragment>
    );

    return (
        <div className="flex justify-content-center" style={{ marginBottom: "15px" }}>
            <h3 style={{ marginBottom: "25px" }}>Create an Account</h3>
            <div className="card" >
                
                {/* <form onSubmit={formik.handleSubmit} className="p-fluid"> */}
                <div className="name-input" style={{ display: "flex", justifyContent: "center", marginTop: "15px" }}>
                    <div className="field">
                        <span className="p-float-label">
                            <InputText id="firstName" name="firstName" value={formik.values.firstName} onChange={formik.handleChange} onBlur={formik.handleBlur} 
                             className={classNames({ 'p-invalid': isFormFieldValid('firstName'), 'p-valid': !isFormFieldValid('firstName') })}
                             style={{ marginRight: "10px", width: "213px" }} />
                            <label htmlFor="firstName">First Name</label>
                        </span>
                        {getFormErrorMessage('firstName')}
                    </div>
                    <div className="field">
                        <span className="p-float-label">
                            <InputText id="lastName" name="lastName" value={formik.values.lastName} onChange={formik.handleChange} onBlur={formik.handleBlur} 
                             className={classNames({ 'p-invalid': isFormFieldValid('lastName'), 'p-valid': !isFormFieldValid('lastName') })}
                             style={{ width: "213px" }} />
                            <label htmlFor="lastName">Last Name</label>
                        </span>
                        {getFormErrorMessage('lastName')}
                    </div>
                </div>

                <div className="email-input" style={{ display: "flex", justifyContent: "center", marginTop: "15px" }}>
                    <div className="field">
                        <span className="p-float-label p-input-icon-right">
                        <i className="pi pi-envelope" />
                            <InputText id="email" name="email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur}
                             className={classNames({ 'p-invalid': isFormFieldValid('email'), 'p-valid': !isFormFieldValid('email') })} 
                             style={{ width: '436px', 
                                    //   boxShadow: isFormFieldValid('email') ? '0 0 0 1px blue' : '0 0 0 1px white', 
                                    //   border: isFormFieldValid('email') ? 'none' : '1px solid #ced4da'
                                    }} />
                            <label htmlFor="email">Email</label>
                        </span>
                        {/* <i className="pi pi-envelope" style={{ position: 'absolute', right: '0.5rem', top: '50%', transform: 'translateY(-50%)' }} /> */}
                        {getFormErrorMessage('email')}
                    </div>
                </div>

                <div className="password-input" style={{ display: "flex", justifyContent: "center", marginTop: "15px" }}>
                    <div className="field">
                        <span className="p-float-label">
                            <Password id="password" name="password" value={formik.values.password} toggleMask onChange={formik.handleChange} onBlur={formik.handleBlur}
                             className={classNames({ 'p-invalid': isFormFieldValid('password'), 'p-valid': !isFormFieldValid('password') })} 
                             header={passwordHeader} footer={passwordFooter} inputStyle={{ width: '436px' }} />
                            <label htmlFor="password">Password</label>
                        </span>
                        {getFormErrorMessage('password')}
                    </div>
                </div>

                <div className="confirm-password-input" style={{ display: "flex", justifyContent: "center", marginTop: "15px" }}>
                    <div className="field">
                        <span className="p-float-label">
                            <Password id="confirmPassword" name="confirmPassword" value={formik.values.confirmPassword} toggleMask onChange={formik.handleChange} onBlur={formik.handleBlur}
                             className={classNames({ 'p-invalid': isFormFieldValid('confirmPassword'), 'p-valid': !isFormFieldValid('confirmPassword') })} 
                             footer={false} feedback={false} inputStyle={{ width: '436px' }} />
                            <label htmlFor="confirmPassword">Confirm Password</label>
                        </span>
                        {getFormErrorMessage('confirmPassword')}
                    </div>
                </div>
                {/* </form> */}
                
                    {/* <div style={{ textAlign: "center" }}>
                        <Button className="register-button" type="submit" label="Submit" style={{ width: "150px", height: "35px" }}  />
                    </div> */}
            </div>
        </div>
    )
}

export default CustomerInformation;
