import {
    LayoutDashboard,
    ShoppingBag,
    Image as ImageIcon,
    Tag,
    Star,
    Settings,
    Users,
    CreditCard,
    MessageSquare,
    Truck,
    Package,
    Box,
    Sparkles,
    Flame,
    Zap,
    Heart
} from "lucide-react"

export const hibermartSidebarMenuData = [
    {
        type: "link",
        label: "Store Overview",
        path: "/admin/hibermart",
        icon: "LayoutDashboard",
    },
    {
        type: "section",
        label: "CAMPAIGNS & CONTENT",
        items: [
            {
                type: "link",
                label: "Banners (Hero/Promo)",
                path: "/admin/hibermart/banners",
                icon: "ImageIcon",
            },
            {
                type: "link",
                label: "Stories & Highlights",
                path: "/admin/hibermart/stories",
                icon: "Star",
            },
        ],
    },
    {
        type: "section",
        label: "CURATED COLLECTIONS",
        items: [
            {
                type: "link",
                label: "Big Sale Section",
                path: "/admin/hibermart/sale",
                icon: "Tag",
            },
            {
                type: "link",
                label: "Newly Launched",
                path: "/admin/hibermart/newly-launched",
                icon: "Sparkles",
            },
            {
                type: "link",
                label: "Best Sellers",
                path: "/admin/hibermart/best-sellers",
                icon: "Flame",
            },
        ],
    },
    {
        type: "section",
        label: "CATEGORY CATALOG",
        items: [
            {
                type: "link",
                label: "Grocery & Kitchen",
                path: "/admin/hibermart/categories/grocery",
                icon: "ShoppingBag",
            },
            {
                type: "link",
                label: "Beauty & Wellness",
                path: "/admin/hibermart/categories/beauty",
                icon: "Heart",
            },
            {
                type: "link",
                label: "Household & Lifestyle",
                path: "/admin/hibermart/categories/household",
                icon: "Zap",
            },
        ],
    },
    {
        type: "section",
        label: "OPERATIONS",
        items: [
            {
                type: "link",
                label: "Inventory Search",
                path: "/admin/hibermart/inventory",
                icon: "Box",
            },
            {
                type: "link",
                label: "Orders to Process",
                path: "/admin/hibermart/orders",
                icon: "Truck",
            },
        ],
    },
    {
        type: "section",
        label: "PLATFORM ADMIN",
        items: [
            {
                type: "link",
                label: "Store Settings",
                path: "/admin/hibermart/settings",
                icon: "Settings",
            },
        ],
    },
]
