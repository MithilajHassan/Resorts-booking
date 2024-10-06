import './App.css'
import {BrowserRouter as Router , Routes,Route} from 'react-router-dom'
import HomePage from './pages/userSide/HomePage'
import UserSignup from './pages/userSide/Signup'
import UserSignin from './pages/userSide/Signin'
import NotFound from './pages/404'
import ResortSignup from './pages/resortSide/SignupPage'
import ResortSignin from './pages/resortSide/ResortSignin'
import AddResortDetails from './pages/resortSide/AddResortDetailsPage'
import AdminSigninPage from './pages/adminSide/AdminSignin'
import AdminDashboard from './pages/adminSide/AdminDashboard'
import AdminCategory from './pages/adminSide/AdminCategory'
import AdminPrivateRoute from './components/admin/AdminPrivateRoutes'
import AdminFacility from './pages/adminSide/AdminFacility'

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
          <Route path='/resort/addresortdetails' element={<AddResortDetails/>} />

                    {/* Admin-side */}
          <Route path='/admin/signin' element={<AdminSigninPage/>} />

          <Route path='' element={<AdminPrivateRoute/>} >
            <Route path='/admin/dashboard' element={<AdminDashboard/>} />
            <Route path='/admin/categories' element={<AdminCategory/>} />
            <Route path='/admin/facilities' element={<AdminFacility/>} />

          </Route>

          <Route path='*' element={<NotFound/>} />
        </Routes>
    </Router>
  )
}

export default App
