export interface SessionEntity {
  id: string;
  ip: string;
  socket: string;
  agent: string;
  date: Date;
  deviceType: "Desktop" | "Mobile";
  createdAt: Date;
}
