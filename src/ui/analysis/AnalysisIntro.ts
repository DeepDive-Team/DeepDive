import gsap from "gsap";
// import water from '../../../assets/water.svg';
// import fish from '../../../assets/fish.svg';
import * as introCss from "./analysisintro.module.css";
import { getPreferredTheme } from "../../util/ThemeUtil";

let mainTl: gsap.core.Timeline;
let waterBobTl: gsap.core.Timeline;
let fishBobTl: gsap.core.Timeline;

export function playIntroAnimation() {
    const SWIM_CYCLE_REPS = 4;

    const container = document.createElement("div");
    container.classList.add(introCss.AnalysisIntroDiv);

    document.body.insertAdjacentElement('beforebegin', container);


    // Draw water
    const waterElement = document.createElement("img");
    let waterResourceLocation;
    const preferredColorScheme: string = getPreferredTheme();
    if (preferredColorScheme == "dark") {
        waterResourceLocation = 'src/assets/water.svg';
    }
    else {
        waterResourceLocation = 'src/assets/water_light.svg'
    }
    const waterUrl = chrome.runtime.getURL(waterResourceLocation);
    waterElement.src = waterUrl;
    waterElement.classList.add(introCss.Water);
    
    container.appendChild(waterElement);
    
    gsap.set(waterElement, { y: waterElement.height })


    // Draw loading circle
    const loadingElement = document.createElement("img");
    const loadingUrl = chrome.runtime.getURL('src/assets/loading.svg');
    loadingElement.src = loadingUrl;
    loadingElement.classList.add(introCss.Loading);
    
    container.appendChild(loadingElement);
    
    gsap.set(loadingElement, { y: window.innerHeight })



    // Draw fish
    const fishUrl = chrome.runtime.getURL('src/assets/fish.svg');
    const fishElement = document.createElement("img");
    fishElement.src = fishUrl;
    fishElement.classList.add(introCss.Fish);

    container.appendChild(fishElement);
    
    gsap.set(fishElement, { y: window.innerHeight })
    gsap.set(fishElement, { rotate: -15 })

    mainTl = gsap.timeline();
    // water rise
    mainTl.to(waterElement, {
        y: 200,
        duration: 3,
        ease: "back.out"
    })
    // fish rise
    .to(fishElement, {
        y: 400,
        rotate: 5,
        duration: 2,
        ease: "back.out"
    }, 1)
    // body bob
    .to(fishElement, {
        y: 360,
        duration: 1.5,
        yoyo: true,
        yoyoEase: true,
        repeat: SWIM_CYCLE_REPS,
        ease: "sine.inOut"
    })

    mainTl.play();

    waterBobTl = gsap.timeline();
    waterBobTl.delay(3)
    .to(waterElement, {
        y: 175,
        duration: 3,
        yoyo: true,
        repeat: SWIM_CYCLE_REPS,
        ease: "sine.inOut"
    })

    waterBobTl.play();

    fishBobTl = gsap.timeline();

    fishBobTl.delay(2.1)
    // nod
    // .to(fishElement, {
    //     rotate: -5,
    //     duration: 0.2,
    //     ease: "sine.inOut"
    // })
    // .to(fishElement, {
    //     rotate: 5,
    //     duration: 0.3,
    //     ease: "sine.inOut",
    // })
    // head bob
    .to(fishElement, {
        rotate: -0.5,
        duration: 1.5,
        yoyo: true,
        yoyoEase: true,
        repeat: SWIM_CYCLE_REPS * 2,
        ease: "sine.inOut"
    })

    fishBobTl.play();

    const loadingTl = gsap.timeline();

    loadingTl
    .delay(0.2)
    // loading circle rise
    .to(loadingElement, {
        y: 350,
        duration: 3,
        ease: "back.inOut"
    })
    .to(loadingElement, {
        rotate: 360,
        duration: 3,
        repeat: SWIM_CYCLE_REPS,
        ease: "none"
    }, 1.2)
}

export function playOutroAnimation() {
    const waterElement = document.getElementsByClassName(introCss.Water)[0];
    const fishElement = document.getElementsByClassName(introCss.Fish)[0];
    const loadingElement = document.getElementsByClassName(introCss.Loading)[0];

    mainTl.pause();
    waterBobTl.pause();
    fishBobTl.pause();

    const waterOutroTl = gsap.timeline();

    waterOutroTl
    .to(waterElement, {
        y: 600,
        duration: 1.6,
        ease: "back.in",
        opacity: 0
    })

    waterOutroTl.play();

    const fishOutroTl = gsap.timeline();

    fishOutroTl
    .to(fishElement, {
        y: 800,
        rotate: 15,
        duration: 1.3,
        ease: "back.in",
        opacity: 0,
    })

    fishOutroTl.play();

    const loadingOutroTl = gsap.timeline();

    loadingOutroTl
    .to(loadingElement, {
        y: 800,
        duration: 1,
        ease: "back.in",
        opacity: 0
    })

    loadingOutroTl.play();

}