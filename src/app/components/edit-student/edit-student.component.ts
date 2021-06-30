import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { ApiService } from './../../shared/api.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

export interface Subject {
  name: string;
}

@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.css']
})

export class EditStudentComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  @ViewChild('chipList', { static: true }) chipList;
  @ViewChild('resetStudentForm', { static: true }) myNgForm;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  studentForm: FormGroup;

  ngOnInit() {
    this.update_form();
  }

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private actRoute: ActivatedRoute,
    private studentApi: ApiService
  ) { 
    var id = this.actRoute.snapshot.paramMap.get('id');
    this.studentApi.GetStudent(id).subscribe(data => {
      this.studentForm = this.fb.group({
        id_number: [data.id_number, [Validators.required]],
        full_name: [data.full_name, [Validators.required]],
        email: [data.email, [Validators.required]],
        department: [data.department, [Validators.required]],
        phone: [data.phone, [Validators.required]],
        height: [data.height, [Validators.required]],
        birth_date: [data.birth_date, [Validators.required]],
        gender: [data.gender]
      })      
    })    
  }

  /* Update form */
  update_form() {
    this.studentForm = this.fb.group({
      full_name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      department: ['', [Validators.required]],
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

  /* Update */
  updateStudentForm() {
    console.log(this.studentForm.value)
    var id = this.actRoute.snapshot.paramMap.get('id');
    if (window.confirm('Are you sure you want to update?')) {
      this.studentApi.UpdateStudent(id, this.studentForm.value).subscribe( res => {
        this.ngZone.run(() => this.router.navigateByUrl('/students-list'))
      });
    }
  }
  
}
