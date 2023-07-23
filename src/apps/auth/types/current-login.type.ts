import { CoordinateType } from "./coordinate.type";

export type CurrentLoginType = {
    ip: string,
    app: string,
    app_version: string,
    device: string,
    device_id: string,
    timestamp: number,
    coordinate: CoordinateType,
  }