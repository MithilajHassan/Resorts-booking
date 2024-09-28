import './App.css'
import {BrowserRouter as Router , Routes,Route} from 'react-router-dom'
import HomePage from './pages/userSide/HomePage'
import UserSignup from './pages/userSide/Signup'
import UserSignin from './pages/userSide/Signin'
import NotFound from './pages/404'
// import OtpPage from './pages/userSide/Otp'

function App() {
  
  return (
    <Router>
        <Routes>

          <Route path='/' element={<HomePage/>} />
          <Route path='/signup' element={<UserSignup/>} />
          <Route path='/signin' element={<UserSignin/>} />


          <Route path='*' element={<NotFound/>} />
        </Routes>
    </Router>
  )
}

export default App
