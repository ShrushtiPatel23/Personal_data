import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useContext } from 'react';
import userContext from '../context/users/userContext';



export const UserData = (props) => {
  const context = useContext(userContext);
  const { data, display, logoutUser, getUserdata, deleteData } = context;

  let navigate = useNavigate();

  useEffect(() => {
    getUserdata()
  }, [])

  const handleLogout = () => {
    logoutUser();
    navigate("/");
  }


  return (
    <div>
      
      <div className='d-flex justify-content-between my-5'>
        <Link to="/adddata">
          <button className="btn btn-primary">Add Data</button>
        </Link>


        <button className="btn btn-primary" onClick={handleLogout}>LogOut</button>

      </div>
      <div className="row my-3">
        <h2>Your Data</h2>
        {display ?

          <div className='container my-3'>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Name</th>
                  <th>Address</th>
                  <th>Number</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {data.map((data, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{data.name}</td>
                    <td>{data.address}</td>
                    <td>{data.number}</td>
                    <td>
                      <Link to={`/viewdata/${data.id}`} >
                        <button className='btn btn-success btn-sm mx-2'>View</button>
                      </Link>
                      <Link to={`/editdata/${data.id}`} >
                        <button className='btn btn-primary btn-sm mx-2'>Edit</button>
                      </Link>
                      <button className='btn btn-danger btn-sm mx-2' onClick={() => {deleteData(data.id)}}>Delete</button>

                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

          </div>
          :
          <div className="container mx-2">
            {data.length === 0 && 'No data to display'}
          </div>}

      </div>
    </div>
  )
}
