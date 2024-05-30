import React from 'react';
import '../assets/styles/parents.css'

const Parents = () => {
  
    return (<div className='parent-wrapper'>
        <div className='d-flex justify-content-between align-items-center header-nav'>
            <span className='header'>Parents</span>
            <div className='button-div'>
                <div>
                    <input />
                    <i className="ri-search-line"></i>
                </div>
                <button className=''>
                    <i className="ri-filter-line m-0"></i>
                </button>
                <button><i className="ri-add-line"></i>
                    <span> New </span>
                </button>
            </div>
        </div>

        <div className='student-container'>
            <table className="table">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">First</th>
                        <th scope="col">Last</th>
                        <th scope="col">Handle</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">1</th>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                    </tr>
                    <tr>
                        <th scope="row">2</th>
                        <td>Jacob</td>
                        <td>Thornton</td>
                        <td>@fat</td>
                    </tr>
                    <tr>
                        <th scope="row">3</th>
                        <td>Larry</td>
                        <td>the Bird</td>
                        <td>@twitter</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>)
}

export default Parents