import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocSidebarComponent } from '../../../../../shared';
import { ICON_DATA } from '../../icon/icon.routing-data';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'doc-components-icon-button-overview',
  templateUrl: './icon-button-overview.view.html',
  styleUrls: ['./icon-button-overview.view.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, DocSidebarComponent, RouterModule],
})
export class DocIconButtonOverviewView {
  readonly iconPath = '/components/' + ICON_DATA.path;
}
