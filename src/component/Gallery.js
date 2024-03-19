import { useState } from "react";
import styled, {css} from "styled-components";
import { BiTable, BiCalendar } from "react-icons/bi";

const Gallery = () => {
    const [mode, setMode] = useState('calendar');
    const CheckBox = ({value, text}) => {
        return (
            <>
                <input type="checkbox" value={value} id={value}></input>
                <label htmlFor={value}>{text}</label>
            </>
        );
    }

    const iconStyle = {
        cursor: 'pointer',
        padding: '5px'
    }

    return (
        <>
            <div>
                <CheckBox value="common" text="전체"></CheckBox>
                <CheckBox value="joowan" text="차주완"></CheckBox>
                <CheckBox value="taebin" text="이태빈"></CheckBox>
            </div>
            <div>
                <p>상세검색</p>
            </div>
            <div>
                <BiCalendar style={iconStyle} enableBackground="black" size='25' color={mode === 'calendar' ? 'black' : 'lightgray'} onClick={() => setMode('calendar')}></BiCalendar>
                <BiTable style={iconStyle} size='25' color={mode === 'table' ? 'black' : 'lightgray'} onClick={() => setMode('table')}></BiTable>
            </div>
        </>
    )
    
}

export default Gallery;