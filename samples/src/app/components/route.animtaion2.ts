import {
  trigger,
  state,
  style,
  animate,
  transition,
  query,
  group,
  animation,
  stagger,
  // ...
} from '@angular/animations';

export const backup = trigger('overlay', []);

export const fader = trigger('routesample', [
  transition('* <=> *', [
    query(':enter', [
      style({
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        opacity: 0,
        transform: 'translateY(-10%)',
      }),
    ]),
    query(':enter', [
      animate(
        '600ms ease-in',
        style({
          opacity: 1,
          transform: 'translateY(0)',
        })
      ),
    ]),
  ]),
]);

export const route2animation = trigger('routerTransition', [
  transition('* <=> *', [
    query(
      ':enter, :leave',
      style({
        position: 'fixed',
        width: '100%',
      }),
      { optional: true }
    ),
    group([
      query(
        ':enter',
        [
          style({ transform: 'translateX(100%)' }),
          animate('0.5s ease-in-out', style({ transform: 'translateX(0%)' })),
        ],
        { optional: true }
      ),
      query(
        ':leave',
        [
          style({ transform: 'translateX(0%)' }),
          animate(
            '0.5s ease-in-out',
            style({ transform: 'translateX(-100%)' })
          ),
        ],
        { optional: true }
      ),
    ]),
    group([
      query(
        ':enter .card',
        [
          style({ opacity: 0, transform: 'translateY(10%)' }),
          stagger('100ms', [
            animate(
              '300ms',
              style({ opacity: 1, transform: 'translateY(0%)' })
            ),
          ]),
        ],
        { optional: true }
      ),
      query(
        ':leave .card',
        [
          style({ opacity: 1, transform: 'translateY(0%)' }),
          stagger('-100ms', [
            animate(
              '300ms',
              style({ opacity: 0, transform: 'translateY(10%)' })
            ),
          ]),
        ],
        { optional: true }
      ),
    ]),
  ]),
]);
