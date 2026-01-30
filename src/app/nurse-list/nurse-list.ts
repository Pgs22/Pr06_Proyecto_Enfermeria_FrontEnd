import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from "@angular/router";
import { NurseService, Nurse } from '../services/nurse.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nurse-list',
  imports: [CommonModule, RouterLink],
  templateUrl: './nurse-list.html',
  styleUrls: ['./nurse-list.css'],
})

export class NurseList implements OnInit {
  nurses: Nurse[] = [];
  searchResults: Nurse[] = [];
  showList = false;

  constructor(
    private nurseService: NurseService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (!this.nurseService.isLoggedIn()) {
      this.router.navigate(['/']);
			return;
    }
 this.nurseService.getNursesList().subscribe(result => {
  this.nurses = result.map(nurse => {
    const imageData = nurse.profileImage;

    // Si el backend devuelve base64 sin prefijo, agrega el prefijo MIME
    if (imageData && !imageData.startsWith('data:')) {
      const mimeType = imageData.startsWith('/9j/') ? 'image/jpeg' : 'image/png';
      nurse.profileImage = `data:${mimeType};base64,${imageData}`;
    } else if (imageData) {
      nurse.profileImage = imageData;
    }
    return nurse;
  });
});
  }
  toggleList() {
    this.showList = !this.showList;
  }
}
