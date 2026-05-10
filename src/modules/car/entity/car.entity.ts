export type TCar = {
  id: string;
  brand: string;
  model: string;
  carType: string;
  color: string;
  licensePlate: string;
  manufactureYear: number;
  pricePerHour: number;
  capacity: number;
  mileage: number;
  status: CarStatus;
  description: string | null;
  imagePath: string | null;
  publicImageId: string | null;

  createdAt: Date;
  updatedAt: Date;
};

export enum CarStatus {
  AVAILABLE = 'AVAILABLE',
  RENTED = 'RENTED',
  MAINTENANCE = 'MAINTENANCE',
  DELETED = 'DELETED',
}