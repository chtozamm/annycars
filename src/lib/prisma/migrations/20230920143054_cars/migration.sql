/*
  Warnings:

  - You are about to drop the `todos` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `todos`;

-- CreateTable
CREATE TABLE `Cars` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
