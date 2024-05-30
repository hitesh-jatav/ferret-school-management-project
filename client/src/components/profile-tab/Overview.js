import React from 'react';
import '../../assets/styles/profile.css';

const Overview = () => {
    return (
        <div className='row py-3 info-container'>
            <div className='profile-container col-md-4 col-log-4 col-sm-12'>
                <div className='pic-container'>
                    <div className='profile-pic'>
                        <span className='logo-text'>H</span>
                        <span className='logo-text'>J</span>
                        <button>
                            <i className="ri-upload-line"></i>Upload
                        </button>
                    </div>
                    <h4 className='m-0'>Himanshu Jatav</h4>
                    <p className=''>Student</p>
                </div>
            </div>

            <div className='col-md-8 col-lg-8 col-sm-12 row info-container '>

                <div className='info-line'>
                    <span>Personal</span>
                </div>
                <div className='col-3 value-container'>
                    <span>Name</span>
                    <input className='input' value={'Himanshu Jatav'} disabled={true} />
                </div>
                <div className='col-3 value-container'>
                    <span>Birthdate</span>
                    <input className='input' value={'22/12/2001'} disabled={true} />
                </div>
                <div className='col-3 value-container'>
                    <span>Contact</span>
                    <input className='input' value={'923-233-2222'} disabled={true} />
                </div>
                <div className='col-3 value-container'>
                    <span>Email Address</span>
                    <input className='input' value={'abc@xyz.com'} disabled={true} />
                </div>
                <div className='col-3 value-container'>
                    <span>Address</span>
                    <input className='input' value={'124, street four, town NS'} disabled={true} />
                </div>
                <div className='col-3 value-container'>
                    <span>Pincode</span>
                    <input className='input' value={'343220'} disabled={true} />
                </div>
                <div className='col-3 value-container'>
                    <span>Emergency Contact</span>
                    <input className='input' value={'Suresh Raina (920-333-2222)'} disabled={true} />
                </div>


                <div className='info-line'>
                    <span>Academic</span>
                </div>
                <div className='col-3 value-container'>
                    <span>Class</span>
                    <input className='input' value={'9th-B'} disabled={true} />
                </div>

                <div className='col-3 value-container'>
                    <span>Roll No.</span>
                    <input className='input' value={'32'} disabled={true} />
                </div>

                <div className='col-3 value-container'>
                    <span>Class Teacher</span>
                    <input className='input' value={'Dayanand Sir'} disabled={true} />
                </div>

                <div className='col-3 value-container'>
                    <span>Registration No.</span>
                    <input className='input' value={'12349'} disabled={true} />
                </div>

                <div className='col-3 value-container'>
                    <span>Registration Date.</span>
                    <input className='input' value={'11/34/40'} disabled={true} />
                </div>

                <div className='col-3 value-container'>
                    <span>Registration No.</span>
                    <input className='input' value={'12349'} disabled={true} />
                </div>

                <div className='col-3 value-container'>
                    <span>Blood Group</span>
                    <input className='input' value={'0+ve'} disabled={true} />
                </div>

                <div className='col-3 value-container'>
                    <span>Status</span>
                    <input className='input' value={'Absent'} disabled={true} />
                </div>

            </div>

        </div>
    )
}

export default Overview