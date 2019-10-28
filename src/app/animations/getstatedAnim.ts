import { trigger, style, transition, animate, state, query, animateChild, group } from '@angular/animations';


export const fade = trigger('fade', [

    state("void", style({opacity: 0, transform: 'scale(0.9) translateY(-20%)', transformOrigin: '100% 100%'})),

    transition('void => *', [
      animate(500)
    ]),

    transition('* => void', [
      animate(500)
    ])
  ])
