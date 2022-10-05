import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';
import {SERVER_URL} from '../constants.js'

class AddStudent extends Component{
    constructor(props){
        super(props);
        this.state = {open: false, name: '', email: ''}; //open is for the popup, name and email are for the text fields
    };

    handleClickOpen = () => { //opens the popup
        this.setState({open:true});
    };

    handleClose = () => { //closes the popup
        this.setState({open:false});
    };

    handleChangeName = (event) => { //handler for name field
        this.setState({name: event.target.value});
    };

    handleChangeEmail = (event) => { //handler for email field
        this.setState({email: event.target.value});
    };

    handleAdd = () => {
        //console.log(this.state.name);
        //console.log(this.state.email);
        
        const token = Cookies.get('XSRF-TOKEN');
        fetch(`http://localhost:8080/student/?email=${this.state.email}&name=${this.state.name}`, //post request to add a student
        {
            method: 'POST',
            headers: {'X-XSRF-TOKEN': token, 'Content-Type': 'application/json'},
            //I did have to enable CORS in the backend springboot app for this to work
        }).then((response) => {
            console.log(response.json());
            if(response.status == 200){ //if the response is 200, then the student was added successfully
                toast.success("Student added successfully.", {
                    position: toast.POSITION.BOTTOM_LEFT
                });
            } else if(response.status == 400){ //if the response is 400, then the student already exists
                toast.error("Student already exists.", {
                    position: toast.POSITION.BOTTOM_LEFT
                });
            } else { //otherwise, there was an error
                toast.error("Student could not be added.", { 
                    position: toast.POSITION.BOTTOM_LEFT
                });
            }
        })
        

        
        this.handleClose();
    };

    render(){
        return(
            <div>
                <Button variant="outlined" color="primary" style={{margin: 10}} onClick={this.handleClickOpen}>
                    Add Student (popup)
                </Button>
                <Dialog open={this.state.open} onClose={this.handleClose}>
                    <DialogTitle>Add Student</DialogTitle>
                    <DialogContent style={{paddingTop: 20}}>
                        <TextField autoFocus fullWidth label="Name" name="name" onChange={this.handleChangeName} />
                        <TextField fullWidth label="Email" name="email" onChange={this.handleChangeEmail} sx={{mt:"10px"}}/>
                    </DialogContent>
                    <DialogActions>
                        <Button color="secondary" onClick={this.handleClose}>Cancel</Button>
                        <Button id="Add" color="primary" onClick={this.handleAdd}>Add</Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

//AddStudent.propTypes = { //use this if declaring the function elsewhere and passing it as a prop
//    addStudent: PropTypes.func.isRequired
//}

export default AddStudent;