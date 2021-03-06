import React, {useEffect, useMemo, useState} from 'react';
import styled from 'styled-components';
import './styles.css';
import gsap, {SteppedEase} from 'gsap';
import {
    Heros,
    Column as ColumnType, 
    HeroUltIcons,
    Teams,
    getRingColor
} from '../../../types';

interface StateProps{
    percentage: number;
    column: number;
    player: ColumnType;
    team: Teams;
}
const UltMeter = (props:StateProps) =>{

    const {percentage, column, player, team} = props;
    const timeline = useMemo(()=>gsap.timeline({repeat: -1, paused: true}), []);
    const [ringColor, setRingColor] = useState('black');

    useEffect(()=>{
        timeline
        .set(`#pie-${column}`, {opacity:1})
        .set(`#col-${column}-1`, {opacity:0})
        .set(`#col-${column}-2`, {opacity:0})
        .set(`#col-${column}-3`, {opacity:0})
        .set(`#col-${column}-4`, {opacity:0})
        .set(`#col-${column}-1`, {opacity:1}).addLabel('start')
        .to(`#col-${column}-1`, {duration: 1.4, backgroundPosition: "-62790px",ease:SteppedEase['config'](91)})
        .fromTo(`#ult-icon-${column}`, {transform: `scale(0)`}, {transform: `scale(0.65)`, duration:0.1}, '<0.5')
        .set(`#pie-${column}`, {opacity: 0}, '-=1.4')
        .set(`#col-${column}-1`, {opacity:0}).addLabel('loopStart')
        .set(`#col-${column}-2`, {opacity:1})
        .to(`#col-${column}-2`, {duration: 1, backgroundPosition: "-47610px",ease:SteppedEase['config'](69)})
        .set(`#col-${column}-2`, {opacity:0})
        .set(`#col-${column}-3`, {opacity:1})
        .to(`#col-${column}-3`, {duration: 1, backgroundPosition: "-47610px",ease:SteppedEase['config'](69)})
        .set(`#col-${column}-3`, {opacity:0})
        .set(`#col-${column}-4`, {opacity:1})
        .to(
            `#col-${column}-4`, 
            {
                duration: 0.84, 
                backgroundPosition: "-40020px",
                ease:SteppedEase['config'](58),
                onComplete: ()=>timeline.seek('loopStart'),
            }
        ).addLabel('end')

        timeline.seek('start');
    }, [timeline, column])

    useEffect(()=>{
        if(percentage === 100){
            timeline.seek('start');
            timeline.play();
        }else{
            if(timeline.isActive()){
                timeline.pause();
                timeline.seek('start');
            }
        }
    }, [percentage, timeline])

    const ultIcon = useMemo(()=>{
        switch(player.hero){
            case Heros.dva:
                    return HeroUltIcons.dva
            case Heros.orisa:
                    return HeroUltIcons.orisa
            case Heros.reinhardt:
                    return HeroUltIcons.reinhardt
            case Heros.roadhog:
                    return HeroUltIcons.roadhog
            case Heros.sigma:
                    return HeroUltIcons.sigma
            case Heros.winston:
                    return HeroUltIcons.winston
            case Heros.ball:
                    return HeroUltIcons.ball
            case Heros.zarya:
                    return HeroUltIcons.zarya
            case Heros.ashe:
                    return HeroUltIcons.ashe
            case Heros.bastion:
                    return HeroUltIcons.bastion
            case Heros.doomfist:
                    return HeroUltIcons.doomfist
            case Heros.echo:
                    return HeroUltIcons.echo
            case Heros.genji:
                    return HeroUltIcons.genji
            case Heros.hanzo:
                    return HeroUltIcons.hanzo
            case Heros.junkrat:
                    return HeroUltIcons.junkrat
            case Heros.mccree:
                    return HeroUltIcons.mccree
            case Heros.mei:
                    return HeroUltIcons.mei
            case Heros.pharah:
                    return HeroUltIcons.pharah
            case Heros.reaper:
                    return HeroUltIcons.reaper
            case Heros.soldier:
                    return HeroUltIcons.soldier
            case Heros.sombra:
                    return HeroUltIcons.sombra
            case Heros.symmetra:
                    return HeroUltIcons.symmetra
            case Heros.torb:
                    return HeroUltIcons.torb
            case Heros.tracer:
                    return HeroUltIcons.tracer
            case Heros.widowmaker:
                    return HeroUltIcons.widowmaker
            case Heros.ana:
                    return HeroUltIcons.ana
            case Heros.baptiste:
                    return HeroUltIcons.baptiste
            case Heros.brigitte:
                    return HeroUltIcons.brigitte
            case Heros.lucio:
                    return HeroUltIcons.lucio
            case Heros.mercy:
                    return HeroUltIcons.mercy
            case Heros.moira:
                    return HeroUltIcons.moira
            case Heros.zenyatta:
                    return HeroUltIcons.zenyatta
            default: 
                return 'https://static.wikia.nocookie.net/overwatch_gamepedia/images/f/f7/Ability-ashe5.png'
        }
    }, [player.hero]);

    useEffect(()=>{
        setRingColor(getRingColor(team));
    }, [team])
    return(
        <MainWrapper>
            <div id={`col-${column}-1`}className="character1 character"></div>
            <div id={`col-${column}-2`}className="character2 character"></div>
            <div id={`col-${column}-3`}className="character3 character"></div>
            <div id={`col-${column}-4`}className="character4 character"></div>
            <div 
                id={`ult-icon-${column}`} 
                className="ult-icon"
                style={{
                    backgroundImage: `url(${
                        ultIcon
                    })`
                }}
            />
            <PieWrapper className="pie__container" id={`pie-${column}`} color="blue">
            <div className="number">{percentage}</div>
            <div className="number-percentage">%</div>
                <div className="pie__container--chart clip-svg">
                <svg viewBox="0 0 32 32">
                    <defs>
                        <clipPath id="myClip">
                            <path d="M34.89,117.48a69,69,0,0,1-2.17-11.6L1,108.18a99.57,99.57,0,0,0,3.19,17.58Z" transform="translate(-0.61)" />
                            <path d="M43.3,136.08a77.12,77.12,0,0,1-4.08-7l-29.05,13a120,120,0,0,0,6.24,11.21Z" transform="translate(-0.61)" />
                            <path d="M50.94,145.77a63.06,63.06,0,0,1-6.88-8.54l-26.76,17.2a100.44,100.44,0,0,0,10.32,13Z" transform="translate(-0.61)" />
                            <path d="M38.71,127.93a72.07,72.07,0,0,1-3.57-9.17L4.44,127a102.23,102.23,0,0,0,5.22,14Z" transform="translate(-0.61)" />
                            <path d="M82,1.66L87.64,33a77.89,77.89,0,0,1,11-1.15V0A100,100,0,0,0,82,1.66Z" transform="translate(-0.61)" />
                            <path d="M88.91,166A62.89,62.89,0,0,1,79,163.61L68.66,193.68a86.37,86.37,0,0,0,15,3.7Z" transform="translate(-0.61)" />
                            <path d="M77.7,163.1a71.89,71.89,0,0,1-9-3.95l-15.16,28a89.51,89.51,0,0,0,13.89,6Z" transform="translate(-0.61)" />
                            <path d="M67.51,158.64a66.65,66.65,0,0,1-8-5.22L40,178.51a99.05,99.05,0,0,0,12.49,8Z" transform="translate(-0.61)" />
                            <path d="M98.6,166.92a62.27,62.27,0,0,1-8.41-.64l-5.1,31.47A118.18,118.18,0,0,0,98.6,198.9v-32Z" transform="translate(-0.61)" />
                            <path d="M32.34,99.39a26.63,26.63,0,0,1,.13-3.19L0.74,93.53c-0.13,1.91-.13,3.82-0.13,5.73,0,2.55.13,5,.25,7.39l31.73-2.29C32.47,102.83,32.34,101.17,32.34,99.39Z" transform="translate(-0.61)" />
                            <path d="M50.18,53.77a53.27,53.27,0,0,1,6.75-6.37L37.06,22.55a106.51,106.51,0,0,0-10.32,9.68Z" transform="translate(-0.61)" />
                            <path d="M34.51,82.69a59.61,59.61,0,0,1,3.06-9.17L8.39,60.65A104.38,104.38,0,0,0,3.54,74.92Z" transform="translate(-0.61)" />
                            <path d="M68.78,5L79.1,35.17a67.47,67.47,0,0,1,7.26-1.91L80.76,1.91A91.57,91.57,0,0,0,68.78,5Z" transform="translate(-0.61)" />
                            <path d="M51.84,146.66L28.39,168.19A106.86,106.86,0,0,0,39,177.75l19.5-25.1A59.78,59.78,0,0,1,51.84,146.66Z" transform="translate(-0.61)" />
                            <path d="M42.79,63.33a69.84,69.84,0,0,1,6.5-8.66L25.84,33.13a108.53,108.53,0,0,0-9.81,13Z" transform="translate(-0.61)" />
                            <path d="M38.07,72.37a57.79,57.79,0,0,1,4.08-7.9L15.39,47.27A93,93,0,0,0,9,59.5Z" transform="translate(-0.61)" />
                            <path d="M68.15,39.75a65.4,65.4,0,0,1,9.68-4.2L67.51,5.48A98.4,98.4,0,0,0,53,11.85Z" transform="translate(-0.61)" />
                            <path d="M57.82,46.64A89.44,89.44,0,0,1,67,40.39l-15.16-28a101.54,101.54,0,0,0-13.89,9.3Z" transform="translate(-0.61)" />
                            <path d="M32.6,94.93a62.83,62.83,0,0,1,1.66-11.09L3.42,76.07A97.32,97.32,0,0,0,.87,92.25Z" transform="translate(-0.61)" />
                            <path d="M165.11,117a61.12,61.12,0,0,1-3.7,10.19L190.47,140a98.78,98.78,0,0,0,5.48-15.29Z" transform="translate(-0.61)" />
                            <path d="M199.13,94L167.4,96.33c0,1,.13,2,0.13,3.06a56.13,56.13,0,0,1-.38,6.63l31.73,2.68c0.25-3.06.51-6.12,0.51-9.3C199.26,97.6,199.26,95.82,199.13,94Z" transform="translate(-0.61)" />
                            <path d="M167,107.29a82.22,82.22,0,0,1-1.53,8.41l30.84,7.9A98.52,98.52,0,0,0,198.75,110Z" transform="translate(-0.61)" />
                            <path d="M160.91,128.31a61.47,61.47,0,0,1-4.46,8l26.76,17.2a105.78,105.78,0,0,0,6.88-12.36Z" transform="translate(-0.61)" />
                            <path d="M142.18,46.76a73.45,73.45,0,0,1,7.9,7.52l23.44-21.53a122,122,0,0,0-11.85-11.09Z" transform="translate(-0.61)" />
                            <path d="M148.42,146.28a58.59,58.59,0,0,1-6.63,6l19.75,25a117.64,117.64,0,0,0,10.19-9.3Z" transform="translate(-0.61)" />
                            <path d="M110.19,166.15a67.36,67.36,0,0,1-10.19.76H99.87v31.85H100a92.25,92.25,0,0,0,15.8-1.27Z" transform="translate(-0.61)" />
                            <path d="M182.57,154.56l-26.76-17.2a76.55,76.55,0,0,1-6.37,8l23.44,21.53A103.62,103.62,0,0,0,182.57,154.56Z" transform="translate(-0.61)" />
                            <path d="M196.33,75.43l-30.84,8.28a67.6,67.6,0,0,1,1.66,11.34l31.73-2.29A86.14,86.14,0,0,0,196.33,75.43Z" transform="translate(-0.61)" />
                            <path d="M99.87,31.85h0a61.11,61.11,0,0,1,10.83.89l5.1-31.47A93.3,93.3,0,0,0,100,0H99.87V31.85Z" transform="translate(-0.61)" />
                            <path d="M157.72,64.47a81.8,81.8,0,0,1,4.2,8.15l29.05-13a112.37,112.37,0,0,0-6.5-12.23Z" transform="translate(-0.61)" />
                            <path d="M147.91,12.36l-15.16,28A60.33,60.33,0,0,1,141.16,46l19.5-25.23A122.29,122.29,0,0,0,147.91,12.36Z" transform="translate(-0.61)" />
                            <path d="M151,55.17a64,64,0,0,1,6,8.15l26.76-17.2a101.54,101.54,0,0,0-9.43-12.61Z" transform="translate(-0.61)" />
                            <path d="M162.43,73.78a69.29,69.29,0,0,1,2.93,8.66l30.71-8.28a120.23,120.23,0,0,0-4.59-13.51Z" transform="translate(-0.61)" />
                            <path d="M140.77,153a73.18,73.18,0,0,1-8.41,5.48l15.16,28A110.19,110.19,0,0,0,160.65,178Z" transform="translate(-0.61)" />
                            <path d="M132.11,193.42l-10.32-30.07A69.72,69.72,0,0,1,111.34,166l5.61,31.34A114.92,114.92,0,0,0,132.11,193.42Z" transform="translate(-0.61)" />
                            <path d="M131.22,159.15a60.61,60.61,0,0,1-8.28,3.7l10.32,30.07a108.5,108.5,0,0,0,13-5.73Z" transform="translate(-0.61)" />
                            <path d="M111.85,33a76.67,76.67,0,0,1,9.3,2.42l10.32-30.2a113.65,113.65,0,0,0-14.4-3.7Z" transform="translate(-0.61)" />
                            <path d="M122.43,35.68a74.28,74.28,0,0,1,9.17,4.08l15.16-28a101.16,101.16,0,0,0-14.14-6.24Z" transform="translate(-0.61)" />
                        </clipPath>
                    </defs>
                    <circle  
                        className="circle r-color ring-color-stroke" 
                        r="16" 
                        cx="16" 
                        cy="16" 
                        style={{
                            strokeDasharray: `${percentage} 100`, 
                            stroke:ringColor,
                        }} 
                    />
                </svg>
                </div>
                <svg id="smaller-ring" viewBox="0 0 123.85 123.93" className="ring-color">
                    <defs>
                        <clipPath id="clip-path" transform="translate(-38.07 -38.03)">
                            <path className="cls-1" d="M100,38a62,62,0,1,0,62,62A62,62,0,0,0,100,38Zm0,117.71a56.16,56.16,0,1,1,56.16-56.16A56.16,56.16,0,0,1,100,155.68Z"/>
                        </clipPath>
                    </defs>
                    <g className="cls-2" style={{fill: ringColor}}>
                        <path className="cls-3" d="M58.08,104l-19.77,1.43a62,62,0,0,0,2,11l19.13-5.16A43,43,0,0,1,58.08,104Z" transform="translate(-38.07 -38.03)"/>
                        <path className="cls-3" d="M62.13,118.46L44,126.56a74.75,74.75,0,0,0,3.89,7l16.75-10.72A48,48,0,0,1,62.13,118.46Z" transform="translate(-38.07 -38.03)"/>
                        <path className="cls-3" d="M65.15,123.54L48.47,134.26a62.58,62.58,0,0,0,6.43,8.1l14.53-13.5A39.29,39.29,0,0,1,65.15,123.54Z" transform="translate(-38.07 -38.03)"/>
                        <path className="cls-3" d="M59.59,112l-19.13,5.16a63.69,63.69,0,0,0,3.26,8.73l18.1-8.18A44.91,44.91,0,0,1,59.59,112Z" transform="translate(-38.07 -38.03)"/>
                        <path className="cls-3" d="M92.3,58.6a48.53,48.53,0,0,1,6.83-.71V38a62.29,62.29,0,0,0-10.32,1Z" transform="translate(-38.07 -38.03)"/>
                        <path className="cls-3" d="M86.9,140l-6.43,18.74a53.82,53.82,0,0,0,9.37,2.3l3.26-19.53A39.18,39.18,0,0,1,86.9,140Z" transform="translate(-38.07 -38.03)"/>
                        <path className="cls-3" d="M80.47,137.19L71,154.66a55.78,55.78,0,0,0,8.65,3.73l6.43-18.74A44.79,44.79,0,0,1,80.47,137.19Z" transform="translate(-38.07 -38.03)"/>
                        <path className="cls-3" d="M74.75,133.62L62.61,149.26a61.71,61.71,0,0,0,7.78,5l9.37-17.39A41.52,41.52,0,0,1,74.75,133.62Z" transform="translate(-38.07 -38.03)"/>
                        <path className="cls-3" d="M90.71,161.25a73.64,73.64,0,0,0,8.42.71V142a38.8,38.8,0,0,1-5.24-.4Z" transform="translate(-38.07 -38.03)"/>
                        <path className="cls-3" d="M57.84,100a16.59,16.59,0,0,1,.08-2L38.15,96.31c-0.08,1.19-.08,2.38-0.08,3.57,0,1.59.08,3.1,0.16,4.6L58,103.06C57.92,102.1,57.84,101.07,57.84,100Z" transform="translate(-38.07 -38.03)"/>
                        <path className="cls-3" d="M73.17,67.57L60.78,52.09a66.37,66.37,0,0,0-6.43,6L69,71.54A33.19,33.19,0,0,1,73.17,67.57Z" transform="translate(-38.07 -38.03)"/>
                        <path className="cls-3" d="M61.1,83.84l-18.18-8a65,65,0,0,0-3,8.89l19.29,4.84A37.13,37.13,0,0,1,61.1,83.84Z" transform="translate(-38.07 -38.03)"/>
                        <path className="cls-3" d="M91.51,58.76L88,39.23a57.06,57.06,0,0,0-7.46,1.91L87,59.95A42,42,0,0,1,91.51,58.76Z" transform="translate(-38.07 -38.03)"/>
                        <path className="cls-3" d="M70,129.41L55.38,142.83a66.58,66.58,0,0,0,6.59,6l12.15-15.64A37.25,37.25,0,0,1,70,129.41Z" transform="translate(-38.07 -38.03)"/>
                        <path className="cls-3" d="M68.4,72.09L53.79,58.68a67.62,67.62,0,0,0-6.11,8.1L64.35,77.49A43.52,43.52,0,0,1,68.4,72.09Z" transform="translate(-38.07 -38.03)"/>
                        <path className="cls-3" d="M64,78.21L47.28,67.49a57.94,57.94,0,0,0-4,7.62l18.1,8A36,36,0,0,1,64,78.21Z" transform="translate(-38.07 -38.03)"/>
                        <path className="cls-3" d="M86.19,60.19L79.76,41.45a61.31,61.31,0,0,0-9.05,4l9.45,17.39A40.75,40.75,0,0,1,86.19,60.19Z" transform="translate(-38.07 -38.03)"/>
                        <path className="cls-3" d="M79.44,63.2L70,45.74a63.26,63.26,0,0,0-8.65,5.8L73.72,67.09A55.73,55.73,0,0,1,79.44,63.2Z" transform="translate(-38.07 -38.03)"/>
                        <path className="cls-3" d="M59,90.27L39.82,85.43a60.64,60.64,0,0,0-1.59,10.08L58,97.18A39.15,39.15,0,0,1,59,90.27Z" transform="translate(-38.07 -38.03)"/>
                        <path className="cls-3" d="M138.27,117.27l18.1,8a61.55,61.55,0,0,0,3.41-9.53l-19.21-4.84A38.08,38.08,0,0,1,138.27,117.27Z" transform="translate(-38.07 -38.03)"/>
                        <path className="cls-3" d="M161.77,96.63L142,98.05c0,0.64.08,1.27,0.08,1.91a35,35,0,0,1-.24,4.13l19.77,1.67c0.16-1.91.32-3.81,0.32-5.8C161.85,98.85,161.85,97.74,161.77,96.63Z" transform="translate(-38.07 -38.03)"/>
                        <path className="cls-3" d="M140.81,110.12L160,115a61.39,61.39,0,0,0,1.51-8.49l-19.77-1.67A51.22,51.22,0,0,1,140.81,110.12Z" transform="translate(-38.07 -38.03)"/>
                        <path className="cls-3" d="M135.17,123l16.67,10.72a65.91,65.91,0,0,0,4.29-7.7l-18.18-8A38.3,38.3,0,0,1,135.17,123Z" transform="translate(-38.07 -38.03)"/>
                        <path className="cls-3" d="M131.2,71.86l14.61-13.42a76,76,0,0,0-7.38-6.91L126.28,67.17A45.78,45.78,0,0,1,131.2,71.86Z" transform="translate(-38.07 -38.03)"/>
                        <path className="cls-3" d="M126,132.91l12.31,15.56a73.31,73.31,0,0,0,6.35-5.8l-14.53-13.5A36.51,36.51,0,0,1,126,132.91Z" transform="translate(-38.07 -38.03)"/>
                        <path className="cls-3" d="M100,142H99.92v19.85H100a57.48,57.48,0,0,0,9.84-.79l-3.49-19.53A42,42,0,0,1,100,142Z" transform="translate(-38.07 -38.03)"/>
                        <path className="cls-3" d="M130.8,128.62L145.41,142a64.58,64.58,0,0,0,6-7.7l-16.67-10.72A47.7,47.7,0,0,1,130.8,128.62Z" transform="translate(-38.07 -38.03)"/>
                        <path className="cls-3" d="M141.84,97.26l19.77-1.43A53.67,53.67,0,0,0,160,85L140.81,90.2A42.12,42.12,0,0,1,141.84,97.26Z" transform="translate(-38.07 -38.03)"/>
                        <path className="cls-3" d="M109.84,38.83A58.13,58.13,0,0,0,100,38H99.92V57.88a38.08,38.08,0,0,1,6.75.56Z" transform="translate(-38.07 -38.03)"/>
                        <path className="cls-3" d="M138.58,83.29l18.1-8.1a70,70,0,0,0-4-7.62L136,78.21A51,51,0,0,1,138.58,83.29Z" transform="translate(-38.07 -38.03)"/>
                        <path className="cls-3" d="M125.64,66.7L137.79,51a76.2,76.2,0,0,0-7.94-5.24L120.4,63.2A37.58,37.58,0,0,1,125.64,66.7Z" transform="translate(-38.07 -38.03)"/>
                        <path className="cls-3" d="M135.49,77.49l16.67-10.72a63.27,63.27,0,0,0-5.87-7.86l-14.53,13.5A39.85,39.85,0,0,1,135.49,77.49Z" transform="translate(-38.07 -38.03)"/>
                        <path className="cls-3" d="M140.73,89.4l19.13-5.16A74.9,74.9,0,0,0,157,75.83L138.9,84A43.17,43.17,0,0,1,140.73,89.4Z" transform="translate(-38.07 -38.03)"/>
                        <path className="cls-3" d="M120.17,136.8l9.45,17.47a68.65,68.65,0,0,0,8.18-5.32l-12.39-15.56A45.6,45.6,0,0,1,120.17,136.8Z" transform="translate(-38.07 -38.03)"/>
                        <path className="cls-3" d="M107.07,141.48L110.56,161a71.6,71.6,0,0,0,9.45-2.46l-6.43-18.74A43.45,43.45,0,0,1,107.07,141.48Z" transform="translate(-38.07 -38.03)"/>
                        <path className="cls-3" d="M114.29,139.5l6.43,18.74a67.6,67.6,0,0,0,8.1-3.57l-9.37-17.47A37.77,37.77,0,0,1,114.29,139.5Z" transform="translate(-38.07 -38.03)"/>
                        <path className="cls-3" d="M113.18,60.11l6.43-18.82a70.81,70.81,0,0,0-9-2.3L107.38,58.6A47.78,47.78,0,0,1,113.18,60.11Z" transform="translate(-38.07 -38.03)"/>
                        <path className="cls-3" d="M119.69,62.81l9.45-17.47a63,63,0,0,0-8.81-3.89L114,60.26A46.28,46.28,0,0,1,119.69,62.81Z" transform="translate(-38.07 -38.03)"/>
                    </g>
                </svg>
            <svg id="background-ring" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
                <path className="cls-1" d="M34.89,117.48a69,69,0,0,1-2.17-11.6L1,108.18a99.57,99.57,0,0,0,3.19,17.58Z" transform="translate(-0.61)"/>
                <path className="cls-1" d="M43.3,136.08a77.12,77.12,0,0,1-4.08-7l-29.05,13a120,120,0,0,0,6.24,11.21Z" transform="translate(-0.61)"/>
                <path className="cls-1" d="M50.94,145.77a63.06,63.06,0,0,1-6.88-8.54l-26.76,17.2a100.44,100.44,0,0,0,10.32,13Z" transform="translate(-0.61)"/>
                <path className="cls-1" d="M38.71,127.93a72.07,72.07,0,0,1-3.57-9.17L4.44,127a102.23,102.23,0,0,0,5.22,14Z" transform="translate(-0.61)"/>
                <path className="cls-1" d="M82,1.66L87.64,33a77.89,77.89,0,0,1,11-1.15V0A100,100,0,0,0,82,1.66Z" transform="translate(-0.61)"/>
                <path className="cls-1" d="M88.91,166A62.89,62.89,0,0,1,79,163.61L68.66,193.68a86.37,86.37,0,0,0,15,3.7Z" transform="translate(-0.61)"/>
                <path className="cls-1" d="M77.7,163.1a71.89,71.89,0,0,1-9-3.95l-15.16,28a89.51,89.51,0,0,0,13.89,6Z" transform="translate(-0.61)"/>
                <path className="cls-1" d="M67.51,158.64a66.65,66.65,0,0,1-8-5.22L40,178.51a99.05,99.05,0,0,0,12.49,8Z" transform="translate(-0.61)"/>
                <path className="cls-1" d="M98.6,166.92a62.27,62.27,0,0,1-8.41-.64l-5.1,31.47A118.18,118.18,0,0,0,98.6,198.9v-32Z" transform="translate(-0.61)"/>
                <path className="cls-1" d="M32.34,99.39a26.63,26.63,0,0,1,.13-3.19L0.74,93.53c-0.13,1.91-.13,3.82-0.13,5.73,0,2.55.13,5,.25,7.39l31.73-2.29C32.47,102.83,32.34,101.17,32.34,99.39Z" transform="translate(-0.61)"/>
                <path className="cls-1" d="M50.18,53.77a53.27,53.27,0,0,1,6.75-6.37L37.06,22.55a106.51,106.51,0,0,0-10.32,9.68Z" transform="translate(-0.61)"/>
                <path className="cls-1" d="M34.51,82.69a59.61,59.61,0,0,1,3.06-9.17L8.39,60.65A104.38,104.38,0,0,0,3.54,74.92Z" transform="translate(-0.61)"/>
                <path className="cls-1" d="M68.78,5L79.1,35.17a67.47,67.47,0,0,1,7.26-1.91L80.76,1.91A91.57,91.57,0,0,0,68.78,5Z" transform="translate(-0.61)"/>
                <path className="cls-1" d="M51.84,146.66L28.39,168.19A106.86,106.86,0,0,0,39,177.75l19.5-25.1A59.78,59.78,0,0,1,51.84,146.66Z" transform="translate(-0.61)"/>
                <path className="cls-1" d="M42.79,63.33a69.84,69.84,0,0,1,6.5-8.66L25.84,33.13a108.53,108.53,0,0,0-9.81,13Z" transform="translate(-0.61)"/>
                <path className="cls-1" d="M38.07,72.37a57.79,57.79,0,0,1,4.08-7.9L15.39,47.27A93,93,0,0,0,9,59.5Z" transform="translate(-0.61)"/>
                <path className="cls-1" d="M68.15,39.75a65.4,65.4,0,0,1,9.68-4.2L67.51,5.48A98.4,98.4,0,0,0,53,11.85Z" transform="translate(-0.61)"/>
                <path className="cls-1" d="M57.82,46.64A89.44,89.44,0,0,1,67,40.39l-15.16-28a101.54,101.54,0,0,0-13.89,9.3Z" transform="translate(-0.61)"/>
                <path className="cls-1" d="M32.6,94.93a62.83,62.83,0,0,1,1.66-11.09L3.42,76.07A97.32,97.32,0,0,0,.87,92.25Z" transform="translate(-0.61)"/>
                <path className="cls-1" d="M165.11,117a61.12,61.12,0,0,1-3.7,10.19L190.47,140a98.78,98.78,0,0,0,5.48-15.29Z" transform="translate(-0.61)"/>
                <path className="cls-1" d="M199.13,94L167.4,96.33c0,1,.13,2,0.13,3.06a56.13,56.13,0,0,1-.38,6.63l31.73,2.68c0.25-3.06.51-6.12,0.51-9.3C199.26,97.6,199.26,95.82,199.13,94Z" transform="translate(-0.61)"/>
                <path className="cls-1" d="M167,107.29a82.22,82.22,0,0,1-1.53,8.41l30.84,7.9A98.52,98.52,0,0,0,198.75,110Z" transform="translate(-0.61)"/>
                <path className="cls-1" d="M160.91,128.31a61.47,61.47,0,0,1-4.46,8l26.76,17.2a105.78,105.78,0,0,0,6.88-12.36Z" transform="translate(-0.61)"/>
                <path className="cls-1" d="M142.18,46.76a73.45,73.45,0,0,1,7.9,7.52l23.44-21.53a122,122,0,0,0-11.85-11.09Z" transform="translate(-0.61)"/>
                <path className="cls-1" d="M148.42,146.28a58.59,58.59,0,0,1-6.63,6l19.75,25a117.64,117.64,0,0,0,10.19-9.3Z" transform="translate(-0.61)"/>
                <path className="cls-1" d="M110.19,166.15a67.36,67.36,0,0,1-10.19.76H99.87v31.85H100a92.25,92.25,0,0,0,15.8-1.27Z" transform="translate(-0.61)"/>
                <path className="cls-1" d="M182.57,154.56l-26.76-17.2a76.55,76.55,0,0,1-6.37,8l23.44,21.53A103.62,103.62,0,0,0,182.57,154.56Z" transform="translate(-0.61)"/>
                <path className="cls-1" d="M196.33,75.43l-30.84,8.28a67.6,67.6,0,0,1,1.66,11.34l31.73-2.29A86.14,86.14,0,0,0,196.33,75.43Z" transform="translate(-0.61)"/>
                <path className="cls-1" d="M99.87,31.85h0a61.11,61.11,0,0,1,10.83.89l5.1-31.47A93.3,93.3,0,0,0,100,0H99.87V31.85Z" transform="translate(-0.61)"/>
                <path className="cls-1" d="M157.72,64.47a81.8,81.8,0,0,1,4.2,8.15l29.05-13a112.37,112.37,0,0,0-6.5-12.23Z" transform="translate(-0.61)"/>
                <path className="cls-1" d="M147.91,12.36l-15.16,28A60.33,60.33,0,0,1,141.16,46l19.5-25.23A122.29,122.29,0,0,0,147.91,12.36Z" transform="translate(-0.61)"/>
                <path className="cls-1" d="M151,55.17a64,64,0,0,1,6,8.15l26.76-17.2a101.54,101.54,0,0,0-9.43-12.61Z" transform="translate(-0.61)"/>
                <path className="cls-1" d="M162.43,73.78a69.29,69.29,0,0,1,2.93,8.66l30.71-8.28a120.23,120.23,0,0,0-4.59-13.51Z" transform="translate(-0.61)"/>
                <path className="cls-1" d="M140.77,153a73.18,73.18,0,0,1-8.41,5.48l15.16,28A110.19,110.19,0,0,0,160.65,178Z" transform="translate(-0.61)"/>
                <path className="cls-1" d="M132.11,193.42l-10.32-30.07A69.72,69.72,0,0,1,111.34,166l5.61,31.34A114.92,114.92,0,0,0,132.11,193.42Z" transform="translate(-0.61)"/>
                <path className="cls-1" d="M131.22,159.15a60.61,60.61,0,0,1-8.28,3.7l10.32,30.07a108.5,108.5,0,0,0,13-5.73Z" transform="translate(-0.61)"/>
                <path className="cls-1" d="M111.85,33a76.67,76.67,0,0,1,9.3,2.42l10.32-30.2a113.65,113.65,0,0,0-14.4-3.7Z" transform="translate(-0.61)"/>
                <path className="cls-1" d="M122.43,35.68a74.28,74.28,0,0,1,9.17,4.08l15.16-28a101.16,101.16,0,0,0-14.14-6.24Z" transform="translate(-0.61)"/>
                </svg>
            </PieWrapper>
        </MainWrapper>
    )
}

export default UltMeter;

const MainWrapper = styled(({...props})=><div {...props}/>)`
    {
        position: relative;
        z-index: 6;
        color: white;
        width: 670px;
        height: 370px;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: center;
    }
`

const PieWrapper = styled.div`
    & > .ring-color{
        fill: ${props=>props.color}
    }
    & > circle {
        stroke: ${props=>props.color} !important;
    }
`