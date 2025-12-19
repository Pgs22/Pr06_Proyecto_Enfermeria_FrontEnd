import { Component} from '@angular/core';
import { RouterOutlet } from '@angular/router';
//Para que el register y el login compartan el mismo service y el resto
import { NurseService } from './services/nurse.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
  providers: [NurseService]
})
export class App {
  title = 'Gestión de Enfermeros';  
}
