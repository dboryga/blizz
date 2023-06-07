import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocSidebarComponent } from '../../../../../shared';

@Component({
  templateUrl: './expansion-panel-overview.view.html',
  styleUrls: ['./expansion-panel-overview.view.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, DocSidebarComponent],
})
export class DocExpansionPanelOverviewView {}
