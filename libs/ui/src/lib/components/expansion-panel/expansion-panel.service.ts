import { Injectable } from '@angular/core';
import { BlizzExpansionPanelTriggerComponent } from './components/expansion-panel-trigger.component';
import { BlizzExpansionPanelContentComponent } from './components/expansion-panel-content.component';
import { BlizzExpansionPanelComponent } from './expansion-panel.component';

@Injectable()
export class ExpansionPanelService {
  set triggerRef(v) {
    if (v === this._triggerRef) return;
    this._triggerRef = v;

    if (v && !v.directive.expandableDirective && this.contentRef) {
      v.directive.expandableDirective = this.contentRef.directive;
    }

    if (v && this._expandSingle) {
      v.directive.expandSingle = this._expandSingle;
    }
  }
  get triggerRef() {
    return this._triggerRef;
  }
  private _triggerRef?: BlizzExpansionPanelTriggerComponent;

  set contentRef(v) {
    if (v === this._contentRef) return;
    this._contentRef = v;

    if (v && this.triggerRef) {
      this.triggerRef.directive.expandableDirective = v.directive;
    }

    if (v && this._expanded) {
      v.directive.expanded = this._expanded;
    }

    if (v && this._group) {
      v.directive.group = this._group;
    }
  }
  get contentRef() {
    return this._contentRef;
  }
  private _contentRef?: BlizzExpansionPanelContentComponent;

  hostRef?: BlizzExpansionPanelComponent;

  set expanded(v) {
    this._expanded = v;
    if (this.contentRef) this.contentRef.directive.expanded = v;
  }
  get expanded() {
    return this.contentRef?.directive.expanded ?? false;
  }
  private _expanded?: boolean;

  set group(v) {
    this._group = v;
    if (this.contentRef) this.contentRef.directive.group = v;
  }
  get group() {
    return this.contentRef?.directive.group ?? null;
  }
  private _group: string | symbol | number | null = null;

  set expandSingle(v) {
    this._expandSingle = v;
    if (this.triggerRef) this.triggerRef.directive.expandSingle = v ?? false;
  }
  get expandSingle() {
    return this.triggerRef?.directive.expandSingle ?? false;
  }
  private _expandSingle?: boolean;

  get collapsed() {
    return this.contentRef?.directive.collapsed ?? false;
  }

  toggle() {
    this.contentRef?.directive.toggle();
  }

  expand() {
    this.contentRef?.directive.expand();
  }

  collapse() {
    this.contentRef?.directive.collapse();
  }
}
