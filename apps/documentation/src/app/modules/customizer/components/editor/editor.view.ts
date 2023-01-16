import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocIconComponent } from '../../../../shared';
import { RouterModule } from '@angular/router';
import { slideSidenavAnimation } from '../../animations/slide-sidenav.animation';
import { GroupSidebarLinksData } from './group-sidebar-links';

@Component({
  selector: 'doc-customizer-editor',
  templateUrl: './editor.view.html',
  styleUrls: ['./editor.view.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, RouterModule, DocIconComponent],
  animations: [slideSidenavAnimation],
})
export class DocCustomizerEditorView {
  readonly groupLinks = GroupSidebarLinksData;
}
