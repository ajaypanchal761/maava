import { useState, useCallback, useEffect, useMemo } from "react"
import { useNavigate, Link } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import {
  Search,
  ShoppingBag,
  Coffee,
  Home,
  Gamepad2,
  Apple,
  Headphones,
  Smartphone,
  Sparkles,
  Shirt,
  ChevronRight,
  Heart,
  Mic
} from "lucide-react"
import { Input } from "@/components/ui/input"
import AnimatedPage from "../components/AnimatedPage"
import { useSearchOverlay, useLocationSelector } from "../components/UserLayout"
import api from "@/lib/api"
import PageNavbar from "../components/PageNavbar"
import AddToCartButton from "../components/AddToCartButton"
import promoBanner from "@/assets/inmart/promo_banner.png"
import mccainFries from "@/assets/inmart/mccain_fries.png"

const saleProducts = [
  {
    id: 1,
    name: "McCain French Fries | Crispy & Ready to Cook",
    weight: "1 pack (1 kg)",
    price: 141,
    originalPrice: 297,
    discount: "52%",
    image: mccainFries,
    isNew: true
  },
  {
    id: 2,
    name: "Go Zero Mocha Fudge Brownie Low Calorie G...",
    weight: "1 pack (500 ml)",
    price: 180,
    originalPrice: 380,
    discount: "52%",
    image: "https://instamart-media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,h_544,w_504/NI_CATALOG/IMAGES/ciw/2025/12/17/524ebaf2-1947-4e09-a376-e6032a14ae9c_4MP8MFPI3S_MN_16122025.png"
  },
  {
    id: 3,
    name: "Godrej Chicken Breast | Boneless & Skinless",
    weight: "1 pack (500 g)",
    price: 165,
    originalPrice: 250,
    discount: "35%",
    image: "https://instamart-media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,h_544,w_504/NI_CATALOG/IMAGES/ciw/2025/12/18/842b7149-4588-438d-a98a-0f53bf7e8750_E0C013K89G_MN_18122025.png",
    isNew: true
  }
];

const newlyLaunched = [
  {
    id: 101,
    name: "Sunfeast Dark Fantasy Choco Fills",
    weight: "1 pack (300 g)",
    price: 99,
    originalPrice: 150,
    discount: "34%",
    image: "https://instamart-media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,h_544,w_504/caa15a5a7c1d16e06cfcecef9e1b489e",
    isNew: true
  },
  {
    id: 102,
    name: "Epigamia Greek Yogurt Strawberry",
    weight: "1 cup (90 g)",
    price: 45,
    originalPrice: 60,
    discount: "25%",
    image: "https://instamart-media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,h_544,w_504/NI_CATALOG/IMAGES/ciw/2025/12/17/7720168d-1424-4f15-8e72-67981b569817_KO8FJ6RXVV_MN_16122025.png",
    isNew: true
  },
  {
    id: 103,
    name: "Raw Pressery Cold Pressed Juice",
    weight: "1 bottle (250 ml)",
    price: 75,
    originalPrice: 100,
    discount: "25%",
    image: "https://instamart-media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,h_544,w_504/NI_CATALOG/IMAGES/CIW/2026/1/12/f3f605db-4a7c-4427-8023-964d98f72e39_340_1.png",
    isNew: true
  }
];

const bestSellers = [
  {
    id: 201,
    name: "Amul Taaza Toned Milk",
    weight: "1 L",
    price: 54,
    originalPrice: 56,
    discount: "3%",
    image: "https://instamart-media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,h_544,w_504/NI_CATALOG/IMAGES/ciw/2025/12/17/51a2cd89-2a42-4b2b-ac97-95288e02952d_TYF3262KU8_MN_16122025.png"
  },
  {
    id: 202,
    name: "Fortune Soya Health Refined Soyabean Oil",
    weight: "1 L",
    price: 115,
    originalPrice: 145,
    discount: "20%",
    image: "https://instamart-media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_304/NI_CATALOG/IMAGES/CIW/2026/1/9/a54d1b9a-f1a9-4846-a24a-66208271590c_266_1.png"
  },
  {
    id: 203,
    name: "Aashirvaad Superior MP Whole Wheat Atta",
    weight: "5 kg",
    price: 245,
    originalPrice: 285,
    discount: "14%",
    image: "https://instamart-media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_304/NI_CATALOG/IMAGES/ciw/2025/12/16/5629ecac-0e29-4e80-bd3a-08fd5c5d8a24_X6CGC0Y38M_MN_15122025.png"
  }
];

