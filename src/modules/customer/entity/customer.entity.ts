export type TCustomer = {
    id: string;
    fullName: string;
    phone: string;
    address: string;
    driverLicense: string;
    dateOfBirth: Date | null;

    userId: string;

    createdAt: Date;
    updatedAt: Date;
}
