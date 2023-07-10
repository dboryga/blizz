import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocSidebarComponent } from '../../../../../shared';

@Component({
  selector: 'doc-components-checkbox-overview',
  templateUrl: './checkbox-overview.view.html',
  styleUrls: ['./checkbox-overview.view.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, DocSidebarComponent],
})
export class DocCheckboxOverviewView {}
