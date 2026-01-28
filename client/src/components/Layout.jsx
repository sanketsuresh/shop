import React from 'react';
import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';
import { Store } from 'lucide-react';

const Layout = () => {
    return (
        <div className="min-h-screen bg-[#f8fafc] flex flex-col font-sans selection:bg-primary/20">
            <Navbar />
            <main className="flex-1 p-4 md:p-8 max-w-7xl mx-auto w-full">
                <Outlet />
            </main>
            <footer className="bg-dark text-white pt-16 pb-8 text-center text-sm mt-20">
                <div className="max-w-7xl mx-auto px-4 flex flex-col items-center gap-6">
                    <div className="flex flex-col items-center gap-2">
                        <Store className="w-12 h-12 text-primary mb-2 shadow-lg shadow-primary/20" />
                        <h2 className="font-display font-black text-3xl md:text-4xl text-white tracking-tighter uppercase px-4 py-2 border-2 border-primary/20 bg-primary/5 rounded-2xl">
                            Shree Pundalingeshwara kirani general Store
                        </h2>
                        <p className="text-slate-400 font-bold tracking-[0.2em] uppercase text-[10px] mt-2">Naad K D's Trusted Kirani General Stores</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl py-10 border-y border-slate-800 my-4">
                        <div className="space-y-3 bg-slate-800/30 p-6 rounded-3xl border border-slate-700/50">
                            <h3 className="font-black text-primary uppercase text-[10px] tracking-[0.3em]">Owner & Management</h3>
                            <p className="text-2xl font-black text-white tracking-tight">Suresh Basaragaon</p>
                            <div className="h-px w-8 bg-primary mx-auto"></div>
                            <p className="text-xl font-black text-primary hover:scale-105 transition-transform">
                                <a href="tel:9972639290" className="inline-flex items-center gap-2">📞 9972639290</a>
                            </p>
                        </div>
                        <div className="space-y-3 p-6">
                            <h3 className="font-black text-slate-400 uppercase text-[10px] tracking-[0.3em]">Main Location</h3>
                            <p className="text-white text-lg font-bold">Naad K D, Indi</p>
                            <p className="text-slate-500 font-bold uppercase text-[10px] tracking-widest">Vijayapur - 586217</p>
                        </div>
                        <div className="space-y-3 p-6">
                            <h3 className="font-black text-slate-400 uppercase text-[10px] tracking-[0.3em]">Pickup Model</h3>
                            <p className="text-white text-lg font-bold">Standard Store Hours</p>
                            <p className="text-slate-500 font-bold uppercase text-[10px] tracking-widest">8:00 AM - 8:30 PM Daily</p>
                        </div>
                    </div>

                    <div className="flex flex-col items-center gap-4 max-w-2xl">
                        <p className="text-slate-300 font-medium leading-relaxed italic bg-white/5 p-4 rounded-xl border border-white/5 shadow-inner">
                            "We pack your grocery basket for you to save your time and **avoid crowd standing** in front of the shop. Order online, pick up at your convenience."
                        </p>
                        <p className="text-[10px] text-slate-500 uppercase font-black tracking-[0.4em] mt-4">Professional Grocery Order System</p>
                        <p className="text-slate-600 font-medium">© {new Date().getFullYear()} SP General Store. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Layout;
