import { animate, AnimationMetadata, style, transition, trigger } from '@angular/animations';

export const DefaultSlideAnimationTimings = '200ms ease-in';

// META
// Left
export const slideFromLeftMeta = (timings = DefaultSlideAnimationTimings): AnimationMetadata[] => [
  style({ transform: 'translateX(-100%)' }),
  animate(timings),
];

export const slideToLeftMeta = (timings = DefaultSlideAnimationTimings): AnimationMetadata[] => [
  animate(timings, style({ transform: 'translateX(-100%)' })),
];

// Right
export const slideFromRightMeta = (timings = DefaultSlideAnimationTimings): AnimationMetadata[] => [
  style({ transform: 'translateX(100%)' }),
  animate(timings),
];

export const slideToRightMeta = (timings = DefaultSlideAnimationTimings): AnimationMetadata[] => [
  animate(timings, style({ transform: 'translateX(100%)' })),
];

// Top
export const slideFromTopMeta = (timings = DefaultSlideAnimationTimings): AnimationMetadata[] => [
  style({ transform: 'translateY(-100%)' }),
  animate(timings),
];

export const slideToTopMeta = (timings = DefaultSlideAnimationTimings): AnimationMetadata[] => [
  animate(timings, style({ transform: 'translateY(-100%)' })),
];

// Bottom
export const slideFromBottomMeta = (
  timings = DefaultSlideAnimationTimings,
): AnimationMetadata[] => [style({ transform: 'translateY(100%)' }), animate(timings)];

export const slideToBottomMeta = (timings = DefaultSlideAnimationTimings): AnimationMetadata[] => [
  animate(timings, style({ transform: 'translateY(100%)' })),
];

// ANIMATIONS
export const slideFromLeftInAnimation = trigger('slideFromLeftIn', [
  transition(':enter', slideFromLeftMeta()),
]);

export const slideToLeftOutAnimation = trigger('slideToLeftOut', [
  transition(':leave', slideToLeftMeta()),
]);

export const slideFromRightInAnimation = trigger('slideFromRightIn', [
  transition(':enter', slideFromRightMeta()),
]);

export const slideToRightOutAnimation = trigger('slideToRightOut', [
  transition(':leave', slideToRightMeta()),
]);

export const slideFromTopInAnimation = trigger('slideFromTopIn', [
  transition(':enter', slideFromTopMeta()),
]);

export const slideToTopOutAnimation = trigger('slideToTopOut', [
  transition(':leave', slideToTopMeta()),
]);

export const slideFromBottomInAnimation = trigger('slideFromBottomIn', [
  transition(':enter', slideFromBottomMeta()),
]);

export const slideToBottomOutAnimation = trigger('slideToBottomOut', [
  transition(':leave', slideToBottomMeta()),
]);
