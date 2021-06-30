import { Router } from '@angular/router';
import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { ApiService } from './../../shared/api.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

export interface Subject {
  name: string;
}

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})

export class AddStudentComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  @ViewChild('chipList', { static: true }) chipList;
  @ViewChild('resetStudentForm', { static: true }) myNgForm;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  studentForm: FormGroup;

  ngOnInit() {
    this.submit_form();
  }

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private studentApi: ApiService
  ) { }

  /* Form */
  submit_form() {
    this.studentForm = this.fb.group({
      id_number: ['', [Validators.required]],
      full_name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      department: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      height: ['', [Validators.required]],
      birth_date: ['', [Validators.required]],
      gender: ['Male']
    })
  }

  /* Date */
  formatDate(e) {
    var convertDate = new Date(e.target.value).toISOString().substring(0, 10);
    this.studentForm.get('birth_date').setValue(convertDate, {
      onlyself: true
    })
  }  

  /* Error Handling */
  public handleError = (controlName: string, errorName: string) => {
    return this.studentForm.controls[controlName].hasError(errorName);
  }  

  /* Submit */
  submitStudentForm() {
    if (this.studentForm.valid) {
      this.studentApi.AddStudent(this.studentForm.value).subscribe(res => {
        this.ngZone.run(() => this.router.navigateByUrl('/students-list'))
      });
    }
  }

}