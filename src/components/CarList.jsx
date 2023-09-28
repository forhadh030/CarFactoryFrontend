import { useEffect, useState } from "react"
import { DataGrid } from "@mui/x-data-grid";
import { SERVER_URL } from "../Constans";
import { createTheme } from '@mui/material/styles';
import AddCar from "./AddCar";
import { Snackbar } from "@mui/material";
import EditCar from "./EditCar";

    const CarList = () => {

        const [cars, setCars] = useState([]);
        const [open, setOpen] = useState(false);

        useEffect(() => {
        
        fetchData();
    }, []);

    const theme = createTheme({
        palette: {
          success: {
            main: '#4CAF50', // Replace with your desired success color code
          },
          danger: {
            main: '#FF0000', // Replace with your desired danger color code
          },
        },
      });

    const updateCar = async (car, url) => {
        if(window.confirm("Are you sure you want to update 🔁 car?!")) {
            try {
                const response = await fetch(url, {method: 'PUT',
                headers: {'Content-Type' : 'application/json'},
                body: JSON.stringify(car)})
                if(!response.ok) {
                    throw new Error("Network Response Not OK.")
                }
                
                await fetchData();
                setOpen(true);
            } catch (e) {
                console.log(e.message);
            }
        }
    }

    // delete functionality
    const onDelClick = async (url) => {
        if(window.confirm("Are you sure you want to delete ❌ car?!")) {
            try {
                const response = await fetch(url, {method: 'DELETE'});
                if(!response.ok) {
                    throw new Error("Network Response Not OK.")
                }
                
                await fetchData();
                setOpen(true);
            } catch (e) {
                console.log(e.message);
            }
        }
    }

    async function fetchData() {
        try {
            const response = await fetch(`${SERVER_URL}api/v1/cars/all`);
            
            if(!response.ok) {
                throw new Error("Network Response Not Ok.")
            }

            const result = await response.json();
            console.log(result)
            setCars(result);
        } catch (e) {
            console.log(e);
        }
    }

    const columns = [
        { field : 'make', headerName : 'MAKE', width: 200},
        { field : 'model', headerName : 'MODEL', width: 200},
        { field : 'year', headerName : 'YEAR', width: 200},
        { field : 'color', headerName : 'COLOR', width: 200},
        { field : 'price', headerName : 'PRICE', width: 200},
        { field : 'registrationNumber', headerName : 'REGISTRATIONNUMBER', width: 200},
        { headerName : '',
            sortable: false,
            renderCell: (params) => (
            <button onClick={() => onDelClick(SERVER_URL+'api/v1/cars/'+ params.row.id)}>
                Delete
            </button>)
        },
        { field : 'edit',
            headerName : '',
            sortable: false,
            filterable: false,
            renderCell: (params) => (
                <EditCar data={params.row} updateCar={updateCar} />
            )    
        }
    ];

    const addCar = async(car) => {
        try {
            const response = await fetch(SERVER_URL + 'api/v1/cars/addCar', {method: 'POST',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify(car)})
            if(!response.ok) {
                throw new Error("Network Response Not OK.")
            }
            
            await fetchData();
            setOpen(true);
        } catch (e) {
            console.log(e.message);
        }
    }

    return (
        <div>
            <DataGrid rows={cars} columns={columns} getRowId={row => row.id} disableRowSelectionOnClick={true}>

            </DataGrid>
            <AddCar addCar={addCar} message="Car added" color='success' />
            <Snackbar open={open} autoHideDuration={2000} onClose={() => setOpen(false)} message="Car deleted" color='danger' />
        </div>
    )
}

export default CarList