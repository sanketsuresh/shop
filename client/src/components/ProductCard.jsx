import React, { useState } from 'react';
import Button from './ui/Button';
import { Plus, Minus, Check, Star, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';

const ProductCard = ({ product }) => {
    const { cart, addToCart, removeFromCart, updateQuantity } = useCart();
    const [isHovered, setIsHovered] = useState(false);

    const cartItem = cart.find(item => item.id === product.id);
    const quantity = cartItem ? cartItem.quantity : 0;

    const handleAdd = () => addToCart(product);
    const handleIncrease = () => updateQuantity(product.id, quantity + 1);
    const handleDecrease = () => updateQuantity(product.id, quantity - 1);

    const isOutOfStock = product.is_available === 0 || product.is_available === false;

    return (
        <motion.div
            layout
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={`bg-white rounded-[2rem] border border-slate-100 premium-shadow hover:premium-shadow-hover transition-all duration-500 overflow-hidden flex flex-col group ${isOutOfStock ? 'opacity-60 grayscale-[0.8]' : ''}`}
        >
            <div className="relative aspect-square overflow-hidden bg-slate-50">
                <motion.img
                    animate={{ scale: isHovered ? 1.1 : 1 }}
                    transition={{ duration: 0.6 }}
                    src={product.image || product.image_url}
                    alt={product.name}
                    className="w-full h-full object-contain p-6 mix-blend-multiply"
                    loading="lazy"
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = `https://placehold.co/400x400/f3f4f6/9ca3af?text=${encodeURIComponent(product.name)}`;
                    }}
                />

                {/* Float Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                    <div className="bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black text-slate-900 uppercase tracking-widest border border-slate-200 shadow-sm">
                        {product.category}
                    </div>
                </div>

                <AnimatePresence>
                    {isHovered && !isOutOfStock && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-primary/5 pointer-events-none"
                        ></motion.div>
                    )}
                </AnimatePresence>

                {isOutOfStock && (
                    <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px] flex items-center justify-center p-4">
                        <div className="bg-slate-900 text-white px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest shadow-xl rotate-[-5deg]">
                            Sold Out
                        </div>
                    </div>
                )}
            </div>

            <div className="p-6 flex flex-col gap-4 flex-1">
                <div className="space-y-1">
                    <div className="flex items-center gap-1 text-secondary">
                        <Star className="w-3 h-3 fill-current" />
                        <span className="text-[10px] font-black uppercase tracking-tighter">Store Favorite</span>
                    </div>
                    <h3 className="font-display font-bold text-slate-800 text-lg leading-snug line-clamp-2 min-h-[3.5rem]">
                        {product.name}
                    </h3>
                </div>

                <div className="flex items-end justify-between mt-auto">
                    <div className="flex flex-col">
                        <span className="text-slate-400 text-[10px] uppercase font-bold tracking-widest">Price</span>
                        <div className="flex items-baseline gap-1">
                            <span className="text-2xl font-black text-slate-900 tracking-tighter">₹{product.price}</span>
                            <span className="text-xs font-bold text-slate-400 opacity-60">/ {product.unit || 'unit'}</span>
                        </div>
                    </div>
                </div>

                <div className="pt-2">
                    {isOutOfStock ? (
                        <Button disabled className="w-full py-4 text-xs font-black uppercase tracking-widest bg-slate-100 text-slate-400 border-none shadow-none">
                            Temporarily Gone
                        </Button>
                    ) : (
                        quantity === 0 ? (
                            <Button
                                onClick={handleAdd}
                                className="w-full py-4 text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2 group-hover:bg-primary transition-all shadow-xl shadow-slate-900/5 group-hover:shadow-primary/20"
                            >
                                <ShoppingCart className="w-4 h-4" /> Add To Order
                            </Button>
                        ) : (
                            <motion.div
                                initial={{ scale: 0.95 }}
                                animate={{ scale: 1 }}
                                className="flex items-center justify-between bg-slate-900 rounded-[1.25rem] p-1 shadow-xl"
                            >
                                <button
                                    onClick={handleDecrease}
                                    className="w-10 h-10 flex items-center justify-center bg-white/10 rounded-xl text-white hover:bg-white hover:text-slate-900 transition-all cursor-pointer"
                                >
                                    <Minus className="w-4 h-4" />
                                </button>
                                <div className="flex flex-col items-center">
                                    <span className="text-white font-black text-lg leading-none">{quantity}</span>
                                    <span className="text-primary text-[8px] font-black uppercase tracking-tighter">In Basket</span>
                                </div>
                                <button
                                    onClick={handleIncrease}
                                    className="w-10 h-10 flex items-center justify-center bg-primary rounded-xl text-white hover:bg-white hover:text-primary transition-all cursor-pointer"
                                >
                                    <Plus className="w-4 h-4" />
                                </button>
                            </motion.div>
                        )
                    )}
                </div>
            </div>
        </motion.div>
    );
};

export default ProductCard;
