import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocSidebarComponent } from '../../../../../shared';

@Component({
  selector: 'doc-components-radio-overview',
  templateUrl: './radio-overview.view.html',
  styleUrls: ['./radio-overview.view.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, DocSidebarComponent],
})
export class DocRadioOverviewView {}
