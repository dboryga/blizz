import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { DocComponentCardComponent } from '../../../../shared';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ComponentsSchema } from '../../../../shared/utils/components-schema';
import { BlizzChipComponent, ComponentKey } from '@blizz/ui';
import { kebabToCamelCase } from '@blizz/core';
import { DefaultComponentPage } from '../../models/component-page.model';
import { CUSTOM_STATE_DESCRIPTIONS, NATIVE_STATE_DESCRIPTIONS } from './state-descriptions';

interface StateWithDescription {
  name: string;
  desc: string;
}

@Component({
  selector: 'doc-component-config',
  templateUrl: './component-config.view.html',
  styleUrls: ['./component-config.view.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, RouterModule, DocComponentCardComponent, BlizzChipComponent],
})
export class DocComponentsComponentConfigView implements OnInit {
  readonly route = inject(ActivatedRoute);
  readonly router = inject(Router);

  get componentRouteParam() {
    const path = this.route.parent?.snapshot.routeConfig?.path;
    if (!path) {
      this.router.navigate([DefaultComponentPage], { relativeTo: this.route });
      return;
    }
    return this.route.parent?.snapshot.routeConfig?.path;
  }

  readonly componentKey = kebabToCamelCase(this.componentRouteParam!) as ComponentKey;
  readonly componentSchema = ComponentsSchema.getComponentSchema(this.componentKey);
  readonly elementsSchema = ComponentsSchema.getElementsSchema(this.componentSchema);
  readonly elementsInterface = ComponentsSchema.getComponentElementsInterfaceString(
    this.elementsSchema,
  );
  readonly states = ComponentsSchema.getStatesFromSchema(this.componentSchema);

  protected statesWithDescriptions: StateWithDescription[] = [];

  ngOnInit() {
    const nativeStatesWithDescriptions: StateWithDescription[] = [];
    const customStatesWithDescriptions: StateWithDescription[] = [];

    this.states.forEach((name) => {
      if (name in NATIVE_STATE_DESCRIPTIONS) {
        nativeStatesWithDescriptions.push({
          name,
          desc: NATIVE_STATE_DESCRIPTIONS[name as keyof typeof NATIVE_STATE_DESCRIPTIONS],
        });
        return;
      }
      const customComponentState = `${this.componentKey}_${name}`;
      if (customComponentState in CUSTOM_STATE_DESCRIPTIONS) {
        customStatesWithDescriptions.push({
          name,
          desc: CUSTOM_STATE_DESCRIPTIONS[
            customComponentState as keyof typeof CUSTOM_STATE_DESCRIPTIONS
          ],
        });
        return;
      }
      customStatesWithDescriptions.push({ name, desc: '-' });
    });

    this.statesWithDescriptions = [
      ...customStatesWithDescriptions,
      ...nativeStatesWithDescriptions,
    ];
  }
}
