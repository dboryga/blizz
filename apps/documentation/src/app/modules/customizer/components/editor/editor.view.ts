import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocIconComponent } from '../../../../shared';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { slideSidenavAnimation } from '../../animations/slide-sidenav.animation';
import { GroupSidebarLinksData } from './group-sidebar-links';
import { CustomizerParams, CustomizerSettingsGroups } from '../../customizer.routing-data';
import {
  BlizzComponentsConfigs,
  BlizzConfig,
  blizzConfigHelpers,
  BlizzConfigValue,
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
  readonly customizerSettingsGroups = CustomizerSettingsGroups;

  get componentName() {
    return this.route.snapshot.paramMap.get(CustomizerParams.Component)!;
  }

  get selectedSettingsGroup() {
    return this.route.snapshot.firstChild?.paramMap.get(CustomizerParams.SettingsGroup);
  }

  set config(v: Readonly<BlizzConfig>) {
    if (v === this._config) return;
    this._config = v;
    this.configValue = blizzConfigHelpers.setupConfig(this.config);
    this.extendedConfig = {
      base: this.config.base,
      components: this.configValue.components,
      theme: {
        base: typeof this.config.theme === 'object' ? this.config.theme.base : this.config.theme,
        ...this.configValue.theme,
      } as BlizzThemeConfig,
    };
    this.themeConfig = this.configValue.theme as BlizzThemeConfig;
    this.componentConfig =
      this.configValue.components[this.componentName as keyof BlizzComponentsConfigs]!;
    this.sidebarData = createSidebarData(this.componentConfig, this.componentName);
    // BlizzService.createLocalCss(this.previewElement, this.configValue, false);
    this.changeDetectorRef.detectChanges();
  }
  get config(): Readonly<BlizzConfig> {
    return this._config;
  }
  protected _config!: Readonly<BlizzConfig>;

  configValue!: Readonly<BlizzConfigValue>;
  extendedConfig!: Readonly<Required<BlizzConfig>>;
  themeConfig!: BlizzThemeConfig;
  componentConfig!: Dictionary;
  sidebarData!: SidebarData;

  get configString() {
    const json = JSON.stringify(this.config, null, 2);
    return json.replace(/"([^"]+)":/g, '$1:').replace(/"/g, "'");
  }

  get selectedGroupData() {
    return this.sidebarData.get(this.selectedSettingsGroup as CustomizerSettingsGroups);
  }

  constructor(
    protected readonly route: ActivatedRoute,
    protected readonly router: Router,
    protected readonly changeDetectorRef: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.getConfigFromLocalStorage();
  }

  getConfigFromLocalStorage() {
    const localStorageConfig = localStorage.getItem(CUSTOMIZER_CONFIG_LOCAL_STORAGE_TOKEN);
    if (!localStorageConfig) {
      this.config = structuredClone(blizzConfigHelpers.DEFAULT_BLIZZ_CONFIG);
      localStorage.setItem(CUSTOMIZER_CONFIG_LOCAL_STORAGE_TOKEN, JSON.stringify(this.config));
      return;
    }

    this.config = JSON.parse(localStorageConfig);
  }

  updateConfigProperty(name: string, value: string) {
    const clone = structuredClone(this.config);
    Object.assign(clone, { components: { [this.componentName]: { [name]: value } } });
    this.config = clone;
  }

  copyConfig() {
    navigator.clipboard.writeText(this.configString);
  }
}
