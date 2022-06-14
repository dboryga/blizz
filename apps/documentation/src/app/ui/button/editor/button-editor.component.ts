import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'doc-button-editor',
  templateUrl: './button-editor.component.html',
  styleUrls: ['./button-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocButtonEditorComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
