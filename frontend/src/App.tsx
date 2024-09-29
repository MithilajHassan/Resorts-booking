import './App.css'
import {BrowserRouter as Router , Routes,Route} from 'react-router-dom'
import HomePage from './pages/userSide/HomePage'
import UserSignup from './pages/userSide/Signup'
import UserSignin from './pages/userSide/Signin'
import NotFound from './pages/404'
import ResortSignup from './pages/resortSide/SignupPage'
import ResortSignin from './pages/resortSide/ResortSignin'

function App() {
  
  return (
    <Router>
        <Routes>
                    {/* User-side */}
          <Route path='/' element={<HomePage/>} />
          <Route path='/signup' element={<UserSignup/>} />
          <Route path='/signin' element={<UserSignin/>} />


                    {/* Resort-side */}
          <Route path='/resort/signup' element={<ResortSignup/>} />
          <Route path='/resort/signin' element={<ResortSignin/>} />

                    {/* Admin-side */}


          <Route path='*' element={<NotFound/>} />
        </Routes>
    </Router>
  )
}

export default App
