import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';


@Component({
	selector: 'app-login',
	templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
	loginForm: FormGroup;

	constructor(
		private readonly authService: AuthService,
		private readonly router: Router,
		private readonly formBuilder: FormBuilder,
	) { }

	ngOnInit() {
		const email = this.formBuilder.control('', [Validators.required]);
		const password = this.formBuilder.control('', [Validators.required]);
		this.loginForm = this.formBuilder.group({
			email,
			password,
		});
	}


	public login(): void {
		this.authService.loginUser(this.loginForm.value).subscribe(
			() => this.router.navigate(['/home']),
			error => {}
		);
	}
}
