import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";

@Component({
  selector: 'doc-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocButtonComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
