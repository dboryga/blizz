import { Component, OnInit } from '@angular/core';
import { BlizzCdkButton } from "@blizz/cdk";

@Component({
  selector: 'blizz-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class BlizzButtonComponent implements BlizzCdkButton, OnInit {
  constructor() {}

  ngOnInit(): void {}
}
