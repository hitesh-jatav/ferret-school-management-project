import React from 'react';
import { useForm } from "react-hook-form";
import Axios from '../../axios.js';
import '../../assets/styles/login.css'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = () => {

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (info) => {
    try {
      let { data } = await Axios.post('/authentication/login', info)
      if (data.status === 200) {
        toast.success(data.message);
        window.localStorage.setItem('token', data?.user?.token);
        window.localStorage.setItem('userId', data?.user?.userId);
        window.location.href = '/dashboard';
      } else if (data.status === 203) {
        console.error('Error')
      }
    } catch (error) {
      console.error('Login', error)
    }
  };



  return (
    <div className='login-wrapper'>

      <form onSubmit={handleSubmit(onSubmit)}>
        <span className='logo'>Welcome Back</span>

        {/* register your input into the hook by invoking the "register" function */}
        <input className='d-block my-1'  {...register("email", { required: true })} />
        {errors.email && <span className='text-error d-block'>This field is required</span>}

        {/* include validation with required or other standard HTML validation rules */}
        <input className='d-block my-1' {...register("pass", { required: true })} type='password' />
        {/* errors will return when field validation fails  */}
        {errors.pass && <span className='text-error d-block'>This field is required</span>}

        <button type="submit" className='btn d-block btn-primary'>Login</button>

        <div className='links'>
          <span className='d-block'>Need Help? <Link to='/signup'>Click here</Link></span>
          <span className='d-block'>Not a member? <Link to='/signup'>Click here</Link></span>
        </div>
      </form >

    </div >
  )
}

export default Login