import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { SafePipe } from '../../pipes';

@Component({
  selector: 'doc-component-card',
  templateUrl: './component-card.component.html',
  styleUrls: ['./component-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, SafePipe],
})
export class DocComponentCardComponent implements AfterViewInit {
  @Input() label?: string;
  @Input() iconSrc?: string;

  constructor(readonly changeDetector: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    this.changeDetector.markForCheck();
  }
}
