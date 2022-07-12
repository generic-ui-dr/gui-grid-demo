import { NgModule } from '@angular/core';

import { ProjectResource } from './project.resource';
import { ProjectDescriptionGenerator } from './project-description.generator';
import { OwnerModule } from './owner/owner.module';


@NgModule({
	imports: [
		OwnerModule
	],
	providers: [
		ProjectResource,
		ProjectDescriptionGenerator
	]
})
export class ProjectModule {
}
