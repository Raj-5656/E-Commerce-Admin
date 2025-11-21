import React from 'react'
import { useAuth } from '../../context/AuthContext'
import { Navigate } from 'react-router-dom';
interface publicRouteProps {
  children: React.ReactNode;
}
const PublicRoute:React.FC<publicRouteProps> = ({ children }) => {
    const {user} =useAuth();
    console.log(user);
    
    if(user){
        return <Navigate to='/' replace />
    }
  return (
    <>{children}</>
  )
}

export default PublicRoute