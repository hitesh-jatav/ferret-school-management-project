import React, { useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import '../../assets/styles/signup.css';
import { Link } from 'react-router-dom';
import InputMask from 'react-input-mask';


const SchoolSignup = () => {
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();
    const [isLoading, setIsLoading] = useState(false)

    const onSubmit = async (info) => {
        setIsLoading(true)
        try {
            info['phone'] = info.phone.replaceAll("-", '');
            let { data } = await axios.post('http://localhost:5000/api/authentication/school-signup', info);
        } catch (error) {
            console.error('Signup error', error);
        } finally {
            setIsLoading(false)
        }
    };

    return (
        <div className='signup-wrapper'>
            <form onSubmit={handleSubmit(onSubmit)}>
                <span className='logo'>Register Your School</span>

                <input placeholder='Enter School Name' className='d-block my-1' {...register('name', { required: true })} />
                {errors.name && <span className='error d-block'>This field is required</span>}

                <input placeholder='Enter Address' className='d-block my-1' {...register('address', { required: true })} />
                {errors.address && <span className='error d-block'>This field is required</span>}

                <input placeholder='Enter Email' className='d-block my-1'
                    {...register('email', {
                        required: 'Email is required',
                        pattern: {
                            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                            message: 'Invalid email address'
                        }
                    })} />
                {errors.email && <span className='error d-block'>This field is required</span>}

                <InputMask
                    mask="999-999-9999"
                    maskChar=""
                    {...register('phone', {
                        required: 'Phone number is required',
                        pattern: {
                            value: /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/,
                            message: 'Phone number must be in the format 000-000-0000'
                        }
                    })}
                    onChange={(e) => setValue('phone', e.target.value)}
                >
                    {(inputProps) => <input {...inputProps} type="tel" />}
                </InputMask>
                {errors.phone && <span className='error d-block'>This field is required</span>}

                <select className='d-block my-1' {...register('level', { required: true })}>
                    <option value="">Select Level</option>
                    <option value="primary">Primary</option>
                    <option value="secondary">Secondary</option>
                    <option value="higherSecondary">Higher Secondary</option>
                </select>
                {errors.level && <span className='error d-block'>This field is required</span>}

                <button type='submit' className='btn d-block btn-success' disabled={isLoading}>Signup
                    {isLoading && <i className="ri-restart-line mx-2 reload-icon"></i>}

                </button>

                <span className='links'>Already registered? <Link to='/login'>Click here</Link></span>
            </form>
        </div>
    );
};

export default SchoolSignup;
