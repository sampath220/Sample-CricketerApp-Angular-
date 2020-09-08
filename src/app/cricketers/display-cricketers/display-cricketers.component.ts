import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { CricketerService } from 'src/app/services/cricketer.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Cricketer } from 'src/app/models/cricketer'
import { User } from 'src/app/models/user'

@Component({
  selector: 'app-display-cricketers',
  templateUrl: './display-cricketers.component.html',
  styleUrls: ['./display-cricketers.component.css']
})
export class DisplayCricketersComponent implements OnInit, OnDestroy {

  @Input() cricketers: Cricketer[]
  // @Output() deleteCricketerEvent = new EventEmitter<any>();
  isLogin;
  isChecked;
  @Input() user: User;
  sortType;
  constructor(private cricketerService: CricketerService,
    private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.isChecked = false;
    this.cricketerService.getCricketers.subscribe(res => {
      this.cricketers = res
    })
  }

  ngOnDestroy() {
    console.log("destroy")
    this.isChecked = false;
  }
  getFilter(cricketers) {
    console.log(this.user);
    if (this.isChecked && this.user)
      return cricketers.filter(cricketer => cricketer.users.contains(this.user.id))
    return cricketers
  }

  deleteCricketer(cricketer) {
    console.log(cricketer);
    const updatedUsers = cricketer.users.filter((t) => t !== this.user.id)
    cricketer.users = updatedUsers;
    console.log(cricketer);
    if (cricketer.users.length > 0) {
      this.cricketerService.deleteCricketer(this.user.id, cricketer.id).subscribe(res => {
        const oldCricketer = this.cricketers.find(e => e.id == res);
        this.cricketers[this.cricketers.indexOf(oldCricketer)] = { ...cricketer };
        this.cricketerService.updateCricketers(this.cricketers);
      },
        (err) => console.log(err)
      )
    }
    else {
      this.cricketerService.deleteCricketer(this.user.id, cricketer.id).subscribe(res => {
        this.cricketers = this.cricketers.filter((t: Cricketer) => t.id !== cricketer.id)
        this.cricketerService.updateCricketers(this.cricketers);
      })
    }
  }
  onSort = (column: string, order: string) => {
    const data = this.cricketers;
    data.sort(this.compareValues(column, order))
    this.sortType = this.sortType === 'asc' ? 'desc' : 'asc';
  }
  compareValues(key: string, order = 'asc') {
    return function innerSort(a: any, b: any) {
      if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) return 0;
      let comparison;
      if (key === 'users')
        comparison = a.users.length - b.users.length;
      else
        comparison = a[key].localeCompare(b[key]);
      return (
        (order === 'desc') ? (comparison * -1) : comparison
      );
    };

  }
}
