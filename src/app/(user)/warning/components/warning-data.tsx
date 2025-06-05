"use client"

import { useEffect, useState, useMemo } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { type ColumnDef, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table"
import { motion, AnimatePresence } from "framer-motion"
import { Calendar, AlertTriangle, FileSpreadsheet, Filter, RefreshCw, Clock, TrendingUp } from "lucide-react"
import * as XLSX from "xlsx"
import { useDatabase } from "@/hooks/use-database"

// Mock hook for demonstration

type WarningItem = {
  timestamp: number
  date: string
  type: string
  value: number
}

const columns: ColumnDef<WarningItem>[] = [
  {
    id: "index",
    header: "#",
    cell: ({ row }) => (
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: row.index * 0.05 }}
        className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-semibold text-sm"
      >
        {row.index + 1}
      </motion.div>
    ),
  },
  {
    header: "Ngày cảnh báo",
    accessorKey: "date",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Clock className="w-4 h-4 text-gray-500" />
        <span className="font-medium">{row.original.date}</span>
      </div>
    ),
  },
  {
    header: "Loại cảnh báo",
    accessorKey: "type",
    cell: ({ row }) => {
      const type = row.original.type
      const getTypeColor = () => {
        switch (type) {
          case "Áp suất":
            return "bg-orange-100 text-orange-700 border-orange-200"
          case "Mực nước":
            return "bg-blue-100 text-blue-700 border-blue-200"
          case "Nhiệt độ":
            return "bg-red-100 text-red-700 border-red-200"
          default:
            return "bg-gray-100 text-gray-700 border-gray-200"
        }
      }

      return (
        <motion.div
          whileHover={{ scale: 1.05 }}
          className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-sm font-medium ${getTypeColor()}`}
        >
          <AlertTriangle className="w-3 h-3" />
          {type}
        </motion.div>
      )
    },
  },
  {
    header: "Giá trị",
    accessorKey: "value",
    cell: ({ row }) => {
      const type = row.original.type
      const value = row.original.value
      let unit = ""

      switch (type) {
        case "Áp suất":
          unit = "kPa"
          break
        case "Mực nước":
          unit = "m"
          break
        case "Nhiệt độ":
          unit = "°C"
          break
        default:
          unit = ""
      }

      return (
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-gray-500" />
          <span className="font-bold text-lg">
            {value} <span className="text-sm font-normal text-gray-500">{unit}</span>
          </span>
        </motion.div>
      )
    },
  },
]

// Format timestamp to Vietnamese date string
const formatTimestamp = (ts: number) => {
  const date = new Date(ts * 1000)
  return date.toLocaleString("vi-VN")
}

// Skeleton Components
const TableSkeleton = () => (
  <div className="space-y-4">
    <div className="flex items-center justify-between">
      <div className="h-8 bg-gray-200 rounded w-48 animate-pulse" />
      <div className="h-10 bg-gray-200 rounded w-32 animate-pulse" />
    </div>
    <div className="border rounded-lg">
      <div className="grid grid-cols-4 gap-4 p-4 border-b">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-6 bg-gray-200 rounded animate-pulse" />
        ))}
      </div>
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="grid grid-cols-4 gap-4 p-4 border-b last:border-b-0">
          {[1, 2, 3, 4].map((j) => (
            <div key={j} className="h-8 bg-gray-100 rounded animate-pulse" />
          ))}
        </div>
      ))}
    </div>
  </div>
)

const rowVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.05,
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  }),
  hover: {
    scale: 1.01,
    backgroundColor: "rgba(59, 130, 246, 0.05)",
    transition: { duration: 0.2 },
  },
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
}

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

function DataTable<TData, TValue>({ columns, data }: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="rounded-xl border border-gray-200 bg-white shadow-lg overflow-hidden"
    >
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="bg-gray-50 border-b border-gray-200">
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id} className="px-6 py-4 text-left font-semibold text-gray-700">
                  {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          <AnimatePresence>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row, idx) => (
                <motion.tr
                  key={row.id}
                  custom={idx}
                  initial="hidden"
                  animate="visible"
                  whileHover="hover"
                  variants={rowVariants}
                  className="border-b border-gray-100 last:border-b-0 cursor-pointer"
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="px-6 py-4">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </motion.tr>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-32 text-center">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center gap-2 text-gray-500"
                  >
                    <AlertTriangle className="w-8 h-8" />
                    <span>Không có dữ liệu cảnh báo trong khoảng thời gian này.</span>
                  </motion.div>
                </TableCell>
              </TableRow>
            )}
          </AnimatePresence>
        </TableBody>
      </Table>
    </motion.div>
  )
}

export default function WarningData() {
  const { data: dataE, loading: loadingE } = useDatabase<DataE>("/e")
  const [data, setData] = useState<WarningItem[]>([])
  const [fromDate, setFromDate] = useState("")
  const [toDate, setToDate] = useState("")
  const [isExporting, setIsExporting] = useState(false)

  // Get today and 7 days ago as default dates
  const today = new Date().toISOString().split("T")[0]
  const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]

  useEffect(() => {
    if (!fromDate) setFromDate(weekAgo)
    if (!toDate) setToDate(today)
  }, [])

  useEffect(() => {
    if (dataE !== null) {
      const formattedData: WarningItem[] = Object.entries(dataE)
        .flatMap(([timestampStr, values]) => {
          const timestamp = Number(timestampStr)
          const date = formatTimestamp(timestamp)
          const entries: WarningItem[] = []

          if (values.AS != null) {
            entries.push({ timestamp, date, type: "Áp suất", value: values.AS })
          }
          if (values.MN != null) {
            entries.push({ timestamp, date, type: "Mực nước", value: values.MN })
          }
          if (values.ND != null) {
            entries.push({ timestamp, date, type: "Nhiệt độ", value: values.ND })
          }

          return entries
        })
        .sort((a, b) => b.timestamp - a.timestamp)
      setData(formattedData)
    }
  }, [dataE])

  // Filter data based on date range
  const filteredData = useMemo(() => {
    if (!fromDate || !toDate) return data

    const fromTimestamp = new Date(fromDate).getTime() / 1000
    const toTimestamp = new Date(toDate + " 23:59:59").getTime() / 1000

    return data.filter((item) => item.timestamp >= fromTimestamp && item.timestamp <= toTimestamp)
  }, [data, fromDate, toDate])

  const exportToExcel = async () => {
    setIsExporting(true)

    try {
      const exportData = filteredData.map((item, index) => ({
        STT: index + 1,
        "Ngày cảnh báo": item.date,
        "Loại cảnh báo": item.type,
        "Giá trị": `${item.value} ${
          item.type === "Áp suất" ? "kPa" : item.type === "Mực nước" ? "m" : item.type === "Nhiệt độ" ? "°C" : ""
        }`,
      }))

      const ws = XLSX.utils.json_to_sheet(exportData)
      const wb = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(wb, ws, "Dữ liệu cảnh báo")

      // Auto-size columns
      const colWidths = [
        { wch: 5 }, // STT
        { wch: 20 }, // Ngày cảnh báo
        { wch: 15 }, // Loại cảnh báo
        { wch: 15 }, // Giá trị
      ]
      ws["!cols"] = colWidths

      const fileName = `canh-bao-${fromDate}-den-${toDate}.xlsx`
      XLSX.writeFile(wb, fileName)
    } catch (error) {
      console.error("Error exporting to Excel:", error)
    } finally {
      setIsExporting(false)
    }
  }

  // if (loadingE) {
  //   return (
  //     <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-5">
  //       <TableSkeleton />
  //     </motion.div>
  //   )
  // }

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="mt-5 space-y-6">
      {/* Header */}
      <motion.div variants={itemVariants} className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Dữ liệu cảnh báo</h2>
          <p className="text-gray-600 mt-1">Theo dõi các cảnh báo hệ thống theo thời gian</p>
        </div>
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-lg"
        >
          <AlertTriangle className="w-4 h-4" />
          <span className="font-medium">{filteredData.length} cảnh báo</span>
        </motion.div>
      </motion.div>

      {/* Filters */}
      <motion.div variants={itemVariants} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-500" />
            <span className="font-medium text-gray-700">Lọc theo thời gian:</span>
          </div>

          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-gray-500" />
            <label className="text-sm font-medium text-gray-600">Từ ngày:</label>
            <motion.input
              whileFocus={{ scale: 1.02 }}
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            />
          </div>

          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-gray-500" />
            <label className="text-sm font-medium text-gray-600">Đến ngày:</label>
            <motion.input
              whileFocus={{ scale: 1.02 }}
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            />
          </div>

          <motion.button
            onClick={exportToExcel}
            disabled={isExporting || filteredData.length === 0}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all ml-auto"
          >
            <AnimatePresence mode="wait">
              {isExporting ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0, rotate: 0 }}
                  animate={{ opacity: 1, rotate: 360 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                >
                  <RefreshCw className="w-4 h-4" />
                </motion.div>
              ) : (
                <motion.div key="download" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <FileSpreadsheet className="w-4 h-4" />
                </motion.div>
              )}
            </AnimatePresence>
            {isExporting ? "Đang xuất..." : "Xuất Excel"}
          </motion.button>
        </div>
      </motion.div>

      {/* Table */}
      <motion.div variants={itemVariants}>
        <DataTable columns={columns} data={filteredData} />
      </motion.div>

      {/* Summary */}
      {filteredData.length > 0 && (
        <motion.div
          variants={itemVariants}
          className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-200"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              <span className="font-medium text-blue-800">
                Tổng cộng: {filteredData.length} cảnh báo từ {fromDate} đến {toDate}
              </span>
            </div>
            <div className="text-sm text-blue-600">
              {filteredData.filter((item) => item.type === "Áp suất").length} áp suất •{" "}
              {filteredData.filter((item) => item.type === "Mực nước").length} mực nước •{" "}
              {filteredData.filter((item) => item.type === "Nhiệt độ").length} nhiệt độ
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}
