import { Dispatch } from 'redux'
import { ThunkDispatch } from 'redux-thunk'
import { AppState } from './store'

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
export type AppThunkDispatch<T> = ThunkDispatch<AppState, undefined, T>

export type AppAsyncAction<TAction> = (dispatch: AppThunkDispatch<TAction>, getState: () => AppState) => Promise<void>

export namespace State {
  type Notification = {
    message: string;
    error: boolean;
  }

  type User = {
    username?: string;
    token?: string;
  }
}

export namespace Action {
  type SetNotification = {
    type: 'SET_NOTIFICATION';
    message: string;
    error: boolean;
  }

  type InitBlogs = {
    type: 'INIT_BLOGS';
    blogs: Blog[];
  }

  type SetUser = {
    type: 'SET_USER';
    username: string;
    token: string;
  }

  type Logout = {
    type: 'LOGOUT';
  }

  type BlogAction = InitBlogs

  type UserAction = SetUser | Logout

  type AppAction = SetNotification | BlogAction | UserAction
}

export type NewBlog = Omit<Blog, 'likes' | 'id' | 'user'>