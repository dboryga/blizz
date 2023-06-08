import { Injectable } from '@angular/core';
import { CUSTOMIZER_PARAM } from './customizer.routing-data';
import {
  BlizzConfig,
  BlizzConfigComponent,
  blizzConfigHelpers,
  BlizzConfigTheme,
  BlizzConfigValue,
  ComponentKey,
} from '@blizz/ui';
import { ActivatedRoute } from '@angular/router';
import { createSidebarData, SidebarProperty } from './utils/sidebar-data';
import { SafeDictionary } from 'ts-essentials';

export const CUSTOMIZER_CONFIG_LOCAL_STORAGE_TOKEN = 'customizerConfig';

@Injectable()
export class DocCustomizerService {
  get componentKey() {
    return this.route.snapshot.paramMap.get(CUSTOMIZER_PARAM.Component) as ComponentKey;
  }

  readonly config: BlizzConfig;
  readonly configValue: BlizzConfigValue;
  readonly extendedConfig: Required<BlizzConfig>;
  readonly themeConfig: BlizzConfigTheme;
  readonly componentConfig: BlizzConfigComponent;
  readonly sidebarData: SafeDictionary<SidebarProperty[]>;
  readonly configString: string;

  constructor(protected readonly route: ActivatedRoute) {
    this.config = this.getConfigFromLocalStorage();
    this.configValue = blizzConfigHelpers.setupConfig(this.config);
    this.themeConfig = this.configValue.theme as BlizzConfigTheme;
    this.componentConfig = this.configValue.components[this.componentKey];
    this.extendedConfig = this.createExtendedConfig();
    this.sidebarData = createSidebarData(this.componentConfig, this.componentKey);
    this.configString = this.createConfigString();
  }

  getConfigFromLocalStorage() {
    const localStorageConfig = localStorage.getItem(CUSTOMIZER_CONFIG_LOCAL_STORAGE_TOKEN);
    if (!localStorageConfig) {
      const config = structuredClone(blizzConfigHelpers.DEFAULT_BLIZZ_CONFIG);
      localStorage.setItem(CUSTOMIZER_CONFIG_LOCAL_STORAGE_TOKEN, JSON.stringify(config));
      return config;
    }

    return JSON.parse(localStorageConfig);
  }

  createExtendedConfig() {
    return {
      base: this.config.base,
      components: this.configValue.components,
      theme: {
        base: typeof this.config.theme === 'object' ? this.config.theme.base : this.config.theme,
        ...this.configValue.theme,
      } as BlizzConfigTheme,
    };
  }

  createConfigString() {
    const json = JSON.stringify(this.config, null, 2);
    return json.replace(/"([^"]+)":/g, '$1:').replace(/"/g, "'");
  }

  // updateProperty(name: string, value: string) {
  //   const clone = structuredClone(this.config);
  //   Object.assign(clone, { components: { [this.componentKey]: { [name]: value } } });
  //   this.config = clone;
  // }
}
