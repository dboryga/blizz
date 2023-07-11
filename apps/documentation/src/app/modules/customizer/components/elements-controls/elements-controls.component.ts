import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { DocCustomizerService } from '../../customizer.service';
import { SidebarElements, SidebarProperty } from '../../utils/sidebar-data';
import { BlizzCdkExpandableModule, camelToTitleCase } from '@blizz-ui/core';
import { DocIconComponent } from '../../../../shared';
import { FormsModule } from '@angular/forms';
import { BlizzSelectComponent, BlizzTextFieldComponent, ComponentKey } from '@blizz-ui/components';
import { keys } from 'lodash';

@UntilDestroy()
@Component({
  selector: 'doc-customizer-elements-controls',
  templateUrl: './elements-controls.component.html',
  styleUrls: ['./elements-controls.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    BlizzCdkExpandableModule,
    DocIconComponent,
    FormsModule,
    BlizzTextFieldComponent,
    BlizzSelectComponent,
  ],
})
export class DocCustomizerElementsControlsComponent implements OnInit {
  @Input() elements?: SidebarElements | null;

  @Input() nested = false;

  constructor(
    protected readonly service: DocCustomizerService,
    protected readonly changeDetector: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.service.detectChanges$
      .pipe(untilDestroyed(this))
      .subscribe(() => this.changeDetector.detectChanges());
  }

  protected updateProperty(sidebarProp: SidebarProperty, value: string) {
    this.service.updateProperty$.next({ sidebarProp, value });
  }

  getUnionSelectOptions(prop: SidebarProperty): string[] {
    if ('unionOf' in prop) {
      return (
        prop.unionOf?.reduce((arr: string[], member) => {
          let value: string;
          try {
            value = JSON.parse(member.type) as string;
          } catch (e) {
            return arr;
          }
          return [...arr, value];
        }, []) ?? []
      );
    }
    return [];
  }

  getVariationRefSelectOptions(prop: SidebarProperty): string[] {
    const componentConfigRef =
      this.service.initialConfigValue.components?.[prop.elementKey as ComponentKey];
    if (!componentConfigRef) return [];

    return keys(componentConfigRef.variations);
  }

  protected readonly camelToTitleCase = camelToTitleCase;
}
