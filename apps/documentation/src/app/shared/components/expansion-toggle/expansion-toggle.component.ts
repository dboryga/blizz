import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocIconComponent } from '../icon';
import { UntilDestroy } from '@ngneat/until-destroy';
import { BlizzExpandableDirective, BlizzExpandableModule } from '@blizz/core';

@UntilDestroy()
@Component({
  selector: 'doc-expansion-toggle',
  templateUrl: './expansion-toggle.component.html',
  styleUrls: ['./expansion-toggle.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, DocIconComponent, BlizzExpandableModule],
})
export class DocExpansionToggleComponent {
  @Input() expandableRef!: BlizzExpandableDirective;
  @Input() label?: string;
  @Input() single = false;
  @Input() compact = false;
  @Input() closable = true;

  @Output() toggleClick = new EventEmitter<MouseEvent>();
  @Output() arrowClick = new EventEmitter<MouseEvent>();
}
