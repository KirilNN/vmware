import { TestBed, async } from '@angular/core/testing';
import { ClarityModule } from '@clr/angular';
import { RequesterService } from 'src/app/core/requester.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { LoginComponent } from './login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AuthService } from 'src/app/core/auth.service';
import { StorageService } from 'src/app/core/storage.service';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { HomeComponent } from '../home/home.component';

describe('LoginComponent', () => {
	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [
				FormsModule,
				BrowserModule,
				ReactiveFormsModule,
				ClarityModule,
				AppRoutingModule,
			],
			providers: [
				RequesterService,
				AuthService,
				StorageService,
				HttpClient,
				HttpHandler
			],
			declarations: [
				LoginComponent,
				HomeComponent
			],
		}).compileComponents();
	}));

	it('should create the component', () => {
		const fixture = TestBed.createComponent(LoginComponent);
		const component = fixture.debugElement.componentInstance;
		expect(component).toBeTruthy();
	});

	it('should inject services', () => {
		const fixture = TestBed.createComponent(LoginComponent);
		const component = fixture.debugElement.componentInstance;
		expect(component.formBuilder).toBeTruthy();
		expect(component.authService).toBeTruthy();
		expect(component.router).toBeTruthy();
	});
});
