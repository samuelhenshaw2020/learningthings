
import { trigger, style, transition, animate, state, query, animateChild, group, animation } from '@angular/animations';
import { animationFrameScheduler } from 'rxjs';


// Get started animationFrameScheduler
export const fade = trigger('fade', [

    state("void", style({opacity: 0, transform: 'scale(0.9) translateY(-20%)', transformOrigin: '100% 100%'})),

    transition('void => *', [
      animate(500)
    ]),

    transition('* => void', [
      animate(500)
    ])
  ]);





  // Route animation

export const slideInAnimation =
  trigger('routeAnimations', [

    transition('HomePage<=> *', [
      style({ position: 'relative' }),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%'
        })
      ]),
      query(':enter', [
        style({ opacity: 0})
      ]),
      query(':leave', animateChild(), {optional: true}),
      group([
        query(':leave', [
          animate('300ms ease-out', style({ opacity: 0}))
        ], {optional: true}),
        query(':enter', [
          animate('300ms ease-out', style({ opacity: 1}))
        ])
      ]),
      query(':enter', animateChild()),
    ]),

    // transition('* <=> ControlPage', [
    //   style({ position: 'relative' }),
    //   query(':enter, :leave', [
    //     style({
    //       position: 'absolute',
    //       top: 0,
    //       left: 0,
    //       width: '100%'
    //     })
    //   ]),
    //   query(':enter', [
    //     style({ left: '-100%'})
    //   ]),
    //   query(':leave', animateChild()),
    //   group([
    //     query(':leave', [
    //       animate('200ms ease-out', style({ left: '100%'}))
    //     ]),
    //     query(':enter', [
    //       animate('300ms ease-out', style({ left: '0%'}))
    //     ])
    //   ]),
    //   query(':enter', animateChild()),
    // ])
    
  ]);


  

