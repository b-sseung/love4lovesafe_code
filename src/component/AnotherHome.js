import { BiPause, BiSkipPrevious, BiSkipNext, BiSolidHeartCircle, BiSolidHeart } from "react-icons/bi";
import styled, { css } from "styled-components";

const flexRow = css`
    display: flex;
    flex-direction: row;
`

const flexCol = css`
    display: flex;
    flex-direction: column;
`

const ParentBox = styled.div(
    flexCol,
    css`
        align-items: center;
        height: 100vh;

        overflow-x: hidden;
    `
)
const ColumnBox = styled.div(
    flexCol,
    css`
        align-items: center;

        font-family: "Gothic A1", sans-serif;
        font-style: normal;

        justify-content: center;

        p {
            margin: 0;
        }
    `
)

const IconBox = styled.div(
    flexRow,
    css`
        align-items: center;
        margin-bottom: 20px;
    `
)

const Pause = styled(BiPause)`
    border: 2px solid black;
    border-radius: 50px;
    width: 2.5em;
    height: 2.5em;

    margin: 0 30px;
`;

const PlayBox = styled.div(
    flexRow,
    css`
        width: min(500px, 90vw);

        align-items: center;

        p {
            margin: 0;
        }
    `
)

const PlayBar = styled.div(
    css`
        height:3px;
        background: black;
        border-radius: 100px;
        margin: 0 10px;
    `
)

const PlayCircle = styled(BiSolidHeartCircle)
    `
        width: 25px;
        height: 25px;
        background: white;
        top: -11px;
        left: 25%;
        color: red;
        position: absolute;
    `
;

const AnotherHome = () => {
    const today = new Date();
    const debut = new Date('2021-11-24');
    let diff = Math.abs(today.getTime() - debut.getTime());
    diff = Math.ceil(diff / (1000 * 60 * 60 * 24));

    return (
        <ParentBox>
            <ColumnBox style={{height: '100px'}}>
                <p style={{fontFamily: 'Black Han Sans', fontSize: '25px'}}>{diff}일 째 사랑하는 중</p>
                <p style={{fontSize: '13px'}}>차주완  찻잔</p>
            </ColumnBox>
            <ColumnBox style={{ flexGrow: '1', width: '100%', position: 'relative'}}>
                <div style={{width:'90vw', flexGrow: '1', border:'1px solid black'}}>

                </div>
                <ColumnBox style={{height: '150px', marginBottom: '70px'}}>
                    <IconBox>
                        <BiSkipPrevious style={{width: '2.5em', height: '2.5em'}}></BiSkipPrevious>
                        <Pause></Pause>
                        <BiSkipNext style={{width: '2.5em', height: '2.5em'}}></BiSkipNext>
                    </IconBox>
                    <PlayBox>
                        <p>05:06</p>
                        <div style={{flexGrow: 1, position: 'relative'}}>
                            <PlayBar></PlayBar>
                            <PlayCircle></PlayCircle>
                        </div>
                        <p>19:99</p>
                    </PlayBox>
                </ColumnBox>
                <div style={{position: 'absolute', background: 'black', width: '100vw', height: '100%'}}></div>
            </ColumnBox>
        </ParentBox>
    )
}

export default AnotherHome;