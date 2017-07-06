import { Component, OnInit } from '@angular/core';
 
@Component({
  selector: 'app-add-restriction',
  templateUrl: './add-restriction.component.html',
  styleUrls: ['./add-restriction.component.css']
})

export class AddRestrictionComponent implements OnInit {
  
  hours = ["7:00 - 8:00", "8:00 - 10:00", "10:00 - 12:00", "12:00 - 14:00",
          "14:00 - 16:00", "16:00 - 18:00", "18:00 - 20:00", "20:00 - 22:00"];

  toughRestrictionSliderValue = true;
  tractableRestrictionSliderValue = false;

  constructor() { }

  ngOnInit() {
  }

  public onToughRestrictionsSliderToggled(event) {
    if (event.checked){
        this.tractableRestrictionSliderValue = false;
    } else {
        this.tractableRestrictionSliderValue = true;
    }
  }

  public onTractableRestrictionsSliderToggled(event) {
    if (event.checked){
        this.toughRestrictionSliderValue = false;
    } else {
        this.toughRestrictionSliderValue = true;
    }
  }

}
