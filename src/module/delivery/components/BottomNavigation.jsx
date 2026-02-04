import { useNavigate, useLocation } from "react-router-dom"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { User, Rss, Wallet, History } from "lucide-react"
import { deliveryAPI } from "@/lib/api"

export default function BottomNavigation() {
  const navigate = useNavigate()
  const location = useLocation()
  const [profileImage, setProfileImage] = useState(null)
  const [imageError, setImageError] = useState(false)

  const isActive = (path) => {
    if (path === "/delivery") return location.pathname === "/delivery"
    return location.pathname.startsWith(path)
  }

  const TabIcon = (active, Icon) => {
    return <Icon className={`w-6 h-6 transition-colors duration-300 ${active ? "text-purple-700 stroke-[2.5]" : "text-gray-400 stroke-[2]"}`} />
  }

  const TabLabel = (active, label) => (
    <span className={`text-[10px] font-bold transition-colors duration-300 ${active ? "text-purple-700" : "text-gray-500"}`}>
      {label}
    </span>
  )

  // Fetch profile image
  useEffect(() => {
    const fetchProfileImage = async () => {
      try {
        const response = await deliveryAPI.getProfile()
        if (response?.data?.success && response?.data?.data?.profile) {
          const profile = response.data.data.profile
          // Use profileImage.url first, fallback to documents.photo
          const imageUrl = profile.profileImage?.url || profile.documents?.photo
          if (imageUrl) {
            setProfileImage(imageUrl)
          }
        }
      } catch (error) {
        // Skip logging network and timeout errors (handled by axios interceptor)
        if (error.code !== 'ECONNABORTED' &&
          error.code !== 'ERR_NETWORK' &&
          error.message !== 'Network Error' &&
          !error.message?.includes('timeout')) {
          console.error("Error fetching profile image for navigation:", error)
        }
      }
    }

    fetchProfileImage()

    // Listen for profile refresh events
    const handleProfileRefresh = () => {
      fetchProfileImage()
    }

    window.addEventListener('deliveryProfileRefresh', handleProfileRefresh)

    return () => {
      window.removeEventListener('deliveryProfileRefresh', handleProfileRefresh)
    }
  }, [])

  const navItems = [
    { id: 'feed', path: "/delivery", label: "Feed", icon: Rss },
    { id: 'pocket', path: "/delivery/requests", label: "Pocket", icon: Wallet },
    { id: 'history', path: "/delivery/trip-history", label: "History", icon: History },
    { id: 'profile', path: "/delivery/profile", label: "Profile", icon: User },
  ]

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-purple-100/50 shadow-[0_-5px_20px_rgba(126,34,206,0.05)] z-50 px-2">
      <div className="flex items-center justify-around py-2">
        {navItems.map((item) => {
          const active = isActive(item.path)
          return (
            <button
              key={item.id}
              onClick={() => navigate(item.path)}
              className="flex flex-col items-center gap-1.5 p-2 relative group flex-1"
            >
              {/* Active Pill Background */}
              {active && (
                <motion.div
                  layoutId="deliveryBottomNavActive"
                  className="absolute inset-0 bg-purple-100/60 rounded-xl -z-10"
                  initial={false}
                  transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 35
                  }}
                />
              )}

              {item.id === 'profile' ? (
                <div className="relative">
                  {profileImage && !imageError ? (
                    <img
                      src={profileImage}
                      alt="Profile"
                      className={`w-7 h-7 rounded-full border-2 object-cover transition-all duration-300 ${active ? "border-purple-600 scale-110" : "border-gray-200"
                        }`}
                      onError={() => {
                        setImageError(true)
                      }}
                    />
                  ) : (
                    <div className={`w-7 h-7 rounded-full border-2 flex items-center justify-center bg-gray-100 transition-all duration-300 ${active ? "border-purple-600 scale-110" : "border-gray-200"
                      }`}>
                      <User className={`w-4 h-4 ${active ? "text-purple-600" : "text-gray-400"}`} />
                    </div>
                  )}
                </div>
              ) : (
                <div className={`transition-transform duration-300 ${active ? "scale-110" : "group-active:scale-95"}`}>
                  {TabIcon(active, item.icon)}
                </div>
              )}
              {TabLabel(active, item.label)}
            </button>
          )
        })}
      </div>
    </div>
  )
}
