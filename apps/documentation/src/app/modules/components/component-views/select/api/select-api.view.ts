import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocSidebarComponent } from '../../../../../shared';

@Component({
  selector: 'doc-components-select-api',
  templateUrl: './select-api.view.html',
  styleUrls: ['./select-api.view.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, DocSidebarComponent],
})
export class DocSelectApiView {}
