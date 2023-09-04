import { NextApiRequest, NextApiResponse } from "next";
import validator from "validator";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import * as jose from "jose";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const errors: string[] = [];
    const { email, password } = req.body;

    const validatonSchema = [
      {
        valid: validator.isEmail(email),
        errorMessage: "Email is not valid",
      },
      {
        valid: validator.isLength(password, { min: 6 }),
        errorMessage: "Password must be at least 6 characters",
      },
    ];

    validatonSchema.forEach((rule) => {
      if (!rule.valid) {
        errors.push(rule.errorMessage);
      }
    });

    if (errors.length > 0) {
      return res.status(400).json({ message: errors });
    }

    const userWithEmail = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!userWithEmail) {
      return res
        .status(401)
        .json({ errorMessage: "Email or password is incorrect" });
    }

    const isMatchPassword = await bcrypt.compare(
      password,
      userWithEmail.password
    );

    if (!isMatchPassword) {
      return res.status(401).json({ errorMessage: "Password is incorrect" });
    }

    const alg = "HS256";

    const secret = new TextEncoder().encode(process.env.JWT_SECRET);

    const token = await new jose.SignJWT({
      email: userWithEmail.email,
    })
      .setProtectedHeader({ alg })
      .setExpirationTime("24h")
      .sign(secret);

    return res.status(200).json({ token: token });
  }

  return res.status(405).json({ message: "Method not allowed" });
}
