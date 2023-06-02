import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocIconComponent } from '../icon';
import { DocTabComponent } from '../tab';
import { ActivatedRoute, NavigationEnd, Router, RouterModule } from '@angular/router';
import { distinctUntilChanged, filter, map, Observable } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ModuleRoutesEnum } from '../../../app.routing-data';
import { fadeInOutAnimation } from '../../animations/fade.animations';
import { COMPONENTS_DATA } from '../../../modules/components/components.routing-data';

@UntilDestroy()
@Component({
  selector: 'doc-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, RouterModule, DocIconComponent, DocTabComponent],
  animations: [fadeInOutAnimation],
})
export class DocHeaderComponent implements OnInit {
  isCustomizer$!: Observable<boolean>;

  get customizerComponentName(): string {
    const component = this.route.firstChild?.snapshot.paramMap.get('component');
    return COMPONENTS_DATA.find((item) => item.path === component)?.label ?? '';
  }

  constructor(protected readonly router: Router, protected readonly route: ActivatedRoute) {}

  ngOnInit() {
    this.isCustomizer$ = this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      map(({ url }) => url.split('/')?.[1] === ModuleRoutesEnum.Customizer),
      distinctUntilChanged(),
      untilDestroyed(this),
    );
  }
}
