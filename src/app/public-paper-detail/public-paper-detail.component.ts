import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PublicPaperService, PaperDetail } from '../services/public-paper.service';
import { NavbarForExecutiveProfileComponent } from '../navbar-for-executive-profile/navbar-for-executive-profile.component';

@Component({
  selector: 'app-public-paper-detail',
  standalone: true,
  imports: [CommonModule,NavbarForExecutiveProfileComponent],
  templateUrl: './public-paper-detail.component.html', 
  styleUrls: ['./public-paper-detail.component.css'], 
})
export class PublicPaperDetailComponent implements OnInit {
  paper!: PaperDetail;

  constructor(
    private route: ActivatedRoute,
    private publicPaperService: PublicPaperService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.publicPaperService.getPaperById(id).subscribe((data) => {
        this.paper = data[0];
      });
    }
  }
}
