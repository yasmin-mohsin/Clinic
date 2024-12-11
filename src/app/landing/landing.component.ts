import { Component, OnInit } from '@angular/core';
import { HttpsService } from '../shared/services/https.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {


  constructor(private httpServ: HttpsService, private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  
  
}
