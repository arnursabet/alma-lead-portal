declare module 'redux-mock-store' {
  import { Middleware, Store, Action } from 'redux';
  
  export default function configureStore<T>(
    middlewares: Middleware[]
  ): (state?: T) => Store<T> & {
    getActions: () => Action[];
    clearActions: () => void;
  };
} 