import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
declare const bootstrap: any;

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(private AuthService: AuthService, private router: Router) {}

   login() {
  this.AuthService.login({ email: this.email, password: this.password }).subscribe(res => {
    if (res.success) {
      Swal.fire('เข้าสู่ระบบสำเร็จ', '', 'success');

      // ✅ ปิด modal จาก component อื่น (bar.component) ด้วย getElementById
      const modalElement = document.getElementById('exampleModalToggle');
      if (modalElement) {
        const modalInstance = bootstrap.Modal.getInstance(modalElement) || new bootstrap.Modal(modalElement);
        modalInstance.hide();
      }

      const role = res.user.role.trim().toLowerCase();
      localStorage.setItem('user', JSON.stringify(res.user));

      if (role === 'admin') {
        this.router.navigate(['/admin']);
      } else if (role === 'ผู้บริหาร') {
        this.router.navigate(['/executive']);
      } else if (role === 'บุคลากรทั่วไป') {
        this.router.navigate(['/general']);
      } else {
        Swal.fire('สิทธิ์ไม่ถูกต้อง', 'ไม่สามารถเข้าสู่ระบบได้', 'error');
      }
    } else {
      Swal.fire('เกิดข้อผิดพลาด', res.message, 'error');
    }
  });
}
 

}
