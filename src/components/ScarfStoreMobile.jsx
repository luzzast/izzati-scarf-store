import React, { useEffect, useState } from "react";
import { Search, ShoppingCart, ChevronLeft, ChevronRight, Trash2, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Checkout from "./Checkout";
import toast, { Toaster } from "react-hot-toast";

const SHEET_ID = "1QWuZx9JoB37GzYd4PmpHspC9Fjgo3FKYZP11VS4Dv9Y";
const SHEET_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json`;

export default function ScarfStoreMobile() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("none");
  const [cart, setCart] = useState([]);
  const [showCartDrawer, setShowCartDrawer] = useState(false);

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewProduct, setPreviewProduct] = useState(null);
  const [previewColor, setPreviewColor] = useState("");
  const [previewSize, setPreviewSize] = useState("");
  const [previewQty, setPreviewQty] = useState(1);

  const [showCheckout, setShowCheckout] = useState(false);
  const [imageIndex, setImageIndex] = useState({});

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    let result = [...products];
    if (category) {
      result = result.filter((p) => (p.category || "").toLowerCase() === category.toLowerCase());
    }
    if (search) {
      result = result.filter((p) => (p.productName || "").toLowerCase().includes(search.toLowerCase()));
    }
    if (sort === "asc") result.sort((a, b) => Number(a.price) - Number(b.price));
    if (sort === "desc") result.sort((a, b) => Number(b.price) - Number(a.price));
    setFiltered(result);
  }, [products, category, search, sort]);

  const fetchProducts = async () => {
    try {
      const res = await fetch(SHEET_URL);
      const text = await res.text();
      const json = JSON.parse(text.substr(47).slice(0, -2));
      const rows = json.table.rows || [];

      const data = rows.map((r) => {
        return {
          productName: r.c[0]?.v || "",
          price: parseFloat(r.c[1]?.v || 0) || 0,
          image1: r.c[2]?.v || "",
          image2: r.c[3]?.v || "",
          image3: r.c[4]?.v || "",
          colors: (r.c[5]?.v || "").toString(),
          sizes: (r.c[6]?.v || "").toString(),
          stock: parseInt(r.c[7]?.v || 0) || 0,
          category: r.c[8]?.v || "",
          description: r.c[9]?.v || "",
          dateAdded: r.c[10]?.v || "",
          id: (r.c[0]?.v || "") + "_" + (r.c[10]?.v || "") + Math.random(),
        };
      });

      const idxs = {};
      data.forEach((p) => (idxs[p.id] = 0));
      setImageIndex(idxs);
      setProducts(data);
    } catch (err) {
      console.error("fetchProducts error", err);
      toast.error("Failed to load products");
    }
  };

  const productImages = (p) => [p.image1, p.image2, p.image3].filter((x) => x && x.trim().length > 0);

  const prevImage = (pid) => {
    const imgs = productImages(products.find((x) => x.id === pid)) || [];
    setImageIndex((prev) => ({
      ...prev,
      [pid]: ((prev[pid] || 0) - 1 + imgs.length) % Math.max(imgs.length, 1),
    }));
  };

  const nextImage = (pid) => {
    const imgs = productImages(products.find((x) => x.id === pid)) || [];
    setImageIndex((prev) => ({
      ...prev,
      [pid]: ((prev[pid] || 0) + 1) % Math.max(imgs.length, 1),
    }));
  };

  const openPreview = (product) => {
    setShowCartDrawer(false);
    setPreviewProduct(product);
    const colors = (product.colors || "").split(",").map((c) => c.trim()).filter(Boolean);
    const sizes = (product.sizes || "").split(",").map((s) => s.trim()).filter(Boolean);
    setPreviewColor(colors[0] || "");
    setPreviewSize(sizes[0] || "");
    setPreviewQty(1);
    setPreviewOpen(true);
  };

  const confirmAddToCart = () => {
    if (!previewProduct) return;
    const item = {
      cartId: Date.now(),
      id: previewProduct.id,
      productName: previewProduct.productName,
      price: Number(previewProduct.price) || 0,
      image: productImages(previewProduct)[0] || previewProduct.image1 || "",
      color: previewColor || "-",
      size: previewSize || "-",
      quantity: previewQty,
    };

    setCart((prev) => {
      const found = prev.find((p) => p.id === item.id && p.color === item.color && p.size === item.size);
      if (found) {
        return prev.map((p) => (p === found ? { ...p, quantity: p.quantity + item.quantity } : p));
      }
      return [...prev, item];
    });

    setPreviewOpen(false);
    toast.success(`${item.productName} added to cart`);
  };

  const removeCartItem = (cartId) => {
    setCart((prev) => prev.filter((i) => i.cartId !== cartId));
    toast("Removed", { icon: "🗑️" });
  };

  const updateCartQty = (cartId, newQty) => {
    if (newQty < 1) return;
    setCart((prev) => prev.map((i) => (i.cartId === cartId ? { ...i, quantity: newQty } : i)));
  };

  const cartTotal = cart.reduce((s, i) => s + i.price * i.quantity, 0);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (previewOpen && !e.target.closest(".preview-drawer")) {
        setPreviewOpen(false);
      }
      if (showCartDrawer && !e.target.closest(".cart-drawer")) {
        setShowCartDrawer(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [previewOpen, showCartDrawer]);

  return (
    <div className="min-h-screen bg-[#F5F5DC]">
      <Toaster position="top-right" />

      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-2xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-3">
              <img src="/logo.png" alt="logo" className="w-14 h-14 rounded-lg border object-contain" />
              <div>
                <h1 className="text-xl font-poppins font-bold shimmer-text">Izzati's Scarf</h1>
                <p className="text-xs text-gray-600">Authorised Seller</p>
              </div>
            </div>
            <a href="/" className="bg-orange-300 text-black px-3 py-2 rounded-lg font-semibold hover:bg-white transition shadow-md">Home</a>
          </div>

          <div className="mt-3 flex gap-2 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            <select value={category} onChange={(e) => setCategory(e.target.value)} className="px-2 py-2 border border-gray-300 rounded-lg">
              <option value="">All</option>
              {[...new Set(products.map((p) => p.category).filter(Boolean))].map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            <select value={sort} onChange={(e) => setSort(e.target.value)} className="px-2 py-2 border border-gray-300 rounded-lg">
              <option value="none">Sort</option>
              <option value="asc">Low → High</option>
              <option value="desc">High → Low</option>
            </select>
          </div>
        </div>
      </header>

      <motion.button
        onClick={() => setShowCartDrawer(true)}
        className="fixed bottom-6 right-6 z-40 bg-gradient-to-r from-pink-500 to-pink-600 text-white p-5 rounded-full shadow-2xl hover:shadow-pink-500/50 hover:scale-110 transition-all duration-300"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={{
          boxShadow: [
            "0 0 20px rgba(236, 72, 153, 0.5)",
            "0 0 40px rgba(236, 72, 153, 0.8)",
            "0 0 20px rgba(236, 72, 153, 0.5)",
          ],
        }}
        transition={{
          boxShadow: { duration: 2, repeat: Infinity, ease: "easeInOut" },
        }}
      >
        <ShoppingCart size={30} strokeWidth={2.5} />
        {cart.length > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-7 h-7 flex items-center justify-center text-sm font-bold border-2 border-white"
          >
            {cart.length}
          </motion.span>
        )}
      </motion.button>

      <main className="max-w-2xl mx-auto px-3 py-4">
        {filtered.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg text-gray-600">No products found</p>
          </div>
        ) : (
          <>
            {(() => {
              const groupedProducts = filtered.reduce((groups, product) => {
                const cat = product.category || "Uncategorized";
                if (!groups[cat]) groups[cat] = [];
                groups[cat].push(product);
                return groups;
              }, {});
              const categoryNames = Object.keys(groupedProducts).sort();
              const categoryEmojis = {
                "Premium Silk": "🧵",
                "Cotton Hijab": "🎀",
                "Evening Scarf": "✨",
                "Daily Comfort": "🌸",
                "Luxury": "👑",
                "Uncategorized": "🧣",
              };
              return categoryNames.map((categoryName) => {
                const categoryProducts = groupedProducts[categoryName];
                const emoji = categoryEmojis[categoryName] || "🧣";
                return (
                  <div key={categoryName} className="mb-10">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-pink-300 to-transparent"></div>
                      <div className="text-center">
                        <h2 className="text-xl font-bold text-gray-800">{emoji} {categoryName}</h2>
                        <p className="text-xs text-gray-600">{categoryProducts.length} {categoryProducts.length === 1 ? 'product' : 'products'}</p>
                      </div>
                      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-pink-300 to-transparent"></div>
                    </div>
                    <div className="grid grid-cols-1 gap-4">
                      {categoryProducts.map((p) => {
                        const imgs = productImages(p);
                        const idx = imageIndex[p.id] || 0;
                        const hasMultipleImages = imgs.length > 1;
                        return (
                          <motion.div
                            key={p.id}
                            layout
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.25 }}
                            className="bg-white rounded-lg shadow-md overflow-hidden"
                          >
                            <div className="relative">
                              <img src={imgs[idx] || p.image1 || "/logo.png"} alt={p.productName} className="w-full h-80 object-contain bg-white" />
                              {hasMultipleImages && (
                                <div className="absolute inset-y-0 left-0 right-0 flex justify-between items-center px-2 pointer-events-none">
                                  <button onClick={(e) => { e.stopPropagation(); prevImage(p.id); }} className="pointer-events-auto bg-black/50 hover:bg-black/70 text-white rounded-full p-2 shadow-lg border border-white/30 backdrop-blur-sm active:scale-95 transition-all duration-200" aria-label="Previous image">
                                    <ChevronLeft size={20} className="stroke-[2.5]" />
                                  </button>
                                  <button onClick={(e) => { e.stopPropagation(); nextImage(p.id); }} className="pointer-events-auto bg-black/50 hover:bg-black/70 text-white rounded-full p-2 shadow-lg border border-white/30 backdrop-blur-sm active:scale-95 transition-all duration-200" aria-label="Next image">
                                    <ChevronRight size={20} className="stroke-[2.5]" />
                                  </button>
                                </div>
                              )}
                              {hasMultipleImages && (
                                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
                                  {imgs.map((_, i) => (
                                    <div key={i} className={`w-1.5 h-1.5 rounded-full transition-all ${i === idx ? 'bg-white w-4' : 'bg-white/50'}`} />
                                  ))}
                                </div>
                              )}
                              {hasMultipleImages && (
                                <div className="absolute top-2 left-2 bg-black/60 text-white px-2 py-0.5 rounded text-xs font-medium backdrop-blur-sm">
                                  {idx + 1}/{imgs.length}
                                </div>
                              )}
                            </div>
                            <div className="p-4 flex flex-col gap-2">
                              <div className="flex items-center justify-between">
                                <span className="text-xs uppercase text-pink-600 font-semibold bg-pink-50 px-2 py-1 rounded">{p.category}</span>
                                <span className="text-sm text-gray-600">Stock: {p.stock}</span>
                              </div>
                              <h3 className="font-semibold text-base">{p.productName}</h3>
                              <p className="text-sm text-gray-600">{p.description}</p>
                              <div className="mt-2 flex items-center justify-between">
                                <div>
                                  <span className="text-gray-600 text-sm">RM </span>
                                  <span className="text-xl font-bold text-gray-800">{Number(p.price || 0).toFixed(2)}</span>
                                </div>
                                <button onClick={() => openPreview(p)} className="bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700 transition-all duration-200 hover:shadow-lg">Add to Cart</button>
                              </div>
                              <div className="flex gap-2 mt-2 text-xs text-gray-500">
                                {p.colors && <span>Colors: {p.colors}</span>}
                                {p.sizes && <span>| Sizes: {p.sizes}</span>}
                              </div>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                );
              });
            })()}
          </>
        )}
      </main>

      <AnimatePresence>
        {previewOpen && previewProduct && (
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="preview-drawer fixed top-0 right-0 h-full w-full sm:w-[420px] z-50 bg-white shadow-2xl p-6 overflow-y-auto"
          >
            <div className="flex items-start justify-between">
              <h2 className="text-lg font-bold">Confirm Item</h2>
              <button onClick={() => setPreviewOpen(false)} className="text-2xl hover:text-gray-600">
                <X size={24} />
              </button>
            </div>
            <div className="mt-4 flex gap-4">
              <img src={productImages(previewProduct)[0] || previewProduct.image1 || "/logo.png"} alt={previewProduct.productName} className="w-28 h-28 object-contain rounded" />
              <div className="flex-1">
                <h3 className="font-semibold">{previewProduct.productName}</h3>
                <p className="text-sm text-gray-600">{previewProduct.description}</p>
                <div className="mt-2">
                  <div className="mb-2">
                    <label className="text-sm font-medium">Color</label>
                    <select value={previewColor} onChange={(e) => setPreviewColor(e.target.value)} className="w-full mt-1 border rounded px-2 py-2">
                      {(previewProduct.colors || "").split(",").map((c) => c.trim()).filter(Boolean).map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-2">
                    <label className="text-sm font-medium">Size</label>
                    <select value={previewSize} onChange={(e) => setPreviewSize(e.target.value)} className="w-full mt-1 border rounded px-2 py-2">
                      {(previewProduct.sizes || "").split(",").map((s) => s.trim()).filter(Boolean).map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                  <div className="flex items-center gap-3 mt-2">
                    <label className="text-sm font-medium">Qty</label>
                    <div className="flex items-center gap-2">
                      <button onClick={() => setPreviewQty(Math.max(1, previewQty - 1))} className="px-3 py-1 border rounded hover:bg-gray-100">-</button>
                      <input value={previewQty} onChange={(e) => setPreviewQty(Math.max(1, parseInt(e.target.value) || 1))} className="w-16 text-center border rounded px-2 py-1" />
                      <button onClick={() => setPreviewQty(Math.min(previewProduct.stock || 999, previewQty + 1))} className="px-3 py-1 border rounded hover:bg-gray-100">+</button>
                    </div>
                  </div>
                  <div className="mt-4 font-semibold">Subtotal: RM {(Number(previewProduct.price || 0) * previewQty).toFixed(2)}</div>
                </div>
              </div>
            </div>
            <div className="mt-6 flex gap-3">
              <button onClick={() => setPreviewOpen(false)} className="flex-1 border rounded px-4 py-2 hover:bg-gray-50">Cancel</button>
              <button onClick={confirmAddToCart} className="flex-1 bg-pink-600 text-white rounded px-4 py-2 hover:bg-pink-700">Add to Cart</button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showCartDrawer && (
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="cart-drawer fixed top-0 right-0 h-full w-full sm:w-[520px] z-50 bg-white shadow-2xl p-4 overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold">Your Cart ({cart.length})</h2>
              <button onClick={() => setShowCartDrawer(false)} className="text-2xl hover:text-gray-600">
                <X size={24} />
              </button>
            </div>

            {cart.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600">Your cart is empty.</p>
              </div>
            ) : (
              <>
                <div className="space-y-4">
                  {cart.map((it) => (
                    <div key={it.cartId} className="flex gap-4 items-center border p-3 rounded">
                      <img src={it.image || "/logo.png"} alt={it.productName} className="w-20 h-20 object-cover rounded" />
                      <div className="flex-1">
                        <h3 className="font-semibold">{it.productName}</h3>
                        <p className="text-sm text-gray-500">{it.color} • {it.size}</p>
                        <p className="font-bold mt-1">RM {(Number(it.price) || 0).toFixed(2)}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <button onClick={() => updateCartQty(it.cartId, it.quantity - 1)} className="px-2 py-1 border rounded hover:bg-gray-100">-</button>
                          <span className="px-2">{it.quantity}</span>
                          <button onClick={() => updateCartQty(it.cartId, it.quantity + 1)} className="px-2 py-1 border rounded hover:bg-gray-100">+</button>
                        </div>
                      </div>
                      <div className="text-right">
                        <button onClick={() => removeCartItem(it.cartId)} className="text-red-500 hover:text-red-700"><Trash2 /></button>
                        <div className="mt-2 font-semibold">RM {(it.price * it.quantity).toFixed(2)}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t mt-4 pt-4">
                  <div className="flex justify-between mb-2"><span>Subtotal</span><span>RM {cartTotal.toFixed(2)}</span></div>
                  <div className="flex gap-2">
                    <button onClick={() => setShowCartDrawer(false)} className="flex-1 border px-4 py-2 rounded hover:bg-gray-50">Continue Shopping</button>
                    <button onClick={() => { setShowCheckout(true); setShowCartDrawer(false); }} className="flex-1 bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700">Checkout</button>
                  </div>
                </div>
              </>
            )}
          </motion.aside>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showCheckout && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 overflow-y-auto"
            onClick={() => setShowCheckout(false)}
          >
            <div className="min-h-screen flex items-start sm:items-center justify-center p-2 sm:p-4 py-8">
              <motion.div
                initial={{ scale: 0.95, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 20 }}
                className="relative w-full max-w-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <button onClick={() => setShowCheckout(false)} className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 z-10 bg-white rounded-full w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center shadow-lg hover:bg-gray-100 transition text-xl sm:text-2xl font-bold">×</button>
                <Checkout
                  cart={cart}
                  onSuccess={() => {
                    setCart([]);
                    setShowCheckout(false);
                    toast.success("Order submitted!");
                  }}
                />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="bg-white mt-12 py-6 border-t">
        <div className="flex justify-center mb-4">
          <img src="/logo.png" alt="Izzati's Scarf Logo" className="w-14 h-14 rounded-lg object-contain bg-black/10 p-0.5" />
        </div>
        <div className="max-w-2xl mx-auto px-4 text-center text-gray-600">
          <p>&copy; 2025 Made with Love ❤️ by Izzati Scarf. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
