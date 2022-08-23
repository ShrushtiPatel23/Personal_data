import React, { useContext} from 'react';
import userContext from '../context/users/userContext';

export const Alert = () => {
    const context = useContext(userContext);
  const { alert } = context;

    const capitalize = (word) => {
        if (word === "danger"){
            word = "error"
        }
        const lower = word.toLowerCase();
        return lower.charAt(0).toUpperCase() + lower.slice(1);
    }
    return (
        <div style = {{height: '30px'}}>
            {alert && <div className={`alert alert-${alert.type} alert-dismissible fade show`} role="alert">
                <strong>{capitalize(alert.type)}</strong> : {alert.msg}
                </div>}
        </div>
        
    )
}

