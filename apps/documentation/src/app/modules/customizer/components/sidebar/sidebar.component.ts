import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupSidebarLinksData } from './group-sidebar-links';
import { CUSTOMIZER_SETTINGS_GROUP } from '../../customizer.routing-data';
import { DocIconComponent } from '../../../../shared';
import { RouterModule } from '@angular/router';
import { DocCustomizerService } from '../../customizer.service';

@Component({
  selector: 'doc-customizer-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, RouterModule, DocIconComponent],
})
export class DocCustomizerSidebarComponent {
  protected readonly groupLinks = GroupSidebarLinksData;
  protected readonly settingsGroup = CUSTOMIZER_SETTINGS_GROUP;

  constructor(protected readonly service: DocCustomizerService) {}
}
