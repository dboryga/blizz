import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocCustomizerEditorView } from './components/editor/editor.view';
import { ActivatedRoute } from '@angular/router';
import { CustomizerParams } from './customizer.routing-data';
import { BlizzChipComponent, BlizzComponentsConfigs, BlizzInputComponent } from '@blizz/ui';

@Component({
  selector: 'doc-customizer',
  templateUrl: './customizer.view.html',
  styleUrls: ['./customizer.view.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, DocCustomizerEditorView, BlizzChipComponent, BlizzInputComponent],
})
export class DocCustomizerView {
  get componentName() {
    return this.route.snapshot.paramMap.get(
      CustomizerParams.Component,
    ) as keyof BlizzComponentsConfigs;
  }

  constructor(protected readonly route: ActivatedRoute) {}
}
