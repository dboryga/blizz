import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DocComponentDetailsWrapperComponent } from '../../components/component-details-wrapper/component-details-wrapper.component';
import { routerFadeAnimation } from '../../../../shared/animations/fade.animations';

@Component({
  selector: 'doc-components-radio',
  template: `
    <doc-component-details-wrapper>
      <div class="stack-container" [@routerFade]="outlet.activatedRouteData">
        <router-outlet #outlet="outlet"></router-outlet>
      </div>
    </doc-component-details-wrapper>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, RouterModule, DocComponentDetailsWrapperComponent],
  animations: [routerFadeAnimation],
})
export class DocRadioView {}
