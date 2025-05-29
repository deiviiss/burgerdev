-- CreateTable
CREATE TABLE "PhoneNumberMenu" (
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PhoneNumberMenu_pkey" PRIMARY KEY ("id")
);
