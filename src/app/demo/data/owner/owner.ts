export class Owner {

	public readonly name: string;

	constructor(
		public readonly firstName: string,
		public readonly lastName: string,
		public readonly color: string) {
		this.name = this.firstName + ' ' + this.lastName;
	}

}
