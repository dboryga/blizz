import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocIconComponent, DocTabComponent } from '../../../../shared';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { COMPONENT_PAGES } from '../../models/component-page.model';
import { DocComponentData } from '../../components.routing-data';
import { ModuleRoutesEnum } from '../../../../app.routing-data';

@Component({
  selector: 'doc-component-details-wrapper',
  templateUrl: './component-details-wrapper.component.html',
  styleUrls: ['./component-details-wrapper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, DocTabComponent, RouterModule, DocIconComponent],
})
export class DocComponentDetailsWrapperComponent {
  readonly componentData = this.route.snapshot.data as DocComponentData;
  readonly title = this.componentData.label;
  readonly pages = COMPONENT_PAGES;

  readonly customizerPath = `/${ModuleRoutesEnum.Customizer}`;

  constructor(protected readonly route: ActivatedRoute) {}
}
