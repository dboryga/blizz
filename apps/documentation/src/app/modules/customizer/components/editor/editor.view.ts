import { ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocIconComponent } from '../../../../shared';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { slideSidenavAnimation } from '../../animations/slide-sidenav.animation';
import { GroupSidebarLinksData } from './group-sidebar-links';
import { CustomizerParams, CustomizerSettingsGroups } from '../../customizer.routing-data';
import {
  BlizzComponentsConfig,
  BlizzConfig,
  blizzConfigHelpers,
  BlizzService,
  BlizzThemeConfig,
} from '@blizz/ui';
import { UntilDestroy } from '@ngneat/until-destroy';
import { Dictionary } from '@blizz/core';
import { createSidebarData, SidebarData } from '../../utils/sidebar-data';

export const CUSTOMIZER_CONFIG_LOCAL_STORAGE_TOKEN = 'customizerConfig';

@UntilDestroy()
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
    return this.route.snapshot.paramMap.get(CustomizerParams.Component)!;
  }

  get selectedSettingsGroup() {
    return this.route.snapshot.firstChild?.paramMap.get(CustomizerParams.SettingsGroup);
  }

  // config: ComponentConfigSchema | null = null;

  set config(v: Readonly<Required<BlizzConfig>>) {
    if (v === this._config) return;
    this._config = v;
    this.themeConfig = v.theme as BlizzThemeConfig;
    this.componentConfig = v.components[this.componentName as keyof BlizzComponentsConfig]!;
    this.sidebarData = createSidebarData(this.componentConfig, this.componentName);
  }
  get config(): Readonly<Required<BlizzConfig>> {
    return this._config;
  }
  protected _config!: Readonly<Required<BlizzConfig>>;

  themeConfig!: BlizzThemeConfig;
  componentConfig!: Dictionary;
  sidebarData!: SidebarData;

  get selectedGroupData() {
    return this.sidebarData.get(this.selectedSettingsGroup as CustomizerSettingsGroups);
  }

  constructor(
    protected readonly route: ActivatedRoute,
    protected readonly router: Router,
    protected readonly blizzService: BlizzService,
  ) {}

  ngOnInit() {
    this.getCustomizerConfig();
  }

  getCustomizerConfig() {
    const localStorageConfig = localStorage.getItem(CUSTOMIZER_CONFIG_LOCAL_STORAGE_TOKEN);
    if (!localStorageConfig) {
      const defaultConfig = blizzConfigHelpers.DEFAULT_BLIZZ_CONFIG;
      const configValue = blizzConfigHelpers.setupConfig(defaultConfig);
      const newConfig: Readonly<Required<BlizzConfig>> = {
        base: defaultConfig.base!,
        components: configValue.components,
        theme: {
          base: defaultConfig.theme,
          ...configValue.theme,
        } as BlizzThemeConfig,
      };
      localStorage.setItem(CUSTOMIZER_CONFIG_LOCAL_STORAGE_TOKEN, JSON.stringify(newConfig));
      this.config = newConfig;
      return;
    }

    this.config = JSON.parse(localStorageConfig);
  }

  listenForGroupChange() {
    // this.route.firstChild?.paramMap
    //   .pipe(
    //     untilDestroyed(this),
    //     map((params) => params.get(CustomizerParams.SettingsGroup)),
    //     filter((group): group is string => !!group),
    //   )
    //   .subscribe((group) => {
    //     this.selectedGroupProps?.filter()
    //   });
  }
}
