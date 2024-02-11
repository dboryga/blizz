import { Inject, Injectable, OnDestroy } from '@angular/core';
import { CustomizerParam } from './customizer.routing-data';
import {
  BlizzComponent,
  BlizzConfig,
  blizzConfigHelpers,
  BlizzConfigValue,
  BlizzPredefinedConfig,
  BlizzService,
  BlizzServiceOptions,
  ComponentKey,
} from '@blizz-ui/components';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import {
  createSidebarData,
  mapElements,
  mapStates,
  SidebarData,
  SidebarElements,
  SidebarProperty,
} from './utils/sidebar-data';
import { get, has, isEmpty, map, merge, omit, remove, set, unset } from 'lodash';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { debounceTime, filter, Observable, Subject } from 'rxjs';
import { kebabToCamelCase } from '@blizz-ui/core';
import { DOCUMENT } from '@angular/common';
import { ComponentsSchema } from '../../shared/utils/components-schema';

export const CUSTOMIZER_CONFIG_LOCAL_STORAGE_TOKEN = 'customizerConfig';

@UntilDestroy()
@Injectable()
export class DocCustomizerService implements OnDestroy {
  readonly blizzServiceOpts: BlizzServiceOptions = {
    ancestorSelector: `#${this.previewId}`,
    customStateSelectors: (state: string) => [`[${this.forceStateAttr}="${state}"]`],
  };
  readonly forceStateAttr = `force-state`;

  get componentRouteParam() {
    const keyFromRoute = this.route.snapshot.paramMap.get(CustomizerParam.Component);
    if (!keyFromRoute) {
      throw new Error(
        '[DocCustomizerService] Cannot access customizer without component specified in the route',
      );
    }
    return keyFromRoute;
  }

  get componentKey() {
    return kebabToCamelCase(this.componentRouteParam) as ComponentKey;
  }
  get componentSelector() {
    return `bzz-${this.componentRouteParam}`;
  }

  get variationKey() {
    return this.route.snapshot.firstChild?.firstChild?.paramMap.get(CustomizerParam.Variation);
  }

  get stateKey() {
    return this.route.snapshot.firstChild?.firstChild?.paramMap.get(CustomizerParam.State);
  }

  get previewId() {
    return `customizer-preview-${this.componentKey}`;
  }

  set previewComponent(v: BlizzComponent) {
    if (v === this._previewComponent) return;
    this._previewComponent = v;
    this.updateVariationVisibility();
  }
  private _previewComponent?: BlizzComponent;

  set previewElement(v: HTMLElement) {
    if (v === this._previewElement) return;
    this._previewElement = v;
    this.updateStateVisibility();
  }
  private _previewElement?: HTMLElement;

  set variationVisible(v: boolean) {
    if (v === this._variationVisible) return;
    this._variationVisible = v;
    this.updateVariationVisibility();
  }
  get variationVisible(): boolean {
    return this._variationVisible;
  }
  private _variationVisible = true;

  set stateVisible(v: boolean) {
    if (v === this._stateVisible) return;
    this._stateVisible = v;
    this.updateStateVisibility();
  }
  get stateVisible(): boolean {
    return this._stateVisible;
  }
  private _stateVisible = true;

  get config(): BlizzConfig {
    return this._config;
  }
  private _config!: BlizzConfig;

  public get initialConfigValue() {
    return this._initialConfigValue;
  }
  private _initialConfigValue!: BlizzConfigValue;

  public get baseConfigValue() {
    return this._baseConfigValue;
  }
  private _baseConfigValue!: BlizzConfigValue;

  get sidebarData(): SidebarData | null {
    return this._sidebarData;
  }
  private _sidebarData!: SidebarData | null;

  protected _defaultStyleElement?: HTMLStyleElement;
  protected _localStyleElement?: HTMLStyleElement;

  readonly updateProperty$ = new Subject<{
    sidebarProp: SidebarProperty;
    value?: string;
  }>();

