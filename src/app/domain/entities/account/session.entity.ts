export interface SessionEntity {
  id: string;
  ip: string;
  socket: string;
  agent: string;
  browser: string;
  date: Date;
  deviceType: "Desktop" | "Mobile";
  platform: "Windows" | "Mobile";
  createdAt: Date;
}
