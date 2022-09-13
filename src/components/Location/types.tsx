export interface Ilocationitemsprops {
  address: string;
  residentName: string;
  totalEnergy: string;
  genUsage: string;
  gridUsgae: string;
  devices: [Idevice];
}

export type Idevice = {
  id: number;
  type: string;
  onlinestate: string;
};
