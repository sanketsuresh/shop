import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import api from '../api/axios';
import { Package, Clock, CheckCircle, Search } from 'lucide-react';

const AdminDashboard = () => {
    const { user, isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [products, setProducts] = useState([]);
    const [activeTab, setActiveTab] = useState('orders'); // 'orders' | 'stock'
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!isAuthenticated || user?.role !== 'admin') {
            navigate('/login');
            return;
        }
        fetchUnpackedData();
    }, [isAuthenticated, user, navigate]);

    const fetchUnpackedData = async () => {
        setLoading(true);
        try {
            const [ordersRes, productsRes] = await Promise.all([
                api.get('/api/admin/orders'),
                api.get('/api/products')
            ]);
            setOrders(ordersRes.data);
            setProducts(productsRes.data);
        } catch (error) {
            console.error("Using mock admin data");
            // Mock Orders for Demo
            setOrders([
                { id: 1, user_name: 'Demo Customer', user_mobile: '9876543210', total_amount: 450, status: 'Pending', items: [{ product_name: 'Rice', quantity: 5 }] }
            ]);
            // Fallback to static products
            const { PRODUCTS } = await import('../data/products');
            setProducts(PRODUCTS);
        } finally {
            setLoading(false);
        }
    };

    const updateOrderStatus = async (orderId, newStatus) => {
        try {
            await api.patch(`/api/admin/orders/${orderId}/status`, { status: newStatus });
            // Optimistic update
            setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
        } catch (error) {
            alert('Failed to update status');
        }
    };

    const toggleStock = async (productId, currentStatus) => {
        try {
            // currentStatus is is_available (0 or 1)
            const newStatus = !!currentStatus ? 0 : 1;
            await api.patch(`/api/admin/products/${productId}/stock`, { is_available: newStatus });
            setProducts(prev => prev.map(p => p.id === productId ? { ...p, is_available: newStatus } : p));
        } catch (error) {
            alert('Failed to update stock');
        }
    };

    if (loading) return <div className="p-10 text-center">Loading Dashboard...</div>;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Shop Admin Dashboard</h1>
                    <p className="text-gray-500">Welcome, {user?.name}</p>
                </div>
                <div className="flex gap-2">
                    <Button variant={activeTab === 'orders' ? 'primary' : 'outline'} onClick={() => setActiveTab('orders')}>
                        Orders
                    </Button>
                    <Button variant={activeTab === 'stock' ? 'primary' : 'outline'} onClick={() => setActiveTab('stock')}>
                        Stock Management
                    </Button>
                </div>
            </div>

            {activeTab === 'orders' ? (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                        <h2 className="font-bold text-lg">Recent Orders</h2>
                        <Button variant="ghost" onClick={fetchUnpackedData}>Refresh</Button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-gray-50 text-gray-600 font-medium">
                                <tr>
                                    <th className="p-4">Order ID</th>
                                    <th className="p-4">Customer</th>
                                    <th className="p-4">Items</th>
                                    <th className="p-4">Total</th>
                                    <th className="p-4">Status</th>
                                    <th className="p-4">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {orders.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" className="p-8 text-center text-gray-500">No orders found.</td>
                                    </tr>
                                ) : orders.map(order => (
                                    <tr key={order.id} className="hover:bg-gray-50 transition">
                                        <td className="p-4 font-mono font-medium">#{order.id}</td>
                                        <td className="p-4">
                                            <div className="font-bold text-gray-800">{order.user_name}</div>
                                            <div className="text-xs text-gray-500">{order.user_mobile}</div>
                                            <div className="text-xs text-gray-500">{order.user_address}</div>
                                        </td>
                                        <td className="p-4 w-1/3">
                                            <div className="flex flex-wrap gap-1">
                                                {order.items?.map((item, idx) => (
                                                    <span key={idx} className="bg-gray-100 px-2 py-1 rounded text-xs border border-gray-200">
                                                        {item.product_name} x{item.quantity}
                                                    </span>
                                                ))}
                                            </div>
                                        </td>
                                        <td className="p-4 font-bold text-primary">₹{order.total_amount}</td>
                                        <td className="p-4">
                                            <span className={`px-2 py-1 rounded-full text-xs font-bold ${order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                                                order.status === 'Packing' ? 'bg-blue-100 text-blue-800' :
                                                    order.status === 'Packed' ? 'bg-green-100 text-green-800' :
                                                        'bg-gray-100 text-gray-800'
                                                }`}>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="p-4">
                                            <select
                                                className="border rounded px-2 py-1 text-xs"
                                                value={order.status}
                                                onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                                            >
                                                <option value="Pending">Pending</option>
                                                <option value="Packing">Packing</option>
                                                <option value="Packed">Packed - Ready</option>
                                                <option value="Completed">Completed</option>
                                            </select>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-6 border-b border-gray-100">
                        <h2 className="font-bold text-lg">Stock Management</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
                        {products.map(product => (
                            <div key={product.id} className={`flex items-center gap-4 p-4 rounded-lg border ${product.is_available ? 'border-gray-100 bg-white' : 'border-red-100 bg-red-50'}`}>
                                <img src={product.image_url || product.image} alt={product.name} className="w-12 h-12 object-contain mix-blend-multiply" />
                                <div className="flex-1">
                                    <h4 className="font-semibold text-gray-800">{product.name}</h4>
                                    <p className="text-xs text-gray-500">{product.category}</p>
                                </div>
                                <div className="flex flex-col items-center gap-1">
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            className="sr-only peer"
                                            checked={!!product.is_available}
                                            onChange={() => toggleStock(product.id, product.is_available)}
                                        />
                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                                    </label>
                                    <span className="text-[10px] uppercase font-bold text-gray-400">{product.is_available ? 'In Stock' : 'Out'}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
