import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Navbar from './component/Navbar/Navbar'
export default function App(){
  return(<>
  <BrowserRouter>
  <Routes>
    <Route path='/' element={<Navbar/>}/>
  </Routes>
  </BrowserRouter>

  </>)
}