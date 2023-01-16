import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DocComponentCardComponent } from '../../shared';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { COMPONENTS_DATA } from './components.routing-data';

@Component({
  templateUrl: './components-home.view.html',
  styleUrls: ['./components-home.view.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, RouterModule, DocComponentCardComponent],
})
export class ComponentsHomeView {
  readonly components = COMPONENTS_DATA;
}
