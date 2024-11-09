import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../utils/connect";

const axios = require("axios");

export const POST = async (req: NextRequest) => {
  try {
    const { id, name } = await req.json();

    try {
      const user = await prisma.user.findUnique({
        where: {
          id,
        },
      });

      const userExists = !!user;

      if (userExists) {
        return NextResponse.json({ userExists });
      }
    } catch (error) {
      return NextResponse.json({ error }, { status: 500 });
    }

    const newUser = await prisma.user.create({
      data: {
        id: id,
        name: name,
        Attempts: {
          createMany: {
            data: [
              {
                archetecture: "",
                lastLoss: -1,
                level: "L1",
                rating: -1,
              },
              {
                archetecture: "",
                lastLoss: -1,
                level: "L2",
                rating: -1,
              },
              {
                archetecture: "",
                lastLoss: -1,
                level: "L3",
                rating: -1,
              },
              {
                archetecture: "",
                lastLoss: -1,
                level: "L4",
                rating: -1,
              },
            ],
          },
        },
      },
    });
    return NextResponse.json({ user: newUser }, { status: 200 });
  } catch (error) {
    // console.error(error);
    return NextResponse.json({ error }, { status: 500 });
  }
};
