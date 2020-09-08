import { Component, OnInit } from '@angular/core';
import { CricketerService } from '../services/cricketer.service';
import { Router } from '@angular/router';
import { Cricketer } from 'src/app/models/cricketer'
import { User } from 'src/app/models/user'
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-cricketers',
  templateUrl: './cricketers.component.html',
  styleUrls: ['./cricketers.component.css']
})
export class CricketersComponent implements OnInit {
  cricketers: Cricketer[] = [];
  user: User;
  constructor(private cricketerService: CricketerService, private router: Router,
    private authenticationService: AuthenticationService) { }
  ngOnInit(): void {
    console.log(this.cricketers)
    this.cricketerService.getAllCricketers().subscribe((res: any) => {
      this.cricketerService.updateCricketers(res.cricketersResponse);
    });
    this.cricketerService.getCricketers.subscribe(res => {
      this.cricketers = res
    });
    this.authenticationService.currentUser.subscribe(res => {
      console.log(res)
      this.user = res })
  }
  logout() {
    this.authenticationService.logout();
    console.log("logout")
    this.router.navigate(['/cricketers']);
  }
}