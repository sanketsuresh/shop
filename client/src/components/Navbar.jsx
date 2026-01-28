import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Store, User, LogOut } from 'lucide-react';
import Button from './ui/Button';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Navbar = () => {
    const { user, logout } = useAuth();
    const { getCartCount } = useCart();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const cartCount = getCartCount();

    return (
        <nav className="glass sticky top-0 z-50 border-b border-slate-200/20 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
                {/* Logo Section */}
                <Link to="/" className="flex items-center gap-3 text-primary font-bold group">
                    <div className="bg-primary/10 p-2 rounded-xl group-hover:bg-primary/20 transition-colors">
                        <Store className="w-6 h-6 md:w-8 md:h-8" />
                    </div>
                    <div className="flex flex-col leading-tight">
                        <span className="hidden md:inline font-display text-xl tracking-tight text-slate-900 group-hover:text-primary transition-colors">Shree Pundalingeshwara kirani general Store</span>
                        <span className="md:hidden font-display text-lg text-slate-900">SP kirani general Store</span>
                        <span className="hidden md:inline text-[10px] text-slate-500 font-medium uppercase tracking-wider">Naad K D's Trusted Local Store</span>
                    </div>
                </Link>

                {/* Actions */}
                <div className="flex items-center gap-2 md:gap-4">
                    <Link to="/products" className="text-slate-600 font-semibold hover:text-primary px-3 py-2 rounded-lg hover:bg-primary/5 transition-all hidden md:block">
                        Browse Items
                    </Link>

                    <Link to="/cart" className="relative p-2.5 text-slate-700 hover:text-white hover:bg-primary transition-all rounded-xl border border-slate-200 shadow-sm bg-white">
                        <ShoppingCart className="w-5 h-5" />
                        {cartCount > 0 && (
                            <span className="absolute -top-1.5 -right-1.5 bg-secondary text-white text-[10px] min-w-[20px] h-[20px] rounded-full flex items-center justify-center font-bold px-1 ring-2 ring-white animate-pulse">
                                {cartCount}
                            </span>
                        )}
                    </Link>

                    {user ? (
                        <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
                            <Link to={user.role === 'admin' ? '/admin' : '/orders'} className="text-sm font-bold text-slate-800 hover:text-primary px-3 py-2 rounded-lg hover:bg-primary/5 transition-all hidden md:inline">
                                {user.role === 'admin' ? 'Dashboard' : `Hi, ${user.name.split(' ')[0]}`}
                            </Link>
                            <Button variant="ghost" onClick={handleLogout} className="p-2.5 text-red-500 hover:bg-red-50 rounded-xl" title="Logout">
                                <LogOut className="w-5 h-5" />
                            </Button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2 border-l border-slate-200 pl-2">
                            <Link to="/login" className="hidden md:block">
                                <Button className="px-5 py-2 text-sm font-bold rounded-xl shadow-lg shadow-primary/20">
                                    Login to Shop
                                </Button>
                            </Link>
                            <Link to="/login" className="md:hidden">
                                <Button variant="ghost" className="p-2.5 rounded-xl border border-slate-200 bg-white">
                                    <User className="w-5 h-5" />
                                </Button>
                            </Link>
                        </div>
                    )}
                </div>
            </div>

            {/* Ticker / Info Bar */}
            <div className="bg-slate-900 text-white text-[10px] md:text-xs py-1.5 text-center font-bold tracking-wide uppercase flex justify-center gap-4 flex-wrap px-2">
                <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span> We're Open</span>
                <span className="opacity-30">|</span>
                <span className="text-primary tracking-widest">📦 Order Online for Quick Pickup</span>
                <span className="hidden sm:inline opacity-30">|</span>
                <span className="text-secondary">🕒 Accepting till 7:30 PM</span>
            </div>
        </nav>
    );
};

export default Navbar;