const groceryKitchenItems = [
  {
    id: 1,
    name: "Fresh Vegetables",
    slug: "fresh-vegetables",
    image: "https://instamart-media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_200/NI_CATALOG/IMAGES/CIW/2025/10/8/323b2564-9fa9-43dd-9755-b5df299797d7_a7f60fc5-47fa-429d-9fd1-5f0644c0d4e3"
  },
  {
    id: 2,
    name: "Fresh Fruits",
    slug: "fresh-fruits",
    image: "https://instamart-media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_200/NI_CATALOG/IMAGES/CIW/2025/12/5/13a82fb6-aac6-4a94-af24-3a9522876d76_a27e7cc7-8e5f-4264-b978-c51531625dde"
  },
  {
    id: 3,
    name: "Dairy, Bread and Eggs",
    slug: "dairy-bread-eggs",
    image: "https://instamart-media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_200/NI_CATALOG/IMAGES/CIW/2025/12/24/ceb53190-72a3-466b-a892-8989615788c9_fe00456c-3b5a-4e74-80e2-c274a4c9f818.png"
  },
  {
    id: 4,
    name: "Meat and Seafood",
    slug: "meat-seafood",
    image: "https://instamart-media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_200/NI_CATALOG/IMAGES/CIW/2025/10/8/9c48b537-eef1-4047-becb-ddb7e79c373d_72aac542-4cef-4cf9-a9dd-5f1b862165c1"
  }
];

const beautyWellnessItems = [
  {
    id: 1,
    name: "Bath and Body",
    image: "https://instamart-media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_200/NI_CATALOG/IMAGES/CIW/2025/10/8/46b1b550-1e5f-423e-967b-e1cf3a608bb8_13bc4f93-eab7-4263-a592-54f144d0eec6"
  },
  {
    id: 2,
    name: "Hair Care",
    image: "https://instamart-media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_200/NI_CATALOG/IMAGES/CIW/2025/10/8/73dd2be1-fd81-4540-8286-02db395de0e5_5da6d646-978e-4b00-bfd4-63cbe897c0b2"
  },
  {
    id: 3,
    name: "Skincare",
    image: "https://instamart-media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_200/NI_CATALOG/IMAGES/CIW/2025/10/8/d6930a4e-6a3c-44c9-8b6b-86f63e20434a_0c08d4e2-6423-4a9e-ad4b-35b339a149b0"
  },
  {
    id: 4,
    name: "Makeup",
    image: "https://instamart-media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_200/NI_CATALOG/IMAGES/CIW/2025/10/8/7c05fd2b-1ea8-4ce4-9b9e-0ba402d3f698_b802ea7a-3d08-44f0-ac8e-4793e4806f67"
  },
  {
    id: 5,
    name: "Oral Care",
    image: "https://instamart-media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_200/NI_CATALOG/IMAGES/CIW/2025/12/5/d753ff8d-4cdb-4548-bba2-b10e480cc6b2_28cfcd55-1e7f-4333-a5d5-15c023b8b58d"
  },
  {
    id: 6,
    name: "Grooming",
    image: "https://instamart-media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_200/NI_CATALOG/IMAGES/CIW/2025/10/8/6fd76e5f-016b-4810-94fd-252eab4245a6_2edc9535-9e14-49cf-a05e-25fa4ca45cb8"
  },
  {
    id: 7,
    name: "Baby Care",
    image: "https://instamart-media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_200/NI_CATALOG/IMAGES/CIW/2025/10/8/838ef0d0-8687-447a-8520-95b6700b70f6_a08f1496-3e1f-425f-bdd5-90d1e2bfce5d"
  },
  {
    id: 8,
    name: "Fragrances",
    image: "https://instamart-media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_200/NI_CATALOG/IMAGES/CIW/2025/10/8/d0f1c0f3-5dc4-422e-9120-222c0afc4043_2588dd56-663e-43f0-a14b-1a537b8301a9"
  }
];

