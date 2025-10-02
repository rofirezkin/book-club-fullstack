export type T_Author = {
  id: number;
  name: string;
  bio: string;
  createdAt: string;
  updatedAt: string;
};

export type T_Book = {
  id: number;
  title: string;
  description: string;
  publishedYear: number;
  authorId: number;
  author: T_Author;
  createdAt: string;
  updatedAt: string;
};
