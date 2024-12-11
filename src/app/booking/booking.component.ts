import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpsService } from '../shared/services/https.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  bookForm!: FormGroup;
  model!: any;
  isSubmited: boolean = false;
  today: Date = new Date();
  brachList!: any;
  deptList!: any;
  doctorList!: any;
  minDate = {
    year: this.today.getFullYear(),
    month: this.today.getMonth() + 1,
    day: this.today.getDay() + 1
  }

  constructor(private fb: FormBuilder, private http: HttpsService) { }

  ngOnInit(): void {
    this.initForm();
    this.getBranchList();
  }

  initForm() {
    this.bookForm = this.fb.group({
      name: [null, [Validators.required, Validators.maxLength(50), Validators.minLength(1), Validators.pattern('^[A-Za-z]*$')]],
      phone: [null, [Validators.required, Validators.maxLength(9), Validators.minLength(9), Validators.pattern('^[5][0,2,3,4,5,6,7,8][0-9]+$')]],
      branch: [null, [Validators.required]],
      dept: [null, [Validators.required]],
      doctor: [null, [Validators.required]],
      date: [null, [Validators.required]]
    })
  }

  getBranchList() {
    this.http.get('branches').subscribe(res => {
      this.brachList = res;
    })
  }

  getDeptList(branchId: any) {
    this.bookForm.controls['dept'].setValue(null);
    this.bookForm.controls['doctor'].setValue(null);
    this.http.get('departments').subscribe(res => {
      this.deptList = res;
      this.deptList?.map((ele: any) => {
        ele['matched'] = ele?.branchIds?.split(',').some((id: any) => { return id == branchId })
      })
      console.log(this.deptList)
    })
  }

  getDoctorList(deptId: any) {
    this.bookForm.controls['doctor'].setValue(null);
    this.http.get('doctors').subscribe(res => {
      this.doctorList = res;
    })
  }


  submitBook() {
    this.isSubmited = true;
    console.log(this.bookForm)
    if(this.bookForm.valid){
      this.http.post(this.bookForm.value, 'booking').subscribe(res=>console.log(res))
    }
    else{return}
  }
}
