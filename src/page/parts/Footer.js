import styled, { css } from 'styled-components';
const FooterBody = styled.div(
  css`
    width: 100vw;
    height: 100px;
    background: #00000033;
    position: fixed;
    bottom: 0;
  `
);

const Footer = () => {
  return <FooterBody></FooterBody>;
};

export default Footer;
