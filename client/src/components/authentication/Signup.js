import React from 'react'
import axios from 'axios';
import { useForm } from "react-hook-form";
import '../../assets/styles/signup.css'
import { Link } from 'react-router-dom';

const Signup = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();


  const onSubmit = async (info) => {
    try {
      let { data } = await axios.post('http://localhost:5000/api/authentication/signup', info)
    } catch (error) {
      console.error('Login', error)
    }
  };


  return (
    <div className='signup-wrapper'>
      <form onSubmit={handleSubmit(onSubmit)}>
      <span className='logo'>Create an Account</span>

        <input placeholder='Enter First Name' className='d-block my-1'  {...register("fname", { required: true })} />
        {errors.fname && <span className='d-block'>This field is required</span>}

        <input placeholder='Enter Last Name' className='d-block my-1'  {...register("lname", { required: true })} />
        {errors.lname && <span className='d-block'>This field is required</span>}

        <input placeholder='Enter Email' className='d-block my-1'  {...register("email", { required: true })} />
        {errors.email && <span className='d-block'>This field is required</span>}

        <input placeholder='Enter Password' className='d-block my-1'  {...register("password", { required: true })} />
        {errors.password && <span className='d-block'>This field is required</span>}


        <button type='submit' className='btn d-block btn-success'>Signup</button>

        <span className='links'>Already a member ? <Link to='/login'>Click here</Link></span>

      </form>
    </div>
  )
}

export default Signup