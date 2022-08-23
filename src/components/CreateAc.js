import React, { useContext, useState } from 'react';
import userContext from '../context/users/userContext';

export const CreateAc = () => {
  const context = useContext(userContext);
  const { createUser } = context;
 


  const [admin, setAdmin] = useState({ email: "", password: "" })

  const onSubmit =  async (e) => {
    e.preventDefault();
    const { email, password } = admin;
    createUser(email,password);
    setAdmin({email: "", password: ""});
    console.log(email,password);
   
  }
  const onChange = (e) => {
    setAdmin({ ...admin, [e.target.name]: e.target.value })
  }

  return (
    <div>
      <div>
        <form onSubmit={onSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input type="email" className="form-control" id="email" name="email" onChange={onChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" name="password" id="password" onChange={onChange} />
          </div>
          <button type="submit" className="btn btn-primary">Sign In</button>
        </form>
      </div>
    </div>
  )
}
