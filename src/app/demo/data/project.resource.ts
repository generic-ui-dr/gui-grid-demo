import { Injectable } from '@angular/core';

import { Project } from './project';
import { projectNames } from './project-names';
import { ProjectDescriptionGenerator } from './project-description.generator';
import { OwnerResource } from './owner/owner.resource';
import { companies } from './common/companies';
import { Owner } from './owner/owner';


@Injectable()
export class ProjectResource {

  private owners: Array<Owner> = [];

  constructor(private ownerResource: OwnerResource,
              private projectDescriptionGenerator: ProjectDescriptionGenerator) {
  }

  generate(): void {
  }

  generateProjects(count: number = 10000): Array<Project> {

    this.owners = this.ownerResource.generateOwners(count);

    let projects = [];

    for (let i = 0; i < count; i++) {
      projects.push(
        this.generateProject(i)
      );
    }

    return projects;
  }

  private generateProject(index: number): Project {

    const rand = Math.random();

    let randomProjectName = Math.floor(rand * projectNames.length),
      randomOwner = Math.floor(Math.random() * this.owners.length),
      forecast = Math.ceil(Math.random() * 100000),
      progress = Math.ceil(rand * 101) - 1,
      randomCompany = Math.floor(Math.random() * companies.length);

    return new Project(
      index + 1,
      this.getProjectId(),
      projectNames[randomProjectName],
      companies[index % 3],
      '12.01.2020',
      this.getDate(rand),
      this.getDescription(),
      this.owners[randomOwner],
      this.generateForecast(),
      this.generateIncome(),
      progress,
      this.getStatus(rand),
      this.getTeamSize(rand),
      this.isApproved(rand),
      this.getImpact(rand)
    );
  }

  private getStatus(rand: number): string {
    let status = Math.floor(rand * 3);

    switch (status) {
      case 0:
        return 'Active';

      case 1:
        return 'Closed';

      case 2:
        return 'Open';

      default:
        return '';
    }
  }

  private getTeamSize(rand: number): number {
    return Math.ceil(rand * 32);
  }

  private isApproved(rand: number): boolean {
    return Math.random() > 0.45;
  }

  private getDate(rand: number): Date {
    return (new Date(Math.floor(rand * 83345678880) + 1534567888000));
  }

  private getProjectId(): string {
    return (this.generateRandomString() + this.generateRandomString()).toUpperCase();
  }

  private generateRandomString(): string {
    return Math.floor((1 + Math.random()) * 0x10000)
               .toString(16)
               .substring(1);
  }

  private getDescription(): string {
    return this.projectDescriptionGenerator.generate();
  }

  private generateForecast(): number {

    const base = [
      5000,
      50000,
      100000,
      27000
    ];

    const actualBase = base[Math.floor(Math.random() * 4)];

    return Math.ceil(Math.random() * Math.random() * actualBase + actualBase * Math.random());
  }

  private generateIncome(): number {

    const base = [
      100,
      -150,
      290,
      -230,
      130
    ];

    const actualBase = base[Math.floor(Math.random() * base.length)];

    return Math.ceil(Math.random() * Math.random() * actualBase + actualBase * Math.random());
  }

  private getImpact(rand: number): string {

    const impact = [
      'Negligible',
      'Minor',
      'Moderate',
      'Significant',
      'Severe'
    ];

    const impactNumber = Math.floor(rand * 5);

    return impact[impactNumber];
  }

}
