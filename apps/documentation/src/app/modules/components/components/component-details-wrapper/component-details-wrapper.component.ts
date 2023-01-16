import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocIconComponent, DocTabComponent } from '../../../../shared';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ComponentPages } from '../../models/component-page';
import { DocComponentData } from '../../components.routing-data';
import { CUSTOMIZER_ROUTING } from '../../../customizer/customizer.routing';
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
  readonly pages = ComponentPages;

  readonly customizerPath = `/${ModuleRoutesEnum.Customizer}`;

  constructor(protected readonly route: ActivatedRoute) {}
}
