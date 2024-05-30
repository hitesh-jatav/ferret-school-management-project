import React, { useEffect, useState } from 'react'
import Axios from "../axios"

const Notice = () => {
    const [showFilters, setShowFilters] = useState(false)
    const [list, setList] = useState([])


    useEffect(() => {
        getNotices();
    }, [])

    const getNotices = async () => {
        try {
            let res = await Axios.get('/notice');
            console.log('res', res)
        } catch (error) {

        }
    }

    let adjectives = ['Nice', 'Green', 'Wonderful', 'Bad']
    let noun = ['Weather', 'People', 'Students', 'Discipline'];
    let des = ['i like you', 'nothing to tell', 'you are nice', 'something is between us', 'Pakistan is our Neighbour'];
    let conjuctions = ['or', 'of', 'and', 'but', 'yet'];


    const addNotice = async () => {
        try {
            let random1 = Math.floor(Math.random() * (3 - 0 + 0)) + 1
            let random2 = Math.floor(Math.random() * (4 - 0 + 0)) + 1
            let obj = {
                title: `${adjectives[random1]} ${noun[random1]}`,
                description: `${des[random2]} ${conjuctions[random2]} ${des[random1]}`,
                publishedOn: new Date(),
                type: 'general'
            }

            let res = await Axios.post('/notice', obj)

            console.log(obj)
        } catch (error) {
            console.log('addNotice', error)
        }
    }


    return (
        <div className='mt-2 col-md-10 col-lg-10 col-sm-9'>
            {/* options row */}
            <div className='d-flex justify-content-between align-items-center'>
                <strong className='d-block'>Notice</strong>
                <div>
                    <button className='btn btn-secondary' onClick={(e) => setShowFilters(!showFilters)}>
                        <i className='uil uil-filter mx-1'></i>
                        Filters</button>
                    <button className='btn btn-secondary mx-1'> <i className='uil uil-file-download mx-1'></i>Download</button>
                    <button onClick={(e) => addNotice()} className='btn btn-secondary mx-1'> <i className='uil uil-plus mx-1' ></i>Notice</button>
                </div>
            </div>

            {/* FILTERS */}
            {showFilters && <div className='my-2 p-2 border'>

                <button className='btn d-block btn-secondary'>Clear  <i className='uil uil-redo'></i></button>

                <div className="row">
                    <div className="col-3 my-1">
                        <input type="text" className="form-control" id='fname' placeholder="Title" />
                    </div>

                    <div className="col-3 my-1">
                        <input type="text" className="form-control" id='fname' placeholder="Content" />
                    </div>

                    <div className="col-3 my-1">
                        <input type="text" className="form-control" id='fname' placeholder="Date Posted" />
                    </div>

                    <div className="col-3 my-1">
                        <select className='form-control'>
                            <option>Status</option>
                            <option>Active</option>
                            <option>Inactive</option>
                        </select>
                    </div>


                </div>

            </div>}

            {/* table */}
            <table className='table'>
                <thead>
                    <tr>
                        <th scope='col'>Title</th>
                        <th scope='col'>Description</th>
                        <th scope='col'>Date Published</th>
                        <th scope='col'>Status</th>
                        <th scope='col'>Action</th>
                    </tr>
                </thead>

                {
                    list?.length > 0 ?
                        <tbody>
                            {list.map((notice, idx) => <tr id={idx}>
                                <td>{notice?.title}</td>
                                <td>{notice?.desc}</td>
                                <td>{notice?.publishedDate}</td>
                                <td>{notice?.status}</td>
                                <td>--<i className='uil uil-ellipsis-v'></i></td>
                            </tr>)
                            }
                        </tbody> : <tbody className='border h-100 align-items-center'>No data</tbody>
                }
            </table>





            {/* MODAL FOR ADDING NEW NOTICE */}
            <div className=''>

            </div>


        </div>
    )
}

export default Notice