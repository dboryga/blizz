import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocIconComponent } from '../icon';
import { UntilDestroy } from '@ngneat/until-destroy';
import { BlizzCdkExpandableDirective, BlizzCdkExpandableModule } from '@blizz/core';

@UntilDestroy()
@Component({
  selector: 'doc-expansion-toggle',
  templateUrl: './expansion-toggle.component.html',
  styleUrls: ['./expansion-toggle.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, DocIconComponent, BlizzCdkExpandableModule],
})
export class DocExpansionToggleComponent {
  @Input({ required: true }) expandableRef!: BlizzCdkExpandableDirective;
  @Input() label?: string;
  @Input() single = false;
  @Input() compact = false;
  @Input() canExpand = true;
  @Input() canCollapse = true;

  @Output() toggleClick = new EventEmitter<MouseEvent>();
  @Output() arrowClick = new EventEmitter<MouseEvent>();
}
