import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Checkout({ cart, onSuccess }) {
    const navigate = useNavigate(); // ← ADD THIS LINE HERE

    const [formData, setFormData] = useState({
        name: "",
        address: "",
        phone: "",
        email: "",
        note: "",
    });
    const [receipt, setReceipt] = useState(null);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        // Clear error when user types
        if (errors[e.target.name]) {
            setErrors({ ...errors, [e.target.name]: "" });
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Check file size (max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                alert("File is too large! Please choose an image under 5MB.");
                e.target.value = "";
                return;
            }
            // Check file type
            if (!file.type.startsWith('image/')) {
                alert("Please upload an image file (JPG, PNG, etc.)");
                e.target.value = "";
                return;
            }
            setReceipt(file);
        }
    };

    // Validation functions
    const validateEmail = (email) => {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    };

    const validatePhone = (phone) => {
        // Remove spaces, dashes, and plus signs
        const cleanPhone = phone.replace(/[\s-+]/g, '');
        // Check if it's 10-11 digits and starts with 0 or 60
        return /^(0\d{9,10}|60\d{9,10})$/.test(cleanPhone);
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = "Name is required";
        }

        if (!formData.address.trim()) {
            newErrors.address = "Address is required";
        }

        if (!formData.phone.trim()) {
            newErrors.phone = "Phone number is required";
        } else if (!validatePhone(formData.phone)) {
            newErrors.phone = "Please enter a valid Malaysian phone number (10-11 digits, e.g., 0123456789)";
        }

        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!validateEmail(formData.email)) {
            newErrors.email = "Please enter a valid email address (e.g., example@gmail.com)";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate form first
        if (!validateForm()) {
            alert("Please fix the errors in the form");
            return;
        }

        // Check if receipt is uploaded
        if (!receipt) {
            alert("Please upload your payment receipt");
            return;
        }

        setLoading(true);

        try {
            // Convert image to base64
            const base64Image = await new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = () => resolve(reader.result);
                reader.onerror = reject;
                reader.readAsDataURL(receipt);
            });

            // Your Google Apps Script URL
            const scriptURL = "https://script.google.com/macros/s/AKfycbz2Slwx4tU7IvyhFacG4GtTJJkX1YFQki31iWu9UvYQ4lvK0Jugzme4JUhOpyp-Qx4maw/exec";

            // Create URL-encoded form data
            const params = new URLSearchParams();
            params.append("name", formData.name);
            params.append("address", formData.address);
            params.append("phone", formData.phone);
            params.append("email", formData.email);
            params.append("note", formData.note);
            params.append("cart", JSON.stringify(cart));
            params.append("receipt", base64Image);

            // Create hidden iframe
            const iframe = document.createElement('iframe');
            iframe.name = 'hidden-form-iframe';
            iframe.style.display = 'none';
            document.body.appendChild(iframe);

            // Create and submit form
            const form = document.createElement('form');
            form.method = 'POST';
            form.action = scriptURL;
            form.target = 'hidden-form-iframe';

            // Add all fields as hidden inputs
            const fields = {
                name: formData.name,
                address: formData.address,
                phone: formData.phone,
                email: formData.email,
                note: formData.note,
                cart: JSON.stringify(cart),
                receipt: base64Image
            };

            Object.keys(fields).forEach(key => {
                const input = document.createElement('input');
                input.type = 'hidden';
                input.name = key;
                input.value = fields[key];
                form.appendChild(input);
            });

            document.body.appendChild(form);
            form.submit();

            // Wait for submission, then redirect
            setTimeout(() => {
                document.body.removeChild(form);
                document.body.removeChild(iframe);
                setLoading(false);
                onSuccess();
                navigate('/thank-you');
            }, 2000);

        } catch (error) {
            setLoading(false);
            alert("Error uploading receipt. Please try again.");
            console.error("Upload error:", error);
        }
    };

    // Calculate cart total
    const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    return (
        <div className="w-full bg-white rounded-xl shadow-lg">
            <h2 className="text-xl sm:text-2xl font-bold p-4 sm:p-6 text-center bg-white sticky top-0 z-10 border-b">
                Payment Checkout
            </h2>

            <div className="flex flex-col lg:flex-row">
                {/* LEFT SIDE - Order Confirmation/Details */}
                <div className="w-full lg:w-2/5 p-4 sm:p-6 bg-gray-50 border-b lg:border-b-0 lg:border-r border-gray-200">
                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                        <span className="bg-pink-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm">✓</span>
                        Order Confirmation
                    </h3>

                    {/* Cart Items List */}
                    <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
                        {cart.map((item, index) => (
                            <div key={index} className="bg-white p-3 rounded-lg shadow-sm border">
                                <div className="flex gap-3">
                                    <img
                                        src={item.image || "/logo.png"}
                                        alt={item.productName}
                                        className="w-16 h-16 object-cover rounded"
                                    />
                                    <div className="flex-1 min-w-0">
                                        <h4 className="font-semibold text-sm line-clamp-1">{item.productName}</h4>
                                        <div className="text-xs text-gray-600 mt-1 space-y-0.5">
                                            <div className="flex items-center gap-2">
                                                <span className="font-medium">Color:</span>
                                                <span className="bg-pink-100 text-pink-800 px-2 py-0.5 rounded">{item.color}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="font-medium">Size:</span>
                                                <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded">{item.size}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="font-medium">Quantity:</span>
                                                <span className="bg-gray-100 text-gray-800 px-2 py-0.5 rounded">x{item.quantity}</span>
                                            </div>
                                        </div>
                                        <div className="mt-2 flex justify-between items-center">
                                            <span className="text-xs text-gray-500">RM {item.price.toFixed(2)} each</span>
                                            <span className="font-bold text-sm text-gray-800">RM {(item.price * item.quantity).toFixed(2)}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Order Summary */}
                    <div className="bg-white p-4 rounded-lg border shadow-sm space-y-2">
                        <h4 className="font-semibold text-sm mb-3">Payment Summary</h4>
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Subtotal ({cart.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
                            <span className="font-medium">RM {cartTotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Shipping Fee</span>
                            <span className="font-medium text-green-600">FREE</span>
                        </div>
                        <div className="border-t pt-2 mt-2 flex justify-between">
                            <span className="font-bold text-base">Total Amount</span>
                            <span className="font-bold text-lg text-pink-600">RM {cartTotal.toFixed(2)}</span>
                        </div>
                    </div>

                    {/* Payment Instructions */}
                    <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                        <p className="text-xs text-yellow-800 font-medium">
                            💡 Please scan the QR code and upload your payment receipt to complete your order.
                        </p>
                    </div>
                </div>

                {/* VERTICAL DIVIDER - visible only on large screens */}
                <div className="hidden lg:block w-px bg-gray-200"></div>

                {/* RIGHT SIDE - Payment Form */}
                <div className="w-full lg:w-3/5 p-4 sm:p-6">
                    {/* QR Code */}
                    <div className="text-center mb-6">
                        <h3 className="font-semibold text-base mb-3">💳 Scan to Pay</h3>
                        <img
                            src="/duitnow-izzati.jpg"
                            alt="DuitNow QR"
                            className="w-40 sm:w-48 mx-auto rounded-lg shadow-md border-2 border-gray-200"
                        />
                        <p className="text-gray-600 text-xs mt-2">
                            Scan QR code with your banking app
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Full Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="name"
                                placeholder="Enter your full name"
                                value={formData.name}
                                onChange={handleChange}
                                className={`w-full border p-2 sm:p-3 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent text-sm ${errors.name ? 'border-red-500' : 'border-gray-300'
                                    }`}
                            />
                            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Delivery Address <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                name="address"
                                placeholder="Enter your full delivery address"
                                value={formData.address}
                                onChange={handleChange}
                                rows="3"
                                className={`w-full border p-2 sm:p-3 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent text-sm ${errors.address ? 'border-red-500' : 'border-gray-300'
                                    }`}
                            />
                            {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Phone Number <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="tel"
                                    name="phone"
                                    placeholder="e.g., 0123456789"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    maxLength="12"
                                    className={`w-full border p-2 sm:p-3 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent text-sm ${errors.phone ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                />
                                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Email <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="example@gmail.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className={`w-full border p-2 sm:p-3 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent text-sm ${errors.email ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                />
                                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Additional Notes (Optional)
                            </label>
                            <textarea
                                name="note"
                                placeholder="Any special instructions..."
                                value={formData.note}
                                onChange={handleChange}
                                rows="2"
                                className="w-full border border-gray-300 p-2 sm:p-3 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent text-sm"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Upload Payment Receipt <span className="text-red-500">*</span>
                            </label>
                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-3 sm:p-4 text-center hover:border-pink-500 transition bg-gray-50">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    required
                                    className="w-full text-sm"
                                />
                                {receipt && (
                                    <div className="mt-2">
                                        <p className="text-xs sm:text-sm text-green-600 font-medium">
                                            ✓ {receipt.name}
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            Size: {(receipt.size / 1024).toFixed(2)} KB
                                        </p>
                                    </div>
                                )}
                            </div>
                            <p className="text-xs text-gray-500 mt-1">
                                JPG, PNG (max 5MB) - Will be uploaded to Google Drive
                            </p>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-pink-600 text-white py-3 rounded-lg font-semibold hover:bg-pink-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed text-sm sm:text-base shadow-md"
                        >
                            {loading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                    </svg>
                                    Submitting Order...
                                </span>
                            ) : (
                                "Complete Order & Submit Payment"
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
