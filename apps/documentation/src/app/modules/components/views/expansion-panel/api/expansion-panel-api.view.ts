import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocSidebarComponent } from '../../../../../shared';

@Component({
  templateUrl: './expansion-panel-api.view.html',
  styleUrls: ['./expansion-panel-api.view.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, DocSidebarComponent],
})
export class DocExpansionPanelApiView {}
