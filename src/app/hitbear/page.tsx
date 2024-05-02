'use client'
import gsap from "gsap"
import bearStartImg from "../../../public/assets/game/Untitled_Artwork 14 1.png"
import num30Img from "../../../public/assets/game/30.png"
import num01Img from "../../../public/assets/game/01.png"
import hitHimImg from "../../../public/assets/game/hithim.png"
// import healthImg from "../../../public/assets/game/full-health.png"
import healthFullImg from "../../../public/assets/game/health-full.png"
import health60Img from "../../../public/assets/game/health-60.png"
import health30Img from "../../../public/assets/game/health-30.png"
import health90Img from "../../../public/assets/game/health-90.png";
import health0Img from "../../../public/assets/game/health-empty.png";
import madeItImg from "../../../public/assets/game/ball.png";
import frontImg from "../../../public/assets/game/Frame 48096887-1.png";

import logoImg from "../../../public/assets/game/Frame 48096883-2.png"
import hitBearImg from "../../../public/assets/game/Component 44.png"
import blinkBearImg from "../../../public/assets/game/Component 44-1.png"
import boomImg from "../../../public/assets/game/boom.svg"
import bgImg from "../../../public/assets/game/bg.svg"
import React, {useEffect, useRef, useState} from "react"
import Image from "next/image";

