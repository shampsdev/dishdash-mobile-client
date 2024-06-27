import { User } from './user.interface';

export interface Vote {
  user: User;
  voteId: number;
  voteOption: number;
}
