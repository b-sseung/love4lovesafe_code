import styled, { css } from 'styled-components';
import { flexRow } from '../css/common';

const LinkParent = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  justify-items: center;
  padding: 10px 70px;
  background-color: white;

  img {
    width: 30px;
    height: 30px;
  }
`;

const LinkItem = ({ baseUrl, src, text }) => {
  return <img alt={text} src={baseUrl + src}></img>;
};

const OfficialLink = () => {
  const iconUrl = './images/icons/';
  const iconList = {
    OTT: 'ott.png',
    유튜브: 'youtube.png',
    X: 'twitter.png',
    인스타그램: 'instagram.png',
    원작: 'ridi.jpg',
    // 포스타입: 'postype.png',
  };

  return (
    <LinkParent>
      {Object.keys(iconList).map((key, index) => {
        return <LinkItem key={index} text={key} src={iconList[key]} baseUrl={iconUrl}></LinkItem>;
      })}
    </LinkParent>
  );
};

export default OfficialLink;
