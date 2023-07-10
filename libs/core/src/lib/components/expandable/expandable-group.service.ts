import { Injectable } from '@angular/core';
import { KeyofBase } from 'ts-essentials/dist/key-of-base';
import { BlizzCdkExpandableDirective } from './expandable.directive';

@Injectable({ providedIn: 'root' })
export class BlizzExpandableGroupService {
  readonly groups = new Map<KeyofBase, Map<string, BlizzCdkExpandableDirective>>();

  register(groupId: KeyofBase, directive: BlizzCdkExpandableDirective) {
    if (this.groups.has(groupId)) {
      this.groups.get(groupId)!.set(directive.id, directive);
      return;
    }
    this.groups.set(groupId, new Map([[directive.id, directive]]));
  }

  delete(component: BlizzCdkExpandableDirective) {
    if (component.group) {
      const group = this.groups.get(component.group);
      group?.delete(component.id);
      if (![...(group?.values() ?? [])]?.length) this.groups.delete(component.group);
    }
  }

  clearGroup(groupId: KeyofBase) {
    this.groups.get(groupId)?.clear();
  }

  expandSingle(component: BlizzCdkExpandableDirective) {
    if (!component.group) return;
    this.groups.get(component.group)?.forEach((group) => {
      if (component.id === group.id) return group.expand();
      group.collapse();
    });
  }

  expandAll(groupId: KeyofBase) {
    this.groups.get(groupId)?.forEach((component) => component.expand());
  }

  collapseAll(groupId: KeyofBase) {
    this.groups.get(groupId)?.forEach((component) => component.collapse());
  }
}
