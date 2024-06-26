import React from 'react'

const Books = () => {
    return (<div className='books-container'>
        <div className='tab-header-nav'>
            <div className='input-div'>
                <input placeholder='Search' />
                <i className="ri-search-line"></i>
            </div>
            <div className='button-div'>
                <button><i className="ri-filter-line"></i> Filter </button>
                <button> <i className="ri-add-fill"></i> New </button>
            </div>
        </div>
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
    )
}

export default Books