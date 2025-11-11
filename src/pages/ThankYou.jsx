import React, { useEffect } from "react";
import { motion } from "framer-motion";

export default function ThankYou() {
    useEffect(() => {
        // Play success sound when page loads
        playSuccessSound();
    }, []);

    const playSuccessSound = () => {
        // Create audio element
        const audio = new Audio();
        
        // Option 1: Use a free success sound URL
        //audio.src = "https://assets.mixkit.co/active_storage/sfx/2018/2018-preview.mp3"; // Success notification sound
        
        // Option 2: Or use a different sound
        audio.src = "https://assets.mixkit.co/active_storage/sfx/2000/2000-preview.mp3"; // Happy notification
        
        // Option 3: Or use local file (if you download and put in public folder)
        // audio.src = "/success.mp3";
        
        audio.volume = 0.5; // 50% volume (adjust as needed: 0.0 to 1.0)
        audio.play().catch(error => {
            console.log("Audio playback failed:", error);
            // Some browsers block autoplay, that's okay
        });
    };

    return (
        <div className="min-h-screen bg-[#F5F5DC] flex flex-col items-center justify-center text-center p-6">
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 120 }}
                className="mb-6"
            >
                {/* Success Icon with Animation */}
                <div className="relative">
                    <motion.div
                        animate={{ 
                            scale: [1, 1.2, 1],
                            rotate: [0, 10, -10, 0]
                        }}
                        transition={{ 
                            duration: 0.6,
                            repeat: 2,
                            repeatDelay: 0.3
                        }}
                    >
                        <img
                            src="https://cdn-icons-png.flaticon.com/512/148/148767.png"
                            alt="Order Confirmed"
                            className="w-24 h-24 mx-auto"
                        />
                    </motion.div>
                    
                    {/* Confetti Animation */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ duration: 2, repeat: 1 }}
                        className="absolute inset-0 text-6xl"
                    >
                        🎉
                    </motion.div>
                </div>
            </motion.div>

            <motion.h1
                className="text-3xl sm:text-4xl font-bold mb-3 text-gray-800"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
            >
                🎊 Order Confirmed! 🎊
            </motion.h1>

            <motion.div
                className="max-w-md space-y-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
            >
                <p className="text-gray-700 text-lg">
                    Thank you for your purchase! 💖
                </p>
                <p className="text-gray-600">
                    We've received your order and payment receipt. 
                    Our team will verify your payment and contact you shortly to confirm your delivery details.
                </p>
                <div className="bg-white p-4 rounded-lg shadow-sm border-2 border-pink-200 mt-4">
                    <p className="text-sm text-gray-600">
                        📧 You'll receive a confirmation email soon!
                    </p>
                    <p className="text-sm text-gray-600 mt-2">
                        📱 We'll contact you via WhatsApp/Phone
                    </p>
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="mt-8 space-y-3"
            >
                <a
                    href="/"
                    className="inline-block bg-pink-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-pink-700 transition shadow-md"
                >
                    ← Back to Home
                </a>
                
             {/* <p className="text-sm text-gray-500">
                    Order Number: #{new Date().getTime().toString().slice(-8)}
                </p> */}
            </motion.div>

            {/* Floating animation elements */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                {[...Array(5)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute text-4xl"
                        initial={{ 
                            y: "100vh", 
                            x: `${Math.random() * 100}%`,
                            rotate: 0
                        }}
                        animate={{ 
                            y: "-20vh",
                            rotate: 360
                        }}
                        transition={{ 
                            duration: 3 + Math.random() * 2,
                            delay: Math.random() * 0.5,
                            ease: "linear"
                        }}
                    >
                        {['🎉', '🎊', '✨', '💖', '🧣'][i]}
                    </motion.div>
                ))}
            </div>
        </div>
    );
}