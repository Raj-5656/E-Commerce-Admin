import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Home from './pages/dashboard/Dashboard'
import AuthLayout from './layouts/AuthLayout'
import Login from './pages/auth/Login'
import MasterLayout from './layouts/MasterLayout'
import ProtectedRoute from './components/common/ProtectedRoute'
import Category from './pages/category/Category'
import SubCategory from './pages/sub-category/SubCategory'
import Product from './pages/product/Product'
import PublicRoute from './components/common/PublicRoute'

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>

        {/* Auth Routes (Login/Register) */}
        <Route path='/login' element={<PublicRoute><AuthLayout><Login /></AuthLayout></PublicRoute>} />
        
        {/* Protected Admin Routes */}
        {/* Protected Admin Routes */}
        <Route path="/" element={<ProtectedRoute> <MasterLayout> <Home /></MasterLayout></ProtectedRoute>} />
        <Route path="/category" element={<ProtectedRoute> <MasterLayout> <Category /></MasterLayout></ProtectedRoute>} />
        <Route path="/sub-category" element={<ProtectedRoute> <MasterLayout> <SubCategory /></MasterLayout></ProtectedRoute>} />
        <Route path="/product" element={<ProtectedRoute> <MasterLayout> <Product /></MasterLayout></ProtectedRoute>} />
      </Route>
    )
  )
  return (
    <RouterProvider router={router} />
  )
}

export default App