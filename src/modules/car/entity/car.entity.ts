export type TCar = {
  id: string;
  brand: string;
  model: string;
  carType: string;
  color: string;
  licensePlate: string;
  manufactureYear: number;
  pricePerDay: number;
  capacity: number;
  mileage: number;
  status: CarStatus | CarStatus.AVAILABLE;
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