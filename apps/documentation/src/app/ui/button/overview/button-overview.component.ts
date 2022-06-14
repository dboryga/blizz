import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'doc-button-overview',
  templateUrl: './button-overview.component.html',
  styleUrls: ['./button-overview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocButtonOverviewComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
