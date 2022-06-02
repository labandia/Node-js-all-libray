import {
  trigger,
  state,
  style,
  animate,
  transition,
  query,
  group
  // ...
} from '@angular/animations';


export const fadein = 
   trigger('routeAnimation', [
      transition('* <=> *', [
         query(':enter ,:leave', [
            style({
               position: 'absolute',
               width: '100%',
               top: 0,
               left: 0,
            })
         ], { optional: true}),
         group([
            query(':enter', [
               style({transform: 'translateY(10%)', background: 'red'}),
               animate('300ms', 
                  style({transform: 'translateY(0)'}) 
               )
            ], { optional: true}),
            query(':leave', [
               style({transform: 'translateY(0)', background: 'green'}),
               animate('300ms', 
                  style({transform: 'translateY(-10%)'})
               )
            ], { optional: true})   
         ])      
      ])
]);