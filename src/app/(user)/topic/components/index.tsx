"use client";
import {
  ArrowLeft,
  Mail,
  User,
  Users,
  GraduationCap,
  Calendar,
  BookOpen,
  Award,
} from "lucide-react";

export default function TopicComponent() {
  return (
    
    <div className="min-h-screen bg-gray-50">
        {/* Project Information */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <BookOpen className="w-6 h-6 mr-3 text-blue-500" />
              Thông tin đề tài
            </h2>
            <div className="space-y-4">
              <div className="flex items-start">
                <span className="font-semibold text-gray-600 w-32 flex-shrink-0">
                  Tên đề tài:
                </span>
                <span className="text-gray-800">
                  Mô hình giám sát và điều khiển hệ thống phòng cháy chữa cháy trong tòa nhà chung cư
                </span>
              </div>
              <div className="flex items-start">
                <span className="font-semibold text-gray-600 w-32 flex-shrink-0">
                  Loại đề tài:
                </span>
                <span className="text-gray-800">Đồ án tốt nghiệp</span>
              </div>
              <div className="flex items-start">
                <span className="font-semibold text-gray-600 w-32 flex-shrink-0">
                  Khoa:
                </span>
                <span className="text-gray-800">Khoa Điện-Điện tử</span>
              </div>
              <div className="flex items-start">
                <span className="font-semibold text-gray-600 w-32 flex-shrink-0">
                  Chuyên ngành:
                </span>
                <span className="text-gray-800">Công nghệ Kỹ thuật Điều khiển và Tự động hóa</span>
              </div>
              <div className="flex items-start">
                <span className="font-semibold text-gray-600 w-32 flex-shrink-0">
                  Năm:
                </span>
                <span className="text-gray-800">2024-2025</span>
              </div>
              <div className="flex items-start">
                <span className="font-semibold text-gray-600 w-32 flex-shrink-0">
                  Học kỳ:
                </span>
                <span className="text-gray-800">Học kỳ 2</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <Award className="w-6 h-6 mr-3 text-green-500" />
              Mục tiêu đề tài
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-700 mb-2">
                  Mục tiêu chính:
                </h3>
                <ul className="list-disc list-inside text-gray-600 space-y-1 ml-4">
                  <li>Xây dựng hệ thống giám sát thiết bị công nghiệp</li>
                  <li>Tích hợp PLC với ESP32 và IoT</li>
                  <li>Phát triển giao diện web quản lý</li>
                  {/* <li>Ứng dụng công nghệ biến tần điều khiển quạt</li> */}
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-700 mb-2">
                  Công nghệ sử dụng:
                </h3>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                    PLC FX3U
                  </span>
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                    ESP32
                  </span>
                  <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                    IoT
                  </span>
                  <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm">
                    Next.js
                  </span>
                  <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm">
                    Modbus
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Instructor Information */}
        <div className="bg-white rounded-xl shadow-sm p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <GraduationCap className="w-6 h-6 mr-3 text-green-500" />
            Giảng viên hướng dẫn
          </h2>

          <div className="flex items-start space-x-6">
          <img
                src="/images/thaynhon.jpg"
                alt="PGS.TS> Trương Đình Nhơn"
                className="w-32 h-32 rounded-full object-cover border-4 border-green-500"
              />
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                PGS.TS. Trương Đình Nhơn
              </h3>
              {/* <p className="text-green-600 font-semibold mb-4">
                Tiến sĩ Kỹ thuật Điều khiển và Tự động hóa
              </p> */}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Mail className="w-4 h-4 mr-3 text-gray-500" />
                    <span className="text-gray-600">
                      nhontd@hcmute.edu.vn
                    </span>
                  </div>
                  <div className="flex items-center">
                    <User className="w-4 h-4 mr-3 text-gray-500" />
                    <span className="text-gray-600">Khoa Điện - Điện tử</span>
                  </div>
                  <div className="flex items-center">
                    <BookOpen className="w-4 h-4 mr-3 text-gray-500" />
                    <span className="text-gray-600">Bộ môn Điều khiển tự động</span>
                  </div>
                </div>
                {/* <div className="space-y-3">
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-1">
                      Chuyên môn:
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Điều khiển tự động, PLC, IoT, Hệ thống nhúng
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-1">
                      Kinh nghiệm:
                    </h4>
                    <p className="text-gray-600 text-sm">
                      15+ năm giảng dạy và nghiên cứu
                    </p>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>

        {/* Student Group */}
        <div className="bg-white rounded-xl shadow-sm p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <Users className="w-6 h-6 mr-3 text-purple-500" />
            Nhóm sinh viên thực hiện
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
              <div className="flex flex-col items-center mb-4">
                <div className="relative mb-3">
                  <img
                    src="/images/bao.jpg"
                    alt="Bảo"
                    className="w-20 h-20 rounded-full object-cover border-4 border-blue-500"
                  />
                  
                </div>
                <div className="text-center">
                  <h3 className="text-lg font-bold text-gray-800">Đặng Trần Gia Bảo</h3>
                  <span className="inline-block px-3 py-1 bg-blue-500 text-white text-xs font-semibold rounded-full mt-1">
                    Thành viên
                  </span>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-center">
                  <span className="font-semibold text-gray-600 w-16">MSSV:</span>
                  <span className="text-gray-800 font-mono">21151438</span>
                </div>
                <div className="flex items-center">
                  <span className="font-semibold text-gray-600 w-16">Lớp:</span>
                  <span className="text-gray-800">21151CL4B</span>
                </div>
                <div className="flex items-center">
                  <Mail className="w-4 h-4 mr-2 text-gray-500" />
                  <span className="text-gray-800 text-xs">21151438@student.hcmute.edu.vn</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-blue-200">
                <h4 className="font-semibold text-gray-700 mb-2">Nhiệm vụ:</h4>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>• Lập trình ESP</li>
                  <li>• Thiết kế mạch điều khiển</li>
                  <li>• Cấu hình hệ thống</li>
                </ul>
              </div>
            </div>

            {/* Student 2 */}
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6 border border-orange-200">
              <div className="flex flex-col items-center mb-4">
                <div className="relative mb-3">
                  <img
                    src="/images/an.png"
                    alt="An"
                    className="w-20 h-20 rounded-full object-cover border-4 border-orange-500"
                  />
                  
                </div>
                <div className="text-center">
                  <h3 className="text-lg font-bold text-gray-800">Võ Bình An</h3>
                  <span className="inline-block px-3 py-1 bg-orange-500 text-white text-xs font-semibold rounded-full mt-1">
                    Thành viên
                  </span>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-center">
                  <span className="font-semibold text-gray-600 w-16">MSSV:</span>
                  <span className="text-gray-800 font-mono">21151063</span>
                </div>
                <div className="flex items-center">
                  <span className="font-semibold text-gray-600 w-16">Lớp:</span>
                  <span className="text-gray-800">21151CL4B</span>
                </div>
                <div className="flex items-center">
                  <Mail className="w-4 h-4 mr-2 text-gray-500" />
                  <span className="text-gray-800 text-xs">21151063@student.hcmute.edu.vn</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-orange-200">
                <h4 className="font-semibold text-gray-700 mb-2">Nhiệm vụ:</h4>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>• Lập trình PLC</li>
                  <li>• Viết báo cáo</li>
                  <li>• Kiểm tra hệ thống</li>
                </ul>
              </div>
            </div>
          </div>




        {/* Footer */}
        <div className="mt-12 text-center py-8 border-t border-gray-200">
          <div className="flex items-center justify-center mb-4">
          <img
            src="/images/logo2.png"
             alt="Bảo"
            className="w-20 h-20 rounded-full object-cover border-4 border-blue-1"
            />
            <div className="text-left">
              <h3 className="font-bold text-gray-800">
                Trường Đại học Sư phạm Kỹ thuật TP.HCM
              </h3>
              <p className="text-gray-600 text-sm">
                Ho Chi Minh City University of Technology and Education
              </p>
            </div>
          </div>
          <p className="text-gray-600">
            Khoa Điện-Điện Tử - Năm học 2024 - 2025
          </p>
          <p className="text-gray-500 text-sm mt-2">
            © 2025 - Mô hình giám sát và điều khiển hệ thống phòng cháy chữa cháy trong tòa nhà chung cư
          </p>
        </div>
      </div>
      </div>
   
  );
}
