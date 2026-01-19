import { BrowserRouter, Routes, Route } from 'react-router-dom'
import PublicLayout from './layout/PublicLayout'
import Dashboard from './pages/Dashboard/Dashboard' //dashboard page
import Property from './pages/Property/Property' //home page
import Room from './pages/room/Room'
import Tenant from './pages/Tenants/Tenant'
export default function App() {
  return (<>
    <BrowserRouter>
      <Routes>
        <Route element={<PublicLayout/>}>
          <Route path='/' element={<Dashboard />} />
          <Route path='/property' element={<Property />} />
              <Route path='/rooms' element={<Room />} />
               <Route path='/tenants' element={<Tenant/>} />
        </Route>
      </Routes>
    </BrowserRouter>

  </>)
}