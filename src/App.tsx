import { AuthProvider } from './context/AuthContext'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Home from './pages/public/Home'
import AuthLayout from './layouts/AuthLayout'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import MasterLayout from './layouts/MasterLayout'

const App = () => {
  const router=createBrowserRouter(
    createRoutesFromElements(
      <Route>
         <Route path="/" element={<MasterLayout><Home /></MasterLayout>} />
         <Route path='/login' element={<AuthLayout><Login /></AuthLayout>} />
         <Route path='/register' element={<AuthLayout><Register /></AuthLayout>} />
      </Route>
    )
  )
  return (
    <AuthProvider>
      <RouterProvider router={router}/>
    </AuthProvider>
  )
}

export default App