import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Delete existing data to avoid duplicates when seeding repeatedly.
  await prisma.book.deleteMany();
  await prisma.author.deleteMany();

  // Create authors
  const jkRowling = await prisma.author.create({
    data: {
      name: "J.K. Rowling",
      bio: "British author, best known for writing the Harry Potter fantasy series.",
    },
  });

  const grrMartin = await prisma.author.create({
    data: {
      name: "George R.R. Martin",
      bio: "American novelist and short story writer, screenwriter, and television producer.",
    },
  });

  // Create books
  await prisma.book.createMany({
    data: [
      {
        title: "Harry Potter and the Sorcerer's Stone",
        authorId: jkRowling.id,
        description:
          "The first book in the Harry Potter series, introducing the world of magic.",
        publishedYear: 1997,
      },
      {
        title: "Harry Potter and the Chamber of Secrets",
        authorId: jkRowling.id,
        description: "The second book in the Harry Potter series.",
        publishedYear: 1998,
      },
      {
        title: "A Game of Thrones",
        authorId: grrMartin.id,
        description:
          "The first book in the epic fantasy series A Song of Ice and Fire.",
        publishedYear: 1996,
      },
      {
        title: "A Clash of Kings",
        authorId: grrMartin.id,
        description: "The second book in the A Song of Ice and Fire series.",
        publishedYear: 1998,
      },
    ],
  });

  console.log("Database has been seeded. 🌱");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
