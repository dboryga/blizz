import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";

@Component({
  selector: 'doc-ui',
  templateUrl: './ui.component.html',
  styleUrls: ['./ui.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocUiComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
