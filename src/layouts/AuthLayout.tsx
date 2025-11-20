import type React from "react";

interface layout{
    children:React.ReactNode
}
const AuthLayout:React.FC<layout> = ({ children }) => {
  return (
   
    <div>
      {children}
    </div>
  );
};

export default AuthLayout;