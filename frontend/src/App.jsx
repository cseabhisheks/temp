import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Dashboard from './pages/Dashboard/Dashboard' //dashboard page
export default function App(){
  return(<>
  <BrowserRouter>
  <Routes>
    <Route path='/' element={<Dashboard/>}/>
  </Routes>
  </BrowserRouter>

  </>)
}