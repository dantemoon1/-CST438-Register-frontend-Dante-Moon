import React, { Component } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Stack } from '@mui/material';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';

class AddStudentPage extends Component{
    constructor(props){
        super(props);
        this.state = {name: '', email: ''};
    }

    handleChangeName = (event) => { //handler for name field
        this.setState({name: event.target.value});
    }

    handleChangeEmail = (event) => { //handler for email field
        this.setState({email: event.target.value});
    }

    handleAdd = () => { //adds a student to the database
        //console.log(this.state.name);
        //console.log(this.state.email);
        
        const token = Cookies.get('XSRF-TOKEN'); //
        fetch(`http://localhost:8080/student/?email=${this.state.email}&name=${this.state.name}`, //post request to add a student
        {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'X-XSRF-TOKEN': token},

            //I did have to enable CORS in the backend springboot app for this to work
        }).then((response) => {
            console.log(response.json());
            if(response.status == 200){ //if response status is 200, then the student was added successfully
                toast.success("Student added successfully.", {
                    position: toast.POSITION.BOTTOM_LEFT
                });
            } else if(response.status == 400){ //if the response status is 400, then the student already exists
                toast.error("Student already exists.", {
                    position: toast.POSITION.BOTTOM_LEFT
                });
            } else { //otherwise, there was an error
                toast.error("Student could not be added.", {
                    position: toast.POSITION.BOTTOM_LEFT
                });
            }
        });
    }

    render(){ //renders the add student page
        return(
            <div style={{display:'flex',flexDirection:'column',justifyContent:'center',justifyItems:'center'}}>
                <h2>Add Student</h2>
                <ToastContainer autoClose={4500}/>
                <Stack spacing={2} sx={{marginLeft:'33%',marginRight:'33%'}}>
                <TextField autoFocus label="Name" onChange={this.handleChangeName} value={this.state.name} />
                <TextField label="Email" onChange={this.handleChangeEmail} value={this.state.email}  />
                <Button variant="contained" color="primary" onClick={this.handleAdd}>Add</Button>
                </Stack>
            </div>
        );
    }
}

export default AddStudentPage;