import Login from "./Pages/auth/Login";
import Signup from "./Pages/auth/Signup";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import AuthProvider from "./context/AuthProvider";
import ReceiverDashboard from "./Pages/Dashboard/Receiver/ReceiverDashboard";
import AvailableFood from "./Pages/Dashboard/Receiver/AvailableFood";
import MyDonations from "./Pages/Dashboard/Receiver/MyDonations"; 
import AvailableDeliveries from "./Pages/Dashboard/Rider/AvailableDeliveries";
import MyDeliveries from "./Pages/Dashboard/Rider/MyDeliveries";
import RiderDashboard from "./Pages/Dashboard/Rider/RiderDashboard";

// Donor Pages
import Profile from "./Pages/Dashboard/Donor/Profile";
import CreateListing from './Pages/Dashboard/Donor/CreateListing';
import MyListings from './Pages/Dashboard/Donor/MyListings';
import ListingDetail from './Pages/Dashboard/Donor/ListingDetail';
import EditListing from './Pages/Dashboard/Donor/EditListing';
import { Toaster } from 'react-hot-toast'; 
// App.jsx ke top par imports ke sath
import DonorDashboard from "./Pages/Dashboard/Donor/DonorDashboard"; 
import { NotificationProvider } from "./context/NotificationContext"; 

// Temporary Placeholders
const ChooseRole = () => <h1>Choose Role</h1>;
//const DonorDashboard = () => <h1>Donor Dashboard</h1>;
//const ReceiverDashboard = () => <h1>Receiver Dashboard</h1>;
//const RiderDashboard = () => <h1>Rider Dashboard</h1>;

const App = () => {
    return (
            <AuthProvider>
                <NotificationProvider> 
                <Toaster /> 
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
                        <ProtectedRoute allowedRoles={['Donor','Receiver','Rider']}>
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



                    <Route path="/receiver/available-food" element={
                            <ProtectedRoute allowedRoles={['Receiver']}>
                                <AvailableFood />
                            </ProtectedRoute>
                        } />
                    
                        <Route path="/receiver/my-donations" element={
                            <ProtectedRoute allowedRoles={['Receiver']}>
                                <MyDonations />
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


                     <Route path="/rider/available-deliveries" element={
                        <ProtectedRoute allowedRoles={['Rider']}>
                            <AvailableDeliveries />
                        </ProtectedRoute>
                    } />

                    <Route path="/rider/my-deliveries" element={
                        <ProtectedRoute allowedRoles={['Rider']}>
                            <MyDeliveries />
                        </ProtectedRoute>
                    } />

                    {/* Fallback */}
                    <Route path="*" element={<Navigate to="/login" replace />} />
                </Routes>
                </NotificationProvider> 
            </AuthProvider>
    );
};

export default App;