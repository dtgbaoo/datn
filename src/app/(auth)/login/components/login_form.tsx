'use client';

import { motion } from "framer-motion";
import InputAuth from "@/components/input_auth";
import { useLogin } from "@/app/(auth)/login/hooks/use-login";

export default function LoginForm() {
    const { register, handleSubmit, errors, onSubmit } = useLogin();

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="px-[40px] flex justify-start items-center font-be-vietnam-pro"
        >
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
            >
                <div className="mt-5">
                    <div>
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            <h1 className="text-2xl font-[600]">Đăng nhập</h1>
                            <p className="my-4 text-base text-gray-600 leading-[1.8]">
                                Đăng nhập để giám sát hệ thống phòng cháy chữa cháy
                            </p>
                        </motion.div>

                        <motion.form
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            className="mt-10 flex flex-col gap-y-5"
                            onSubmit={handleSubmit(onSubmit)}
                        >
                            <InputAuth
                                type="text"
                                placeholder="Nhập Email"
                                register={register("email")}
                                error={errors.email?.message}
                            />
                            <InputAuth
                                type="password"
                                placeholder="Nhập mật khẩu"
                                register={register("password")}
                                error={errors.password?.message}
                            />
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                type="submit"
                                className="mt-6 px-6 py-3 bg-transparent text-gray-700 text-[15px] font-medium rounded-lg border hover:bg-gray-100 cursor-pointer"
                            >
                                Đăng nhập
                            </motion.button>
                        </motion.form>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}
