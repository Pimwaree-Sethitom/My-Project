import { Component, OnInit } from '@angular/core';
import { AuthService, Researcher } from '../services/auth.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
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
  researchers: Researcher[] = [];
  filteredResearchers: Researcher[] = [];
  selectedResearcher: Researcher | null = null;
  searchResearchers: string = '';   

  constructor(private AuthService: AuthService) {}

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
  }
}