const householdLifestyleItems = [
  {
    id: 1,
    name: "Home and Furnishing",
    image: "https://instamart-media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_200/NI_CATALOG/IMAGES/CIW/2025/10/8/28f9da5d-40d0-4791-9ad7-824e041320ff_dbef4796-189f-4a9f-86f7-f896aa5fddb2"
  },
  {
    id: 2,
    name: "Kitchen and Dining",
    image: "https://instamart-media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_200/NI_CATALOG/IMAGES/CIW/2025/10/8/66ea9503-f944-4f5f-bb44-8608a0355e3a_ee7d3d13-c857-4e5a-96b1-3c79da306b9e"
  },
  {
    id: 3,
    name: "Cleaning Essentials",
    image: "https://instamart-media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_200/NI_CATALOG/IMAGES/CIW/2025/10/8/b332fa4a-4a15-4c32-8bb8-f46b34ef13d5_ff40260d-3a00-40e7-b019-69ecebed8a91"
  },
  {
    id: 4,
    name: "Clothing",
    image: "https://instamart-media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_200/NI_CATALOG/IMAGES/CIW/2025/10/8/93cce7bf-96cc-4ff6-adfc-a248c2a8cb94_783cd072-3e52-4daf-996a-4652d000d943"
  },
  {
    id: 5,
    name: "Mobiles and Electronics",
    image: "https://instamart-media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_200/NI_CATALOG/IMAGES/CIW/2025/11/6/7b165e34-9f50-4dc8-ae7d-85f85aadad7a_e6d790c1-88b0-4922-901c-1584d65cf264"
  },
  {
    id: 6,
    name: "Appliances",
    image: "https://instamart-media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_200/NI_CATALOG/IMAGES/CIW/2025/11/6/78c66d7c-517c-4b60-b879-bca877df5850_68de0373-8d3b-4945-8e81-60b93b732cc8"
  },
  {
    id: 7,
    name: "Books and Stationery",
    image: "https://instamart-media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_200/NI_CATALOG/IMAGES/CIW/2025/10/8/e1e37212-1b34-4711-927e-bce563247de7_60934c30-e762-4a81-ba56-8bf6f30b6766"
  },
  {
    id: 8,
    name: "Jewellery and Accessories",
    image: "https://instamart-media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_200/NI_CATALOG/IMAGES/CIW/2025/10/8/8e5a7ca9-0291-4e6a-8691-1c1bddb4e642_da8cf6a8-0e6d-4fb4-8e7d-9e1688b9cd07"
  },
  {
    id: 9,
    name: "Puja",
    image: "https://instamart-media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_200/NI_CATALOG/IMAGES/CIW/2025/10/8/965c898a-bc67-4fe8-8fd4-d13e1eb79772_c38285f9-727d-422b-ad77-e1e22d4d251d"
  },
  {
    id: 10,
    name: "Toys and Games",
    image: "https://instamart-media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_200/NI_CATALOG/IMAGES/CIW/2025/10/8/79f943d8-2977-4753-bab0-1a74f582d6b8_7a341dcf-099f-4617-a44f-d28c55de560a"
  },
  {
    id: 11,
    name: "Sports and Fitness",
    image: "https://instamart-media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_200/NI_CATALOG/IMAGES/CIW/2025/10/8/06414bae-6149-4a26-8ca5-a5afffb3f753_171a212b-1edd-4a68-a424-46e240270a3b"
  },
  {
    id: 12,
    name: "Pet Supplies",
    image: "https://instamart-media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_200/NI_CATALOG/IMAGES/CIW/2025/10/8/b936925b-340a-4d1a-a423-0ecbc989d8ee_f70daa6c-8b2f-45d5-86e5-ced16b437ce4"
  }
];

const ProductCard = ({ product }) => (
  <div className="flex-shrink-0 w-[145px] sm:w-[175px] md:w-[200px] lg:w-[225px] bg-white dark:bg-[#1a1a1a] rounded-2xl p-2 md:p-3 relative shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-gray-100/50 dark:border-white/5 group">
    {/* Discount Badge */}
    <div className="absolute top-0 left-0 z-10">
      <div className="relative">
        <svg width="42" height="42" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="sm:w-11 sm:h-11 drop-shadow-sm">
          <path d="M24 0L27.9 5.7L34.5 4.5L36.3 11.1L42.9 12.9L41.7 19.5L47.4 23.4L41.7 27.3L42.9 33.9L36.3 35.7L34.5 42.3L27.9 41.1L24 46.8L20.1 41.1L13.5 42.3L11.7 35.7L5.1 33.9L6.3 27.3L0.6 23.4L6.3 19.5L5.1 12.9L11.7 11.1L13.5 4.5L20.1 5.7L24 0Z" fill="#8B5CF6" />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white font-[900] leading-none">
          <span className="text-[10px] sm:text-[11px]">{product.discount}</span>
          <span className="text-[8px] sm:text-[9px] uppercase -mt-0.5">OFF</span>
        </div>
      </div>
    </div>

    {/* New Tag */}
    {product.isNew && (
      <div className="absolute top-2 right-2 z-10 bg-[#FF5C5C] text-white text-[9px] sm:text-[10px] md:text-xs font-black px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-md flex items-center justify-center shadow-sm">
        NEW
      </div>
    )}

    {/* Product Image Area */}
    <div className="relative aspect-square w-full mb-2 bg-gray-50/50 dark:bg-white/5 rounded-xl flex items-center justify-center p-1.5 overflow-hidden">
      <img src={product.image} alt={product.name} className="w-full h-full object-contain transform group-hover:scale-105 transition-transform duration-300" />

      {/* Liked Heart Icon - Moved to bottom right of image area */}
      <button className="absolute bottom-1 right-1 p-1 bg-white/80 dark:bg-black/50 backdrop-blur-sm rounded-full shadow-sm border border-gray-100/50 dark:border-white/10 opacity-0 group-hover:opacity-100 transition-all">
        <Heart size={14} className="text-[#FF725E] fill-current" />
      </button>
    </div>

    {/* Product Details */}
    <div className="px-1 space-y-0.5">
      <h3 className="text-[13px] font-bold text-gray-800 dark:text-gray-100 line-clamp-2 leading-[1.2] tracking-tight min-h-[32px]">
        {product.name}
      </h3>
      <p className="text-[11px] font-semibold text-gray-500 dark:text-gray-400">
        {product.weight}
      </p>
    </div>

    {/* Price and Add Button */}
    <div className="mt-2.5 px-1 flex items-center justify-between gap-1">
      <div className="flex flex-col leading-none">
        <span className="text-sm font-[900] text-gray-900 dark:text-white tracking-tighter">₹{product.price}</span>
        {product.originalPrice && (
          <span className="text-[10px] text-gray-400 line-through tracking-tighter decoration-1">₹{product.originalPrice}</span>
        )}
      </div>
      <AddToCartButton
        item={{
          ...product,
          restaurant: "Hibermart",
          restaurantId: "hibermart-id"
        }}
        className="flex-1 max-w-[65px]"
      />
    </div>
  </div>
);

