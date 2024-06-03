import React, { useState, useEffect } from 'react'
import '../assets/styles/students.css';
import axios from "axios";
import Axios from '../axios.js'


const Students = () => {
    const [file, setFile] = useState(null);
    const [data, setData] = useState([]);
    const [students, setStudents] = useState([]);
    const [searchWord, setSearchWord] = useState('')
    const [isLoading, setIsLoading] = useState(false);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
        // setTimeout(() => {
        //     console.log('dddddd')
        handleSubmit(e.target.files[0])
        // }, 3000)
    };

    const handleSubmit = async (fl) => {
        if (!fl) return;

        let obj = {
            token: window.localStorage.getItem('token'),
            id: window.localStorage.getItem('userId')
        }
        const formData = new FormData();
        formData.append('file', fl);
        try {
            const response = await axios.post('http://localhost:5000/api/students/upload-file', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': JSON.stringify(obj)
                }
            });

            setData(response.data);
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

    const getStudents = async () => {
        try {
            setIsLoading(true)
            let { data } = await Axios.get('/students', {
                params: {
                    word: searchWord
                }
            })
            setStudents(data.students)
        } catch (Err) {
            console.error(Err)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        getStudents()
    }, [searchWord]);

    return (
        <div className='student-wrapper'>
            <div className='d-flex justify-content-between align-items-center header-nav'>
                <span className='header'>Students</span>
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
                    <input type="file" onChange={handleFileChange} />
                    <button><i className="ri-add-line"></i>
                        <span> New </span>
                    </button>
                </div>
            </div>

            <div className='student-container'>
                <table className="table">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">Gr.No</th>
                            <th scope="col">Class</th>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Phone</th>
                            <th scope="col">DOB</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            !isLoading && students.map((st) => <tr key={st._id}>
                                <th scope="row">{st.grNo}</th>
                                <td>{st?.class}</td>
                                <td>{st.fname} {st?.lname}</td>
                                <td>{st?.email}</td>
                                <td>{st?.phone}</td>
                                <td>{st?.dob || 'N/A'}</td>
                            </tr>)
                        }
                    </tbody>
                </table>

                {
                    isLoading ? <div className="three col">
                        <div className="loader" id="loader-4">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </div> : <div className='three col'>
                        {
                            !students.length && <div className='table-content'>
                                <p>
                                    No Data.
                                </p>
                            </div>
                        }
                    </div>
                }
            </div>
        </div>)
}

export default Students