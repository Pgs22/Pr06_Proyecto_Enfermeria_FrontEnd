import { Component, OnInit } from '@angular/core';
import{ Router, ActivatedRoute, Params, RouterLink, RouterOutlet} from'@angular/router';
import { KeyValuePipe } from '@angular/common';
import { NurseService } from '../services/nurse.service';

@Component({
  selector: 'app-home',
  imports: [RouterLink, KeyValuePipe],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit{
  titol= "Benvingut!";
  user="user";
  upasswd="upasswd";
  showDay = false;
  headNurses = ["Joana", "Paula", "David"];
  
  constructor(private _router: Router, private nurseService: NurseService,
  private _activRoute: ActivatedRoute) { }

  ngOnInit() {
  this._activRoute.paramMap.subscribe(params=>{
    this.user= params.get('user')||"";
    this.upasswd= params.get('upasswd')||"";
    this.titol="Welcome "+this.user;
    });
  }
  
  showDayWeek(){
    this.showDay =true;
  }

  getNumDiaSetmana(){
    let d = new Date();
    return d.getDay()
  }

  get isLogged(): boolean {
    //return this.nurseService.isAuthenticated();
    return this.nurseService.isLoggedIn();
  }

  onLogout() {
    this.nurseService.logoutUser();
    this._router.navigate(['/nurse-login']); //Add
      }
  }
