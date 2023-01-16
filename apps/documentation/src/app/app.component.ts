import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChildrenOutletContexts, RouterModule } from '@angular/router';
import { DocHeaderComponent } from './shared';
import { routerFadeAnimation } from './shared/animations/fade.animations';

@Component({
  selector: 'doc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, RouterModule, DocHeaderComponent],
  animations: [routerFadeAnimation],
})
export class DocAppComponent {
  constructor(private contexts: ChildrenOutletContexts) {}
}
