// Data của monitor
declare type DataM = {
  DT: number; // Ngày
  B: string; // Trạng thái cảm biến
  ND: number; // Nhiệt độ
  O: number; // Điện áp
  P: number; // Áp suất
  W: number; // Mức nước
  INV: number; // Tốc độ quạt hút
};

// Data của control
declare type DataC = {
  CP: number; // Cho phép
  SP: number; // Đặt mực nước
  D: number; // D Mực nước
  I: number; // I Mực nước
  P: number; // P Mực nước
  KD: number; // D Áp suất
  KI: number; // I Áp suất
  KP: number; // P Áp suất
  TT: number;
  INV: number; // Tốc độ quạt hút
  ST: number; // Chu kỳ lấy mẫu
  MAX: number; // Ngưỡng giới hạn trên
  MIN: number; // Ngưỡng giới hạn dưới
  ND: number; // Ngưỡng nhiệt độ cảnh báo
};

// Data của warning
declare type DataE = {
  // Timestamp là ngày
  [timestamp: string]: {
    AS?: number | null; // Áp suất
    MN?: number | null; // Mực nước
    ND?: number | null; // Nhiệt độ
  };
};
