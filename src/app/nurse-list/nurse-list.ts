import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from "@angular/router";


@Component({
  selector: 'app-nurse-list',
  imports: [CommonModule, RouterLink],
  templateUrl: './nurse-list.html',
  styleUrls: ['./nurse-list.css'],
})
export class NurseList {
  showList = true;

  nurses = [
    { id: 1, name: 'María López', email: 'maria.lopez@example.com' },
    { id: 2, name: 'Juan Pérez', email: 'juan.perez@example.com' },
    { id: 3, name: 'Ana García', email: 'ana.garcia@example.com' }
  ];

  toggleList() {
    this.showList = !this.showList;
  }
}
