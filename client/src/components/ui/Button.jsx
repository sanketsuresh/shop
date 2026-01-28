import React from 'react';
import { motion } from 'framer-motion';

const Button = ({ children, variant = 'primary', className = '', ...props }) => {
    const baseStyles = "px-4 py-2 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer";

    const variants = {
        primary: "bg-primary text-white hover:bg-primary-active shadow-xl shadow-primary/20 border border-transparent font-black tracking-tight",
        secondary: "bg-secondary text-white hover:bg-secondary-active shadow-xl shadow-secondary/20 border border-transparent font-black tracking-tight",
        outline: "border-2 border-slate-200 text-slate-700 hover:border-primary hover:text-primary bg-white shadow-sm font-bold",
        ghost: "text-slate-500 hover:text-primary hover:bg-primary/5 font-bold rounded-xl",
        danger: "bg-red-500 text-white hover:bg-red-600 border border-transparent font-bold"
    };

    return (
        <motion.button
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.02 }}
            className={`${baseStyles} ${variants[variant] || variants.primary} ${className}`}
            {...props}
        >
            {children}
        </motion.button>
    );
};

export default Button;
