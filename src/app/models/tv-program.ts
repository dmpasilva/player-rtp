import { Episode } from './episode';

export class TvProgram {
  href: string;
  channel?: string;
  title: string;
  description: string;
  episodes?: Episode[];
  image?: string;

  constructor(program: any) {
    Object.assign(this, program);
  }
}
