import { transition, trigger } from '@angular/animations';
import {
  slideFromLeftMeta,
  slideToLeftMeta,
} from '../../../shared/animations/slide.animations';

export const slideSidenavAnimation = trigger('slideSidenav', [
  transition(':enter', slideFromLeftMeta('200ms 220ms ease-out')),
  transition(':leave', slideToLeftMeta()),
]);
