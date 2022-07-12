import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, PLATFORM_ID, ViewEncapsulation } from '@angular/core';

import { isPlatformBrowser } from '@angular/common';

import {
	GuiCellView,
	GuiColumn,
	GuiColumnMenu,
	GuiDataType,
	GuiRowColoring,
	GuiRowSelection,
	GuiRowSelectionMode,
	GuiRowSelectionType
} from '@generic-ui/ngx-grid';

import { GuiSelectOption } from '@generic-ui/fabric';
import { ProjectResource } from './data/project.resource';
import { Owner } from './data/owner/owner';
import { Project } from './data/project';

@Component({
	selector: 'gw-demo-project',
	template: `

		<gui-select [options]="sizeOptions"
					[selected]="selectedSize"
					(optionChanged)="changeSize($event)"></gui-select>

		<gui-grid [theme]="'generic'"
				  [source]="projects"
				  [columns]="columns"
				  [sorting]="sorting"
				  [searching]="searching"
				  [maxHeight]="height"
				  [infoPanel]="true"
				  [summaries]="summaries"
				  [columnMenu]="columnMenu"
				  [rowColoring]="rowColoring"
				  [rowSelection]="rowSelection"
				  [cellEditing]="true"
				  [verticalGrid]="false"
				  [horizontalGrid]="true"
				  [virtualScroll]="true">
		</gui-grid>
	`,
	styleUrls: [`./demo-project.component.scss`],
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class DemoProjectComponent {

	sizeOptions: Array<GuiSelectOption> = [{
		name: '100',
		value: '100 Rows'
	}, {
		name: '1000',
		value: '1000 Rows'
	}, {
		name: '10000',
		value: '10 000 Rows'
	}, {
		name: '100000',
		value: '100 000 Rows'
	}];

	selectedSize: GuiSelectOption = {
		name: '10000',
		value: '10 000 Rows'
	};

	projects: Array<Project> = [];

	columns: Array<GuiColumn> = [
		{
			field: 'index',
			header: '#',
			type: GuiDataType.NUMBER,
			width: 50,
			cellEditing: {
				enabled: false
			}
		},
		{
			header: 'Project name',
			field: 'name',
			view: GuiCellView.ITALIC,
			width: 140
		},
		{
			header: 'Project Owner',
			field: (project: any) => project.owner.name,
			type: GuiDataType.STRING,
			width: 160
		},
		{
			header: 'Project ID',
			field: 'id',
			view: GuiCellView.TEXT,
			width: 120
		},
		{
			header: 'Status',
			field: 'status',
			type: GuiDataType.STRING,
			view: (cellValue: any) => {

				let cssClass;

				switch (cellValue) {

					case 'Active':
						cssClass = 'gui-label-blue';
						break;

					case 'Closed':
						cssClass = 'gui-label-green';
						break;

					case 'Open':
						cssClass = 'gui-label-gray';
						break;

				}

				return `<div class="gui-label ${cssClass}">${cellValue}</div>`;
			},
			width: 120,
			cellEditing: {
				enabled: false
			}
		}, {
			header: 'Forecast',
			field: 'forecast',
			type: GuiDataType.NUMBER,
			view: (value: number) => {
				return `<div class="gui-align-right">$ ${value}</div>`;
			},
			width: 120,
			summaries: {
				enabled: true,
				summariesTypes: [
					'min',
					'max'
				]
			},
			cellEditing: {
				enabled: false
			}
		}, {
			header: 'Income',
			field: 'income',
			type: GuiDataType.NUMBER,
			view: (value: number) => {
				return `<div class="gui-align-right">$ ${value}</div>`;
			},
			width: 120,
			summaries: {
				enabled: true,
				summariesTypes: [
					'sum'
				]
			},
			cellEditing: {
				enabled: false
			}
		}, {
			header: 'Progress',
			field: 'progress',
			type: GuiDataType.NUMBER,
			width: 140,
			view: GuiCellView.PERCENTAGE_BAR,
			summaries: {
				enabled: true,
				summariesTypes: [
					'average'
				]
			},
			cellEditing: {
				enabled: true
			}
		}, {
			header: 'Approved',
			field: 'approved',
			type: GuiDataType.BOOLEAN,
			width: 90,
			summaries: {
				enabled: true,
				summariesTypes: [
					'truthy',
					'sum'
				]
			}
		}, {
			header: 'Deadline',
			field: 'deadline',
			type: GuiDataType.DATE,
			width: 130
		}, {
			header: 'Description',
			field: 'description',
			view: GuiCellView.TEXT
		}
	];

	rowSelection: boolean | GuiRowSelection = {
		enabled: true,
		type: GuiRowSelectionType.CHECKBOX,
		mode: GuiRowSelectionMode.MULTIPLE
	};

	sorting = {
		enabled: true,
		multiSorting: true
	};

	columnMenu: GuiColumnMenu = {
		enabled: true,
		columnsManager: true
	};

	searching = {
		enabled: true,
		placeholder: 'Project search',
		highlighting: true
	};

	summaries = {
		enabled: true
	};

	rowColoring = GuiRowColoring.ODD;

	height = 500;

	isBrowser = false;

	constructor(@Inject(PLATFORM_ID) private platformId: any,
				private changeDetectorRef: ChangeDetectorRef,
				private projectResource: ProjectResource) {
		this.generateSource();

		this.isBrowser = isPlatformBrowser(platformId);

		if (isPlatformBrowser(platformId)) {
			let height = window.innerHeight || document.documentElement.clientHeight ||
				document.body.clientHeight;

			height -= 400;

			if (height > 500) {
				this.height = height;
			}
		}
	}

	changeSize(size: GuiSelectOption): void {

		this.selectedSize = size;

		this.generateSource();

		this.changeDetectorRef.detectChanges();
	}

	private generateSource(): void {
		const size = +this.selectedSize.name;
		this.projects = this.projectResource.generateProjects(size);
	}
}
