// src/pages/LandingPage.jsx - UPDATED
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, Star, Truck, Shield, Heart, PhoneCall, ArrowRight } from 'lucide-react';

export default function LandingPage() {
    const navigate = useNavigate();
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // CHANGED: Now routes to /view-selector instead of /shop
    const goToShop = () => {
        navigate('/view-selector');
    };

    // Sample product images - REPLACE with your actual Google Sheet images
    const featuredProducts = [
        {
            id: 1,
            name: "Premium Silk Scarf",
            image: "https://minaz.com.my/cdn/shop/files/01-Taupe_4db8ff70-8bee-4a3f-b966-ab88812c406f.jpg?v=1715339988&width=3300",
            price: "RM 89.90"
        },
        {
            id: 2,
            name: "Cotton Hijab",
            image: "https://cdn.store-assets.com/s/197484/f/7029427.jpeg",
            price: "RM 45.00"
        },
        {
            id: 3,
            name: "Elegant Evening Scarf",
            image: "https://www.tudungruffle.com/cdn/shop/files/TAN.jpg?v=1725612520&width=1599",
            price: "RM 120.00"
        },
        {
            id: 4,
            name: "Daily Comfort Scarf",
            image: "https://images.unsplash.com/photo-1591369822096-ffd140ec948f?w=500",
            price: "RM 65.00"
        }
    ];

    return (
        <div className="min-h-screen bg-[#F5F5DC] overflow-hidden">
            {/* Hero Section with Parallax */}
            <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
                {/* Parallax Background */}
                <div
                    className="absolute inset-0 bg-gradient-to-br from-[#F5F5DC] via-[#FFF8E7] to-[#FFE4E1]"
                    style={{ transform: `translateY(${scrollY * 0.5}px)` }}
                ></div>

                {/* Animated blobs */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-20 left-10 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob"></div>
                    <div className="absolute top-40 right-10 w-72 h-72 bg-amber-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-2000"></div>
                    <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-rose-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-4000"></div>
                </div>

                {/* Content */}
                <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-center mb-6">
                        <img
                            src="/logo.png"
                            alt="Izzati's Scarf Logo"
                            className="w-20 sm:w-28 h-auto rounded-xl border border-gray-300 object-contain shadow-2xl transform hover:scale-110 transition-transform duration-300"
                        />
                    </div>

                    <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-gray-800 mb-6 drop-shadow-lg animate-fade-in">
                        Izzati's Scarf
                    </h1>
                    <p className="text-xl sm:text-2xl md:text-3xl text-gray-700 font-semibold mb-8">
                        Your Premium Scarf Collection
                    </p>
                    <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
                        Discover elegance, quality, and style. Handpicked scarves for every occasion.
                    </p>


                    <div className="mt-16 animate-bounce">
                        <p className="text-gray-600 text-sm mb-2">Scroll to explore</p>
                        <div className="w-6 h-10 border-2 border-gray-600 rounded-full mx-auto flex justify-center">
                            <div className="w-1 h-3 bg-gray-600 rounded-full mt-2 animate-pulse"></div>
                        </div>
                    </div>
                </div>

                {/* Wave Divider */}
                <div className="absolute bottom-0 left-0 right-0">
                    <svg viewBox="0 0 1440 120" className="w-full h-auto">
                        <path fill="#ffffff" d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"></path>
                    </svg>
                </div>
            </section>

            {/* Featured Products Section with Images */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white relative">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-4">
                            Featured Collection
                        </h2>
                        <p className="text-gray-600 text-lg">
                            Handpicked favorites just for you
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {featuredProducts.map((product, index) => (
                            <div
                                key={product.id}
                                className="group cursor-pointer"
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                <div className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                        <h3 className="font-bold text-lg mb-1">{product.name}</h3>
                                        <p className="text-xl font-bold">{product.price}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="text-center mt-12">
                        <button
                            onClick={goToShop}
                            className="group bg-gray-800 text-white font-bold px-8 py-4 rounded-full hover:bg-gray-700 transition-all duration-300 shadow-lg inline-flex items-center gap-2"
                        >
                            View All Products
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                </div>
            </section>

            {/* Why Choose Us Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#FFF8E7] to-[#FFE4E1] relative">
                {/* Curved top divider */}
                <div className="absolute top-0 left-0 right-0">
                    <svg viewBox="0 0 1440 120" className="w-full h-auto">
                        <path fill="#ffffff" d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"></path>
                    </svg>
                </div>

                <div className="max-w-7xl mx-auto pt-12">
                    <h2 className="text-4xl sm:text-5xl font-bold text-center mb-4 text-gray-800">
                        Why Choose Us?
                    </h2>
                    <p className="text-center text-gray-600 mb-16 text-lg">
                        Quality, Style, and Service You Can Trust
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="group bg-white p-8 rounded-2xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                            <div className="bg-gradient-to-br from-pink-400 to-pink-600 w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                                <Star className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-gray-800">Premium Quality</h3>
                            <p className="text-gray-600">Handpicked materials for lasting elegance and comfort</p>
                        </div>

                        <div className="group bg-white p-8 rounded-2xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                            <div className="bg-gradient-to-br from-amber-400 to-amber-600 w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                                <Truck className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-gray-800">Fast Delivery</h3>
                            <p className="text-gray-600">Quick and reliable shipping to your doorstep</p>
                        </div>

                        <div className="group bg-white p-8 rounded-2xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                            <div className="bg-gradient-to-br from-green-400 to-green-600 w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                                <PhoneCall className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-gray-800">Contact Us</h3>
                            <p className="text-gray-600">Ask us anything, We are ready to help!</p>
                        </div>

                        <div className="group bg-white p-8 rounded-2xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                            <div className="bg-gradient-to-br from-rose-400 to-pink-600 w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                                <Heart className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-gray-800">Made with Love</h3>
                            <p className="text-gray-600">Every piece crafted with care and passion</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* About Section with Side Image */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        {/* Text Content */}
                        <div className="order-2 lg:order-1">
                            <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-gray-800">
                                About Izzati's Scarf
                            </h2>
                            <p className="text-lg text-gray-700 leading-relaxed mb-6">
                                Welcome to Izzati's Scarf, your trusted destination for premium quality scarves.
                                We believe that every scarf tells a story and adds elegance to your style.
                            </p>
                            <p className="text-lg text-gray-700 leading-relaxed mb-8">
                                Our carefully curated collection features the finest materials, vibrant colors,
                                and timeless designs perfect for any occasion. Whether you're looking for everyday
                                comfort or special occasion elegance, we have the perfect scarf waiting for you.
                            </p>
                            <button
                                onClick={goToShop}
                                className="bg-pink-600 text-white font-bold px-8 py-4 rounded-full hover:bg-pink-700 transition-all duration-300 shadow-lg inline-flex items-center gap-2"
                            >
                                Explore Collection
                                <ArrowRight className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Image */}
                        <div className="order-1 lg:order-2">
                            <div className="relative">
                                <div className="absolute -inset-4 bg-gradient-to-r from-pink-300 to-rose-300 rounded-3xl opacity-20 blur-2xl"></div>
                                <img
                                    src="https://www.mymallmalaysia.my/uploads/all/rEjy2YfaAIeLEgQQVlkbEKGnOJkuWAcRmRWkNeFJ.jpg"
                                    alt="About Izzati's Scarf"
                                    className="relative rounded-3xl shadow-2xl w-full h-auto object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-pink-500 to-rose-500 text-white relative overflow-hidden">
                {/* Decorative elements */}
                <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-10 right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>

                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <h2 className="text-4xl sm:text-5xl font-bold mb-6">
                        Ready to Find Your Perfect Scarf?
                    </h2>
                    <p className="text-xl sm:text-2xl mb-10 opacity-90">
                        Browse our exclusive collection and elevate your style today!
                    </p>

                    <button
                        onClick={goToShop}
                        className="group bg-white text-pink-600 font-bold text-lg px-10 py-5 rounded-full shadow-2xl hover:shadow-white/30 transform hover:scale-105 transition-all duration-300 inline-flex items-center gap-3"
                    >
                        <ShoppingBag className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                        START SHOPPING
                    </button>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-8 px-4">
                <div className="max-w-7xl mx-auto text-center">
                    <div className="flex justify-center mb-4">
                        <img
                            src="/logo.png"
                            alt="Izzati's Scarf Logo"
                            className="w-16 h-16 rounded-lg object-contain bg-white/10 p-0.5"
                        />
                    </div>
                    <p className="text-gray-500 text-sm">
                        © 2025 Made with Love ❤️ by Izzati Scarf. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
}
