// src/pages/ViewSelector.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Monitor, Smartphone, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ViewSelector() {
    const navigate = useNavigate();

    const handleViewSelection = (viewType) => {
        if (viewType === 'desktop') {
            navigate('/shop-desktop');
        } else {
            navigate('/shop-mobile');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#F5F5DC] via-[#FFF8E7] to-[#FFE4E1] flex items-center justify-center p-4">
            {/* Animated background blobs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-10 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob"></div>
                <div className="absolute top-40 right-10 w-72 h-72 bg-amber-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-rose-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-4000"></div>
            </div>

            <div className="relative z-10 max-w-5xl mx-auto text-center">
                {/* Logo */}
                <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                    className="flex justify-center mb-8"
                >
                    <img
                        src="/logo.png"
                        alt="Izzati's Scarf Logo"
                        className="w-24 h-24 rounded-xl border-2 border-gray-300 object-contain shadow-2xl"
                    />
                </motion.div>

                {/* Title */}
                <motion.h1
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-800 mb-4"
                >
                    Choose Your Experience
                </motion.h1>

                <motion.p
                    initial={{ y: -30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-lg sm:text-xl text-gray-600 mb-12"
                >
                    Select the view that works best for your device
                </motion.p>

                {/* View Options */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {/* Desktop View Option */}
                    <motion.div
                        initial={{ x: -100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.4, type: "spring" }}
                        whileHover={{ scale: 1.05, rotate: 1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleViewSelection('desktop')}
                        className="bg-white rounded-3xl shadow-2xl p-8 cursor-pointer border-4 border-transparent hover:border-pink-400 transition-all duration-300 group"
                    >
                        <div className="bg-gradient-to-br from-blue-400 to-blue-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 shadow-lg">
                            <Monitor className="w-10 h-10 text-white" strokeWidth={2.5} />
                        </div>

                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">
                            Desktop View
                        </h2>

                        <p className="text-gray-600 mb-6">
                            Full-featured experience with detailed layouts, perfect for larger screens and comfortable browsing.
                        </p>

                        <div className="space-y-2 text-sm text-gray-600 mb-6">
                            <div className="flex items-center gap-2">
                                <span className="text-green-500">✓</span>
                                <span>Multi-column product grid</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-green-500">✓</span>
                                <span>Advanced filters & search</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-green-500">✓</span>
                                <span>Image carousel navigation</span>
                            </div>
                        </div>

                        <button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold py-3 rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-lg group-hover:shadow-xl flex items-center justify-center gap-2">
                            Choose Desktop
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </motion.div>

                    {/* Mobile View Option */}
                    <motion.div
                        initial={{ x: 100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.4, type: "spring" }}
                        whileHover={{ scale: 1.05, rotate: -1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleViewSelection('mobile')}
                        className="bg-white rounded-3xl shadow-2xl p-8 cursor-pointer border-4 border-transparent hover:border-pink-400 transition-all duration-300 group"
                    >
                        <div className="bg-gradient-to-br from-pink-400 to-pink-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 shadow-lg">
                            <Smartphone className="w-10 h-10 text-white" strokeWidth={2.5} />
                        </div>

                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">
                            Mobile View
                        </h2>

                        <p className="text-gray-600 mb-6">
                            Streamlined interface optimized for touch devices, with easy navigation and thumb-friendly controls.
                        </p>

                        <div className="space-y-2 text-sm text-gray-600 mb-6">
                            <div className="flex items-center gap-2">
                                <span className="text-green-500">✓</span>
                                <span>Touch-optimized interface</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-green-500">✓</span>
                                <span>Larger buttons & text</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-green-500">✓</span>
                                <span>Single-column layout</span>
                            </div>
                        </div>

                        <button className="w-full bg-gradient-to-r from-pink-500 to-pink-600 text-white font-bold py-3 rounded-xl hover:from-pink-600 hover:to-pink-700 transition-all duration-300 shadow-lg group-hover:shadow-xl flex items-center justify-center gap-2">
                            Choose Mobile
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </motion.div>
                </div>

                {/* Back button */}
                <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="mt-12"
                >
                    <button
                        onClick={() => navigate('/')}
                        className="text-gray-600 hover:text-gray-800 font-medium underline"
                    >
                        ← Back to Home
                    </button>
                </motion.div>

                {/* Info note */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="mt-8 bg-white/50 backdrop-blur-sm rounded-2xl p-4 max-w-2xl mx-auto border border-gray-200"
                >
                    <p className="text-sm text-gray-600">
                        💡 <strong>Tip:</strong> Desktop view is recommended for computers and tablets, while Mobile view is optimized for smartphones. You can always return to this page to switch views.
                    </p>
                </motion.div>
            </div>
        </div>
    );
}