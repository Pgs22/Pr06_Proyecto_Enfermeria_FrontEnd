import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
	selector: 'app-nurse-find',
	standalone: true,
	imports: [RouterLink, FormsModule, CommonModule],
	templateUrl: './nurse-find.html',
	styleUrls: ['./nurse-find.css']
})
export class NurseFind {
	title = 'Hospital Management - Nurse Find Component';
	username: string = '';
	searchResults: Array<{ name: string }> = [];

	onSearch() {
		const name = this.username?.trim();
		// el if que pide la actividad lo utilizo para verificar si existe una persona con ese nombre
		if (!name) {
			this.searchResults = [];
			return;

		}
		const lowerName = name.toLowerCase();

		// Array de enfermeras demo (los datos que sirven de prueba)
		const nurses = [
			{ name: 'Ana Martínez' },
			{ name: 'Ana López', },
			{ name: 'Ana Sofía Herrera', },

			// otro nombre para contraste
			{ name: 'María González', }
		];

		// Filtrar por coincidencia
		this.searchResults = nurses.filter(n =>
			n.name.toLowerCase().includes(lowerName)
		);
	}
}