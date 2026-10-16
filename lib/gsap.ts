import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Single registration point: every client module imports gsap from here.
gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };
