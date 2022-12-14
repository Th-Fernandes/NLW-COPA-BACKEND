import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.create({
    data: {
      name: "Thiago Fernandes",
      email: "email.amarelin@gmail.com",
      avatarUrl: "https://github.com/th-fernandes.png",
    },
  });

  const pool = await prisma.pool.create({
    data: {
      title: "Bolao do amarelin2",
      code: "BLI124",
      ownerId: user.id,

      participants: {
        create: {
          userId: user.id,
        },
      },
    },
  });

  await prisma.game.create({
    data: {
      date: "2022-11-02T12:00:00.565Z",
      firstTeamCountryCode: "DE",
      SecondTeamCountryCode: "BR",
    },
  });

  await prisma.game.create({
    data: {
      date: "2022-11-03T12:00:00.565Z",
      firstTeamCountryCode: "US",
      SecondTeamCountryCode: "AR",

      guesses: {
        create: {
          firstTeamPoints: 2,
          secondTeamPoints: 2,

          participant: {
            connect: {
              userId_poolId: {
                userId: user.id,
                poolId: pool.id,
              },
            },
          },
        },
      },
    },
  });
}

main();
