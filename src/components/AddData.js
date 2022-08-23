import React, { useContext, useState } from 'react';
import userContext from '../context/users/userContext';


export const AddData = () => {
  const context = useContext(userContext);
  const { addData } = context;

  const [user, setUser] = useState({ name: "", address: "", number: "" })

  const onSubmit = async (e) => {

    const {name, address, number} = user;

    e.preventDefault();
    addData(name,address,number);

  }
  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }


  return (
    <div className='container'>
      <div>
        <form onSubmit={onSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input type="text" className="form-control" id="name" name="name" value={user.name} onChange={onChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="address" className="form-label">Address</label>
            <input type="text" className="form-control" name="address" id="address" value={user.address} onChange={onChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="number" className="form-label">Number</label>
            <input type="number" className="form-control" name="number" id="number" value={user.number} onChange={onChange} maxLength={15} required/>
          </div>
          <button type="submit" className="btn btn-success">Add Data</button>
        </form>
      </div>
    </div>
  )
}
