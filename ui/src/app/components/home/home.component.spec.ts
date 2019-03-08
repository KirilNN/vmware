import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HomeComponent } from './home.component';
import { ClarityModule } from '@clr/angular';
import { RequesterService } from 'src/app/core/requester.service';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('HomeComponent', () => {
	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [
				ClarityModule
			],
			providers: [
				RequesterService,
				HttpClient,
				HttpHandler
			],
			declarations: [
				HomeComponent
			],
		}).compileComponents();
	}));

	it('should create the component', () => {
		const fixture = TestBed.createComponent(HomeComponent);
		const component = fixture.debugElement.componentInstance;
		expect(component).toBeTruthy();
	});

	it(`should not commits initally`, () => {
		const fixture = TestBed.createComponent(HomeComponent);
		const component = fixture.debugElement.componentInstance;
		expect(component.commits.length).toEqual(0);
	});

	it(`should hide commits onclick`, () => {
		const fixture = TestBed.createComponent(HomeComponent);
		const component = fixture.debugElement.componentInstance;
		component.hideCommits();
		expect(component.showCommits).toEqual(false);
	});

	it(`should show errors`, () => {
		const fixture = TestBed.createComponent(HomeComponent);
		const component = fixture.debugElement.componentInstance;
		component.showError();
		expect(component.showModal).toEqual(true);
	});
});
