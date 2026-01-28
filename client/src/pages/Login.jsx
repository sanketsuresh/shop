import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const [formData, setFormData] = useState({ mobile: '', password: '' });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: '' });
        // Clear global form error when typing
        if (errors.form) setErrors({ ...errors, form: '' });
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.mobile) newErrors.mobile = 'Mobile number is required';
        if (!formData.password) newErrors.password = 'Password is required';
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setLoading(true);
        try {
            const res = await api.post('/api/auth/login', formData);
            login(res.data.user, res.data.token);

            // Redirect based on role
            if (res.data.user.role === 'admin') {
                navigate('/admin');
            } else {
                navigate('/products');
            }
            setLoading(false);

        } catch (err) {
            console.error("Login API failed, checking mock credentials");

            // MOCK LOGIN FOR DEMO (Since Netlify has no backend)
            if (formData.mobile === '9972639290' && formData.password === 'suresh') {
                const mockAdmin = { id: 999, name: 'Suresh Basaragaon', mobile: '9972639290', role: 'admin' };
                login(mockAdmin, 'mock-admin-token');
                navigate('/admin');
                setLoading(false);
                return;
            }

            // Fallback for demo user
            if (formData.mobile.length === 10 && formData.password.length >= 4) {
                const mockUser = { id: 100, name: 'Demo User', mobile: formData.mobile, role: 'user' };
                login(mockUser, 'mock-user-token');
                navigate('/products');
                setLoading(false);
                return;
            }

            const msg = err.response?.status === 401
                ? 'Invalid user ID or password'
                : 'Login failed. Try "9972639290" and "suresh" for Admin demo.';
            setErrors({ form: msg });
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
            <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Welcome Back</h2>
                <p className="text-gray-500 text-sm">Login to continue ordering</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                    label="Mobile Number"
                    name="mobile"
                    type="tel"
                    placeholder="9876543210"
                    value={formData.mobile}
                    onChange={handleChange}
                    error={errors.mobile}
                    maxLength={10}
                />
                <Input
                    label="Password"
                    name="password"
                    type="password"
                    placeholder="••••••"
                    value={formData.password}
                    onChange={handleChange}
                    error={errors.password}
                />

                {errors.form && <div className="text-red-500 text-sm font-bold text-center bg-red-50 p-2 rounded">{errors.form}</div>}

                <Button type="submit" className="w-full py-3" disabled={loading}>
                    {loading ? 'Logging in...' : 'Login'}
                </Button>
            </form>



            <div className="mt-6 text-center text-sm text-gray-600">
                New to the shop? <Link to="/register" className="text-primary font-bold hover:underline">Register Here</Link>
            </div>
        </div>
    );
};

export default Login;
