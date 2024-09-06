-- CreateEnum
CREATE TYPE "CropsEnum" AS ENUM ('SOJA', 'MILHO', 'ALGODAO', 'CAFÉ', 'CANA DE AÇUCAR');

-- CreateTable
CREATE TABLE "RuralProducer" (
    "id" TEXT NOT NULL,
    "cpfOrCnpj" TEXT NOT NULL,
    "producerName" TEXT NOT NULL,
    "farmName" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "farmTotalArea" DOUBLE PRECISION NOT NULL,
    "farmArableArea" DOUBLE PRECISION NOT NULL,
    "farmVegetationArea" DOUBLE PRECISION NOT NULL,
    "plantedCrops" "CropsEnum"[],

    CONSTRAINT "RuralProducer_pkey" PRIMARY KEY ("id")
);
