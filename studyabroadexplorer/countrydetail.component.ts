import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-country-detail',
  templateUrl: './countrydetail.component.html',
  styleUrls: ['./countrydetail.component.css']
})
export class CountryDetailComponent implements OnInit {
  country: string = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.country = params.get('country') || '';
    });
  }
}