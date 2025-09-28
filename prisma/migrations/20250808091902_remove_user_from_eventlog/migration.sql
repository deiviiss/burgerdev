/*
  Warnings:

  - You are about to drop the column `userId` on the `EventLog` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "EventLog" DROP CONSTRAINT "EventLog_userId_fkey";

-- AlterTable
ALTER TABLE "EventLog" DROP COLUMN "userId";
