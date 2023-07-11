import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DocSidebarComponent } from '../../shared';

@Component({
  selector: 'doc-installation',
  templateUrl: './installation.view.html',
  styleUrls: ['./installation.view.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, RouterModule, DocSidebarComponent],
})
export class DocInstallationView {}
