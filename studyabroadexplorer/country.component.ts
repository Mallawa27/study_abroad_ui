import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css']
})
export class CountryComponent implements OnInit {
  showExplorer: boolean = false;

  constructor(private router: Router) {}

  ngOnInit() {}

  toggleExplorer() {
    this.showExplorer = !this.showExplorer;
  }

  navigateToCountry(country: string) {
    this.router.navigate([`/studyabroadexplorer/country/${country}`]);
  }
}