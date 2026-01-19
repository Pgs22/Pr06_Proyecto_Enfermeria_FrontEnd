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
  showList = true;
  nurses: Nurse[] = [];

  constructor(
    private nurseService: NurseService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (!this.nurseService.isLoggedIn()) {
      this.router.navigate(['/']);
			return;
    }
    // this.nurses = this.nurseService.getNurses().map(n => ({
    //   ...n,
    //   image: (n as Nurse).image 

    // }));
  }
  toggleList() {
    this.showList = !this.showList;
  }
}
