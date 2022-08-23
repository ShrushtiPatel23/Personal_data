
import { useParams, Link } from 'react-router-dom';
import React, { useContext, useEffect } from 'react';
import userContext from '../context/users/userContext';


export const ViewData = () => {
  const { id } = useParams();

  const context = useContext(userContext);
  const { databyId, viewData } = context;


    useEffect(() => {
      viewData(id);
    },[id]);

    
    return (
      <div className='d-flex justify-content-center my-5'>
        <div className="card my-3">
        <div className="card-body">
          <p className="container card-title">Name: {databyId.name}</p>
          <p className="container card-text">Address: {databyId.address}</p>
          <p className="container card-text">Number: {databyId.number}</p>
          <div className='d-flex justify-content-between'>
          <Link to="/userdata">
            <button className='btn btn-success btn-sm'>Back</button>
          </Link>
          <Link to={`/editdata/${id}`}>
            <button className='btn btn-success btn-sm'>Edit</button>
          </Link>
          </div>
        </div>
        </div>
      </div>
    )
  }
