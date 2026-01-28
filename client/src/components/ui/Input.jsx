import React from 'react';

const Input = ({ label, error, className = '', ...props }) => {
    return (
        <div className="flex flex-col gap-2 w-full text-left">
            {label && <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">{label}</label>}
            <input
                className={`px-5 py-3 rounded-2xl border border-slate-200 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all w-full font-medium text-slate-800 placeholder:text-slate-300 ${error ? 'border-red-500 ring-red-100' : ''} ${className}`}
                {...props}
            />
            {error && <span className="text-[10px] font-bold text-red-500 ml-1 uppercase tracking-tighter">{error}</span>}
        </div>
    );
};

export default Input;
