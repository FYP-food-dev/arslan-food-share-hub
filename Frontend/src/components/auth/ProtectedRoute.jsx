import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";
import AccessDenied from "./AccessDenied";

const ProtectedRoute = ({ children, allowedRoles }) => {
    const { isAuthenticated, role } = useContext(AuthContext);

    // 1. Agar user login nahi hai
    // if (!isAuthenticated) {
    //     console.log("User is not authenticated, redirecting to login...");
    //     return <Navigate to="/login" replace />;
    // }

    // 2. Agar allowedRoles pass nahi kiya gaya, toh sab allow karo
    if (!allowedRoles || allowedRoles.length === 0) {
        return children;
    }

    // 3. Safe check: Kya user ka role allowedRoles ke andar hai?
    // (role ek array hai jisme user ke saare roles hain)
    const hasPermission = role && Array.isArray(role) 
        ? role.some(r => allowedRoles.includes(r))
        : false;

    if (!hasPermission) {
        console.log("Access Denied: Required", allowedRoles, "but user has", role);
        return <AccessDenied />;
    }

    // 4. Sab theek hai
    return children;
};

export default ProtectedRoute;






// import { useContext } from "react";
// import { Navigate } from "react-router-dom";
// import { AuthContext } from "../../context/AuthProvider";
// import AccessDenied from "./AccessDenied";
// const ProtectedRoute = ({ children, requiredRole }) => {

//     const { isAuthenticated, role } = useContext(AuthContext);
//    console.log("requiredRole:", requiredRole);
// console.log("role:", role);
// console.log("includes:", role.includes(requiredRole));
//     if (!isAuthenticated) {
//         console.log("login chala do uncle")
//         return <Navigate to="/login" />;
//     }
//     if (!role.includes(requiredRole)){
//         return <AccessDenied />
//     }
//     return children;
// };

// export default ProtectedRoute;