  get detectChanges$(): Observable<void> {
    return this._detectChanges$.asObservable();
  }

  private readonly _detectChanges$ = new Subject<void>();

  get componentConfig() {
    console.log(this._config?.components?.[this.componentKey]);
    return this._config?.components?.[this.componentKey];
  }

  get initialComponentConfigValue() {
    return this._initialConfigValue?.components?.[this.componentKey];
  }

  get componentBaseConfig() {
    return this._baseConfigValue.components[this.componentKey];
  }

  get configString() {
    const json = JSON.stringify(this._config, null, 2);
    return json.replace(/"([^"]+)":/g, '$1:').replace(/"/g, "'");
  }

  constructor(
    protected readonly router: Router,
    protected readonly route: ActivatedRoute,
    protected readonly blizzService: BlizzService,
    @Inject(DOCUMENT) protected readonly document: Document,
  ) {
    this._setupConfigs();
    this.handleEvents();
    this.checkRoute();
  }

  handleEvents() {
    this.updateProperty$
      .pipe(
        untilDestroyed(this),
        debounceTime(300),
        filter(({ sidebarProp, value }) => get(this.componentConfig, sidebarProp.path) !== value),
      )
      .subscribe(({ sidebarProp, value }) => this._updateProperty(sidebarProp, value));

    this.router.events.pipe(untilDestroyed(this)).subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.updateVariationVisibility();
        this.updateStateVisibility();
        this._detectChanges$.next();
      }
    });
  }

  checkRoute() {
    if (
      this.variationKey &&
      !map(this.sidebarData?.variations, 'key').includes(this.variationKey)
    ) {
      this.router.navigate(['variations'], { relativeTo: this.route });
    }

    if (this.stateKey && !map(this.sidebarData?.states, 'key').includes(this.stateKey)) {
      this.router.navigate(['state'], { relativeTo: this.route });
    }
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

  updateLocalStorageConfig() {
    localStorage.setItem(CUSTOMIZER_CONFIG_LOCAL_STORAGE_TOKEN, JSON.stringify(this._config));
  }

  updateVariationVisibility() {
    if (!this._previewComponent) return;
    this._previewComponent.variation =
      this.variationVisible && this.variationKey ? this.variationKey : undefined;
  }

  updateStateVisibility() {
    if (!this._previewElement) return;
    this.stateVisible && this.stateKey
      ? this._previewElement.setAttribute(this.forceStateAttr, this.stateKey)
      : this._previewElement.removeAttribute(this.forceStateAttr);
  }

  changeBase(key: string) {
    this._config.base = key as BlizzPredefinedConfig;
    this.updateLocalStorageConfig();
    this._setupConfigs();
  }

  private _updateProperty(sidebarProp: SidebarProperty, value?: string) {
    const path = `components.${this.componentKey}.${sidebarProp.path}`;
    value?.length && value !== sidebarProp.inheritedValue()
      ? set(this._config, path, value)
      : unset(this._config, path);
    this._purgeConfig(sidebarProp, path);
    this.updateLocalStorageConfig();
    this._updateLocalComponentCssVariable(sidebarProp, value);
    if (this._previewComponent) {
      merge(this._previewComponent.config, this.componentConfig);
    }
    this._previewComponent?.changeDetector.detectChanges();

    this._detectChanges$.next();
  }

  createVariation(key: string) {
    this._setVariationInConfig(key);
    this._createVariationInSidebarData(key);
    this.updateLocalStorageConfig();
    this._detectChanges$.next();
  }

  removeVariation(key: string) {
    this._removeVariationFromConfig(key);
    this._removeVariationFromSidebarData(key);
    this.updateLocalStorageConfig();
    this._detectChanges$.next();
  }

  renameVariation(key: string, newKey: string) {
    const clone = structuredClone(
      get(this._config, `components.${this.componentKey}.variations.${key}`),
    ) as SidebarElements;
    if (!clone) return;
    this._removeVariationFromConfig(key);
    this._setVariationInConfig(newKey, clone);
    this.updateLocalStorageConfig();
  }

  resetConfig() {
    localStorage.setItem(
      CUSTOMIZER_CONFIG_LOCAL_STORAGE_TOKEN,
      JSON.stringify(omit(this._config, 'components')),
    );
    this._setupConfigs();
  }

  private _setVariationInConfig(key: string, value?: SidebarElements) {
    set(this._config, `components.${this.componentKey}.variations.${key}`, value ?? {});
  }

  private _createVariationInSidebarData(key: string) {
    const componentSchema = ComponentsSchema.getComponentSchema(this.componentKey);
    const elementsSchema = ComponentsSchema.getElementsSchema(componentSchema);

    const elements = mapElements(
      elementsSchema,
      this.componentKey,
      this.componentConfig,
      this.componentBaseConfig,
      undefined,
      key,
    );
    const states = mapStates(
      componentSchema,
      elementsSchema,
      this.componentKey,
      this.componentConfig,
      this.componentBaseConfig,
      key,
    );
    if (!elements || !states) return;

    this._sidebarData?.variations?.push({ key, elements, states });
  }

  private _setupConfigs() {
    this._config = this.getConfigFromLocalStorage();
    this._baseConfigValue = blizzConfigHelpers.setupConfig({
      base: this._config.base,
      theme: this._config.theme,
    });
    this._initialConfigValue = blizzConfigHelpers.setupConfig(this._config);
    this._sidebarData = createSidebarData(
      this.componentKey,
      this.componentBaseConfig,
      this.componentConfig,
    );
    this._generateLocalComponentCssVariables();
  }

  private _removeVariationFromConfig(key: string) {
    has(this.componentBaseConfig.variations, key)
      ? set(this._config, `components.${this.componentKey}.variations.${key}`, null)
      : unset(this._config, `components.${this.componentKey}.variations.${key}`);
  }

  private _removeVariationFromSidebarData(key: string) {
    remove(this._sidebarData!.variations!, { key: key });
  }

  private _generateLocalComponentCssVariables() {
    this._defaultStyleElement?.remove();
    this._localStyleElement?.remove();
    this._defaultStyleElement = this.blizzService.createGlobalCssFromConfig(
      this._initialConfigValue,
      this.blizzServiceOpts,
    );

    this._localStyleElement = this.document.createElement('style');
    const headElement = this.document.getElementsByTagName('head')[0];
    headElement.appendChild(this._localStyleElement);

    this._detectChanges$.next();
  }

  private _updateLocalComponentCssVariable(sidebarProp: SidebarProperty, value?: string) {
    const sheet = this._localStyleElement?.sheet;
    const rules = sheet?.cssRules;
    let selector = `#${this.previewId} ${this.componentSelector}`;
    const { variationKey, stateKey } = sidebarProp;

    if (variationKey) {
      selector = BlizzService.getVariationSelector(selector, variationKey, this.blizzServiceOpts);
    }

    if (stateKey) {
      selector = BlizzService.getStateSelector(selector, stateKey, this.blizzServiceOpts);
    }

    if (!rules || !sidebarProp.cssVariable) return;
    for (let i = 0; i < rules.length; i++) {
      const rule = rules[i] as CSSStyleRule;
      if (rule.selectorText === selector) {
        return value?.length
          ? rule.style.setProperty(sidebarProp.cssVariable, value)
          : rule.style.removeProperty(sidebarProp.cssVariable);
      }
    }

    if (!value?.length) return;
    sheet?.addRule(selector, `${sidebarProp.cssVariable}: ${value}`);
  }

  private _purgeConfig(sidebarProp: SidebarProperty, path: string) {
    const pathArr = path.split('.');
    let value = get(this._config, pathArr);

    while (pathArr.length && (!value || isEmpty(value))) {
      unset(this._config, pathArr);
      pathArr.pop();
      value = get(this._config, pathArr);
      console.log(value);
    }
  }

  ngOnDestroy() {
    this._detectChanges$.complete();
  }
}
