import DatePicker from 'react-datepicker';
import styled, {css} from 'styled-components';
import 'react-datepicker/dist/react-datepicker.css';
import $ from 'jquery';
import { useState, forwardRef, useEffect } from 'react';
import { getLocalJson } from './api';

// react-datepicker, 
const RadioButton = ({value, name, text}) => {
    return (
        <>
            <input type="radio" value={value} name={name} id={value}></input>
            <label htmlFor={value}>{text}</label>
        </>
    );
}

const CustomDatePicker = styled.div(
    css`
      .custom-day {
        width: 28px;
        height: 28px;
        text-align: center;
      }
      .gray-day {
        color: #aba8b9;
      }
      .selected-day {
        background: #1DDB16;
        border-radius: 50%;
        font-weight: 700;
      }
    `
);

const DateInput = {
    width: '240px',
    padding: '10px 0px',
    background: 'white',
    border: '1px solid gray',
    borderRadius: '10px'
};

const DatePickerInput = forwardRef(({value, onClick}, ref) => (
    <button style={DateInput} onClick={onClick} ref={ref}>{value}</button>
));

const DropDown = styled(
    css`

    `
)
const DropDownList = () => {
    const [list, setList] = useState({});
    const [select, setSelect] = useState({"title": "선택하기", "value": ""});

    useEffect(() => {
        const getList = async () => {
            const result = await getLocalJson('./sample.json', 'source');
            setList(result);
        }

        getList();
    }, []);

    return (
        <DropDown>
            <ul>{select['title']}
                {Object.keys(list).map((key) => {
                    const item = list[key];
                    return <li key={item['content']} onClick={() => setSelect(item)}>{item['title']}</li>
                })}
            </ul>
        </DropDown>
    )
}

const UploadGallery = () => {
    const [selectDate, setSelectDate] = useState(new Date());
    const [month, setMonth] = useState(new Date().getMonth());

    const handleMonthChange = (date) => {
        setMonth(date.getMonth());
    };
    
    return (
        <>
            <div>
                <p>업로드 일자</p>
                <CustomDatePicker>
                <DatePicker
                    selected={selectDate} 
                    onChange={(date) => setSelectDate(date)} 
                    dateFormat='yyyy-MM-dd' 
                    customInput={<DatePickerInput />}
                    onMonthChange={handleMonthChange}
                    dayClassName={(d) =>
                        d.getDate() === selectDate.getDate()
                        ? 'custom-day selected-day'
                        : d.getMonth() === month
                        ? 'custom-day'
                        : 'custom-day gray-day'
                    } ></DatePicker>
                </CustomDatePicker>
            </div>
            <div>
                <p>대상</p>
                <RadioButton type="radio" value='common' name="target" text='공동'></RadioButton>
                <RadioButton type="radio" value='joowan' name="target" text='차주완'></RadioButton>
                <RadioButton type="radio" value='taebin' name="target" text='이태빈'></RadioButton>
            </div>
            <div>
                <p>출처</p>
                <DropDownList></DropDownList>
            </div>
        </>
    )
}

export default UploadGallery;