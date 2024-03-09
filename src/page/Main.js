import styled, { css } from 'styled-components';
import { useEffect, useMemo, useState } from 'react';
import $ from 'jquery';
import Footer from '../component/Footer';
import Header from '../component/Header';
import OfficialLink from '../component/OfficialLink';
import { absoluteCenter, flexCol } from '../css/common';

const MainContent = styled.div(
  flexCol,
  css`
    width: 100%;
    height: 100%;
    position: relative;
  `
);

const BackImg = styled.img(
  css`
    height: 100%;
    width: 100%;
    position: absolute;
    opacity: 0.5;

    background: url(images/background-02.jpg) no-repeat center center/cover;
    filter: blur(6px);
  `
);

const FrontDiv = styled.div(
  absoluteCenter,
  flexCol,
  css`
    width: 100%;
    position: absolute;
  `
);

const FrontImg = styled.img(
  css`
    object-fit: scale-down;
    width: 100%;
  `
);

const Main = () => {
  const [ratio, setRatio] = useState('01');

  const delay = 100;
  let timer = null;

  let bgImgUrl = `./images/background-${ratio}.jpg`;

  useEffect(() => {
    getRatio();
  }, []);

  window.addEventListener('resize', () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      getRatio();
    }, delay);
  });

  const getRatio = () => {
    const root = $('#root');

    if (root.width() / root.height() >= 1.0) {
      setRatio('03');
    } else if (root.width() / root.height() >= 0.7) {
      setRatio('02');
    } else {
      setRatio('01');
    }
  };

  return (
    <>
      <Header></Header>
      <MainContent>
        <BackImg alt="" src={bgImgUrl}></BackImg>
        <FrontDiv>
          <FrontImg alt="" src={bgImgUrl}></FrontImg>
          <OfficialLink></OfficialLink>
        </FrontDiv>
      </MainContent>
      <Footer></Footer>
    </>
  );
};

export default Main;
