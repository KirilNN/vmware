import { Injectable } from '@angular/core';

@Injectable()
export class StorageService {
	public getItem(key: string): string {
		return sessionStorage.getItem(key);
	}

	public setItem(key: string, value: string): void {
		sessionStorage.setItem(key, value);
	}

	public removeItem(key: string): void {
		sessionStorage.removeItem(key);
	}

	public clear(): void {
		sessionStorage.clear();
	}
}
