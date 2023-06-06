import { BrainStorm } from "./BrainStorm";

export interface Idea {
  id: number,
  title: string,
  how: string,
  what: string,
  who: string,
  why: string,
  where_col: string,
  when_col: string,
  brainStorm: BrainStorm
}
