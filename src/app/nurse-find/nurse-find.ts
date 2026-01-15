import { Component, OnInit } from '@angular/core';
import { RouterLink } from "@angular/router";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NurseService, Nurse } from '../services/nurse.service';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
	selector: 'app-nurse-find',
	standalone: true,
	imports: [RouterLink, FormsModule, CommonModule,],
	templateUrl: './nurse-find.html',
	styleUrls: ['./nurse-find.css'],
	providers: [NurseService]
})
export class NurseFind implements OnInit {
	title = 'Hospital Management - Nurse Find Component';
	username: string = '';
	nurses: Nurse[] = [];
	searchResults: Nurse[] = [];

	constructor(
		private nurseService: NurseService,
		private router: Router
	) { }

	ngOnInit(): void {
		if (!this.nurseService.isLoggedIn()) {
			this.router.navigate(['/']);
			return;
		}
		//this.nurses = this.nurseService.getNurses()
		this.nurseService.getNurses()
			.subscribe(result => {
				this.nurses = result;
				console.log(result);

				console.log("Datos cargados del servicio:", this.nurses);
			}
			);
	}
		onSearch() {
		const searchTerm = this.username?.trim().toLowerCase();
		if (!searchTerm) {
			this.searchResults = [];
			return;
		}

		console.log("Buscando a: " + searchTerm);

		// Filtramos la lista completa (this.nurses)
		this.searchResults = this.nurses.filter(nurse =>
			(nurse.name || '').toLowerCase().includes(searchTerm)
		);
	}
}


