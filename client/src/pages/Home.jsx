import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import { ArrowRight, ShoppingBag, Sparkles, ShieldCheck, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const Home = () => {
    return (
        <div className="flex flex-col gap-16 md:gap-24 mb-16">
            {/* Hero Section */}
            <section className="relative min-h-[500px] md:min-h-[600px] flex flex-col md:flex-row items-center gap-12 pt-8 md:pt-0">
                {/* Decorative Elements */}
                <div className="absolute top-0 -left-10 w-72 h-72 bg-primary/20 rounded-full blur-[120px] -z-10 animate-pulse"></div>
                <div className="absolute bottom-10 -right-10 w-96 h-96 bg-accent/20 rounded-full blur-[150px] -z-10"></div>

                <div className="flex-1 space-y-8 text-center md:text-left">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-2xl text-sm font-bold text-primary shadow-xl shadow-primary/5 border border-primary/10"
                    >
                        <Sparkles className="w-4 h-4" />
                        <span>Fresh Stock Just Arrived</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-5xl md:text-8xl font-black text-slate-900 leading-[0.9] tracking-tighter"
                    >
                        Grocery <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Packed & Ready.</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-slate-500 text-lg md:text-xl max-w-xl font-medium leading-relaxed"
                    >
                        Order your daily essentials from <span className="text-slate-900 border-b-2 border-primary/30">Shree Pundalingeshwara kirani general Store</span>. We pack it for you to **avoid long queues and crowds**.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="flex flex-wrap gap-4 justify-center md:justify-start pt-4"
                    >
                        <Link to="/products">
                            <Button className="px-10 py-5 text-xl rounded-2xl shadow-2xl shadow-primary/30 h-auto font-black italic tracking-tighter hover:scale-105 transition-transform active:scale-95">
                                ORDER FOR PICKUP <ArrowRight className="ml-2 w-6 h-6" />
                            </Button>
                        </Link>
                        <Link to="/track">
                            <Button variant="outline" className="px-10 py-5 text-xl rounded-2xl bg-white/50 backdrop-blur-md border-2 border-slate-200 h-auto hover:bg-white hover:border-primary transition-all">
                                CHECK STATUS
                            </Button>
                        </Link>
                    </motion.div>

                    {/* Trust Badges */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="flex items-center justify-center md:justify-start gap-6 pt-8 text-slate-400 font-bold text-xs uppercase tracking-widest"
                    >
                        <div className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-primary" /> Pack-n-Go Model</div>
                        <div className="flex items-center gap-2"><Zap className="w-4 h-4 text-secondary" /> No Standing Crowd</div>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="flex-1 relative"
                >
                    <div className="relative w-full aspect-square max-w-lg mx-auto">
                        <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-accent/10 rounded-[4rem] rotate-6 -z-10 animate-pulse"></div>
                        <div className="absolute inset-0 bg-white shadow-2xl rounded-[4rem] border-8 border-slate-50 overflow-hidden flex items-center justify-center group">
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.1),transparent)] group-hover:scale-150 transition-transform duration-1000"></div>
                            <div className="text-center relative">
                                <div className="animate-float">
                                    <ShoppingBag className="w-32 h-32 md:w-48 md:h-48 text-primary/80" />
                                </div>
                                <div className="mt-8 px-8 py-4 bg-slate-900 text-white rounded-2xl font-black text-xl md:text-2xl shadow-xl">
                                    SURESH B. (OWNER)
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* Featured Categories */}
            <section>
                <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-12 gap-4">
                    <div className="text-center md:text-left">
                        <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter uppercase">Shop Daily Needs</h2>
                    </div>
                    <Link to="/products" className="group flex items-center gap-2 text-primary font-black uppercase text-sm tracking-widest hover:text-accent transition-colors">
                        View All Items <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                    {[
                        { name: 'Grains', display: 'Master Grains', color: 'bg-emerald-50', text: 'text-emerald-700', icon: '🌾', desc: 'Pulses, Rice & Flour' },
                        { name: 'Daily Needs', display: 'Daily Essentials', color: 'bg-blue-50', text: 'text-blue-700', icon: '🥛', desc: 'Milk, Eggs & More' },
                        { name: 'Snacks', display: 'Quick Bites', color: 'bg-orange-50', text: 'text-orange-700', icon: '🍪', desc: 'Biscuits & Munchies' },
                        { name: 'Cleaning', display: 'Pure Clean', color: 'bg-indigo-50', text: 'text-indigo-700', icon: '🧼', desc: 'Hygiene & Cleaning' }
                    ].map((cat, index) => (
                        <motion.div
                            key={cat.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Link to="/products" state={{ category: cat.name }} className="block group h-full">
                                <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 premium-shadow group-hover:premium-shadow-hover group-hover:-translate-y-2 transition-all duration-500 h-full relative overflow-hidden">
                                    <div className={`absolute -top-10 -right-10 w-32 h-32 ${cat.color} rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity`}></div>

                                    <div className={`w-20 h-20 ${cat.color} ${cat.text} rounded-[1.5rem] flex items-center justify-center text-4xl mb-8 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500`}>
                                        {cat.icon}
                                    </div>

                                    <h3 className="text-2xl font-black text-slate-900 mb-2 leading-tight">{cat.display}</h3>
                                    <p className="text-slate-400 font-medium text-sm mb-6">{cat.desc}</p>
                                    <div className={`text-sm font-black uppercase tracking-widest ${cat.text} opacity-0 group-hover:opacity-100 translate-x-[-10px] group-hover:translate-x-0 transition-all`}>
                                        View Items →
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Home;
