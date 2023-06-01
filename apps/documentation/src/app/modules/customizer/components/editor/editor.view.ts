import { ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocIconComponent } from '../../../../shared';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { slideSidenavAnimation } from '../../animations/slide-sidenav.animation';
import { GroupSidebarLinksData } from './group-sidebar-links';
import { CustomizerParams, CustomizerSettingsGroups } from '../../customizer.routing-data';
import {
  ComponentConfigSchema,
  getComponentConfig,
  NestedProperty,
} from '../../utils/get-component-config';
import { BlizzService } from '@blizz/ui';

@Component({
  selector: 'doc-customizer-editor',
  templateUrl: './editor.view.html',
  styleUrls: ['./editor.view.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, RouterModule, DocIconComponent],
  animations: [slideSidenavAnimation],
})
export class DocCustomizerEditorView implements OnInit {
  @ViewChild('preview', { static: true }) protected previewElement!: ElementRef<HTMLDivElement>;

  readonly groupLinks = GroupSidebarLinksData;

  get componentName() {
    return this.route.snapshot.paramMap.get(CustomizerParams.Component);
  }

  get selectedSettingsGroup() {
    return this.route.snapshot.firstChild?.paramMap.get(CustomizerParams.SettingsGroup);
  }

  config: ComponentConfigSchema | null = null;

  get selectedGroupProps(): NestedProperty[] {
    if (!this.config || !this.selectedSettingsGroup) return [];
    return this.config[this.selectedSettingsGroup as CustomizerSettingsGroups];
  }

  constructor(
    protected readonly route: ActivatedRoute,
    protected readonly blizzService: BlizzService,
  ) {}

  ngOnInit() {
    this.config = getComponentConfig(this.componentName);
  }
}
