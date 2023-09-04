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
    const { firstName, lastName, email, phone, city, password } = req.body;

    const errors: string[] = [];

    const validatonSchema = [
      {
        valid: validator.isLength(firstName, {
          min: 2,
          max: 20,
        }),
        errorMessage: "First name must be between 2 and 20 characters",
      },
      {
        valid: validator.isAlpha(firstName),
        errorMessage: "First name must only contain letters",
      },
      {
        valid: validator.isLength(lastName, {
          min: 2,
          max: 20,
        }),
        errorMessage: "Last name must be between 2 and 20 characters",
      },
      {
        valid: validator.isAlpha(lastName),
        errorMessage: "Last name must only contain letters",
      },
      {
        valid: validator.isEmail(email),
        errorMessage: "Email is not valid",
      },
      {
        valid: validator.isMobilePhone(phone),
        errorMessage: "Phone number is not valid",
      },
      {
        valid: validator.isStrongPassword(password, {
          minLength: 6,
          minLowercase: 1,
          minUppercase: 1,
          minNumbers: 1,
          minSymbols: 1,
        }),
        errorMessage:
          "Password is not strong enough. Password must contain at least 6 characters, 1 lowercase, 1 uppercase, 1 number and 1 symbol.",
      },
      {
        valid: validator.isLength(city, {
          min: 2,
          max: 20,
        }),
        errorMessage: "City must be between 2 and 20 characters",
      },
      {
        valid: validator.isAlpha(city),
        errorMessage: "City must only contain letters",
      },
    ];

    validatonSchema.forEach((check) => {
      if (!check.valid) {
        errors.push(check.errorMessage);
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

    if (userWithEmail) {
      return res.status(400).json({ errorMessage: "Email already exists" });
    }

    const hashedPassord = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        first_name: firstName,
        last_name: lastName,
        email,
        phone,
        city,
        password: hashedPassord,
      },
    });

    const alg = "HS256";

    const secret = new TextEncoder().encode(process.env.JWT_SECRET);

    const token = await new jose.SignJWT({
      email: newUser.email,
    })
      .setProtectedHeader({ alg })
      .setExpirationTime("24h")
      .sign(secret);

    return res.status(200).json({ token: token });
  }

  return res.status(405).json({ message: "Method not allowed" });
}
