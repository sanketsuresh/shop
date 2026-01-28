import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Package, Clock, CheckCircle, ChevronDown, ChevronUp, AlertCircle } from 'lucide-react';
import Button from '../components/ui/Button';

const MyOrders = () => {
    const { user, isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [expandedOrder, setExpandedOrder] = useState(null);

    useEffect(() => {
        // If auth is still initializing, wait. 
        // But since context usually initializes fast from localStorage, check immediate state.
        if (!isAuthenticated) {
            // If not authenticated, we can't show orders.
            // Show loading briefly then redirect or show "Please Login"
            setLoading(false);
            return;
        }

        if (user) {
            fetchOrders();
        }
    }, [user, isAuthenticated]);

    const fetchOrders = async () => {
        try {
            const res = await api.get(`/api/orders/user/${user.id}`);
            setOrders(res.data);
        } catch (error) {
            console.error("Using mock order history");
            setOrders([
                { id: 1, created_at: new Date().toISOString(), total_amount: 450, status: 'Packed' }
            ]);
        } finally {
            setLoading(false);
        }
    };

    const toggleExpand = (id) => {
        setExpandedOrder(expandedOrder === id ? null : id);
    };

    if (!isAuthenticated && !loading) {
        return (
            <div className="flex flex-col items-center justify-center p-10 gap-4">
                <AlertCircle className="w-16 h-16 text-yellow-500" />
                <h2 className="text-2xl font-bold text-gray-800">Please Login</h2>
                <p className="text-gray-500">You need to be logged in to view your orders.</p>
                <Button onClick={() => navigate('/login')} className="mt-4">Go to Login</Button>
            </div>
        );
    }

    if (loading) return (
        <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
    );

    return (
        <div className="max-w-3xl mx-auto space-y-6">
            <h1 className="text-2xl font-bold text-gray-800">My Orders</h1>

            {orders.length === 0 ? (
                <div className="bg-white p-10 rounded-xl shadow-sm border border-gray-100 text-center text-gray-500">
                    <Package className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                    <p>You haven't placed any orders yet.</p>
                    <Button variant="outline" className="mt-4" onClick={() => navigate('/products')}>Start Shopping</Button>
                </div>
            ) : (
                <div className="space-y-4">
                    {orders.map(order => (
                        <div key={order.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                            <div
                                className="p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition"
                                onClick={() => toggleExpand(order.id)}
                            >
                                <div className="flex items-center gap-4">
                                    <div className={`p-3 rounded-full ${order.status === 'Packed' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'}`}>
                                        {order.status === 'Packed' ? <CheckCircle className="w-6 h-6" /> : <Clock className="w-6 h-6" />}
                                    </div>
                                    <div>
                                        <p className="font-bold text-gray-800">Order #{order.id}</p>
                                        <p className="text-xs text-gray-500">{new Date(order.created_at).toLocaleString()}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                                        order.status === 'Packing' ? 'bg-blue-100 text-blue-800' :
                                            order.status === 'Packed' ? 'bg-green-100 text-green-800' :
                                                'bg-gray-100 text-gray-800'
                                        }`}>
                                        {order.status}
                                    </span>
                                    <span className="font-bold text-gray-800">₹{order.total_amount}</span>
                                    {expandedOrder === order.id ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
                                </div>
                            </div>

                            {expandedOrder === order.id && (
                                <div className="bg-gray-50 p-4 border-t border-gray-100 text-sm animate-in slide-in-from-top-2">
                                    <p className="text-gray-500 italic">Order items summary displayed here.</p>
                                    {/* Future: Iterate over order items if available */}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyOrders;
