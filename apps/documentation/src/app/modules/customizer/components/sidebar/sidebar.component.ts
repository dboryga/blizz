import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupSidebarLinksData } from './group-sidebar-links';
import { DocIconComponent } from '../../../../shared';
import { RouterModule } from '@angular/router';
import { DocCustomizerService } from '../../customizer.service';
import { routerFadeAnimation } from '../../../../shared/animations/fade.animations';

@Component({
  selector: 'doc-customizer-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [routerFadeAnimation],
  standalone: true,
  imports: [CommonModule, RouterModule, DocIconComponent],
})
export class DocCustomizerSidebarComponent {
  protected readonly groupLinks = GroupSidebarLinksData;

  constructor(protected readonly service: DocCustomizerService) {}
}
