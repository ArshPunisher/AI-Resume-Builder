import './App.css'
import { Route, Routes } from 'react-router-dom'
import Auth from './pages/Auth'
import Dashboard from './pages/Dashboard'
import Home from './pages/Home'
import Footer from './components/Custom/Footer'
import Edit from './pages/Edit'
import View from './pages/View'


function App() {

  return (
    <>
      <div>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/dashboard' element={<Dashboard/>} />
          <Route path='/dashboard/resume/:resumeId/edit' element={<Edit />} />
          <Route path='/resume/:resumeId/view' element={<View />} />
          <Route path='/auth/sign-in' element={<Auth/>} />
        </Routes>
        <Footer/>
      </div>
    </>
  )
}

export default App
