import { Metadata } from "next";
import React from "react";
import TopicComponent from "./components";

export const metadata: Metadata = {
  title: "Thông tin hệ thống",
  description:
    "Thông tin hệ thống cung cấp các thông tin chi tiết về cấu hình và trạng thái của hệ thống",
};

export default function InformationPage() {
  return (
    <div>
      <TopicComponent />
    </div>
  );
}
