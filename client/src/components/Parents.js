import React, { useState, useEffect } from 'react';
import '../assets/styles/parents.css'
import { ModalComponent } from '../components/common-components/Modal.js';
import { useForm } from 'react-hook-form';
import InputMask from 'react-input-mask';
import Axios from '../axios.js';
import { toast } from 'react-toastify';

const Parents = () => {
    const [parents, setParents] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [searchWord, setSearchWord] = useState('')
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = async (formData) => {
        try {
            setIsSubmitting(true)
            let { data } = await Axios.post('/parents', formData);
            toast.success(data.message);
            setParents([...parents, data.parent])
            setIsModalOpen(false);
        } catch (error) {
            if (error.response && error.response.status === 409) {
                toast.error(error.response.data.message);
            } else {
                console.log(error)
            }
        } finally {
            setIsSubmitting(false)
        }
    };

    const getParents = async () => {
        setIsLoading(true)
        try {
            let { data } = await Axios.get('/parents', {
                params: {
                    word: searchWord
                }
            });
            setParents(data.parents)
        } catch (err) {
            console.log(err)
        } finally {
            setIsLoading(false)
        }
    }



    useEffect(() => {
        getParents()
    }, [searchWord])

    const relations = [
        { name: 'Father', value: 'father' },
        { name: 'Mother', value: 'mother' },
        { name: 'Brother', value: 'brother' },
        { name: 'Sister', value: 'sister' },
    ]


    return (
        <div className='parent-wrapper'>
            <div className='d-flex justify-content-between align-items-center header-nav'>
                <span className='header'>Teachers</span>
                <div className='button-div'>
                    <div>
                        <input
                            placeholder='Search'
                            value={searchWord} onChange={(e) => setSearchWord(e.target.value)} />
                        <i className="ri-search-line"></i>
                    </div>
                    <button className=''>
                        <i className="ri-filter-line m-0"></i>
                    </button>
                    <button onClick={() => setIsModalOpen(true)}>
                        <i className="ri-add-line"></i>
                        <span> New </span>
                    </button>
                </div>
            </div>

            <div className='student-container'>
                <table className="table">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Phone</th>
                            <th scope="col">Relation</th>
                        </tr>
                    </thead>
                    <tbody>
                        {parents.map((tc, id) => (<tr key={tc._id}>
                            <td>{tc.fname} {tc.lname}</td>
                            <td>{tc.email}</td>
                            <td>{tc.phone}</td>
                            <td>{tc.parent}</td>
                        </tr>))
                        }

                    </tbody>
                </table>
            </div>

            {
                isLoading ? <div className="three col">
                    <div className="loader" id="loader-4">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div> : <div className='three col'>
                    {
                        !parents.length && <div className='table-content'>
                            <p>
                                No Data.
                            </p>
                        </div>
                    }
                </div>
            }

            {isModalOpen && <ModalComponent
                isOpen={isModalOpen}
                setIsOpen={setIsModalOpen}
                heading="Add Parent"
            >
                <form onSubmit={handleSubmit(onSubmit)} className='form-wrapper'>
                    <div className='row'>
                        <div className='col-lg-6 col-md-6 col-sm-12 input-wrapper'>
                            <label>First Name</label>
                            <input
                                type="text"
                                {...register('fname', {
                                    required: 'First name is required',
                                    pattern: {
                                        value: /^[A-Za-z]+$/,
                                        message: 'First name should not include numbers or special characters'
                                    }
                                })}
                            />
                            {errors.fname && <p>{errors.fname.message}</p>}
                        </div>

                        <div className='col-lg-6 col-md-6 col-sm-12 input-wrapper'>
                            <label>Last Name</label>
                            <input
                                type="text"
                                {...register('lname', {
                                    required: 'Last name is required',
                                    pattern: {
                                        value: /^[A-Za-z]+$/,
                                        message: 'Last name should not include numbers or special characters'
                                    }
                                })}
                            />
                            {errors.lname && <p>{errors.lname.message}</p>}
                        </div>

                        <div className='col-lg-6 col-md-6 col-sm-12 input-wrapper'>
                            <label>Email</label>
                            <input
                                type="email"
                                {...register('email', {
                                    required: 'Email is required',
                                    pattern: {
                                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                        message: 'Invalid email address'
                                    }
                                })}
                            />
                            {errors.email && <p>{errors.email.message}</p>}
                        </div>

                        <div className='col-lg-6 col-md-6 col-sm-12 input-wrapper'>
                            <label>Phone Number</label>
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
                            {errors.phone && <p>{errors.phone.message}</p>}
                        </div>

                        <div className='col-lg-6 col-md-6 col-sm-12 input-wrapper'>
                            <label>Relation</label>
                            <select
                                {...register('parent', {
                                    required: 'Relation is required',
                                })}
                            >
                                {
                                    relations.map((rel) => <option key={rel.value} value={rel.value}>{rel.name}</option>)
                                }
                            </select>
                            {errors.lname && <p>{errors.lname.message}</p>}
                        </div>

                    </div>

                    <div className='footer'>
                        <button type="button" disabled={isSubmitting} className='cancel-btn' onClick={() => setIsModalOpen(false)}>Cancel</button>
                        <button type="submit" disabled={isSubmitting} className='submit-btn'>Submit
                            {isSubmitting && <i className="ri-restart-line mx-2 reload-icon"></i>}
                        </button>
                    </div>
                </form>
            </ModalComponent>}
        </div>)
}

export default Parents