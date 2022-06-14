import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'doc-button-api',
  templateUrl: './button-api.component.html',
  styleUrls: ['./button-api.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocButtonApiComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
