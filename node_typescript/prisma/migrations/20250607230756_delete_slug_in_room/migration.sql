/*
  Warnings:

  - You are about to drop the column `slug` on the `room` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `room_slug_key` ON `room`;

-- AlterTable
ALTER TABLE `room` DROP COLUMN `slug`;
