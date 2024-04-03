import $ from 'jquery';
import styled, { css } from "styled-components";
import { useState, useRef } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

const flexRow = css`
    display: flex;
    flex-direction: row;
`

const flexCol = css`
    display: flex;
    flex-direction: column;
`

const UnderMenu = styled.div(
    flexCol,
    css`
        align-items: center;

        position: absolute;
        background: lightgray;

        
        border-radius: 20px 20px 0 0;

        width: 98vw;
        height: 100%;

        top: calc(100% - 70px);

        &.open {
            animation: open-animation 0.35s linear;
            animation-fill-mode: forwards;
        }

        &.close {
            animation: close-animation 0.35s linear;
            animation-fill-mode: forwards;
        }

        @keyframes open-animation {
            from {
                top: calc(100% - 70px);
            }
            to {
                top: 0;
            }
        }

        @keyframes close-animation {
            from {
                top: 0;
            }
            to {
                top: calc(100% - 70px);
            }
        }
    `
)

const MenuHeader = styled.div(
    flexRow,
    css`
        width: 100%;
        text-align: center;

        font-weight: bold;
        font-size: 15px;
        color: black;
        
        margin: 20px 0;
        div {
            cursor: pointer;
            flex-basis: 1px;
            flex-grow: 1;
        }
    `
)

const AnotherTransition = () => {
    const swiperRef = useRef(null); 
    const [menuOpen, setMenuOpen] = useState(null);
    const [menuIndex, setMenuIndex] = useState('');

    const onMenuClick = (index, e) => {
        $(e.target).parent().find('div').each((i, item) => {
            $(item).css('color', 'black');
        });

        if (!menuOpen) {
            setMenuOpen(!menuOpen);
            setMenuIndex(index);
            
            $(e.target).css('color', 'white');
            swiperRef.current.swiper.slideTo(index);
        } else {
            if (menuIndex === index) {
                setMenuOpen(!menuOpen);
            } else {
                setMenuIndex(index);
                $(e.target).css('color', 'white');
                swiperRef.current.swiper.slideTo(index);
            }
        }
    }

    const onSlideChange = (index, e) => {
        $(e).parent().find('div').each((i, item) => {
            $(item).css('color', 'black');
        });

        if (!menuOpen) {
            setMenuOpen(!menuOpen);
            setMenuIndex(index);
            
            $(e).css('color', 'white');
            swiperRef.current.swiper.slideTo(index);
        } else {
            if (menuIndex === index) {
                setMenuOpen(!menuOpen);
            } else {
                setMenuIndex(index);
                $(e).css('color', 'white');
                swiperRef.current.swiper.slideTo(index);
            }
        }
    }

    return (
        <UnderMenu className={menuOpen === null ? '' : menuOpen ? 'open' : 'close'}>
            <div style={{width: 'min(30vw, 150px)', height: '5px', borderRadius: '10px', background: 'gray', marginTop: '3px'}}></div>
            <MenuHeader>
                <div id='menu0' onClick={(e) => onMenuClick(0, e)}>다음 컨텐츠</div>
                <div id='menu1' onClick={(e) => onMenuClick(1, e)}>정보</div>
                <div id='menu2' onClick={(e) => onMenuClick(2, e)}>관련 컨텐츠</div>
            </MenuHeader>
            <Swiper
                style={{width: '100%', height: '100%'}}
                onSlideChange={(swiper) => onSlideChange(swiper.activeIndex, $('#menu'+ swiper.activeIndex))}
                ref={swiperRef}
                slidesPerView={1}>
                <SwiperSlide>
                    <div style={{width: '100%', height: '100%', background:'red'}}></div>
                </SwiperSlide>
                <SwiperSlide>
                    <div style={{width: '100%', height: '100%', background:'blue'}}></div>
                </SwiperSlide>
                <SwiperSlide>
                    <div style={{width: '100%', height: '100%', background:'yellow'}}></div>
                </SwiperSlide>
            </Swiper>
        </UnderMenu>
    )
}

export default AnotherTransition;