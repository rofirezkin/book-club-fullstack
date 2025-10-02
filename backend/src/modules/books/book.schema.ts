export const authorRef = {
  type: "object",
  properties: {
    id: { type: "number" },
    name: { type: "string" },
    bio: { type: "string", nullable: true },
    createdAt: { type: "string" },
    updatedAt: { type: "string" },
  },
};

export const bookSchema = {
  type: "object",
  properties: {
    id: { type: "number" },
    title: { type: "string" },
    description: { type: "string", nullable: true },
    publishedYear: { type: "number", nullable: true },
    authorId: { type: "number" },
    author: authorRef,
    createdAt: { type: "string" },
    updatedAt: { type: "string" },
  },
};

export const bookParams = {
  type: "object",
  required: ["id"],
  properties: {
    id: { type: "integer" },
  },
};

export const createBookBody = {
  type: "object",
  required: ["title", "authorId"],
  properties: {
    title: { type: "string" },
    authorId: { type: "integer" },
    description: { type: "string" },
    publishedYear: { type: "integer" },
  },
  additionalProperties: false,
};

export const updateBookBody = {
  type: "object",
  properties: {
    title: { type: "string" },
    authorId: { type: "integer" },
    description: { type: "string" },
    publishedYear: { type: "integer" },
  },
  additionalProperties: false,
};
