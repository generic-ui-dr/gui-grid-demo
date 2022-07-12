import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GuiGridModule } from '@generic-ui/ngx-grid';
import { FabricModule } from '@generic-ui/fabric';

import { DemoProjectComponent } from './demo-project.component';
import { ProjectModule } from './data/project.module';


@NgModule({
	imports: [
		CommonModule,
		GuiGridModule,
		ProjectModule,
		FabricModule
	],
	declarations: [
		DemoProjectComponent
	],
	exports: [
		DemoProjectComponent
	],
	providers: []
})
export class DemoProjectModule {
}
