import { Owner } from './owner/owner';

export class Project {

  constructor(
    public readonly index: number,
    public readonly id: string,
    public readonly name?: string,
    public readonly company?: string,
    public readonly startDate?: string,
    public readonly deadline?: Date,
    public readonly description?: string,
    public readonly owner?: Owner,
    public readonly forecast?: number,
    public readonly income?: number,
    public readonly progress?: number,
    public readonly status?: string,
    public readonly teamSize?: number,
    public readonly approved?: boolean,
    public readonly impact?: string
  ) {
  }

}
