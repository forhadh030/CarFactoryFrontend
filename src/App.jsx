import { AppBar, Toolbar, Typography } from '@mui/material'
import './App.css'
import CarList from './components/CarList'

function App() {

  return (
    <div className='App'>
      <AppBar position='static'>
        <Toolbar>
          <Typography align='center' variant='h1'>
            Car Show 🚧🏎️ 💨
          </Typography>
        </Toolbar>
      </AppBar>
      <CarList />
    </div>
  )
}

export default App
