import { Component } from '@angular/core';
import { AuthService } from 'src/app/core/auth.service';
import { Router } from '@angular/router';
import { RequesterService } from 'src/app/core/requester.service';
import { RepoModel } from 'src/app/models/repo.model';
import { tap, map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent {
  public repos: RepoModel[];

  constructor(
    private readonly requester: RequesterService
  ) {
    this.fetch();
    this.repos =
    [{"node":{"name":"clarity", link:"foo"}},
    {"node":{"name":"photon", link:"foo"}},
    {"node":{"name":"pyvmomi", link:"foo"}},
    {"node":{"name":"open-vm-tools", link:"foo"}},
    {"node":{"name":"govmomi", link:"foo"}}]
  }

  showError(error: string) {

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
      })

  }
}
