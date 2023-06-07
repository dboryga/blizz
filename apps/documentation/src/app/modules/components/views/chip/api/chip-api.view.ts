import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocSidebarComponent } from '../../../../../shared';

@Component({
  templateUrl: './chip-api.view.html',
  styleUrls: ['./chip-api.view.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, DocSidebarComponent],
})
export class DocChipApiView {}
