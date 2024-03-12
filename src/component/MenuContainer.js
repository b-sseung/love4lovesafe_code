import styled, { css } from 'styled-components';

// const MenuBox = styled.div(
//     css`
//         display: flex;
//         flex-direction: column;

//         ul, li {
//             list-style: none;
//             padding: 0;
//             margin: 0;
//         }

//         ul > li {
//             padding: 10px;
//             background: #ccc;
//         }

//         ul > li > ul {
//             margin-top: 10px;
//         }

//         ul > li > ul > li {
//             margin: 0 -10px -10px -10px;
//             padding-left: 20px;
//             background: white;
//         }
//     `
// );

const MenuBox = styled.div(
  css`
    z-index: 100;
    width: 100vw;
    height: 50px;
    background: #ccc;
    color: black;
    line-height: 50px;
    margin: 0 auto;
    text-align: center;

    display: flex;
    flex-direction: row;

    ul,
    li {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    ul {
      flex-basis: 0px;
      flex-grow: 1;
    }

    li > a {
      text-decoration: none;
      color: #333;
    }

    ul > li > ul {
      width: 100%;
      display: none;
    }

    ul > li:hover > ul {
      display: block;
      background: white;
    }

    ul > li > ul > li:has(+ li) {
      border-bottom: solid #00000022 1px;
    }
  `
);

const MenuParent = ({ text, sub }) => {
  return (
    <ul>
      <li style={{ fontSize: '15px' }}>
        {text}
        <MenuChild key={`${text}`} items={sub}></MenuChild>
      </li>
    </ul>
  );
};

const MenuChild = ({ items }) => {
  return (
    <ul>
      {Object.values(items).map((item, index) => {
        return (
          <li key={`${index}`} style={{ fontSize: '13px' }}>
            <a href={item['content']}>{item['name']}</a>
          </li>
        );
      })}
    </ul>
  );
};
const MenuContainer = () => {
  const list = {
    차주완: [
      { name: '인물소개', content: '/chajoowan' },
      { name: '인스타그램', content: '' },
    ],
    이태빈: [
      { name: '인물소개', content: '/leetaebin' },
      { name: '인스타그램', content: '' },
      { name: '프롬', content: '' },
    ],
    웨이보: [
      { name: '주완&태빈_태그', content: '' },
      { name: '차주완_태그', content: '' },
      { name: '이태빈_공식', content: '' },
      { name: '이태빈_태그', content: '' },
    ],
    갤러리: [
      { name: '전체', content: '' },
      { name: '차주완', content: '' },
      { name: '이태빈', content: '' },
    ],
    // '연지구': ['좋아하는 대사'],
    // '드지구': ['좋아하는 장면'],
    미니게임: [{ name: '뱀 게임', content: '' }],
  };

  return (
    <MenuBox>
      {Object.keys(list).map((key) => {
        return <MenuParent key={key} text={key} sub={list[key]}></MenuParent>;
      })}
    </MenuBox>
  );
};

export default MenuContainer;
