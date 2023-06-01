import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocCustomizerEditorView } from './components/editor/editor.view';
import { ActivatedRoute } from '@angular/router';
import { CustomizerParams } from './customizer.routing-data';
import { BlizzChipComponent, BlizzComponentConfigName, BlizzConfig } from '@blizz/ui';
import { BlizzService } from '../../../../../../libs/ui/src/lib/blizz.service';
import { BLIZZ_CONFIG, setupConfig } from '../../../../../../libs/ui/src/lib/config';

export const customizerConfig: BlizzConfig = {
  components: {
    [BlizzComponentConfigName.Chips]: {
      padding: '1rem 3rem',
      border: { radius: '1rem' },
    },
  },
};

@Component({
  selector: 'doc-customizer',
  templateUrl: './customizer.view.html',
  styleUrls: ['./customizer.view.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, DocCustomizerEditorView, BlizzChipComponent],
  providers: [
    BlizzService,
    {
      provide: BLIZZ_CONFIG,
      useValue: setupConfig(customizerConfig),
    },
  ],
})
export class DocCustomizerView {
  get componentName() {
    return this.route.snapshot.paramMap.get(CustomizerParams.Component);
  }

  constructor(protected readonly route: ActivatedRoute, service: BlizzService) {
    console.log(service);
    service.createLocalCss();
  }
}
