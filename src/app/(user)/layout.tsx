"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { sidebar_items } from "@/constant/user";
import { LogOutIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/auth-context";
import ProfileDashboardMenu from "@/components/profile_dashboard_menu";

export default function UserLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [open, setOpen] = useState(true);
  const pathname = usePathname();
  const router = useRouter();

  const sidebarWidth = open ? 300 : 100;
  const auth = useAuth();

  useEffect(() => {
    if (auth.user === null) {
      router.push("/");
    }
  }, [auth, router]);

  const handleLogout = () => {
    auth
      .logout()
      .then(() => {
        router.push("/");
      })
      .catch(() => {
        auth.resetState();
      });
  };

  return (
    <div className="min-h-screen w-full font-be-vietnam-pro flex">
      {/* Sidebar */}
      <motion.section
        initial={{ width: 100 }}
        animate={{ width: open ? 300 : 100 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed left-0 top-0 h-full bg-white shadow-lg flex flex-col z-50"
      >
        {/* Toggle Button */}
        <div
          className="h-[80px] flex items-center justify-center cursor-pointer"
          onClick={() => setOpen(!open)}
        >
          <motion.div
            initial={{ rotate: 0 }}
            transition={{ duration: 0.3 }}
            className="text-2xl font-bold text-blue-700"
          >
            <img
              src="/images/logo.png"
              alt="Logo"
              className="w-[90px] h-[90px] object-cover"
            />
          </motion.div>
        </div>

        {/* Menu Items */}
        <div className="mt-4 flex flex-col gap-2 flex-1">
          {sidebar_items.map((item, index) => {
            // Thay continue bằng return null để bỏ qua phần tử
            if (auth.role === "staff" && item.href === "/setting") {
              return null;
            }

            const isActive = pathname === item.href;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05, duration: 0.2 }}
                onClick={() => router.push(item.href)}
                className={cn(
                  "relative flex items-center px-4 py-3 cursor-pointer transition-all",
                  open ? "gap-x-10 pl-[40px]" : "justify-center",
                  isActive
                    ? "text-blue-500 bg-blue-100 rounded-lg"
                    : "text-gray-600 hover:bg-gray-100"
                )}
              >
                <item.icon className="w-6 h-6 shrink-0" />

                {open && (
                  <span className="text-[15px] leading-[1.8] truncate">
                    {item.label}
                  </span>
                )}

                {isActive && (
                  <motion.div
                    layoutId="active-indicator"
                    className="absolute left-0 top-0 h-full w-[4px] bg-blue-500 rounded-[13px]"
                  />
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Extra Menu (Logout) */}
        <div className="border-t border-gray-300 w-full flex flex-col gap-y-3 py-3">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
            className={cn(
              "relative flex items-center gap-5 py-3 px-4 cursor-pointer transition-all",
              open ? "justify-start pl-8" : "justify-center",
              "text-gray-700 hover:bg-gray-100"
            )}
            onClick={handleLogout}
          >
            <LogOutIcon className="w-6 h-6" />
            {open && <span className="text-[15px]">Đăng xuất</span>}
          </motion.div>
        </div>
      </motion.section>

      {/* Main Content */}
      <div
        className="flex-1 py-6 pl-4 pr-4 transition-all duration-300 font-be-vietnam-pro"
        style={{ marginLeft: sidebarWidth }}
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="flex items-center justify-between p-4 rounded-lg"
        >
          <div className="flex items-center gap-x-4">
            <div>
              <h2 className="text-3xl font-semibold text-gray-800">
                TRƯỜNG ĐẠI HỌC SƯ PHẠM KỸ THUẬT TP.HCM
              </h2>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="z-10 flex items-center gap-x-8"
          >
            <ProfileDashboardMenu profile={123} />
          </motion.div>
        </motion.div>
        {children}
      </div>
    </div>
  );
}
