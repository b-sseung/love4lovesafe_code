import styled, { css } from 'styled-components';
import Footer from './parts/Footer';
import Header from './parts/Header';

const MainContent = styled.div(
  css`
    background: red;
    width: 100vw;
    height: 100vh;
  `
);
const Main = () => {
  return (
    <>
      <Header></Header>
      <MainContent></MainContent>
      <Footer></Footer>
    </>
  );
};

export default Main;
