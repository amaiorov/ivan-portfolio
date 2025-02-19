import {
  transition,
  trigger,
  query,
  style,
  animate,
  group,
  animateChild
} from '@angular/animations';


export const slideInAnimation =
trigger('routeAnimations', [
  transition('* <=> *', [
    // query(':enter', style({ position: 'fixed', width: 'calc(100vw - 120px)', left: '60px', transformOrigin: 'top center', border: '5px solid red' }), { optional: true }),
    // query(':leave', style({ position: 'fixed', width: 'calc(100vw - 120px)', left: '60px', transformOrigin: 'top center', border: '5px solid green' }), { optional: true }),
    query(':enter', style({ position: 'absolute', left: 0, width: '100%', outline: '0px solid red' }), { optional: true }),
    query(':leave', style({ position: 'absolute', left: 0, width: '100%', outline: '0px solid green' }), { optional: true }),
    group([
      query(':enter', [
        // style({ transform: 'scale(1.2)', opacity: '0' }),
        style({ opacity: '0' }),
        animate('500ms ease-in-out', style({ opacity: '1' }))
      ], { optional: true }),
      query(':leave', [
        // style({ transform: 'scale(1)', opacity: '1' }),
        style({ opacity: '1' }),
        animate('0ms ease-in-out', style({ opacity: '0' }))
      ], { optional: true }),
    ])
  ]),
  // transition('Contact <=> *', [
  //     query(':enter, :leave', style({ width: '100%', position: 'absolute', top: '0', border: '1px solid red', marginBottom: '100vh', opacity: '1' }), { optional: true }),
  //     group([
  //         query(':enter', [
  //             style({ opacity: '1' }),
  //             animate('1000ms ease-in-out', style({ opacity: '0' }))
  //         ], { optional: true }),
  //         query(':leave', [
  //             style({ opacity: '0' }),
  //             animate('1000ms ease-in-out', style({ opacity: '1' }))
  //         ], { optional: true }),
  //     ])
  // ]),
  // transition('Home => *', [
  //     query(':enter, :leave', style({ position: 'fixed', width: '100%' }), { optional: true }),
  //     group([
  //         query(':enter', [
  //             style({ transform: 'translateX(100%)' }),
  //             animate('0.5s ease-in-out', style({ transform: 'translateX(0%)' }))
  //         ], { optional: true }),
  //         query(':leave', [
  //             style({ transform: 'translateX(0%)' }),
  //             animate('0.5s ease-in-out', style({ transform: 'translateX(-100%)' }))
  //         ], { optional: true }),
  //     ])
  // ]),
  // transition('About => Contact', [
  //     query(':enter, :leave', style({ position: 'fixed', width: '100%' }), { optional: true }),
  //     group([
  //         query(':enter', [
  //             style({ transform: 'translateX(100%)' }),
  //             animate('0.5s ease-in-out', style({ transform: 'translateX(0%)' }))
  //         ], { optional: true }),
  //         query(':leave', [
  //             style({ transform: 'translateX(0%)' }),
  //             animate('0.5s ease-in-out', style({ transform: 'translateX(-100%)' }))
  //         ], { optional: true }),
  //     ])
  // ]),
  // transition('About => Home', [
  //     query(':enter, :leave', style({ position: 'fixed', width: '100%' }), { optional: true }),
  //     group([
  //         query(':enter', [
  //             style({ transform: 'translateX(-100%)' }),
  //             animate('0.5s ease-in-out', style({ transform: 'translateX(0%)' }))
  //         ], { optional: true }),
  //         query(':leave', [
  //             style({ transform: 'translateX(0%)' }),
  //             animate('0.5s ease-in-out', style({ transform: 'translateX(100%)' }))
  //         ], { optional: true }),
  //     ])
  // ]),
]);
