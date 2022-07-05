import {
  trigger,
  state,
  style,
  animate,
  transition,
  query,
  group,
  animation,
  stagger
  // ...
} from '@angular/animations';

const ExitStyle = { opacity: 0, transform: 'translateX(-20px)' };
const EnterStyle = { opacity: 1, transform: 'translateX(0)' };

export const FadeGrowStagger = [
  trigger('fadeGrowStagger', [
    transition(':enter', [
      query(':enter', [
        style(ExitStyle),
        stagger('100ms', [animate('500ms', style(EnterStyle))]),
      ]),
    ]),
    transition(':leave', [
      query(':leave', [
        stagger('-100ms', [animate('500ms', style(ExitStyle))]),
      ]),
    ]),
  ]),
];


export const fadeinandout = trigger('fadeSlideinout', [
   transition(':enter', [
      style({opacity: 0, transform: 'translateY(10px)'}),
      animate('500ms', 
      style({
         opacity: 1, transform: 'translateY(0)'
      }))
   ]),

   transition(':leave', [
      animate('500ms', 
      style({
         opacity: 0, transform: 'translateY(10px)'
      }))
   ])
])



export const staggereffect = trigger('staggers', [
   transition(':enter', [
      query(':enter', [
         style({opacity: 0}),
         stagger('100ms', [
            animate('300ms', style({opacity: 1}))
         ])
      ])
   ])
])