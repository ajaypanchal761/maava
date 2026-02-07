import { useState, useRef } from "react"
import { useLocation } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import {
    ShoppingBag,
    Users,
    CreditCard,
    Package,
    Tag,
    Plus,
    Upload,
    Trash2,
    Edit,
    Layout,
    Image as ImageIcon,
    Star,
    Settings2,
    CheckCircle2,
    X,
    ChevronRight,
    Monitor,
    ArrowLeft,
    Clock3
} from "lucide-react"

export default function HibermartAdminHome() {
    const location = useLocation()

    // Derive active section from URL path
    const getActiveTab = () => {
        if (location.pathname.includes("/categories/grocery")) return "grocery";
        if (location.pathname.includes("/categories/beauty")) return "beauty";
        if (location.pathname.includes("/categories/household")) return "household";
        if (location.pathname.includes("/newly-launched")) return "newly-launched";
        if (location.pathname.includes("/best-sellers")) return "best-sellers";
        if (location.pathname.includes("/banners")) return "banners";
        if (location.pathname.includes("/sale")) return "sale";
        if (location.pathname.includes("/stories")) return "stories";
        if (location.pathname.includes("/inventory")) return "inventory";
        if (location.pathname.includes("/orders")) return "orders";
        if (location.pathname.includes("/settings")) return "settings";
        return "overview";
    }
    const activeTab = getActiveTab()

    // --- DRILL DOWN STATE ---
    // path: array of { id, name, level }
    const [currentPath, setCurrentPath] = useState([])

    // Mock Data States (Enhanced for nesting)
    const [catalogData, setCatalogData] = useState({
        grocery: [
            {
                id: "g1",
                name: "Fresh Vegetables",
                image: "https://instamart-media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_200/NI_CATALOG/IMAGES/CIW/2025/10/8/323b2564-9fa9-43dd-9755-b5df299797d7_a7f60fc5-47fa-429d-9fd1-5f0644c0d4e3",
                level: "sub",
                children: [
                    {
                        id: "g1_c1", name: "Leafy and Seasonings",
                        image: "https://instamart-media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_200/NI_CATALOG/IMAGES/CIW/2025/10/8/9c48b537-eef1-4047-becb-ddb7e79c373d_72aac542-4cef-4cf9-a9dd-5f1b862165c1",
                        level: "child",
                        children: [
                            { id: "p1", name: "No Roots, Spinach (Palak)", weight: "1 Bunch", price: 23, originalPrice: 29, discount: "20% OFF", time: "10 MINS", image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?q=80&w=400&auto=format&fit=crop", type: "product" }
                        ]
                    },
                    { id: "g1_c2", name: "Valentine's Day Specials", image: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=200&auto=format&fit=crop", level: "child" },
                    { id: "g1_c3", name: "Pooja & Festive", image: "https://images.unsplash.com/photo-1545643431-750d06155562?q=80&w=200&auto=format&fit=crop", level: "child" },
                    { id: "g1_c4", name: "Premium Produce", image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?q=80&w=200&auto=format&fit=crop", level: "child" }
                ]
            },
            { id: "g2", name: "Fresh Fruits", image: "https://instamart-media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_200/NI_CATALOG/IMAGES/CIW/2025/12/5/13a82fb6-aac6-4a94-af24-3a9522876d76_a27e7cc7-8e5f-4264-b978-c51531625dde", level: "sub" },
            { id: "g3", name: "Dairy & Bread", image: "https://instamart-media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_200/NI_CATALOG/IMAGES/CIW/2025/12/24/ceb53190-72a3-466b-a892-8989615788c9_fe00456c-3b5a-4e74-80e2-c274a4c9f818.png", level: "sub" },
        ],
        beauty: [],
        household: []
    })

    const [banners, setBanners] = useState([
        { id: 1, title: "Grand Opening Offer", type: "Hero", image: "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=800&auto=format&fit=crop" },
        { id: 2, title: "Winter Sale", type: "Promo", image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=800&auto=format&fit=crop" },
    ])

    const [saleItems, setSaleItems] = useState([
        { id: 1, name: "McCain French Fries", price: 141, discount: "52%", image: "https://images.unsplash.com/photo-1573082801971-5a31908bc09e?q=80&w=300&auto=format&fit=crop" },
    ])

    const [stories, setStories] = useState([
        { id: 1, name: "Healthy Morning", image: "https://images.unsplash.com/photo-1490818387583-1baba5e638af?q=80&w=200&auto=format&fit=crop" },
        { id: 2, name: "Flash Deals", image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=200&auto=format&fit=crop" },
    ])

    // UI States
    const [showUploadModal, setShowUploadModal] = useState(false)
    const [modalType, setModalType] = useState("") // category, banner, product, story, item
    const [editingItem, setEditingItem] = useState(null)
    const fileInputRef = useRef(null)

    const handleOpenModal = (type, item = null) => {
        setModalType(type)
        setEditingItem(item)
        setShowUploadModal(true)
    }

    return (
        <div className="p-4 lg:p-8 bg-[#F8F9FB] min-h-screen font-sans selection:bg-black selection:text-white">
            <div className="max-w-7xl mx-auto">

                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <span className="px-2 py-0.5 bg-black text-white text-[10px] font-black uppercase tracking-widest rounded">Admin</span>
                            <ChevronRight className="w-3 h-3 text-neutral-300" />
                            <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">{activeTab === "overview" ? "Dashboard" : activeTab}</span>
                        </div>
                        <h1 className="text-4xl font-black text-neutral-900 tracking-tighter">
                            {activeTab === "overview" && "Hibermart Control"}
                            {activeTab === "grocery" && "Grocery & Kitchen"}
                            {activeTab === "beauty" && "Beauty & Wellness"}
                            {activeTab === "household" && "Household & Lifestyle"}
                            {activeTab === "newly-launched" && "New Launches"}
                            {activeTab === "best-sellers" && "Bestselling Row"}
                            {activeTab === "banners" && "Campaign Manager"}
                            {activeTab === "sale" && "Mega Sale Op"}
                            {activeTab === "stories" && "Story Studio"}
                            {activeTab === "inventory" && "Stock Control"}
                            {activeTab === "orders" && "Order Hub"}
                            {activeTab === "settings" && "Store Settings"}
                        </h1>
                        <p className="text-neutral-500 font-medium mt-1">
                            {activeTab === "overview" && "Manage your storefront assets and campaigns here."}
                            {activeTab !== "overview" && `Configure and optimize the ${activeTab.replace("-", " ")} section items.`}
                        </p>
                    </div>
                </div>

                {/* Tab Content */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                    >
                        {activeTab === "overview" && <DashboardOverview />}

                        {/* Catalog Sections */}
                        {activeTab === "grocery" && (
                            <NestedManagement
                                rootName="Grocery & Kitchen"
                                items={catalogData.grocery}
                                path={currentPath}
                                setPath={setCurrentPath}
                                onAdd={() => handleOpenModal("item")}
                                onEdit={(item) => handleOpenModal("item", item)}
                            />
                        )}
                        {activeTab === "beauty" && (
                            <NestedManagement
                                rootName="Beauty & Wellness"
                                items={catalogData.beauty}
                                path={currentPath}
                                setPath={setCurrentPath}
                                onAdd={() => handleOpenModal("item")}
                                onEdit={(item) => handleOpenModal("item", item)}
                            />
                        )}
                        {activeTab === "household" && (
                            <NestedManagement
                                rootName="Household & Lifestyle"
                                items={catalogData.household}
                                path={currentPath}
                                setPath={setCurrentPath}
                                onAdd={() => handleOpenModal("item")}
                                onEdit={(item) => handleOpenModal("item", item)}
                            />
                        )}

                        {/* Collection Sections */}
                        {activeTab === "newly-launched" && (
                            <ManagementGrid
                                title="New Launches"
                                subtitle="Recently added products shown in the 'New' section."
                                items={[]}
                                onAdd={() => handleOpenModal("product")}
                                onEdit={(item) => handleOpenModal("product", item)}
                                type="product"
                            />
                        )}
                        {activeTab === "best-sellers" && (
                            <ManagementGrid
                                title="Best Sellers"
                                subtitle="Top performing products row management."
                                items={[]}
                                onAdd={() => handleOpenModal("product")}
                                onEdit={(item) => handleOpenModal("product", item)}
                                type="product"
                            />
                        )}

                        {/* Campaign Sections */}
                        {activeTab === "banners" && (
                            <ManagementGrid
                                title="Banner Campaigns"
                                subtitle="Hero, promo, and special price banners for your storefront."
                                items={banners}
                                onAdd={() => handleOpenModal("banner")}
                                onEdit={(item) => handleOpenModal("banner", item)}
                                type="banner"
                            />
                        )}
                        {activeTab === "sale" && (
                            <ManagementGrid
                                title="Big Sale Operations"
                                subtitle="Control products appearing in the mega sale sunburst section."
                                items={saleItems}
                                onAdd={() => handleOpenModal("product")}
                                onEdit={(item) => handleOpenModal("product", item)}
                                type="sale"
                            />
                        )}
                        {activeTab === "stories" && (
                            <ManagementGrid
                                title="Store Stories"
                                subtitle="Instagram-style short clips and highlight banners for your homepage."
                                items={stories}
                                onAdd={() => handleOpenModal("story")}
                                onEdit={(item) => handleOpenModal("story", item)}
                                type="story"
                            />
                        )}

                        {/* Ops & Settings */}
                        {activeTab === "inventory" && (
                            <div className="bg-white p-12 rounded-[3rem] text-center border-2 border-dashed border-neutral-100">
                                <Package className="w-12 h-12 text-neutral-200 mx-auto mb-4" />
                                <h3 className="text-xl font-black text-neutral-900">Inventory Search Module</h3>
                                <p className="text-neutral-500 max-w-sm mx-auto mt-2">Functional inventory management is currently in development. You will be able to search and track stock levels here.</p>
                            </div>
                        )}
                        {activeTab === "orders" && (
                            <div className="bg-white p-12 rounded-[3rem] text-center border-2 border-dashed border-neutral-200">
                                <Truck className="w-12 h-12 text-neutral-200 mx-auto mb-4" />
                                <h3 className="text-xl font-black text-neutral-900">Order Processing Hub</h3>
                                <p className="text-neutral-500 max-w-sm mx-auto mt-2">Your live store orders will appear here for processing and fulfillment tracking.</p>
                            </div>
                        )}
                        {activeTab === "settings" && (
                            <div className="bg-white p-12 rounded-[3rem] text-center border-2 border-dashed border-neutral-100">
                                <Monitor className="w-12 h-12 text-neutral-200 mx-auto mb-4" />
                                <h3 className="text-xl font-black text-neutral-900">Hibermart Global Settings</h3>
                                <p className="text-neutral-500 max-w-sm mx-auto mt-2">Control store-wide themes, delivery radiuses, and system-level configurations.</p>
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>

                {/* Management Modal */}
                {showUploadModal && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 sm:p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="absolute inset-0 bg-neutral-900/60 backdrop-blur-sm"
                            onClick={() => setShowUploadModal(false)}
                        />
                        <motion.div
                            initial={{ y: "100%", opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            className="relative bg-white w-full sm:max-w-2xl sm:rounded-[3rem] rounded-t-[2.5rem] shadow-2xl overflow-hidden max-h-[95vh] flex flex-col mt-auto sm:mt-0"
                        >
                            <div className="p-6 sm:p-10 overflow-y-auto">
                                <div className="flex justify-between items-center mb-6 sm:mb-8">
                                    <div>
                                        <h3 className="text-xl sm:text-2xl font-black text-neutral-900">
                                            {editingItem ? "Edit Existing" : "Create New"} {modalType}
                                        </h3>
                                        <p className="text-[10px] sm:text-sm font-bold text-neutral-400">Configure visual and operational aspects.</p>
                                    </div>
                                    <button onClick={() => setShowUploadModal(false)} className="p-2 sm:p-3 bg-neutral-50 hover:bg-neutral-100 rounded-xl sm:rounded-2xl transition-all">
                                        <X className="w-5 h-5 text-neutral-400" />
                                    </button>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                                    <div className="sm:col-span-2">
                                        <label className="text-[9px] font-black uppercase text-neutral-400 tracking-widest block mb-2">Display Title / Product Name</label>
                                        <input type="text" defaultValue={editingItem?.name || editingItem?.title} placeholder="e.g. Fresh Spinach..." className="w-full bg-neutral-50 border border-neutral-200 rounded-xl sm:rounded-2xl px-4 py-3 sm:px-5 sm:py-4 text-sm font-bold focus:ring-2 focus:ring-black outline-none transition-all" />
                                    </div>

                                    <div>
                                        <label className="text-[9px] font-black uppercase text-neutral-400 tracking-widest block mb-1.5 sm:mb-2">Weight / Qty</label>
                                        <input type="text" defaultValue={editingItem?.weight} placeholder="e.g. 1 Bunch / 500g..." className="w-full bg-neutral-50 border border-neutral-200 rounded-xl sm:rounded-2xl px-4 py-3 text-sm font-bold focus:ring-2 focus:ring-black outline-none transition-all" />
                                    </div>
                                    <div>
                                        <label className="text-[9px] font-black uppercase text-neutral-400 tracking-widest block mb-1.5 sm:mb-2">Delivery Time</label>
                                        <input type="text" defaultValue={editingItem?.time} placeholder="e.g. 10 MINS..." className="w-full bg-neutral-50 border border-neutral-200 rounded-xl sm:rounded-2xl px-4 py-3 text-sm font-bold focus:ring-2 focus:ring-black outline-none transition-all" />
                                    </div>

                                    <div>
                                        <label className="text-[9px] font-black uppercase text-neutral-400 tracking-widest block mb-1.5 sm:mb-2">Selling Price (₹)</label>
                                        <input type="number" defaultValue={editingItem?.price} placeholder="0.00" className="w-full bg-neutral-50 border border-neutral-200 rounded-xl sm:rounded-2xl px-4 py-3 text-sm font-bold focus:ring-2 focus:ring-black outline-none transition-all" />
                                    </div>
                                    <div className="flex flex-col gap-4">
                                        <div>
                                            <label className="text-[9px] font-black uppercase text-neutral-400 tracking-widest block mb-1.5">Original Price (₹)</label>
                                            <input type="number" defaultValue={editingItem?.originalPrice} placeholder="0.00" className="w-full bg-neutral-50 border border-neutral-200 rounded-xl sm:rounded-2xl px-4 py-3 text-sm font-bold focus:ring-2 focus:ring-black outline-none transition-all" />
                                        </div>
                                    </div>

                                    <div className="sm:col-span-2">
                                        <label className="text-[9px] font-black uppercase text-neutral-400 tracking-widest block mb-1.5 sm:mb-2">Offer / Discount (e.g. 20% OFF)</label>
                                        <input type="text" defaultValue={editingItem?.discount} placeholder="e.g. 20% OFF..." className="w-full bg-neutral-50 border border-neutral-200 rounded-xl sm:rounded-2xl px-4 py-3 text-sm font-bold focus:ring-2 focus:ring-black outline-none transition-all" />
                                    </div>

                                    <div className="sm:col-span-2">
                                        <label className="text-[9px] font-black uppercase text-neutral-400 tracking-widest block mb-2">Visual Media (Cloud URL)</label>
                                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                                            <div className="flex-1">
                                                <input type="text" defaultValue={editingItem?.image} placeholder="Paste image URL here..." className="w-full bg-neutral-50 border border-neutral-200 rounded-xl sm:rounded-2xl px-4 py-3 sm:px-5 sm:py-4 text-sm font-bold focus:ring-2 focus:ring-black outline-none transition-all" />
                                            </div>
                                            <button onClick={() => fileInputRef.current?.click()} className="px-6 py-3 sm:py-0 bg-neutral-100 rounded-xl sm:rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-neutral-200 transition-all">
                                                Upload
                                            </button>
                                            <input type="file" ref={fileInputRef} className="hidden" />
                                        </div>
                                    </div>

                                    <button className="sm:col-span-2 bg-black text-white py-4 sm:py-5 rounded-xl sm:rounded-2xl font-black text-[10px] sm:text-xs uppercase tracking-widest shadow-xl shadow-black/10 hover:bg-neutral-800 hover:-translate-y-1 active:translate-y-0 transition-all mt-4 sm:mt-6">
                                        {editingItem ? "Update Changes" : "Create Card"}
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}

            </div>
        </div>
    )
}

function DashboardOverview() {
    return (
        <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { label: "Active Products", value: "1,204", icon: Package, color: "bg-blue-50 text-blue-600" },
                    { label: "Monthly Rev", value: "₹45.2L", icon: CreditCard, color: "bg-emerald-50 text-emerald-600" },
                    { label: "Active Promos", value: "12", icon: Tag, color: "bg-amber-50 text-amber-600" },
                    { label: "Store Users", value: "892", icon: Users, color: "bg-purple-50 text-purple-600" },
                ].map((item, idx) => (
                    <div key={idx} className="bg-white p-6 rounded-[2rem] border border-neutral-100 shadow-sm hover:shadow-md transition-shadow group">
                        <div className="flex items-center justify-between mb-4">
                            <div className={`p-3 rounded-2xl ${item.color}`}>
                                <item.icon className="w-5 h-5" />
                            </div>
                            <button className="p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <Plus className="w-4 h-4 text-neutral-300" />
                            </button>
                        </div>
                        <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">{item.label}</p>
                        <h4 className="text-2xl font-black text-neutral-900 mt-1">{item.value}</h4>
                    </div>
                ))}
            </div>

            {/* Main Grid: Preview & Tasks */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white rounded-[3rem] p-8 border border-neutral-100 shadow-sm">
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="text-xl font-black text-neutral-900">Recent Campaign Performance</h3>
                        <button className="text-xs font-bold text-neutral-400 hover:text-black transition-colors uppercase tracking-widest">Full Report</button>
                    </div>
                    <div className="space-y-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="flex items-center justify-between p-4 bg-neutral-50 rounded-2xl border border-neutral-100 group hover:bg-white hover:shadow-sm transition-all">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-neutral-200 rounded-xl overflow-hidden">
                                        <img src={`https://picsum.photos/seed/${i + 10}/100/100`} alt="" className="w-full h-full object-cover" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-black text-neutral-800">Summer Blast Sale {i}</p>
                                        <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Expires in {i * 2} days</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-6">
                                    <div className="text-right">
                                        <p className="text-sm font-black text-emerald-600">+₹12,400</p>
                                        <p className="text-[9px] font-bold text-neutral-400 uppercase tracking-[0.1em]">Revenue</p>
                                    </div>
                                    <ChevronRight className="w-4 h-4 text-neutral-300" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-[#1a1a1a] rounded-[3rem] p-8 text-white relative overflow-hidden group">
                    <h3 className="text-xl font-black mb-1 relative z-10">Store Health</h3>
                    <p className="text-neutral-500 text-sm font-bold mb-8 relative z-10">Systems are performing optimally.</p>

                    <div className="space-y-6 relative z-10">
                        <div className="flex items-center gap-4">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_10px_#10b981]" />
                            <span className="text-xs font-bold uppercase tracking-widest">Inventory Sync</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_10px_#10b981]" />
                            <span className="text-xs font-bold uppercase tracking-widest">CDN Assets Live</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="w-1.5 h-1.5 rounded-full bg-amber-500 shadow-[0_0_10px_#f59e0b]" />
                            <span className="text-xs font-bold uppercase tracking-widest">2 Slow Queries Detected</span>
                        </div>
                    </div>

                    <div className="mt-12 relative z-10">
                        <button className="bg-white text-black px-6 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:scale-105 transition-transform">
                            Run Maintenance
                        </button>
                    </div>

                    <Monitor className="absolute -right-10 -bottom-10 w-48 h-48 opacity-10 group-hover:rotate-12 transition-transform duration-700" />
                </div>
            </div>
        </div>
    )
}

function NestedManagement({ rootName, items, path, setPath, onAdd, onEdit }) {
    // Current level data finder
    const getCurrentLevelItems = () => {
        let current = items
        for (const segment of path) {
            const found = current.find(i => i.id === segment.id)
            if (found && found.children) {
                current = found.children
            } else {
                return []
            }
        }
        return current
    }

    const currentItems = getCurrentLevelItems()
    const isProductView = currentItems.length > 0 && currentItems[0].type === "product"

    return (
        <div className="space-y-6">
            {/* Breadcrumb Navigation */}
            <div className="flex items-center gap-2 mb-4 bg-white/50 backdrop-blur p-2 rounded-2xl w-fit border border-neutral-100">
                <button
                    onClick={() => setPath([])}
                    className={`text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg transition-all ${path.length === 0 ? "bg-black text-white" : "text-neutral-400 hover:text-black"}`}
                >
                    {rootName}
                </button>
                {path.map((segment, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                        <ChevronRight className="w-3 h-3 text-neutral-300" />
                        <button
                            onClick={() => setPath(path.slice(0, idx + 1))}
                            className={`text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg transition-all ${idx === path.length - 1 ? "bg-black text-white" : "text-neutral-400 hover:text-black"}`}
                        >
                            {segment.name}
                        </button>
                    </div>
                ))}
            </div>

            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-black text-neutral-900">
                        {path.length === 0 ? rootName : path[path.length - 1].name}
                    </h2>
                    <p className="text-sm font-medium text-neutral-500">
                        {isProductView ? "Manage individual product items in this row." : "Manage categories and sub-sections."}
                    </p>
                </div>
                <button onClick={onAdd} className="flex items-center gap-2 bg-black text-white px-6 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-lg hover:shadow-black/20 transition-all">
                    <Plus className="w-4 h-4" />
                    Add {isProductView ? "Product" : "Category"}
                </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-6">
                {currentItems.map((item) => (
                    item.type === "product" ? (
                        <HibermartProductCard
                            key={item.id}
                            product={item}
                            onEdit={() => onEdit(item)}
                        />
                    ) : (
                        <CategoryManagementCard
                            key={item.id}
                            item={item}
                            onClick={() => setPath([...path, { id: item.id, name: item.name }])}
                            onEdit={() => onEdit(item)}
                        />
                    )
                ))}

                <button onClick={onAdd} className="flex flex-col items-center justify-center aspect-square bg-neutral-50 border-2 border-dashed border-neutral-200 rounded-2xl sm:rounded-3xl hover:bg-neutral-100 transition-all group">
                    <div className="p-4 bg-white rounded-xl shadow-sm group-hover:scale-110 transition-transform text-neutral-400">
                        <Plus className="w-5 h-5" />
                    </div>
                </button>
            </div>
        </div>
    )
}

function CategoryManagementCard({ item, onClick, onEdit }) {
    return (
        <div className="group relative h-full">
            <div onClick={onClick} className="cursor-pointer bg-white rounded-[1.5rem] sm:rounded-[2rem] border border-neutral-100 shadow-sm overflow-hidden p-3 sm:p-4 group-hover:border-neutral-300 transition-all text-center h-full">
                <div className="aspect-square bg-[#F0F5FF] rounded-2xl sm:rounded-[1.5rem] overflow-hidden mb-3 sm:mb-4 p-2">
                    <img src={item.image} alt="" className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700" />
                </div>
                <h4 className="font-black text-neutral-900 text-[11px] sm:text-xs line-clamp-1">{item.name}</h4>
            </div>

            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center gap-2 z-20 rounded-[1.5rem] sm:rounded-[2rem]">
                <button onClick={(e) => { e.stopPropagation(); onEdit(); }} className="bg-white p-2.5 sm:p-3 rounded-full hover:scale-110 transition-transform shadow-lg group">
                    <Edit className="w-4 h-4 text-black group-hover:rotate-12 transition-transform" />
                </button>
                <button className="bg-white p-2.5 sm:p-3 rounded-full hover:scale-110 transition-transform shadow-lg group">
                    <Trash2 className="w-4 h-4 text-red-500 group-hover:scale-110 transition-transform" />
                </button>
            </div>
        </div>
    )
}

function HibermartProductCard({ product, onEdit }) {
    return (
        <div className="bg-white rounded-[1.5rem] sm:rounded-[2rem] border border-neutral-100 shadow-xl shadow-neutral-200/40 overflow-hidden group hover:border-black transition-all p-2 sm:p-3 relative h-full flex flex-col">
            {/* Sunburst Discount Badge */}
            <div className="absolute top-1.5 left-1.5 z-10 w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center">
                <div className="absolute inset-0 bg-[#7B61FF] rotate-45 rounded-md shadow-lg" />
                <div className="absolute inset-0 bg-[#7B61FF] rounded-md" />
                <span className="relative z-20 text-[7px] sm:text-[8px] font-black text-white leading-tight text-center px-0.5">
                    {product.discount ? product.discount.split(' ')[0] : '0%'}
                </span>
            </div>

            {/* Product Image */}
            <div className="aspect-square rounded-[1rem] sm:rounded-[1.5rem] overflow-hidden mb-3 relative bg-neutral-50 flex-shrink-0">
                <img src={product.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />

                {/* AD & Type Badge */}
                <div className="absolute bottom-1.5 left-1.5 flex items-center gap-1 bg-white/90 backdrop-blur px-1.5 py-0.5 rounded-md border border-neutral-200 shadow-sm">
                    <span className="text-[7px] font-black text-neutral-600 uppercase tracking-tighter">AD</span>
                    <div className="w-1.5 h-1.5 rounded-full border border-emerald-500 flex items-center justify-center">
                        <div className="w-0.5 h-0.5 bg-emerald-500 rounded-full" />
                    </div>
                </div>
            </div>

            {/* Details */}
            <div className="px-0.5 pb-1 space-y-0.5 flex-1 flex flex-col">
                <div className="flex items-center gap-1 text-neutral-400">
                    <Clock3 className="w-2.5 h-2.5" />
                    <span className="text-[8px] font-black uppercase tracking-widest">{product.time || '10 MINS'}</span>
                </div>

                <h4 className="font-black text-neutral-900 text-[11px] sm:text-xs line-clamp-2 leading-tight min-h-[1.8rem] sm:min-h-[2.2rem]">
                    {product.name}
                </h4>

                <p className="text-[8px] sm:text-[10px] font-bold text-neutral-400">{product.weight || '1 Unit'}</p>

                <div className="pt-2 mt-auto flex items-center justify-between">
                    <div>
                        <div className="flex flex-col">
                            <span className="text-sm sm:text-base font-black text-neutral-900 leading-none">₹{product.price || 0}</span>
                            {product.originalPrice && (
                                <span className="text-[8px] sm:text-[10px] font-bold text-neutral-300 line-through">₹{product.originalPrice}</span>
                            )}
                        </div>
                    </div>

                    <button className="flex items-center gap-1 border border-emerald-500 text-emerald-600 px-2 sm:px-3 py-1 rounded-lg font-black text-[9px] sm:text-[10px] hover:bg-emerald-50 transition-colors group/btn active:scale-95">
                        ADD <Plus className="w-2.5 h-2.5 group-hover/btn:rotate-90 transition-transform" />
                    </button>
                </div>
            </div>

            {/* Admin Actions Overlay on Hover */}
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 z-20 rounded-[1.5rem] sm:rounded-[2rem]">
                <button onClick={onEdit} className="bg-white p-2.5 sm:p-3 rounded-full hover:scale-110 transition-transform shadow-lg group">
                    <Edit className="w-4 h-4 sm:w-5 sm:h-5 text-black group-hover:rotate-12 transition-transform" />
                </button>
                <button className="bg-white p-2.5 sm:p-3 rounded-full hover:scale-110 transition-transform shadow-lg group">
                    <Trash2 className="w-4 h-4 sm:w-5 sm:h-5 text-red-500 group-hover:scale-110 transition-transform" />
                </button>
            </div>
        </div>
    )
}

function ManagementGrid({ title, subtitle, items, onAdd, onEdit, type }) {
    return (
        <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-black text-neutral-900">{title}</h2>
                    <p className="text-sm font-medium text-neutral-500">{subtitle}</p>
                </div>
                <button
                    onClick={onAdd}
                    className="flex items-center justify-center gap-2 bg-black text-white px-6 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-lg hover:shadow-black/20 hover:-translate-y-1 transition-all"
                >
                    <Plus className="w-4 h-4" />
                    Add New {type === "sale" ? "Product" : type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {items.map((item, idx) => (
                    <div key={idx} className="bg-white rounded-[2rem] border border-neutral-100 shadow-sm overflow-hidden group hover:border-neutral-300 transition-all relative">
                        <div className="relative aspect-video bg-neutral-100 overflow-hidden">
                            <img src={item.image} alt={item.name || item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 z-20">
                                <button onClick={() => onEdit(item)} className="bg-white p-3 rounded-full shadow-lg hover:scale-110 transition-transform">
                                    <Edit className="w-4 h-4 text-black" />
                                </button>
                                <button className="bg-white p-3 rounded-full shadow-lg hover:scale-110 transition-transform">
                                    <Trash2 className="w-4 h-4 text-red-500" />
                                </button>
                            </div>
                            {item.type && (
                                <span className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest">
                                    {item.type}
                                </span>
                            )}
                        </div>
                        <div className="p-6">
                            <div className="flex items-start justify-between gap-4">
                                <div>
                                    <h4 className="font-black text-neutral-900 text-lg leading-tight">{item.name || item.title}</h4>
                                    {item.price && <p className="text-sm font-bold text-neutral-500 mt-1">₹{item.price} • <span className="text-emerald-500">{item.discount} Off</span></p>}
                                    {!item.price && <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mt-1">Store Asset</p>}
                                </div>
                                <div className="flex flex-col items-center">
                                    <div className="w-8 h-8 rounded-full border border-neutral-100 flex items-center justify-center text-emerald-500 bg-emerald-50">
                                        <CheckCircle2 className="w-4 h-4" />
                                    </div>
                                    <span className="text-[8px] font-black text-neutral-300 uppercase mt-1">Live</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

                {/* Empty State / Add Skeleton */}
                <button
                    onClick={onAdd}
                    className="flex flex-col items-center justify-center aspect-square sm:aspect-auto sm:min-h-[18.5rem] bg-neutral-50 border-2 border-dashed border-neutral-200 rounded-[2rem] hover:bg-neutral-100 hover:border-neutral-300 transition-all group"
                >
                    <div className="p-4 bg-white rounded-2xl shadow-sm group-hover:scale-110 transition-transform">
                        <Plus className="w-6 h-6 text-neutral-400" />
                    </div>
                    <p className="text-xs font-black text-neutral-400 uppercase tracking-widest mt-4">Draft New {type}</p>
                </button>
            </div>
        </div>
    )
}
