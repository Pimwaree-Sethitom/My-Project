import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-bar',
  standalone: true, 
  imports: [RouterModule],
  templateUrl: './admin-bar.component.html',
  styleUrl: './admin-bar.component.css'
})
export class AdminBarComponent {
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
