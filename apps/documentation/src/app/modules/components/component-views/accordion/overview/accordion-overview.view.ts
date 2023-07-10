import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocSidebarComponent } from '../../../../../shared';
import { RouterModule } from '@angular/router';
import { EXPANSION_PANEL_DATA } from '../../expansion-panel/expansion-panel.routing-data';

@Component({
  selector: 'doc-components-accordion-overview',
  templateUrl: './accordion-overview.view.html',
  styleUrls: ['./accordion-overview.view.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, DocSidebarComponent, RouterModule],
})
export class DocAccordionOverviewView {
  readonly expansionPanelPath = '/components/' + EXPANSION_PANEL_DATA.path;
}
