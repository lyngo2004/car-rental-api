-- CreateEnum
CREATE TYPE "public"."Role" AS ENUM ('CUSTOMER', 'EMPLOYEE', 'ADMIN');

-- CreateEnum
CREATE TYPE "public"."RentalStatus" AS ENUM ('PENDING', 'ACTIVE', 'COMPLETED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "public"."PaymentMethod" AS ENUM ('CASH', 'CARD', 'TRANSFER');

-- CreateTable
CREATE TABLE "public"."UserAccount" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "role" "public"."Role" NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserAccount_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Customer" (
    "id" SERIAL NOT NULL,
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "driverLicense" TEXT NOT NULL,
    "dateOfBirth" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Employee" (
    "id" SERIAL NOT NULL,
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "hireDate" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Car" (
    "id" SERIAL NOT NULL,
    "brand" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "carType" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "licensePlate" TEXT NOT NULL,
    "manufactureYear" INTEGER NOT NULL,
    "pricePerDay" DOUBLE PRECISION NOT NULL,
    "capacity" INTEGER NOT NULL,
    "mileage" DOUBLE PRECISION NOT NULL,
    "status" TEXT NOT NULL,
    "description" TEXT,
    "imagePath" TEXT,
    "publicImageId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Car_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Rental" (
    "id" SERIAL NOT NULL,
    "rentalStatus" "public"."RentalStatus" NOT NULL,
    "issuedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "pickUpAt" TIMESTAMP(3) NOT NULL,
    "dropOffAt" TIMESTAMP(3) NOT NULL,
    "pickUpLocation" TEXT NOT NULL,
    "dropOffLocation" TEXT NOT NULL,
    "totalAmount" DOUBLE PRECISION NOT NULL,
    "carId" INTEGER NOT NULL,
    "customerId" INTEGER NOT NULL,
    "employeeId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Rental_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Payment" (
    "id" SERIAL NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "paymentDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "method" "public"."PaymentMethod" NOT NULL,
    "isPaid" BOOLEAN NOT NULL DEFAULT false,
    "rentalId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserAccount_email_key" ON "public"."UserAccount"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Customer_email_key" ON "public"."Customer"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Customer_userId_key" ON "public"."Customer"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Employee_email_key" ON "public"."Employee"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Employee_userId_key" ON "public"."Employee"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Car_licensePlate_key" ON "public"."Car"("licensePlate");

-- AddForeignKey
ALTER TABLE "public"."Customer" ADD CONSTRAINT "Customer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."UserAccount"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Employee" ADD CONSTRAINT "Employee_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."UserAccount"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Rental" ADD CONSTRAINT "Rental_carId_fkey" FOREIGN KEY ("carId") REFERENCES "public"."Car"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Rental" ADD CONSTRAINT "Rental_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "public"."Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Rental" ADD CONSTRAINT "Rental_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "public"."Employee"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Payment" ADD CONSTRAINT "Payment_rentalId_fkey" FOREIGN KEY ("rentalId") REFERENCES "public"."Rental"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
