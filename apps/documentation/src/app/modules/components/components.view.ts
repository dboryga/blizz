import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DocSidebarComponent } from '../../shared';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { routerFadeAnimation } from '../../shared/animations/fade.animations';
import { COMPONENTS_DATA } from './components.routing-data';

@Component({
  selector: 'doc-components',
  templateUrl: './components.view.html',
  styleUrls: ['./components.view.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, RouterModule, DocSidebarComponent],
  animations: [routerFadeAnimation],
})
export class DocComponentsView {
  readonly componentsLinks = COMPONENTS_DATA.map((component) => ({
    label: component.label,
    path: `/components/${component.path}`,
  }));
}
