'use client';

import GraphChart from "@/app/(user)/graph/components/graph-chart";
import GraphHeader from "@/app/(user)/graph/components/graph-header";
import MonitorBox from "@/components/monitor/monitor-box";
import { useDatabase } from "@/hooks/use-database";
import { DropletsIcon, WavesIcon, WeightIcon, ZapIcon } from "lucide-react";
import { useState } from "react";

export default function GraphComponent() {
  const { data: dataM, loading: loadingM, error: errorM } = useDatabase<DataM>("/M");

  const { data: dataC, loading: loadingC, error: errorC } = useDatabase<DataC>("/C");

  const [activeTab, setActiveTab] = useState<"water" | "temperature" | "vol" | "pressure">("water");

  return (
    <div>
      <GraphHeader />
      <div className="p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <MonitorBox
            icon={DropletsIcon}
            title="Mức nước tham chiếu"
            //value={dataC?.SP?.toFixed(2).toString() || "0.00"}
            value={(dataC?.SP !== undefined ? (dataC.SP / 40).toFixed(2) : "0.00")}

            unit="%"
            status="success"
            ///trend="up"
          />
          <MonitorBox
            icon={WavesIcon}
            title="Mức nước phản hồi"
            //
            // value={dataM?.?.toFixed(2).toString() || "0.00"}
            value={(dataM?.W !== undefined ? (dataM.W / 40).toFixed(2) : "0.00")}
            unit="%"
            status="normal"
            //trend="stable"
          />
          <MonitorBox
            icon={WeightIcon}
            title="Áp suất phản hồi"
            //value={dataM?.P?.toFixed(2).toString() || "0.00"}
            value={(dataM?.P !== undefined ? (dataM.P / 2000).toFixed(2) : "0.00")}
            unit="Bar"
            status="success"
            //trend="stable"
          />
          <MonitorBox
            icon={ZapIcon}
            title="Điện áp bơm"
            //value={dataM?.0.toFixed(2).toString() || "0.00"}
            value={(dataM?.O !== undefined ? (dataM.O / 400).toFixed(2) : "0.00")}
            unit="V"
            status="warning"
            //trend="down"
          />
        </div>
        <div className="mt-10 flex flex-col gap-y-4">
          <div className="flex items-center gap-4 mt-4">
            <button
              className={`px-4 py-2 rounded-2xl border text-black font-semibold transition cursor-pointer ${activeTab === "water" ? "bg-blue-600 text-white" : "border hover:bg-gray-200"}`}
              onClick={() => setActiveTab("water")}
            >
              Xem đồ thị mực nước
            </button>
            <button
              className={`px-4 py-2 rounded-2xl border text-black font-semibold transition cursor-pointer ${activeTab === "temperature" ? "bg-blue-600 text-white" : "border hover:bg-gray-200"}`}
              onClick={() => setActiveTab("temperature")}
            >
              Xem đồ thị nhiệt độ
            </button>
            <button
              className={`px-4 py-2 rounded-2xl border text-black font-semibold transition cursor-pointer ${activeTab === "vol" ? "bg-blue-600 text-white" : "border hover:bg-gray-200"}`}
              onClick={() => setActiveTab("vol")}
            >
              Xem đồ thị điện áp
            </button>
            <button
              className={`px-4 py-2 rounded-2xl border text-black font-semibold transition cursor-pointer ${activeTab === "pressure" ? "bg-blue-600 text-white" : "border hover:bg-gray-200"}`}
              onClick={() => setActiveTab("pressure")}
            >
              Xem đồ thị áp suất
            </button>
          </div>
          <div>
            {activeTab === "water" && <GraphChart
              title1="Giá trị đặt"
              title2="Mực nước hiện tại"
              //value1={dataC?.SP ?? 0}
              //value2={dataM?.W}
              value1={((dataC?.SP ?? 0) / 40)}
              value2={((dataM?.W ?? 0) / 40)}
              maxDataPoints={10}
              height={400}
            />}
            {activeTab === "temperature" && <GraphChart
              title1="Giá trị đặt"
              title2="Nhiệt độ hiện tại"
              value1={dataC?.ND ?? 0}
              value2={dataM?.ND ?? 0}
              maxDataPoints={10}
              height={400}
            />}
            {activeTab === "vol" && <GraphChart
              title1= "Điện áp cao nhất"
              title2="Điện áp hiện tại"
              value1={10}
              //value2={dataM?.ND ?? 0}
              value2={((dataM?.O ?? 0) / 400)}
              maxDataPoints={30}
              height={400}
            />}
            {activeTab === "pressure" && <GraphChart
              title1="Áp suất cực đại"
              title2="Áp suất hiện tại"
              value1={2}
              value2={((dataM?.P ?? 0)/2000)}
              maxDataPoints={10}
              height={400}
            />}
          </div>
        </div>
      </div>
    </div>
  )
}
