import { Component, OnInit } from '@angular/core';
import{ Router, ActivatedRoute, Params, RouterLink, RouterOutlet} from'@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit{
  titol= "Benvingut!";
  user="user";
  upasswd="upasswd";
  showDay = false;
  constructor(private _router: Router,
  private _activRoute: ActivatedRoute) { }

  ngOnInit() {
  this._activRoute.paramMap.subscribe(params=>{
    this.user= params.get('user')||"";
    this.upasswd= params.get('upasswd')||"";
    this.titol="Welcome "+this.user+"!";

    });

  }
  showDayWeek(){
    this.showDay =true;
  }

  getNumDiaSetmana(){
    let d = new Date();
    return d.getDay()
  }

}
