/*
  Warnings:

  - Added the required column `baseDesignHeight` to the `Design` table without a default value. This is not possible if the table is not empty.
  - Added the required column `baseDesignWidth` to the `Design` table without a default value. This is not possible if the table is not empty.
  - Added the required column `printMode` to the `Design` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Design" ADD COLUMN     "baseDesignHeight" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "baseDesignWidth" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "printMode" TEXT NOT NULL;
