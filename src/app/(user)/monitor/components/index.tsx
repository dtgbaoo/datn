'use client';

import MonitorHeader from "@/app/(user)/monitor/components/monitor-header";
import MonitorBox from "@/components/monitor/monitor-box";
import { Skeleton } from "@/components/ui/skeleton";
import { useDatabase } from "@/hooks/use-database";
import { CircuitBoardIcon, DropletsIcon, FanIcon, GlassWaterIcon, RadioIcon, ThermometerSunIcon, WeightIcon, ZapIcon } from "lucide-react";

export default function MonitorComponent() {
    const { data: dataM, loading: loadingM, error: errorM } = useDatabase<DataM>("/M");
    const { data: dataC, loading: loadingC, error: errorC } = useDatabase<DataC>("/C");

    return (
        <div>
            <MonitorHeader />
            <div className="p-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {dataM !== null && dataC !== null
                        ?
                        <>
                            <MonitorBox
                                icon={DropletsIcon}
                                title="Đặt mức nước"
                                value={((dataC?.SP ?? 0) / 4000 * 100).toFixed(2).toString() || "0.00"}
                                //value={dataC?.SP?.toFixed(2).toString() || "0.00"}
                                unit="%"
                                status="success"
                                trend="up"
                            />
                            <MonitorBox
                                icon={WeightIcon}
                                title="Áp suất"
                                //value={dataM?.P?.toFixed(2).toString() || "0.00"}
                                value={((dataM?.P ?? 0) / 2000).toFixed(2).toString()||"0.00"}
                                unit="Bar"
                                status="normal"
                                trend="stable"
                            />
                            <MonitorBox
                                icon={ZapIcon}
                                title="Điện áp"
                                //value={dataM?.O?.toFixed(2).toString() dataM?.O}
                                value={((dataM?.O?? 0) / 4000 * 10).toFixed(2).toString()||"0.00"}
                                unit="V"
                                status="success"
                                trend="stable"
                            />
                            <MonitorBox
                                icon={GlassWaterIcon}
                                title="Mức nước"
                                //value={dataM?.W.toFixed(2).toString() || "0.00"}
                                value={((dataM?.W ?? 0) / 4000 * 100).toFixed(2).toString() || "0.00"}
                                unit="%"
                                status="normal"
                                //trend="down"
                            />
                            <MonitorBox
                                icon={ThermometerSunIcon}
                                title="Nhiệt độ"
                                value={dataM?.ND.toFixed(2).toString() || "0.00"}
                                unit="°C"
                                status="warning"
                                //trend="up"
                            />
                            <MonitorBox
                                icon={FanIcon}
                                title="Tốc độ quạt hút"
                                //value={dataC?.INV.toFixed(2).toString() || "0.00"}
                                value={((dataC?.INV ?? 0) / 80).toFixed(2).toString()|| "0.00"}
                                unit="Hz"
                                status="success"
                               // trend="stable"
                            />
                            <MonitorBox
                                icon={CircuitBoardIcon}
                                title="Trạng thái tòa nhà"
                                value={dataM?.B == "1" || dataM.B == "4" ? "Đang có cháy" : "Bình thường"}
                                unit=""
                                status={dataM?.B == "1" || dataM.B == "4" ? "warning" : "success"}
                                //trend="stable"
                            />
                            <MonitorBox
                                icon={RadioIcon}
                                title="Lỗi biến tần"
                                value={dataM?.B == "3" || dataM.B == "4" ? "Có lỗi" : "Không có"}
                                unit=""
                                status={dataM?.B == "3" || dataM.B == "4" ? "warning" : "success"}
                                //trend="stable"
                            />
                        </>
                        :
                        Array.from({ length: 8 }).map((_, i) => (
                            <div key={i} className="w-[250px] p-6 rounded-2xl border bg-white shadow-md">
                                <Skeleton className="w-12 h-12 rounded-full mb-4" />
                                <Skeleton className="h-5 w-3/4 mb-2" />
                                <Skeleton className="h-4 w-1/2" />
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
}
