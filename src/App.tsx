import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Home from './pages/public/Home'
import AuthLayout from './layouts/AuthLayout'
import Login from './pages/auth/Login'
import MasterLayout from './layouts/MasterLayout'
import ProtectedRoute from './components/common/ProtectedRoute'

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>

        {/* Auth Routes (Login/Register) */}
        <Route path='/login' element={<AuthLayout><Login /></AuthLayout>} />
        
        {/* Protected Admin Routes */}
        {/* Protected Admin Routes */}
        <Route path="/" element={<ProtectedRoute> <MasterLayout> <Home /></MasterLayout></ProtectedRoute>
          } 
        />
      </Route>
    )
  )
  return (
    <RouterProvider router={router} />
  )
}

export default App