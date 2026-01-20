import gsap from "gsap";
// import water from '../../../assets/water.svg';
// import fish from '../../../assets/fish.svg';
import * as introCss from "./analysisintro.module.css";


export function playIntroAnimation() {
    const SWIM_CYCLE_REPS = 3;

    const container = document.createElement("div");
    container.classList.add(introCss.AnalysisIntroDiv);

    document.body.insertAdjacentElement('beforebegin', container);



    // Draw water
    const waterElement = document.createElement("img");
    const waterUrl = chrome.runtime.getURL('src/assets/water.svg');
    waterElement.src = waterUrl;
    waterElement.classList.add(introCss.Water);
    
    container.appendChild(waterElement);
    
    gsap.set(waterElement, { y: waterElement.height })



    // Draw fish
    const fishUrl = chrome.runtime.getURL('src/assets/fish.svg');
    const fishElement = document.createElement("img");
    fishElement.src = fishUrl;
    fishElement.classList.add(introCss.Fish);

    container.appendChild(fishElement);
    
    gsap.set(fishElement, { y: window.innerHeight })
    gsap.set(fishElement, { rotate: -15 })

    const mainTl = gsap.timeline();
    // water rise
    mainTl.to(waterElement, {
        y: 200,
        // top: "100 0",
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

    const waterBobTl = gsap.timeline();
    waterBobTl.delay(3)
    .to(waterElement, {
        y: 175,
        duration: 3,
        yoyo: true,
        repeat: SWIM_CYCLE_REPS,
        ease: "sine.inOut"
    })

    waterBobTl.play();

    const fishBobTl = gsap.timeline();

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
        repeat: SWIM_CYCLE_REPS,
        ease: "sine.inOut"
    })

    fishBobTl.play();
}