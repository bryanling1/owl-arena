import React from 'react';
import {Teams, HeroSkins} from '../../../types';
import styled from 'styled-components';
import VideoWrapper from '../video-wrapper';

interface StateProps{
    team: Teams
}

const Zarya = (props:StateProps) =>{
    const {team} = props;
    return(
        <ZaryaWrapper >
            {team === Teams.dynasty &&  <source src={`videos/${HeroSkins.dynastyZarya}.mp4`} type="video/mp4"/>}
        </ZaryaWrapper>
    )
}

export default Zarya;

const ZaryaWrapper = styled(VideoWrapper)`
    & {
        transform: scale(2.5);
        top: 50vh;
        left: -5vw;
    }
`