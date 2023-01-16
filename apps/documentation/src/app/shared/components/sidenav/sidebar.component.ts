import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

export interface DocSidebarLink {
  label: string;
  path: string;
}

@Component({
  selector: 'doc-sidenav',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, RouterModule],
})
export class DocSidebarComponent {
  @Input() links: DocSidebarLink[] = [];
  @Input() left = false;
}
