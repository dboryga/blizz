import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocSidebarComponent } from '../../../../../shared';

@Component({
  selector: 'doc-components-text-field-overview',
  templateUrl: './text-field-overview.view.html',
  styleUrls: ['./text-field-overview.view.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, DocSidebarComponent],
})
export class DocTextFieldOverviewView {}
