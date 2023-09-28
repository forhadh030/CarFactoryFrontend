import { Button } from '@mui/base';
import { Box, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { useState } from 'react'
import { SERVER_URL } from '../Constans';

const EditCar = ({data, updateCar}) => {

    const [open, setOpen] = useState();
    const [car, setCar] = useState({
        make: data.make,
        model: data.model,
        year: data.year,
        color: data.color,
        price: data.price,
        registrationNumber: data.registrationNumber
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
      

    const handleSave = async () => {
        await updateCar(car, SERVER_URL+'api/v1/cars/'+data.id)
        handleClickClose();
    }

    return (
        <div>
            <Box m={1} display='flex' justifyContent='center' alignItems='center' >
                <Button onClick={handleClickOpen} color="success">Edit Car</Button>
            </Box>
            <Dialog open={open} onClose={handleClickClose}>
                <DialogTitle>Edit Car</DialogTitle>
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

export default EditCar