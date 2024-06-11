import React, { useEffect, useState } from 'react'
import axios from "axios";
import '../../assets/styles/verify-school.css';
import { useForm } from 'react-hook-form';
import InputMask from 'react-input-mask';

const VerifySchool = () => {

    const { register, handleSubmit, formState: { errors }, setValue, reset, getValues } = useForm();
    const [token, setToken] = useState(null);
    const [tab, setTab] = useState(1);

    useEffect(() => {
        let params = new URLSearchParams(window.location.search);
        let paramValue = params.get('token')
        setToken(paramValue)
        getTokenInfo(paramValue)
    }, []);


    const getTokenInfo = async (token) => {
        try {
            if (!token) {
                alert('Invalid Link!');
                window.location.href = "/login";
            }
            let { data } = await axios.post('http://localhost:5000/api/authentication/verfiy-school', { token });
            reset({ ...data.admin, ...data.school })
            console.log(data)
        } catch (err) {

        }
    }

    const onSubmit = async (formData) => {
        try {
            if (tab === 1) formData['tab'] = 'school'
            if (tab === 2) formData['tab'] = 'admin'
            let { data } = await axios.post('http://localhost:5000/api/authentication/complete-school-signup', formData);
            if (tab === 3) {
                window.localStorage.setItem('token', data?.user?.token);
                window.localStorage.setItem('userId', data?.user?.userId);
                window.location.href = '/dashboard';
            }
            setTab(tab + 1);
        } catch (err) {
            console.log(err)
        }
    }

    const ButtonClicked = () => {
        let newTab = tab + 1;
        setTab(newTab)
    }


    return (
        <div className='verify-school-wrapper'>
            <div className='verify-school-container'>
                <span className='heading'>
                    Update {tab === 1 ? 'School' : 'Admin'} Info
                </span>

                <form onSubmit={handleSubmit(onSubmit)} >
                    {tab === 1 && <div className='row'>
                        <div className='col-6 input-group'>
                            <span className='label'>Name</span>
                            <input placeholder='Enter School Name'
                                {...register('name', {
                                    required: 'Name is required',
                                    pattern: {
                                        value: /^[A-Za-z]+$/,
                                        message: 'Name should not include numbers or special characters'
                                    }
                                })} />
                            {errors.name && <span className='error'>{errors.name.message}</span>}
                        </div>
                        <div className='col-6 input-group'>
                            <span className='label'>Address</span>
                            <input placeholder='Enter School Address'
                                {...register('address', {
                                    required: 'Address is required',
                                })} />
                            {errors.address && <span className='error'>{errors.address.message}</span>}
                        </div>

                        <div className='col-6 input-group'>
                            <span className='label'>Level</span>
                            <select className='d-block my-1'
                                {...register('level', {
                                    required: 'Level is required',
                                })}>
                                <option value="">Select Level</option>
                                <option value="primary">Primary</option>
                                <option value="secondary">Secondary</option>
                                <option value="higherSecondary">Higher Secondary</option>
                            </select>
                            {errors.level && <span className='error'>{errors.level.message}</span>}
                        </div>


                        <div className='col-6 input-group'>
                            <span className='label'>Mode of Education</span>
                            <select className='d-block my-1'
                                {...register('modeOfEducation', {
                                    required: 'Mode is required',
                                })}
                            >
                                <option value="">Mode of Education</option>
                                <option value="online">Online</option>
                                <option value="offline">Offline</option>
                                <option value="hybrid">Hybrid</option>
                            </select>
                            {errors.modeOfEducation && <span className='error'>{errors.modeOfEducation.message}</span>}
                        </div>
                    </div>}
                    {tab === 2 && <div className='row'>
                        <div className='col-6 input-group'>
                            <span className='label'>First Name</span>
                            <input placeholder='Enter First Name'
                                {...register('fname', {
                                    required: 'First Name is required',
                                    pattern: {
                                        value: /^[A-Za-z]+$/,
                                        message: 'Name should not include numbers or special characters'
                                    }
                                })} />
                            {errors.fname && <span className='error'>{errors.fname.message}</span>}
                        </div>
                        <div className='col-6 input-group'>
                            <span className='label'>Last Name</span>
                            <input placeholder='Enter Last Name'
                                {...register('lname', {
                                    required: 'Last Name is required',
                                    pattern: {
                                        value: /^[A-Za-z]+$/,
                                        message: 'Name should not include numbers or special characters'
                                    }
                                })} />
                            {errors.lname && <span className='error'>{errors.lname.message}</span>}
                        </div>
                        <div className='col-6 input-group'>
                            <span className='label'>Phone</span>
                            <InputMask
                                mask="999-999-9999"
                                maskChar=""
                                {...register('phone', {
                                    required: 'Phone number is required'
                                })}
                                onChange={(e) => setValue('phone', e.target.value)}
                            >
                                {(inputProps) => <input {...inputProps} type="tel" />}
                            </InputMask>
                            {errors.phone && <span className='error'>{errors.phone.message}</span>}
                        </div>
                        <div className='col-6 input-group'>
                            <span className='label'>Email</span>
                            <input placeholder='Enter School Email'
                                type="email"
                                {...register('email', {
                                    required: 'Email is required',
                                    pattern: {
                                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                        message: 'Invalid email address'
                                    }
                                })} />
                            {errors.email && <span className='error'>{errors.email.message}</span>}
                        </div>
                    </div>}

                    {tab === 3 && <div className='row'>
                        <div className='col-6 input-group'>
                            <span className='label'>Password</span>
                            <input placeholder='Enter Password'
                                type="password"
                                {...register('password', {
                                    required: 'Password is required',
                                    minLength: {
                                        value: 8,
                                        message: 'Password must be at least 8 characters'
                                    }
                                })} />
                            {errors.password && <span className='error'>{errors.password.message}</span>}
                        </div>
                        <div className='col-6 input-group'>
                            <span className='label'>Confirm Password</span>
                            <input placeholder='Confirm Password'
                                type="password"
                                {...register('confirmPassword', {
                                    required: 'Confirm Password is required',
                                    validate: value =>
                                        value === getValues('password') || 'Passwords do not match'
                                })} />
                            {errors.confirmPassword && <span className='error'>{errors.confirmPassword.message}</span>}
                        </div>
                    </div>}
                    <div className='col-12'>
                        <button type="submit" >
                            {tab === 3 ? 'Complete Signup' : 'Save Changes'}
                        </button>
                    </div>

                </form>
            </div>
        </div>)
}

export default VerifySchool;
