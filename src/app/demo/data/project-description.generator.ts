import { Injectable } from '@angular/core';

const lorem = [
	`Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?`,
	`At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.`,
	`Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`
];

@Injectable()
export class ProjectDescriptionGenerator {

	generate(): string {
		const txt = lorem[this.randomNumber(2, 0)].toLowerCase()
												  .split('.')
												  .join()
												  .split('?')
												  .join()
												  .split(',')
												  .join()
												  .split(' ')
												  .slice(0, this.randomNumber(10, 5));

		this.shuffle(txt);

		txt[0] = this.titleCase(txt[0]);

		return txt.join(' ') + '.';
	}

	private shuffle(arr: Array<string>): Array<string> {

		const length = arr.length;

		for (let i = 0; i < length; i++) {

			const j = this.randomNumber(arr.length - 1);

			this.switchValues(arr, i, j);
		}

		return arr;
	}

	private switchValues(arr: Array<string>, i: number, j: number): void {
		let value = arr[i];
		arr[i] = arr[j];
		arr[j] = value;
	}

	private randomNumber(max: number, min: number = 0): number {
		return Math.floor(Math.random() * (max + 1 - min)) + min;
	}

	private titleCase(txt: string): string {
		return txt[0].toUpperCase() + txt.slice(1, txt.length);
	}
}
