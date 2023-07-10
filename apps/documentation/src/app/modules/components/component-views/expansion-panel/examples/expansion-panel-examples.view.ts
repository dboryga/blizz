import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocSidebarComponent } from '../../../../../shared';
import { RouterModule } from '@angular/router';
import { ACCORDION_DATA } from '../../accordion/accordion.routing-data';

@Component({
  selector: 'doc-components-expansion-panel-examples',
  templateUrl: './expansion-panel-examples.view.html',
  styleUrls: ['./expansion-panel-examples.view.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, DocSidebarComponent, RouterModule],
})
export class DocExpansionPanelExamplesView {
  readonly accordionPath = '/components/' + ACCORDION_DATA.path;
}
