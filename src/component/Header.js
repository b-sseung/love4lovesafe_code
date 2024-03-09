import styled, { css } from 'styled-components';
const HeaderBody = styled.div(
  css`
    width: 100%;
    height: 150px;
    background: white;
  `
);

const Header = () => {
  return <HeaderBody>Love for Love'Sake</HeaderBody>;
};

export default Header;
