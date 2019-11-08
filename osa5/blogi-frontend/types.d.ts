export type User = {
  token: string;
  username: string;
}

export type Credentials = {
  username: string;
  password: string;
}

export type Message = {
  content: string;
  error?: boolean;
}

export type Blog = {
  title: string;
  author: string;
  url: string;
  likes: number;
  id: string;
  user: {
    username: string;
  };
}

export type NewBlog = Omit<Blog, 'likes' | 'id' | 'user'>