import React, { useState } from 'react';
import { Search, Package, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import api from '../api/axios';

const TrackOrder = () => {
    const [orderId, setOrderId] = useState('');
    const [status, setStatus] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleTrack = async (e) => {
        e.preventDefault();
        if (!orderId) return;

        setLoading(true);
        setError('');
        setStatus(null);

        try {
            const res = await api.get(`/api/orders/${orderId}`);
            setStatus(res.data);
        } catch (err) {
            setError('Order ID not found. Please check and try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
            <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Track Your Order</h2>
                <p className="text-gray-500 text-sm">Enter the Order ID given at checkout</p>
            </div>

            <form onSubmit={handleTrack} className="space-y-4">
                <Input
                    placeholder="Enter Order ID (e.g. 1)"
                    value={orderId}
                    onChange={(e) => setOrderId(e.target.value)}
                />
                <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? 'Checking...' : 'Check Status'}
                </Button>
            </form>

            {error && (
                <div className="mt-6 text-center text-red-500 flex flex-col items-center gap-2">
                    <AlertCircle className="w-8 h-8" />
                    <p>{error}</p>
                </div>
            )}

            {status && (
                <div className="mt-8 border-t border-gray-100 pt-6 animate-in slide-in-from-bottom-2">
                    <div className="flex flex-col items-center gap-4 text-center">
                        <div className={`p-4 rounded-full ${status.status === 'Packed' ? 'bg-green-100 text-green-600' :
                            status.status === 'Packing' ? 'bg-blue-100 text-blue-600' :
                                'bg-yellow-100 text-yellow-600'
                            }`}>
                            {status.status === 'Packed' ? <CheckCircle className="w-10 h-10" /> : <Clock className="w-10 h-10" />}
                        </div>

                        <div>
                            <p className="text-sm text-gray-400 uppercase tracking-widest font-bold">Current Status</p>
                            <h3 className={`text-3xl font-bold mt-1 ${status.status === 'Packed' ? 'text-green-600' : 'text-gray-800'
                                }`}>{status.status}</h3>
                        </div>

                        <div className="bg-gray-50 rounded-xl p-4 w-full mt-2">
                            <div className="flex justify-between text-sm mb-2">
                                <span className="text-gray-500">Order ID:</span>
                                <span className="font-mono font-bold">{status.id}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500">Order Time:</span>
                                <span className="font-medium">{new Date(status.created_at).toLocaleTimeString()}</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TrackOrder;
