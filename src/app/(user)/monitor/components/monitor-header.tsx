'use client';
import { motion } from "framer-motion";

export default function MonitorHeader() {
    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="flex items-center justify-between p-4 rounded-lg"
        >
            <div className="flex items-center gap-x-4">
                <div>
                    <h2 className="text-3xl font-semibold text-gray-800">Màn hình giám sát</h2>
                  
                </div>
            </div>
        </motion.div>
    )
}
