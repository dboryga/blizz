import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocSidebarComponent } from '../../../../../shared';
import { EXPANSION_PANEL_DATA } from '../../expansion-panel/expansion-panel.routing-data';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'doc-components-accordion-examples',
  templateUrl: './accordion-examples.view.html',
  styleUrls: ['./accordion-examples.view.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, DocSidebarComponent, RouterModule],
})
export class DocAccordionExamplesView {
  readonly expansionPanelPath = '/components/' + EXPANSION_PANEL_DATA.path;
}
