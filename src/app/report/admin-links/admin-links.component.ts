import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
@Component({
  selector: 'app-admin-links',
  templateUrl: './admin-links.component.html',
  styleUrls: ['./admin-links.component.scss']
})
export class AdminLinksComponent implements OnInit {

  constructor(private auth: AuthService) { }

  ngOnInit() {
  }

}
