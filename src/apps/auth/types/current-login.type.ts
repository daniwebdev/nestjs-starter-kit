import { CoordinateType } from "./coordinate.type";

export type CurrentLoginType = {
    ip: string,
    app_version: string,
    timestamp: number,
    coordinate: CoordinateType,
  }