const NewlyLaunchedCard = ({ product }) => (
  <div className="flex-shrink-0 w-[150px] sm:w-[185px] md:w-[210px] bg-white dark:bg-[#1a1a1a] rounded-2xl overflow-hidden relative shadow-[0_2px_12px_rgba(0,0,0,0.06)] border border-gray-100 dark:border-white/5 group flex flex-col h-full">
    {/* Product Image Area */}
    <div className="relative aspect-square w-full bg-[#F5F5F5] dark:bg-white/5 flex items-center justify-center p-2 overflow-hidden">
      <img
        src={product.image}
        alt={product.name}
        className="w-[85%] h-[85%] object-contain transform group-hover:scale-110 transition-transform duration-500 ease-out"
      />

      {/* Discount Badge - Top Left */}
      <div className="absolute top-1 left-1 z-10 scale-90 sm:scale-100 origin-top-left">
        <div className="relative">
          <svg width="42" height="42" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-md">
            <path d="M24 0L27.9 5.7L34.5 4.5L36.3 11.1L42.9 12.9L41.7 19.5L47.4 23.4L41.7 27.3L42.9 33.9L36.3 35.7L34.5 42.3L27.9 41.1L24 46.8L20.1 41.1L13.5 42.3L11.7 35.7L5.1 33.9L6.3 27.3L0.6 23.4L6.3 19.5L5.1 12.9L11.7 11.1L13.5 4.5L20.1 5.7L24 0Z" fill="#8B5CF6" />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white leading-none">
            <span className="text-[10px] font-black">{product.discount}</span>
            <span className="text-[7px] font-black uppercase">OFF</span>
          </div>
        </div>
      </div>

      {/* New Tag - Top Right */}
      {product.isNew && (
        <div className="absolute top-2 right-2 z-10 bg-[#FF5C5C] text-white text-[9px] font-black px-2 py-0.5 rounded-md shadow-sm border border-white/20">
          NEW
        </div>
      )}

      {/* Liked Heart Icon */}
      <button className="absolute bottom-2 right-2 p-1.5 bg-white/90 dark:bg-black/50 backdrop-blur-sm rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
        <Heart size={14} className="text-[#FF725E] fill-current" />
      </button>
    </div>

    {/* Product Details */}
    <div className="p-3 flex flex-col flex-1">
      <div className="flex-1 space-y-1">
        <h3 className="text-[14px] font-[800] text-[#101828] dark:text-gray-100 line-clamp-2 leading-[1.3] tracking-tight min-h-[36px]">
          {product.name}
        </h3>
        <p className="text-[11px] font-bold text-slate-500 dark:text-gray-400">
          {product.weight}
        </p>
      </div>

      {/* Price and Add Button */}
      <div className="mt-3 flex items-center justify-between gap-2">
        <div className="flex flex-col">
          <span className="text-base font-black text-[#101828] dark:text-white leading-none">₹{product.price}</span>
          {product.originalPrice && (
            <span className="text-[11px] text-slate-400 line-through font-bold mt-0.5">₹{product.originalPrice}</span>
          )}
        </div>
        <AddToCartButton
          item={{
            ...product,
            restaurant: "Hibermart",
            restaurantId: "hibermart-id"
          }}
          className="w-[75px] sm:w-[85px]"
        />
      </div>
    </div>
  </div>
);

