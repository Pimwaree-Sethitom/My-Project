import { Component } from '@angular/core';
import { AdminBarComponent } from '../admin-bar/admin-bar.component'; 
import { ApiService } from '../api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [AdminBarComponent,ReactiveFormsModule ], 
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'] ,
  providers: [ApiService]
})
export class AddUserComponent {
  userForm: FormGroup;

  constructor(private fb: FormBuilder, private apiService: ApiService) {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      name_department_eng: ['', []],
      name_department_thai: ['', Validators.required],
      role_name: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      this.apiService.insertUser(this.userForm.value).subscribe({
        next: (response) => {
          console.log('User inserted successfully', response);
          Swal.fire({
            icon: 'success',
            title: 'User inserted successfully!',
            text: 'The user has been added successfully.',
          });
        },
        error: (error) => {
          console.error('Error inserting user', error);
          Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: 'There was an error inserting the user.',
          });
        }
      });
      
    }
  }
}

