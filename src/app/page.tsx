"use client"

import { motion } from "framer-motion"
import { Shield, Users, LogIn, ArrowRight, Phone, Settings } from "lucide-react"
import { useRouter } from "next/navigation"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

const buttonVariants = {
  hover: {
    scale: 1.05,
    transition: { duration: 0.2 },
  },
  tap: { scale: 0.95 },
}

export default function Homepage() {
  const router = useRouter();

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img src="https://sumitech.vn/wp-content/uploads/he-thong-pccc-nha-xuong.jpg" alt="Fire Safety System" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-red-900/80 via-red-800/70 to-red-700/60"></div>
      </div>

      {/* Navigation Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 p-6"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-3 text-white">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold">PCCC Smart</h1>
              <p className="text-red-100 text-sm">Fire Safety System</p>
            </div>
          </motion.div>

          
        </div>
      </motion.header>

      {/* Main Content */}
      <motion.main
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 flex items-center min-h-[calc(100vh-120px)] px-6"
      >
        <div className="max-w-7xl mx-auto w-full">
          <div className="max-w-4xl">
            {/* Main Heading */}
            <motion.h1
              variants={itemVariants}
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6"
            >
              Giám sát hệ thống <span className="text-red-300">phòng cháy chữa cháy</span> trong tòa nhà, chung cư
            </motion.h1>

           
            

            {/* Action Buttons */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
              <motion.button
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
                onClick={() => router.push('/login')}
              >
                <LogIn className="w-5 h-5" />
                Đăng nhập
              </motion.button>
            </motion.div>
          </div>
        </div>
      </motion.main>

    </div>
  )
}
