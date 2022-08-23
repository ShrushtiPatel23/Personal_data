import React from 'react'
import {Link} from 'react-router-dom'

export const Home = () => {
    return (
        <div className='container text-center my-5'>
            <h3>Hello User</h3>
            <div className="d-grid gap-2 col-4 mx-auto">
               <Link to="/create">
                    <button className="btn btn-primary btn-sm" type="button">Create an Account</button>
                </Link>
                <Link to="/login">
                <button className="btn btn-primary btn-sm" type="button">Login</button>
                </Link>
            </div>
        </div>
    )
}

