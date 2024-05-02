import { useState } from 'react'

import './App.css'
import Pokedex from './Components/Pokedex/Pokedex'
import CustomRoutes from './routes/CustomRoutes'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
     
     <CustomRoutes/>
    
    </div>
  )
}

export default App;
