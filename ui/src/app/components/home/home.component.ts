import { Component } from '@angular/core';
import { RequesterService } from 'src/app/core/requester.service';
import { RepoModel } from 'src/app/models/repo.model';
import { tap } from 'rxjs/operators';
import { CommitModel } from 'src/app/models/commit.model';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html'
})
export class HomeComponent {
	private repos: RepoModel[] = [];
	private commits: CommitModel[] = [];
	private showCommits: boolean;
	private showModal: boolean;

	constructor(
		private readonly requester: RequesterService
	) {
		this.fetch();
	}

	showError(error: string) {
		this.showModal = true;
	}

	hideCommits() {
		this.showCommits = false;
	}

	onRowClick(row) {
		this.requester.get(`http://localhost:8080/api/commits/${row.name}`, null)
			.pipe(
				tap(
					data => data,
					error => this.showError(error)
				)
			)
			.subscribe(({ data }) => {
				this.commits = data;
				this.showCommits = true;
			});
	}

	fetch() {
		this.requester.get('http://localhost:8080/api/repos', null)
			.pipe(
				tap(
					data => data,
					error => this.showError(error)
				)
			)
			.subscribe(({ data }) => {
				this.repos = data.map(({ node }) => ({
					name: node.name,
					link: `https://github.com/vmware/${node.name}`
				}));
			});
	}
}
