import { Component, OnInit } from '@angular/core';
import { AuthService, Researcher } from '../services/auth.service';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [AuthService],
  imports: [ 
    ReactiveFormsModule,
    CommonModule,
    FormsModule
 ], 
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  researchers: Researcher[] = [];
  filteredResearchers: Researcher[] = [];
  selectedResearcher: Researcher | null = null;
  searchResearchers: string = ''; 
  researcher_id = '';
  email = '';
  password = '';
  confirmPassword = '';
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;

togglePasswordVisibility() {
  this.showPassword = !this.showPassword;
}

toggleConfirmPasswordVisibility() {
  this.showConfirmPassword = !this.showConfirmPassword;
}


  constructor(private fb: FormBuilder,private AuthService: AuthService) {
     this.registerForm = this.fb.group({
      researcher_id: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.SelectResearchers();
  }

  SelectResearchers() {
    this.AuthService.SelectUserData().subscribe((data: Researcher[]) => {
      this.researchers = data;
      this.filteredResearchers = data;  
    });
  }

  SearchResearchers() {
    const query = this.searchResearchers?.trim().toLowerCase();

    if (!query || query.length < 2) {
      this.filteredResearchers = [];
      return;
    }

    this.filteredResearchers = this.researchers.filter((researcher) =>
      researcher.name.toLowerCase().includes(query)
    ).slice(0, 5);
  }

  selectResearcher(researcher: Researcher) {
    this.selectedResearcher = researcher;
    this.searchResearchers = researcher.name;
    this.filteredResearchers = [];

     this.registerForm.patchValue({ researcher_id: researcher.researcher_id });
  }

  register() {
    const { email, password, confirmPassword, researcher_id } = this.registerForm.value;

    if (!email.endsWith('@up.ac.th')) {
      Swal.fire('รูปแบบอีเมลไม่ถูกต้อง', 'กรุณาใช้อีเมล @up.ac.th เท่านั้น', 'warning');
      return;
    }

    if (password !== confirmPassword) {
      Swal.fire('รหัสผ่านไม่ตรงกัน', 'กรุณากรอกรหัสผ่านให้ตรงกันทั้งสองช่อง', 'error');
      return;
    }

    this.AuthService.register({ researcher_id, email, password }).subscribe(res => {
      if (res.success) {
        Swal.fire('ลงทะเบียนสำเร็จ', '', 'success');
        
      } else {
        Swal.fire('เกิดข้อผิดพลาด', res.message, 'error');
      }
    });
  }

}
