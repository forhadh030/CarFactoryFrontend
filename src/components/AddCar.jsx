import { Button } from '@mui/base';
import { Box, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { useState } from 'react'

const AddCar = (props) => {

    const [open, setOpen] = useState();
    const [car, setCar] = useState({
        make: '',
        model: '',
        year: '',
        color: '',
        price: '',
        registrationNumber: ''
    });

    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleClickClose = () => {
        setOpen(false);
    }

    const handleChange = (event) => {
        setCar({
          ...car,
          [event.target.name]: event.target.value,
        });
      };
      

    const handleSave = () => {
        props.addCar(car);
        handleClickClose();
    }

    return (
        <div>
            <Box m={1} display='flex' justifyContent='center' alignItems='center' >
                <Button onClick={handleClickOpen} color="success">New Car</Button>
            </Box>
            <Dialog open={open} onClose={handleClickClose}>
                <DialogTitle>New Car</DialogTitle>
                <DialogContent>
                    <input placeholder='Make' type="text" name="make" value={car.make} onChange={handleChange}/> <br/>
                    <input placeholder='Model' type="text" name="model" value={car.model} onChange={handleChange}/> <br/>
                    <input placeholder='Year' type="text" name="year" value={car.year} onChange={handleChange}/> <br/>
                    <input placeholder='Color' type="text" name="color" value={car.color} onChange={handleChange}/> <br/>
                    <input placeholder='Price' type="text" name="price" value={car.price} onChange={handleChange}/> <br/>
                    <input placeholder='RegistrationNumber' name="registrationNumber" type="text" value={car.registrationNumber} onChange={handleChange}/>
                    <DialogActions>
                        <Button onClick={handleSave}>Save</Button>
                        <Button onClick={handleClickClose}>Cancel</Button>
                    </DialogActions>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default AddCar