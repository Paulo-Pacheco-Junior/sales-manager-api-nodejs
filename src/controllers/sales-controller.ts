import { Request, Response } from "express";
import { prisma } from "../database/prisma";
import { z } from "zod";

class SalesController {
  async create(request: Request, response: Response) {
    const bodySchema = z.object({
      userId: z.string().uuid(),
      callerIdPhone: z.string().optional(),
      ticket: z.string().optional(),
      cpfCnpj: z.string().optional(),
      phone: z.string().optional(),
      region: z.string().optional(),
      saleDate: z.string().nullable(),
      internetPlanSpeed: z.string().optional(),
      paymentMethod: z.string().optional(),
      internetType: z.string().optional(),
      installationDate: z.string().nullable(),
      installationShift: z.string().optional(),
      customerName: z.string().optional(),
      serviceOrder: z.string().optional(),
      extension: z.string().optional(),
      observation: z.string().optional(),
      status: z
        .enum([
          "Em_aprovisionamento",
          "Instalada",
          "Cancelada",
          "Com_pendencia",
          "Aguardando_pagamento",
          "Pendencia_tecnica",
          "Draft",
          "Sem_slot",
        ])
        .default("Em_aprovisionamento"),
    });

    const {
      userId,
      cpfCnpj,
      region,
      ticket,
      callerIdPhone,
      phone,
      saleDate,
      internetPlanSpeed,
      paymentMethod,
      internetType,
      installationDate,
      installationShift,
      customerName,
      serviceOrder,
      extension,
      observation,
      status,
    } = bodySchema.parse(request.body);

    await prisma.sale.create({
      data: {
        userId,
        cpfCnpj: cpfCnpj ?? "",
        region: region ?? "",
        ticket: ticket ?? "",
        callerIdPhone: callerIdPhone ?? "",
        phone: phone ?? "",
        saleDate: saleDate ? new Date(saleDate) : null,
        internetPlanSpeed: internetPlanSpeed ?? "",
        internetType: internetType ?? "",
        paymentMethod: paymentMethod ?? "",
        installationDate: installationDate ? new Date(installationDate) : null,
        installationShift: installationShift ?? "",
        customerName: customerName ?? "",
        serviceOrder: serviceOrder ?? "",
        extension: extension ?? "",
        observation: observation ?? "",
        status: status ?? "Em_aprovisionamento",
      },
    });

    return response.status(201).json();
  }

  async index(request: Request, response: Response) {
    const role = request.user?.role;
    const userId = request.user?.id;

    let sales;

    if (role === "supervisor") {
      sales = await prisma.sale.findMany({
        include: {
          user: { select: { name: true, email: true, employeeId: true } },
        },
        orderBy: [
          { saleDate: "desc" },
          { installationDate: "asc" },
          { createdAt: "desc" },
        ],
      });
    } else {
      sales = await prisma.sale.findMany({
        where: {
          userId: userId,
        },
        include: {
          user: { select: { name: true, email: true, employeeId: true } },
        },
        orderBy: [
          { saleDate: "desc" },
          { installationDate: "asc" },
          { createdAt: "desc" },
        ],
      });
    }
    return response.json(sales);
  }

  async show(request: Request, response: Response) {
    const { id } = request.params;

    const sale = await prisma.sale.findUnique({
      where: { id },
    });

    if (!sale) {
      return response.status(404).json({ message: "Sale not found" });
    }

    return response.json(sale);
  }

  async update(request: Request, response: Response) {
    const { id } = request.params;

    const bodySchema = z.object({
      cpfCnpj: z.string().optional(),
      region: z.string().optional(),
      ticket: z.string().optional(),
      callerIdPhone: z.string().optional(),
      phone: z.string().optional(),
      saleDate: z.string().nullable(),
      internetPlanSpeed: z.string().optional(),
      paymentMethod: z.string().optional(),
      internetType: z.string().optional(),
      installationDate: z.string().nullable(),
      installationShift: z.string().optional(),
      customerName: z.string().optional(),
      serviceOrder: z.string().optional(),
      extension: z.string().optional(),
      observation: z.string().optional(),
      status: z
        .enum([
          "Em_aprovisionamento",
          "Instalada",
          "Cancelada",
          "Com_pendencia",
          "Aguardando_pagamento",
          "Pendencia_tecnica",
          "Draft",
          "Sem_slot",
        ])
        .default("Em_aprovisionamento"),
    });

    const updateData = bodySchema.parse(request.body);

    const sale = await prisma.sale.findUnique({
      where: { id },
    });

    if (!sale) {
      return response.status(404).json({ message: "Sale not found" });
    }

    const updatedSale = await prisma.sale.update({
      where: { id },
      data: updateData,
    });

    return response.json(updatedSale);
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params;

    const sale = await prisma.sale.findUnique({
      where: { id },
    });

    if (!sale) {
      return response.status(404).json({ message: "Sale not found" });
    }

    await prisma.sale.delete({
      where: { id },
    });

    return response.status(204).send();
  }
}

export { SalesController };