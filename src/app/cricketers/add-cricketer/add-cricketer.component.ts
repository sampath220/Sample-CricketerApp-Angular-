import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { CricketerService } from 'src/app/services/cricketer.service';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Cricketer } from 'src/app/models/cricketer'
import { User } from 'src/app/models/user'

@Component({
  selector: 'app-add-cricketer',
  templateUrl: './add-cricketer.component.html',
  styleUrls: ['./add-cricketer.component.css']
})
export class AddCricketerComponent implements OnInit {
  @Input() cricketers: Cricketer[];
  cricketerForm: FormGroup
  submitted: boolean = false
  errorMsg = ''
  countries: Array<string> = ["India", "Australia", "England", "New Zealand"]
  @Input() user: User
  selectedCountry: string = "India"

  constructor(private cricketerService: CricketerService, private http: HttpClient,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.cricketerForm = this.formBuilder.group({
      name: ['', Validators.required],
      country: ['India', Validators.required]
    });
    this.cricketerService.getCricketers.subscribe(res => this.cricketers = res)
  }
  get name() {
    return this.cricketerForm.get('name');
  }
  get country() {
    return this.cricketerForm.get('country');
  }

  capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
  }

  onSubmit() {
    this.submitted = true;
    console.log("..........")
    if (this.cricketerForm.valid) {
      let cricketer = this.cricketerForm.value
      cricketer.name = this.capitalize(cricketer.name)
      let existingcricketer = this.cricketers.find((e: Cricketer) => e.name === cricketer.name && e.country === cricketer.country);
      console.log(this.cricketers)
      if (existingcricketer) {
        if (existingcricketer.users.indexOf(this.user.id) !== -1) {
          this.errorMsg = "Already exists";
          return;
        }
        else {
          existingcricketer.users.push(this.user.id);
          this.cricketerService.saveCricketer(existingcricketer, this.user.id).subscribe((res: any) => {
            let resCricketer = res;
            let oldCricketer = this.cricketers.find(e => e.id == resCricketer.id);
            this.cricketers[this.cricketers.indexOf(oldCricketer)] = { ...resCricketer };
            this.cricketerService.updateCricketers(this.cricketers);
          })
        }
      }
      else {
        this.cricketerService.saveCricketer(cricketer, this.user.id).subscribe((res: any) => {
          const resCricketer = res;
          this.cricketers.push(resCricketer);
          this.cricketerService.updateCricketers(this.cricketers);
        })
      }
      this.submitted = false;
      this.cricketerForm.reset();
      this.errorMsg = ''
    }
    else {
      console.log("else")
    }
  }
}
