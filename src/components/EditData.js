import React, { useContext, useState, useEffect, } from 'react';
import userContext from '../context/users/userContext';
import { useParams } from 'react-router-dom'

export const EditData = () => {
  const context = useContext(userContext);
  const { editData } = context;
  
  const {id} = useParams();
  
  const [data, setData] = useState({ id: id, name: "", address: "", number: "" })
  console.log(data);
  


  const loadData = async() => {
    const response = await fetch(`http://localhost:5000/users/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
            },
           
        });
        const json = await response.json();
        console.log(json.data);
        setData(json.data);
  
  }

  useEffect( () => {
    loadData();
  },[id]);

    


const onSubmit = async (e) => {
  const {name, address, number} = data;
  e.preventDefault();
  if (!name || !address || !number) {
      alert("Please Input Field Properly")
  }
  else {    
  editData(id, name, address, number );   
  }
}
const onChange = (e) => {   
  setData({ ...data, [e.target.name]: e.target.value })
} 

  return (
    <div className='container'>
        <form onSubmit={onSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input type="text" className="form-control" id="name" name="name" value={data.name} onChange={onChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="address" className="form-label">Address</label>
            <input type="text" className="form-control" name="address" id="address" value={data.address} onChange={onChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="number" className="form-label">Number</label>
            <input type="number" className="form-control" name="number" id="number" value={data.number} onChange={onChange} />
          </div>
          <button type="submit" className="btn btn-success">Update Data</button>
        </form>
      </div>
  )
}