const HitBear = () => {

    const bearRef = useRef(null);
    const [loaded, setLoaded] = useState(false);
    const num30Ref = useRef(null);
    const num01Ref = useRef(null);
    const hitHimRef = useRef(null);
    const hitBearRef = useRef(null);
    const healthRef = useRef(null);
    const blinkBearRef = useRef(null);
    const madeItRef = useRef(null);

    useEffect(() => {
        if (bearRef.current) {
            gsap.set(bearRef.current, {
                y: '29vh',
            });
        }
        if (loaded && bearRef.current) {
            console.log("触发图片")
            gsap.to(bearRef.current, {
                duration: 2,
                scale: 1.41,
                y: '2vh',
                ease: 'power1.out',
            });
            const tl = gsap.timeline()

            tl.to(num30Ref.current,
                {opacity: 0, duration: 1})
            tl.delay(1)
            tl.to(num01Ref.current,
                {opacity: 1, duration: 1}).set(num01Ref.current, {opacity: 0})
            tl.to(hitHimRef.current, {opacity: 1, duration: 1}).set(hitHimRef.current, {opacity: 0})
            tl.to(bearRef.current, {opacity: 0, duration: 0})
            tl.to(blinkBearRef.current, {opacity: 1, repeat: 1}).set(blinkBearRef.current, {opacity: 0})

            tl.to(hitBearRef.current, {opacity: 1, duration: 0})

        }
    }, [loaded]);
    const containerRef = useRef<HTMLDivElement>(null); // Ref for the container
    const hitMarkerRef = useRef<HTMLDivElement>(null);
    const [clickCount, setClickCount] = useState(0);

    const totalClicks = 5; // 总共点击次数，到达这个次数视为满
    const healthImages = [
        healthFullImg,
        health90Img,
        health60Img,
        health30Img,
        // ... 添加更多血量状态的图片
        health0Img,
    ];
    const handleClick = (event: { clientX: number; clientY: number }) => {
        const marker = hitMarkerRef.current;
        const container = containerRef.current;
        setClickCount(prev => prev + 1);
        if (container && marker) {
            const rect = container.getBoundingClientRect();
            const offsetX = event.clientX - rect.left; // Adjust for container's left boundary
            const offsetY = event.clientY - rect.top;  // Adjust for container's top boundary

            marker.style.left = `${offsetX - 15}px`; // Assume marker width and height is 30px
            marker.style.top = `${offsetY - 15}px`;
            marker.style.display = 'block';

            // GSAP animation
            gsap.fromTo(marker, {scale: 0.5, opacity: 0}, {
                scale: 1.5,
                opacity: 1,
                duration: 0.3,
                ease: 'elastic.out',
                onComplete: () => {
                    gsap.to(marker, {
                        opacity: 0,
                        duration: 0.5,
                        onComplete: () => {
                            marker.style.display = 'none';
                        }
                    });
                }
            });


        }
        const tl = gsap.timeline()
        tl.to(blinkBearRef.current, {display: 1,duration:0.1,}).set(blinkBearRef.current, {opacity: 0})

        if (clickCount >= totalClicks-1 ) {
            const tl = gsap.timeline()
            tl.to(hitBearRef.current, {display:"none",duration:0.1}).set(blinkBearRef.current, {display:"none"})
            tl.to(bearRef.current, {opacity:1,duration:1}).to(bearRef.current, {duration:1,scale:1,y:'29vh',ease:'power1.in'})
            tl.to(healthRef.current,{opacity:0,duration:0.1}).set(healthRef.current, {display:'none'})
            // tl.to(madeItRef.current,{duration: 2,opacity:1,display:'block',
            //     y: '-82vh',
            //     ease: 'power1.out',})
            tl.to(madeItRef.current, {y: '10%', duration: 0.5})
        }
    };
    const handleImageLoad = () => {
        console.log("handleImage ", loaded)
        setLoaded(true);
    };

    const currentHealthIndex = Math.min(healthImages.length - 1,
        Math.floor(clickCount / totalClicks * healthImages.length));

    return (
        <div ref={containerRef} className="flex justify-center h-screen overflow-hidden" style={{
            backgroundImage: `url(${bgImg.src})`,
            backgroundColor: "#384273",
        }}>

            {/* <div className="box w-20 h-20 bg-red-300" /> */}
            <img className="absolute bottom-0 z-50 w-full object-cover" src={frontImg.src} alt=""/>
            {/* 开始图片 */}
            <img className={`absolute bottom-0 z-20 w-full object-cover ${loaded ? 'hidden' : ''}`}
                 src={bearStartImg.src} alt=""/>
            <img className={`absolute top-0 z-20 w-full object-cover  `}
                 src={logoImg.src} alt=""/>
            {/* <img src={healthImages[currentHealthIndex]} className="absolute top-0 left-1/2" alt="Health Bar"/> */}
            <Image ref={healthRef} src={healthImages[currentHealthIndex]}
                   className="absolute top-24 w-3/4  object-cover"
                   alt="Health Bar"/>
            {/* <img ref={healthRef} className={`absolute top-20 z-20 w-3/4 object-cover  `} */}
            {/*     src={healthImg.src} alt="" /> */}
            <img ref={num30Ref} className={`absolute top-52 z-20 w-3/4 object-cover  `}
                 src={num30Img.src} alt=""/>
            <img ref={num01Ref} className={`absolute top-52 z-20 w-3/4 object-cover  opacity-0 `}
                 src={num01Img.src} alt=""/>
            <img ref={hitHimRef} className={`absolute top-52 z-20 w-3/4 object-cover  opacity-0 `}
                 src={hitHimImg.src} alt=""/>
            <Image ref={bearRef}
                   src={bearStartImg.src}
                   alt="Description"
                   onLoad={handleImageLoad}
                   width={500}
                   height={300}
                   loading="eager"
                   className={`w-full h-full object-contain ${loaded ? '' : 'hidden'}`}/>
            <img ref={blinkBearRef}
                 src={blinkBearImg.src}
                 alt="blinkBear"
                 className={`absolute top-56 z-50 w-full object-cover  opacity-0 `} onClick={handleClick}/>

            <img ref={hitBearRef}
                 src={hitBearImg.src}
                 alt="hitBear"
                 className={`absolute top-56 z-20 w-full object-cover  opacity-0 `} onClick={handleClick}/>
            <div ref={madeItRef} id="slide-up-panel"
                 className="fixed inset-x-0 bottom-0 transform translate-y-full shadow-lg z-50 flex flex-col w-full h-screen items-center overflow-hidden">
                <img src={madeItImg.src} alt="Description" className="w-full object-cover "/>
                <div
                    className="bg-[#242552] w-full h-full object-cover flex flex-col  items-center overflow-hidden">
                    {/*<button className="mt-5 bg-blue-500 hover:bg-blue-700  text-white font-bold py-2 px-4 rounded">*/}
                    {/*    CONTINUE*/}
                    {/*</button>*/}
                    <div className=" absolute top-1/2 text-white text-center font-semibold text-3xl md:text-5xl mb-12 md:mb-24">
                        <p>Hooraaay!</p> You've made it!
                    </div>
                    <button
                        className=" absolute top-1/2 bg-[#62C5C6] mt-32 text-white text-xl  font-bold py-1 px-3 rounded-xl w-10/12 h-14 border border-black border-b-4 ">CONTINUE
                    </button>
                </div>

            </div>
            <img ref={hitMarkerRef} src={boomImg.src}
                 className="hidden absolute w-20 z-50 " alt="Hit Marker"/>
        </div>


    )
}

export default HitBear