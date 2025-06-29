import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbar-for-executive-profile',
  standalone: true, 
  imports: [RouterModule],
  templateUrl: './navbar-for-executive-profile.component.html',
  styleUrl: './navbar-for-executive-profile.component.css'
})
export class NavbarForExecutiveProfileComponent {
    constructor(private router: Router) {}
  
    logout() {
      Swal.fire({
        title: 'คุณต้องการออกจากระบบหรือไม่?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'ใช่, ออกจากระบบ',
        cancelButtonText: 'ยกเลิก'
      }).then((result) => {
        if (result.isConfirmed) {
          localStorage.removeItem('user');
          this.router.navigate(['/home']);
  
          Swal.fire('ออกจากระบบแล้ว', '', 'success');
        }
      });
    }
}
