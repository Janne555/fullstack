export type Book = { title: string, author: Author, published: number, genres: string[]}
export type Author = { name: string, born?: number, bookCount: number }