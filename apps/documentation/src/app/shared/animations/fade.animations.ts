import {
  animate,
  AnimationMetadata,
  group,
  query,
  style,
  transition,
  trigger,
} from '@angular/animations';

// META
export const fadeInMeta: AnimationMetadata[] = [style({ opacity: 0 }), animate('200ms ease-in')];

export const fadeOutMeta: AnimationMetadata[] = [animate('200ms ease-out', style({ opacity: 0 }))];

// ANIMATIONS
export const fadeInAnimation = trigger('fadeIn', [transition(':enter', fadeInMeta)]);

export const fadeOutAnimation = trigger('fadeOut', [transition(':leave', fadeOutMeta)]);

export const fadeInOutAnimation = trigger('fadeInOut', [
  transition(':enter', fadeInMeta),
  transition(':leave', fadeOutMeta),
]);

export const routerFadeAnimation = trigger('routerFade', [
  transition('* <=> *', [
    group([
      query(':enter', fadeInMeta, {
        optional: true,
      }),
      query(':leave', fadeOutMeta, {
        optional: true,
      }),
    ]),
  ]),
]);
