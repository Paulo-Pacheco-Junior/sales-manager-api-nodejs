import { AppError } from "../utils/AppError";
import { Request, Response } from "express";
import { prisma } from "../database/prisma";
import { hash } from "bcrypt";
import { z } from "zod";

class UsersController {
  async create(request: Request, response: Response) {
    const bodySchema = z.object({
      name: z.string().trim().min(2),
      employeeId: z.string(),
      email: z.string().email(),
      password: z.string().min(6),
      role: z.enum(["seller", "supervisor"]).optional(),
    });

    const { name, employeeId, email, password, role } = bodySchema.parse(
      request.body
    );

    const userWithSameEmail = await prisma.user.findFirst({ where: { email } });

    const userWithSameEmployeeId = await prisma.user.findFirst({
      where: { employeeId },
    });

    if (userWithSameEmail) {
      throw new AppError("User with same email already exists");
    }

    if (userWithSameEmployeeId) {
      throw new AppError("User with same employeeId already exists");
    }

    const hashedPassword = await hash(password, 8);

    const user = await prisma.user.create({
      data: {
        name,
        employeeId,
        email,
        password: hashedPassword,
        role,
      },
    });

    const { password: _, ...userWithoutPassword } = user;

    return response.status(201).json(userWithoutPassword);
  }
}

export { UsersController };