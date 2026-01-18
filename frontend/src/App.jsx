import { BrowserRouter, Routes, Route } from 'react-router-dom'
import PublicLayout from './layout/PublicLayout'
import Dashboard from './pages/Dashboard/Dashboard' //dashboard page
import Property from './pages/Property/Property' //home page
export default function App() {
  return (<>
    <BrowserRouter>
      <Routes>
        <Route element={<PublicLayout/>}>
          <Route path='/' element={<Dashboard />} />
          <Route path='/property' element={<Property />} />
        </Route>
      </Routes>
    </BrowserRouter>

  </>)
}