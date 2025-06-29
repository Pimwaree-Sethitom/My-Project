import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileService } from '../services/profile.service';
import { Router } from '@angular/router';
import { Modal } from 'bootstrap';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{
  researchList: any[] = []; 
  researcher: any = null;

  constructor(private profileService: ProfileService, private router: Router) {}

   ngOnInit(): void {
  const user = JSON.parse(localStorage.getItem('user')!);
  const researcherId = user.id;

  this.profileService.getResearchByUser(researcherId).subscribe(res => {
    if (res.success) {
      this.researchList = res.data || [];

      if (res.userInfo) {
        this.researcher = res.userInfo;  
      } else if (this.researchList.length > 0) {
        this.researcher = this.researchList[0];  
      } else {
        this.researcher = null; 
      }
    }
  });
}

selectedPaper: any = null;

openModal(paper: any) {
  this.selectedPaper = paper;

  const modalElement = document.getElementById('paperModal');
  if (modalElement) {
    const modal = new Modal(modalElement); 
    modal.show();
  }
}
}

