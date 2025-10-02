export const authorSchema = {
  type: "object",
  properties: {
    id: { type: "number" },
    name: { type: "string" },
    bio: { type: "string", nullable: true },
    createdAt: { type: "string" },
    updatedAt: { type: "string" },
  },
};

export const authorsSchema = {
  type: "array",
  items: authorSchema,
};
export const authorsResponseSchema = {
  type: "object",
  properties: {
    status: { type: "string" },
    code: { type: "number" },
    message: { type: "string" },
    data: authorsSchema,
  },
};

export const createAuthorBody = {
  type: "object",
  required: ["name"],
  properties: {
    name: { type: "string" },
    bio: { type: "string" },
  },
  additionalProperties: false,
};

export const updateAuthorBody = {
  type: "object",
  properties: {
    name: { type: "string" },
    bio: { type: "string" },
  },
  additionalProperties: false,
};

export const authorParams = {
  type: "object",
  required: ["id"],
  properties: {
    id: { type: "integer" },
  },
};