const ProductSection = ({ title, products, onSeeAll, isNewlyLaunched = false }) => (
  <div className="mb-8">
    <div className="bg-white dark:bg-white/5 rounded-[2rem] sm:rounded-[3rem] p-4 sm:p-7 md:p-8 lg:p-10 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-100/50 dark:border-white/5">
      <div className="flex items-center justify-between mb-6 sm:mb-8 md:mb-10 px-1">
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
          {title}
        </h2>
        <button
          onClick={onSeeAll}
          className="text-green-600 font-bold text-sm sm:text-base hover:opacity-80 transition-opacity"
        >
          See all
        </button>
      </div>
      <div className="relative">
        <div
          className="flex items-center gap-4 sm:gap-6 overflow-x-auto scrollbar-hide pb-2 px-1"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch'
          }}
        >
          {products.map((product) => (
            isNewlyLaunched ? (
              <NewlyLaunchedCard key={product.id} product={product} />
            ) : (
              <ProductCard key={product.id} product={product} />
            )
          ))}
          <div className="min-w-[4px] h-full"></div>
        </div>
      </div>
    </div>
  </div>
);

export default function InMart() {
  const navigate = useNavigate()
  const [heroSearch, setHeroSearch] = useState("")
  const [activeCategory, setActiveCategory] = useState("All")

  const categoriesData = [
    { id: "all", name: "All", icon: ShoppingBag, color: "#8B5CF6" },
    { id: "home", name: "Home", icon: Home, color: "#64748B" },
    { id: "toys", name: "Toys", icon: Gamepad2, color: "#64748B" },
    { id: "fresh", name: "Fresh", icon: Apple, color: "#64748B" },
    { id: "electronics", name: "Electronics", icon: Headphones, color: "#64748B" },
    { id: "mobiles", name: "Mobiles", icon: Smartphone, color: "#64748B" },
    { id: "beauty", name: "Beauty", icon: Sparkles, color: "#64748B" },
    { id: "fashion", name: "Fashion", icon: Shirt, color: "#64748B" },
  ]

  // Zepto-style rotating placeholder
  const placeholderItems = useMemo(() => [
    'Search for "Milk"',
    'Search for "Bread"',
    'Search for "Eggs"',
    'Search for "Curd"',
    'Search for "Atta"',
    'Search for "Oil"',
    'Search for "Sugar"',
    'Search for "Tea"',
    'Search for "Coffee"',
  ], [])
  const [placeholderIndex, setPlaceholderIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % placeholderItems.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [placeholderItems.length])

  const { openSearch, closeSearch, setSearchValue } = useSearchOverlay()
  const { openLocationSelector } = useLocationSelector()

  const [inMartHeroBanner, setInMartHeroBanner] = useState(null)

  useEffect(() => {
    const fetchInMartHeroBanner = async () => {
      try {
        const response = await api.get('/hero-banners/dining/public')
        if (response.data.success && response.data.data.banners && response.data.data.banners.length > 0) {
          setInMartHeroBanner(response.data.data.banners[0])
        }
      } catch (error) {
        console.error("Failed to fetch in-mart hero banner", error)
      }
    }
    fetchInMartHeroBanner()
  }, [])


  const handleSearchFocus = useCallback(() => {
    if (heroSearch) {
      setSearchValue(heroSearch)
    }
    openSearch()
  }, [heroSearch, openSearch, setSearchValue])



  return (
    <AnimatedPage
      className="bg-white dark:bg-[#0a0a0a] scrollbar-hide"
      style={{
        minHeight: '100vh',
        paddingBottom: '80px',
        overflowY: 'auto',
        msOverflowStyle: 'none',
        scrollbarWidth: 'none'
      }}
    >
      <style>
        {`
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
        `}
      </style>
      {/* Unified Navbar & Hero Section */}
      <div
        className="relative w-full overflow-hidden lg:min-h-[35vh] md:pt-4"
        style={{
          background: 'linear-gradient(180deg, #D3AEFE 0%, #E7D1FF 100%)'
        }}
      >
        {/* Navbar */}
        <div className="relative z-20 pt-1 sm:pt-3 lg:pt-4">
          <PageNavbar
            textColor="black"
            zIndex={20}
          />
        </div>

        {/* Hero Section with Search */}
        <section className="relative z-20 w-full px-4 sm:px-6 lg:px-8 xl:px-12 mt-4 sm:mt-6 md:mt-8 py-4 sm:py-8">
          <div className="max-w-7xl lg:max-w-[1400px] xl:max-w-[1600px] mx-auto">
            <div className="relative w-full overflow-hidden">
              <div className="flex items-center gap-3 sm:gap-4 md:gap-5 lg:gap-6">
                {/* Search Input Container */}
                <div
                  className="relative flex-1 group cursor-pointer"
                  onClick={openSearch}
                >
                  <Search className="absolute left-4 sm:left-5 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-[#8B5CF6] transition-colors w-5 h-5 sm:w-6 sm:h-6" strokeWidth={2.5} />
                  <div className="w-full h-12 sm:h-14 md:h-16 bg-white dark:bg-[#1a1a1a] border-2 border-transparent group-hover:border-[#E7D1FF] rounded-2xl sm:rounded-[1.25rem] pl-12 sm:pl-14 pr-12 flex items-center shadow-[0_4px_20px_rgba(0,0,0,0.04)] transition-all">
                    <span className="text-gray-400 dark:text-gray-500 text-sm sm:text-base md:text-lg font-medium select-none truncate">
                      {placeholderItems[placeholderIndex]}
                    </span>
                  </div>
                  <Mic className="absolute right-4 sm:right-5 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-[#8B5CF6] transition-colors w-5 h-5 sm:w-6 sm:h-6" strokeWidth={2.5} />
                </div>

                {/* Trending Deals Toggle - Hidden on mobile, shown on md+ */}
                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="hidden md:flex flex-shrink-0 h-14 md:h-16 px-6 lg:px-8 rounded-2xl sm:rounded-[1.25rem] bg-white dark:bg-[#1a1a1a] shadow-[0_4px_20px_rgba(0,0,0,0.04)] items-center gap-3 border-2 border-transparent hover:border-[#FFEDEB] transition-all"
                >
                  <div className="p-2 bg-[#FFEDEB] dark:bg-[#FFEDEB]/10 rounded-xl">
                    <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-[#FF725E]" strokeWidth={2.5} />
                  </div>
                  <div className="flex flex-col items-start leading-tight">
                    <span className="text-[#FF725E] font-black text-[10px] lg:text-xs tracking-tighter uppercase italic">Trending</span>
                    <span className="text-[#FF725E] font-black text-sm lg:text-xl tracking-tighter uppercase italic">Deals</span>
                  </div>
                </motion.button>
              </div>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="relative z-20 w-full mt-1 sm:mt-2 pb-2 px-0 overflow-hidden">
          <div className="max-w-7xl lg:max-w-[1400px] xl:max-w-[1600px] mx-auto">
            <div
              className="flex items-center gap-4 sm:gap-6 md:gap-8 overflow-x-auto scrollbar-hide pb-1 px-4 sm:px-6 lg:px-8 xl:px-12"
              style={{
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
                WebkitOverflowScrolling: 'touch'
              }}
            >
              {categoriesData.map((cat) => {
                const isActive = activeCategory === cat.name;
                const Icon = cat.icon;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.name)}
                    className="flex flex-col items-center gap-1 sm:gap-2 group relative pb-3 px-1 transition-all hover:translate-y-[-2px] min-w-[60px] sm:min-w-[80px]"
                  >
                    <div className={`p-2 sm:p-3 rounded-xl transition-all ${isActive ? 'bg-green-50' : 'group-hover:bg-black/5'}`}>
                      <Icon
                        className="w-6 h-6 sm:w-8 sm:h-8 md:w-9 md:h-9"
                        color={isActive ? "#16A34A" : "black"}
                        strokeWidth={isActive ? 3 : 2.5}
                      />
                    </div>
                    <span
                      className={`text-[10px] sm:text-sm md:text-base font-bold transition-colors whitespace-nowrap text-center ${isActive ? 'text-green-600 opacity-100' : 'text-black opacity-60 group-hover:opacity-100'}`}
                    >
                      {cat.name}
                    </span>
                    {isActive && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="absolute bottom-0 left-0 right-0 h-1 bg-green-600 rounded-full"
                        style={{ width: '100%' }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </section>
      </div>

      {/* Banner Section */}
      <section className="relative z-20 w-full px-4 sm:px-6 lg:px-8 mt-4 sm:mt-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="w-full rounded-2xl sm:rounded-[2rem] overflow-hidden shadow-xl border border-purple-100 dark:border-white/10 bg-[#F3E8FF]"
          >
            <img
              src={promoBanner}
              alt="Zepto Promo Banner"
              className="w-full h-auto object-cover block"
            />
          </motion.div>
        </div>
      </section>

      {/* Special Price Interactive Banner */}
      <section className="relative z-20 w-full px-4 sm:px-6 lg:px-8 xl:px-12 mt-4 sm:mt-6 md:mt-8">
        <div className="max-w-7xl lg:max-w-[1400px] xl:max-w-[1600px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full bg-[#F3E8FF] border border-purple-100 dark:border-white/5 rounded-xl sm:rounded-2xl md:rounded-[1.5rem] py-3 sm:py-4 md:py-5 px-5 sm:px-8 md:px-10 flex items-center justify-start gap-4 sm:gap-6 shadow-sm hover:shadow-lg hover:bg-[#F0E4FF] transition-all cursor-pointer group"
          >
            {/* Gold Coin Icon */}
            <div className="flex-shrink-0 w-8 h-8 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-full flex items-center justify-center shadow-inner border-[1.5px] border-yellow-200 group-hover:rotate-12 transition-transform">
              <span className="text-white font-black text-lg sm:text-2xl md:text-3xl drop-shadow-sm">₹</span>
            </div>

            <div className="flex flex-col min-w-0">
              <span className="text-[#6B21A8] dark:text-purple-300 font-bold text-[12px] sm:text-xl md:text-2xl lg:text-3xl tracking-tighter uppercase leading-tight whitespace-nowrap">
                Special Prices for your 1st order
              </span>
            </div>

            <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
              <ChevronRight size={24} className="text-[#6B21A8]/40 md:w-8 md:h-8" strokeWidth={3} />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Big Sale Section */}
      <section className="relative z-20 w-full px-4 sm:px-6 lg:px-8 xl:px-12 mt-6 sm:mt-10 md:mt-14 pb-10">
        <div className="max-w-7xl lg:max-w-[1400px] xl:max-w-[1600px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full rounded-[2rem] sm:rounded-[3rem] md:rounded-[4rem] overflow-hidden py-8 sm:py-12 md:py-16 px-4 sm:px-8 md:px-12 shadow-xl border border-purple-100/50 relative"
            style={{
              background: 'linear-gradient(180deg, #D3AEFE 0%, #E7D1FF 100%)'
            }}
          >
            {/* Sunburst Background Effect */}
            <div className="absolute top-[-50px] left-0 right-0 h-[400px] sm:h-[700px] md:h-[900px] overflow-hidden pointer-events-none flex items-center justify-center">
              <div
                className="w-[1000px] h-[1000px] sm:w-[1600px] sm:h-[1600px] md:w-[2000px] md:h-[2000px] opacity-60 dark:opacity-30 animate-[spin_30s_linear_infinite]"
                style={{
                  background: `conic-gradient(
                    from 0deg,
                    transparent 0deg, 
                    transparent 5deg, 
                    rgba(255,255,255,0.8) 10deg, 
                    rgba(255,255,255,0.8) 20deg, 
                    transparent 25deg, 
                    transparent 45deg, 
                    rgba(255,255,255,0.8) 50deg, 
                    rgba(255,255,255,0.8) 60deg, 
                    transparent 65deg,
                    transparent 100deg,
                    rgba(255,255,255,0.8) 110deg,
                    rgba(255,255,255,0.8) 120deg,
                    transparent 125deg,
                    transparent 180deg,
                    rgba(255,255,255,0.8) 190deg, 
                    rgba(255,255,255,0.8) 200deg, 
                    transparent 205deg, 
                    transparent 235deg, 
                    rgba(255,255,255,0.8) 240deg, 
                    rgba(255,255,255,0.8) 250deg, 
                    transparent 255deg,
                    transparent 300deg,
                    rgba(255,255,255,0.8) 310deg,
                    rgba(255,255,255,0.8) 320deg,
                    transparent 325deg
                  )`,
                  maskImage: 'radial-gradient(circle, black 25%, transparent 65%)',
                  WebkitMaskImage: 'radial-gradient(circle, black 25%, transparent 65%)',
                }}
              />
            </div>

            {/* Section Header */}
            <div className="relative z-10 flex flex-col items-center mb-6 sm:mb-10 md:mb-14">
              <motion.h2
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                className="text-5xl sm:text-8xl md:text-9xl lg:text-[11rem] font-[1000] text-white italic tracking-tighter flex flex-col items-center select-none"
                style={{
                  WebkitTextStroke: '2px black',
                  textShadow: `
                    1px 1px 0px #000,
                    2px 2px 0px #000,
                    3px 3px 0px #000,
                    4px 4px 0px #000,
                    5px 5px 0px #000,
                    6px 6px 0px #000,
                    7px 7px 0px #000,
                    8px 8px 15px rgba(0,0,0,0.4)
                  `
                }}
              >
                BIG SALE
              </motion.h2>
            </div>

            {/* Product Carousel */}
            <div className="relative mb-6 sm:mb-10 md:mb-14">
              <div
                className="flex items-center gap-4 sm:gap-6 md:gap-8 overflow-x-auto scrollbar-hide pb-4 px-1"
                style={{
                  scrollbarWidth: 'none',
                  msOverflowStyle: 'none',
                  WebkitOverflowScrolling: 'touch'
                }}
              >
                {saleProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
                <div className="min-w-[4px] h-full"></div>
              </div>
            </div>

            {/* See All Button */}
            <div className="mt-0 px-2 sm:px-4 md:px-8 lg:px-12">
              <motion.button
                whileHover={{ scale: 1.01, y: -2 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => { }}
                className="w-full max-w-2xl mx-auto bg-[#EDE1FF] dark:bg-white/10 hover:bg-[#E5D4FF] text-gray-900 dark:text-white font-bold py-4 sm:py-5 md:py-6 rounded-2xl md:rounded-3xl flex items-center justify-center gap-3 text-base sm:text-xl lg:text-2xl transition-all shadow-md border border-black/5"
              >
                See all
                <ChevronRight size={24} className="stroke-[4px]" />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-7xl lg:max-w-[1400px] xl:max-w-[1600px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 pt-2 sm:pt-4 md:pt-6 lg:pt-8 pb-10">
        <ProductSection
          title="Newly Launched"
          products={newlyLaunched}
          onSeeAll={() => { }}
          isNewlyLaunched={true}
        />

        <ProductSection
          title="Best Sellers"
          products={bestSellers}
          onSeeAll={() => { }}
        />

        {/* Grocery & Kitchen Section */}
        <section className="mb-12">
          <div className="bg-white dark:bg-white/5 rounded-[2rem] sm:rounded-[3rem] p-6 sm:p-7 md:p-8 lg:p-10 shadow-[0_4px_25px_rgba(0,0,0,0.03)] border border-gray-100/50 dark:border-white/5">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-8 px-1">
              Grocery & Kitchen
            </h2>
            <div className="grid grid-cols-4 gap-2 sm:gap-4 md:gap-6 lg:gap-8">
              {groceryKitchenItems.map((item) => (
                <Link key={item.id} to={`/in-mart/products/${item.slug}`}>
                  <motion.div
                    whileHover={{ y: -3 }}
                    className="flex flex-col items-center gap-1 group cursor-pointer"
                  >
                    <div className="w-full aspect-square bg-[#F5F9FF] dark:bg-white/5 rounded-xl sm:rounded-2xl md:rounded-3xl overflow-hidden p-0 flex items-center justify-center transition-all group-hover:shadow-sm">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
                        style={{ background: 'transparent' }}
                      />
                    </div>
                    <span className="text-[10px] sm:text-xs md:text-sm lg:text-base font-bold text-gray-800 dark:text-gray-200 text-center leading-tight pt-1 px-1">
                      {item.name}
                    </span>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Beauty & Wellness Section */}
        <section className="mb-12">
          <div className="bg-white dark:bg-white/5 rounded-[2rem] sm:rounded-[3rem] p-6 sm:p-7 md:p-8 lg:p-10 shadow-[0_4px_25px_rgba(0,0,0,0.03)] border border-gray-100/50 dark:border-white/5">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-8 px-1">
              Beauty & Wellness
            </h2>
            <div className="grid grid-cols-4 gap-2 sm:gap-4 md:gap-6 lg:gap-8 transition-all">
              {beautyWellnessItems.map((item) => (
                <motion.div
                  key={item.id}
                  whileHover={{ y: -3 }}
                  className="flex flex-col items-center gap-1 group cursor-pointer"
                >
                  <div className="w-full aspect-square bg-[#FFF5F7] dark:bg-white/5 rounded-xl sm:rounded-2xl md:rounded-3xl overflow-hidden p-0 flex items-center justify-center transition-all group-hover:shadow-sm">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
                      style={{ background: 'transparent' }}
                    />
                  </div>
                  <span className="text-[10px] sm:text-xs md:text-sm lg:text-base font-bold text-gray-800 dark:text-gray-200 text-center leading-tight pt-1 px-1">
                    {item.name}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Household & Lifestyle Section */}
        <section className="mb-12">
          <div className="bg-white dark:bg-white/5 rounded-[2rem] sm:rounded-[3rem] p-6 sm:p-7 md:p-8 lg:p-10 shadow-[0_4px_25px_rgba(0,0,0,0.03)] border border-gray-100/50 dark:border-white/5">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-8 px-1">
              Household & Lifestyle
            </h2>
            <div className="grid grid-cols-4 gap-2 sm:gap-4 md:gap-6 lg:gap-8 transition-all">
              {householdLifestyleItems.map((item) => (
                <motion.div
                  key={item.id}
                  whileHover={{ y: -3 }}
                  className="flex flex-col items-center gap-1 group cursor-pointer"
                >
                  <div className="w-full aspect-square bg-[#F8F9FF] dark:bg-white/5 rounded-xl sm:rounded-2xl md:rounded-3xl overflow-hidden p-0 flex items-center justify-center transition-all group-hover:shadow-sm">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
                      style={{ background: 'transparent' }}
                    />
                  </div>
                  <span className="text-[10px] sm:text-xs md:text-sm lg:text-base font-bold text-gray-800 dark:text-gray-200 text-center leading-tight pt-1 px-1">
                    {item.name}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Hibermart Branding Section */}
        <section className="mt-12 mb-8 py-12 sm:py-16 md:py-20 flex flex-col items-center bg-gray-50/40 dark:bg-white/5 border-t border-b border-gray-100/50 dark:border-white/5 select-none">
          <h2 className="text-[56px] sm:text-[80px] md:text-[100px] lg:text-[120px] font-black tracking-tighter leading-none italic bg-clip-text text-transparent bg-gradient-to-r from-[#16A34A] via-[#15803D] to-[#166534]">
            hibermart
          </h2>
          <p className="text-sm sm:text-lg md:text-xl font-bold text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] mt-4">
            Freshness at your doorstep
          </p>
        </section>
      </div>
    </AnimatedPage>
  )
}
