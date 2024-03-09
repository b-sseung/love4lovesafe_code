import styled, { css } from 'styled-components';
const HeaderBody = styled.div(
  css`
    width: 100vw;
    height: 150px;
    background: gray;

    position: fixed;
  `
);

const Header = () => {
  return <HeaderBody></HeaderBody>;
};

export default Header;
