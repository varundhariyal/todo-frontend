import { Component, OnInit } from '@angular/core';
import { Location } from "@angular/common";

@Component({
  selector: 'app-not-found-view',
  templateUrl: './not-found-view.component.html',
  styleUrls: ['./not-found-view.component.css'],
  providers: [Location]
})
export class NotFoundViewComponent implements OnInit {

  constructor(private location: Location) { }

  ngOnInit() {
  }

  //method to go back (history)
  public goBack = () => {
    this.location.back()
  }
  
}
