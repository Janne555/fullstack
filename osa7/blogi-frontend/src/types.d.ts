import { Dispatch } from 'redux'

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


export type AppDispatch = Dispatch<Action.AppAction>

export namespace State {
  type Notification = {
    message: string;
    error: boolean;
  }
}

export namespace Action {
  type SetNotification = {
    type: 'SET_NOTIFICATION';
    message: string;
    error: boolean;
  }

  type AppAction = SetNotification
}

export type NewBlog = Omit<Blog, 'likes' | 'id' | 'user'>