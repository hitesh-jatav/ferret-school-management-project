import React, { useEffect, useState } from 'react';
import Axios from "../../axios.js";
import '../../assets/styles/profile.css';
import { ConfirmBox } from "../common-components/Modal.js"

const Overview = () => {
    const [info, setInfo] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const userId = localStorage.getItem('userId');
    const [showConfirmBox, setShowConfirmBox] = useState(false)

    const getProfileOverview = async () => {
        try {
            let { data } = await Axios.get('/profile/overview/' + userId);
            setInfo(data.info);
        } catch (error) {
            console.error(error);
        }
    }

    const handleFileChange = (event) => {
        handleFileUpload(event.target.files[0])
    }

    const deleteProfilePic = async () => {
        setIsUploading(true)
        try {
            await Axios.delete('/profile/upload-pic/' + userId);
            setInfo({ ...info, profilePic: null })
        } catch (error) {
            console.error(error);
        }
        finally {
            setIsUploading(false)
        }
    }
    const handleFileUpload = async (file) => {
        try {
            setIsUploading(true)
            if (file) {
                const formData = new FormData();
                formData.append('file', file);
                formData.append('userId', userId);

                try {
                    let { data } = await Axios.post('/profile/upload-pic/' + userId, formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    });
                    setInfo({ ...info, profilePic: data.src })
                } catch (error) {
                    console.error(error);
                    alert('Failed to upload file');
                }
            }
        } catch (err) {
            console.error(err)
        } finally {
            setIsUploading(false)
        }
    }

    function capitalizeWords(str) {
        if (!str) return 'NA';
        return str.split(' ').map(word => {
            return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        }).join(' ');
    }

    useEffect(() => {
        getProfileOverview();
    }, []);

    return (
        <div className='row py-3 info-container'>
            <div className='profile-container col-md-4 col-log-4 col-sm-12'>
                <div className='pic-container'>
                    <div className='profile-pic'>
                        {
                            (info?.profilePic) ? <img src={info.profilePic} alt='profile-pic' /> : <>
                                <span className='logo-text'>{info?.fname[0].toUpperCase()}</span>
                                <span className='logo-text'>{info?.lname[0].toUpperCase()}</span>
                            </>
                        }
                        <input
                            type="file"
                            accept=".jpg,.jpeg,.png"
                            onChange={handleFileChange}
                            style={{ display: 'none' }}
                            id="fileInput"
                        />
                        <div className='buttons-section'>
                            <button disabled={isUploading} onClick={() => document.getElementById('fileInput').click()}>
                                {!isUploading ? <i className="ri-upload-line"></i> : <i className="ri-loader-line icon rotate-loading "></i>}
                            </button>

                            {(info?.profilePic && !isUploading) && <button disabled={isUploading} onClick={() => setShowConfirmBox(true)}>
                                <i className="ri-delete-bin-line"></i>
                            </button>}
                        </div>

                    </div>
                    <div className='d-flex justify-content-center my-2'>
                        <p className='bold'>{capitalizeWords(info?.role)}</p>
                    </div>
                </div>
            </div>

            <div className='col-md-8 col-lg-8 col-sm-12 row info-container '>
                <div className='info-line'>
                    <span>Personal</span>
                </div>
                <div className='col-3 value-container'>
                    <span>Name</span>
                    <input className='input' value={`${capitalizeWords(info?.fname)} ${capitalizeWords(info?.lname)}`} disabled={true} />
                </div>
                <div className='col-3 value-container'>
                    <span>Birthdate</span>
                    <input className='input' value={info?.dob || '-'} disabled={true} />
                </div>
                <div className='col-3 value-container'>
                    <span>Contact</span>
                    <input className='input' value={info?.phone} disabled={true} />
                </div>
                <div className='col-3 value-container'>
                    <span>Email Address</span>
                    <input className='input' value={info?.email} disabled={true} />
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
                    <input className='input' value={info?.otherInfo?.class} disabled={true} />
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
                    <input className='input' value={info?.otherInfo?.grNo} disabled={true} />
                </div>

                <div className='col-3 value-container'>
                    <span>Registration Date.</span>
                    <input className='input' value={'11/34/40'} disabled={true} />
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


            {
                showConfirmBox && <ConfirmBox
                    isOpen={showConfirmBox}
                    setIsOpen={setShowConfirmBox}
                    message={'Are you sure? you want to remove the picture.'}
                    confirmFnc={deleteProfilePic}
                />
            }
        </div>
    );
}

export default Overview;