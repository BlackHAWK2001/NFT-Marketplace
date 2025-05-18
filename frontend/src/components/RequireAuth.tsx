// components/RequireAuth.tsx
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const { user } = useSelector((state: any) => state.auth);
  return user ? children : <Navigate to="/login" replace />;
};

export default RequireAuth;
