import React from 'react';
import {Teams, HeroSkins} from '../../../types';
import styled from 'styled-components';
import VideoWrapper from '../video-wrapper';

interface StateProps{
    team: Teams
}

const Symmetra = (props:StateProps) =>{
    const {team} = props;
    return(
        <SymmetraWrapper>
            {team === Teams.dynasty &&  <source src={`videos/${HeroSkins.dynastySymmetra}.mp4`} type="video/mp4"/>}
        </SymmetraWrapper>
    )
}

export default Symmetra;

const SymmetraWrapper = styled(VideoWrapper)`
    & {
        transform: scale(2.8);
        top: 58vh;
        left: -6vw;
    }
`