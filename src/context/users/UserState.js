import React, { useState } from "react";
import { useNavigate} from "react-router-dom";
import UserContext from "./userContext";


const UserState = (props) => {
    const host = "http://localhost:5000"

    const [admin, setAdmin] = useState("");

    const initialData = []
    const [data, setData] = useState(initialData);
    const [databyId, setDataById] = useState({});
    const [display, setDisplay] = useState(true);
    const [token, setToken] = useState(false);

    let navigate = useNavigate();
   
    
    
    const [alert, setAlert] = useState(null);
    const showAlert = (message, type) => {
        setAlert({
            msg: message,
            type: type
        })
        setTimeout(() => {
            setAlert(null);
        }, 1500);
    }




    //Create User
    const createUser = async (email, password) => {
        const response = await fetch(`${host}/auth/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });
        const json = await response.json()
        console.log(json);

        if (json.message) {
            showAlert(json.message, "danger")
        }
        else {
            setAdmin(admin.concat(json));
            showAlert("Account Create Succesfully", "success");
            navigate("/login", { replace: true });
        }
    }

    //login User
    const loginUser = async (email, password) => {
        const response = await fetch(`${host}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });
        const json = await response.json()
        console.log(json);

        if (json.success) {
            localStorage.setItem('token', json.authtoken);
            console.log(json.authtoken);
            navigate("/userdata");
            //Show Alert
            showAlert("Login Account Succesfully", "success");
            
        }
        else {
            //Show Alert
            showAlert(json.message, "danger");
        }
    }

    //logout User
    const logoutUser = async () => {
        setToken(localStorage.removeItem("token"));
        console.log(token, "removed token");
      
    }


    //Get All Notes
    const getUserdata = async () => {
        const response = await fetch(`${host}/users/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
            },

        });

        if(localStorage.getItem('token') === null){
            navigate("/");
            showAlert("Please Login Account", "danger");
        }


        const json = await response.json();
        console.log(json);
        setData(json.data);
        setDisplay(true);
        

        if (json.data.length === 0) {
            setDisplay(false)
        }

    }


    //Add UserData
    const addData = async (name, address, number) => {
        const response = await fetch(`${host}/users/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ name, address, number })
        });
        const json = await response.json()

        if (json.message) {
            showAlert(json.message, "danger");
        }

        if (!name || !address || !number) {
            showAlert("Please Field all details", "danger");
        }
        else {

            setData(data.concat(json));
            console.log(data.concat(json));

            navigate("/userData");
            //Show Alert
            showAlert("Add Data Succesfully", "success");
        }
    }
  
    //view UserData
    const viewData = async (id) => {
        const response = await fetch(`${host}/users/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
            },
           
        });
        const json = await response.json();
        console.log(json.data);
        console.log(id);
        setDataById(json.data);
        //Show Alert
        showAlert("Show User Details Done", "success");
    }

    //Add editData
    const editData = async (id, name, address, number) => {
        const response = await fetch(`${host}/users/${id}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ name, address, number })
          });
          console.log(id);
          const json = await response.json();
          console.log(json);
    
          if (json.error) {
            showAlert(json.error, "danger");
          }
          else {
            setDataById( name, address, number);
          console.log( name, address, number);
    
            navigate("/userData");
            //Show Alert
            showAlert(json.message, "success");
          }
        
    }

    //delete userData
    const deleteData = async (id) => {
        const response = await fetch(`${host}/users/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
            },
        });
        const json = await response.json();
        console.log(json);

        const newData = data.filter((data) => { return data.id !== id })
        setData(newData);
        showAlert("Deleted Data SuccessFully", "success")
        console.log("Deleting id" + id)
    }



    return (
        <UserContext.Provider value={{ alert, createUser, loginUser, logoutUser, data, display, getUserdata, addData, databyId, viewData, editData, deleteData }}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserState;