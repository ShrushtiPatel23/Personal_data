import React, { useContext, useState } from 'react';
import userContext from '../context/users/userContext';


export const Login = () => {
  const context = useContext(userContext);
  const { loginUser } = context;

  const [admin, setAdmin] = useState({ email: "", password: "" })

  const onSubmit = async (e) => {
    const {email,password} = admin;
    e.preventDefault();
    loginUser(email,password);
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
            <input type="email" className="form-control" id="email" name="email" value={admin.email} onChange={onChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" name="password" id="password" value={admin.password} onChange={onChange} />
          </div>
          <button type="submit" className="btn btn-primary">Login</button>
        </form>
      </div>
    </div>
  )
}

