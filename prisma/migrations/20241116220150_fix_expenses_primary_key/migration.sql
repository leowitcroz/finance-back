/*
  Warnings:

  - The primary key for the `expenses` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE `expenses` DROP PRIMARY KEY,
    ADD PRIMARY KEY (`idexpenses`);
