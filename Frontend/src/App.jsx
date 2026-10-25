import Login from "./Pages/auth/Login";
import Signup from "./Pages/auth/Signup";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import AuthProvider from "./context/AuthProvider";

// Donor Pages
import Profile from "./Pages/Dashboard/Donor/Profile";
import CreateListing from './Pages/Dashboard/Donor/CreateListing';
import MyListings from './Pages/Dashboard/Donor/MyListings';
import ListingDetail from './Pages/Dashboard/Donor/ListingDetail';
import EditListing from './Pages/Dashboard/Donor/EditListing';
import { Toaster } from 'react-hot-toast'; // ✅ Import karein
// App.jsx ke top par imports ke sath
import DonorDashboard from "./Pages/Dashboard/Donor/DonorDashboard"; // ✅ Asal file import karein
import { NotificationProvider } from "./context/NotificationContext"; // ✅ Import karein

// Temporary Placeholders
const ChooseRole = () => <h1>Choose Role</h1>;
//const DonorDashboard = () => <h1>Donor Dashboard</h1>;
const ReceiverDashboard = () => <h1>Receiver Dashboard</h1>;
const RiderDashboard = () => <h1>Rider Dashboard</h1>;

const App = () => {
    return (
        //<BrowserRouter>
            <AuthProvider>
                <NotificationProvider> {/* ✅ Yeh wrap karein */}
                <Toaster /> {/* ✅ Toaster component ko yahan render karein */}
                <Routes>
                    {/* Public Routes */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/choose-role" element={<ChooseRole />} />

                    {/* Donor Protected Routes */}
                    <Route path="/donor" element={
                        <ProtectedRoute allowedRoles={['Donor']}>
                            <DonorDashboard />
                        </ProtectedRoute>
                    } />

                    <Route path="/profile" element={
                        <ProtectedRoute allowedRoles={['Donor']}>
                            <Profile />
                        </ProtectedRoute>
                    } />

                    <Route path="/dashboard/donor/create-listing" element={
                        <ProtectedRoute allowedRoles={['Donor']}>
                            <CreateListing />
                        </ProtectedRoute>
                    } />

                    <Route path="/dashboard/donor/my-listings" element={
                        <ProtectedRoute allowedRoles={['Donor']}>
                            <MyListings />
                        </ProtectedRoute>
                    } />

                    <Route path="/dashboard/donor/listing/:id" element={
                        <ProtectedRoute allowedRoles={['Donor']}>
                            <ListingDetail />
                        </ProtectedRoute>
                    } />

                    <Route path="/dashboard/donor/listing/:id/edit" element={
                        <ProtectedRoute allowedRoles={['Donor']}>
                            <EditListing />
                        </ProtectedRoute>
                    } />

                    {/* Receiver Routes */}
                    <Route path="/receiver" element={
                        <ProtectedRoute allowedRoles={['Receiver']}>
                            <ReceiverDashboard />
                        </ProtectedRoute>
                    } />

                    {/* Rider Routes */}
                    <Route path="/rider" element={
                        <ProtectedRoute allowedRoles={['Rider']}>
                            <RiderDashboard />
                        </ProtectedRoute>
                    } />

                    {/* Fallback */}
                    <Route path="*" element={<Navigate to="/login" replace />} />
                </Routes>
                </NotificationProvider> {/* ✅ NotificationProvider Band kiya */}
            </AuthProvider>
        //</BrowserRouter>
    );
};

export default App;

























// import Login from "./Pages/auth/Login";
// import Signup from "./Pages/auth/Signup";
// import ProtectedRoute from "./components/auth/ProtectedRoute";
// import { Routes, Route } from "react-router-dom";
// import Profile from "./Pages/Dashboard/Donor/Profile";

// import CreateListing from './Pages/Dashboard/Donor/CreateListing';
// import MyListings from './Pages/Dashboard/Donor/MyListings';
// import ListingDetail from './Pages/Dashboard/Donor/ListingDetail';
// import EditListing from './Pages/Dashboard/Donor/EditListing';

// const ChooseRole = () => <h1>Choose Role</h1>;
// const DonorDashboard = () => <h1>Donor Dashboard</h1>;
// const ReceiverDashboard = () => <h1>Receiver Dashboard</h1>;
// const RiderDashboard = () => <h1>Rider Dashboard</h1>;

// const App = () => {
//     return (
        
//             <Routes>

//                 <Route path="/login" element={<Login />} />

//                 <Route
//                     path="/choose-role"
//                     element={<ChooseRole />}
//                 />
                
//                       <Route
//                     path="/donor"
//                     element={ 
//                     <ProtectedRoute requiredRole="Donor">
//                     <DonorDashboard/>
//                     </ProtectedRoute>}/>
              
//                  <Route
//                     path="/signup"
//                     element={<Signup />}
//                 />
                

//                  <Route
//                  path="/receiver"
//                     element={ 
//                     <ProtectedRoute requiredRole="Receiver">
//                     <ReceiverDashboard/>
//                     </ProtectedRoute>}
//                 />

//                 <Route
//                     path="/rider"
//                     element={
//                     <ProtectedRoute requiredRole="Rider">
//                     <RiderDashboard />
//                 </ProtectedRoute>}
//                 />
//                <Route
//                path="/profile"
//                element={<Profile />}
//                />


//                     <Route path="/dashboard/donor/create-listing" element={
//     <ProtectedRoute allowedRoles={['Donor']}>
//         <CreateListing />
//     </ProtectedRoute>
// } />

// <Route path="/dashboard/donor/my-listings" element={
//     <ProtectedRoute allowedRoles={['Donor']}>
//         <MyListings />
//     </ProtectedRoute>
// } />

// <Route path="/dashboard/donor/listing/:id" element={
//     <ProtectedRoute allowedRoles={['Donor']}>
//         <ListingDetail />
//     </ProtectedRoute>
// } />

// <Route path="/dashboard/donor/listing/:id/edit" element={
//     <ProtectedRoute allowedRoles={['Donor']}>
//         <EditListing />
//     </ProtectedRoute>
// } />






//             </Routes>
        
//     );
// };

// export default App;