import { Component, OnInit } from '@angular/core';
import { Location } from "@angular/common";

@Component({
  selector: 'app-server-error-view',
  templateUrl: './server-error-view.component.html',
  styleUrls: ['./server-error-view.component.css'],
  providers: [Location]
})
export class ServerErrorViewComponent implements OnInit {

  constructor(private location: Location) { }

  ngOnInit() {
  }

  //method to go back (history)
  public goBack = () => {
    this.location.back()
  }

}
