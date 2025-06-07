import {
  ChartNoAxesColumnIcon,
  CogIcon,
  FileSlidersIcon,
  MonitorIcon,
  TriangleAlertIcon,
  Book,
} from "lucide-react";

export const sidebar_items = [
  {
    href: "/monitor",
    icon: MonitorIcon,
    label: "Giám Sát",
  },
  {
    href: "/setting",
    icon: CogIcon,
    label: "Cài Đặt",
  },
  {
    href: "/warning",
    icon: TriangleAlertIcon,
    label: "Cảnh báo",
  },
  {
    href: "/graph",
    icon: ChartNoAxesColumnIcon,
    label: "Thống kê",
  },
  {
    href: "/information",
    icon: FileSlidersIcon,
    label: "Thông tin hệ thống",
  },
  {
    href: "/topic",
    icon: Book,
    label: "Thông tin đề tài",
  },
];
