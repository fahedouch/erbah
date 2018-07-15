import {User} from "./index";
import {Action} from './action';

export interface Message {
  from?: User;
  content?: any;
  action?: Action;
}
