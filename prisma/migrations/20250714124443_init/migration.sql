-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('seller', 'supervisor');

-- CreateEnum
CREATE TYPE "SaleStatus" AS ENUM ('Em_aprovisionamento', 'Instalada', 'Cancelada', 'Com_pendencia', 'Aguardando_pagamento', 'Pendencia_tecnica', 'Draft', 'Sem_slot');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "employee_id" TEXT NOT NULL,
    "role" "UserRole" DEFAULT 'seller',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sales" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "cpf_cnpj" TEXT,
    "region" TEXT,
    "ticket" TEXT,
    "caller_id_phone" TEXT,
    "phone" TEXT,
    "sale_date" TIMESTAMP(3),
    "internet_plan_speed" TEXT,
    "payment_method" TEXT,
    "internet_type" TEXT,
    "installation_date" TIMESTAMP(3),
    "installation_shift" TEXT,
    "customer_name" TEXT,
    "service_order" TEXT,
    "extension" TEXT,
    "observation" TEXT,
    "status" "SaleStatus" DEFAULT 'Em_aprovisionamento',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "sales_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "sales" ADD CONSTRAINT "sales_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
