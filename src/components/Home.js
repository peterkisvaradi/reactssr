import React from 'react';
import { StyledDiv } from './Home.style.js';

const Home = (props) => {
    return <StyledDiv>HELLO {props.name} in SSR!</StyledDiv>;
};

export default Home;
