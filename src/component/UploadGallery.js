import DatePicker from 'react-datepicker';
import styled, {css} from 'styled-components';
import 'react-datepicker/dist/react-datepicker.css';
import $ from 'jquery';
import { useState, forwardRef, useEffect, useReducer } from 'react';
import { getLocalJson } from './api';

// react-datepicker, 

const uploadFileForm = (state, action) => {
    state = {...state, [action.type]: action.value};
    console.log(state);
    return state;
}

const RadioButton = ({value, name, text, onChange}) => {
    return (
        <>
            <input type="radio" value={value} name={name} id={value} onChange={()=>onChange('target', value)}></input>
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

const SelectBox = ({name, onChange}) => {
    const [list, setList] = useState({});

    useEffect(() => {
        const getList = async () => {
            const result = await getLocalJson('./sample.json', 'source');
            setList(result);
        }
        getList();
    }, []);

    const onChangeValue = (e) => {
        onChange('source', $(`select[name=${name}] option:selected`).val());
    }

    return (
        <select name={name} onChange={(e) => onChangeValue(e)}>
            <option key='none' value=''>선택하기</option>
            {Object.keys(list).map((key) => {
                const item = list[key];
                return (
                    <option key={item['content']} value={item['content']}>{item['title']}</option>
                )
            })}
        </select>
    )
}

const UploadGallery = () => {
    const [initState, dispatch] = useReducer(uploadFileForm, 
            {"date": "", "target": "", "file_data": "", "file_extension": "", 
            "source": "", "source_url": "", "source_account": ""});

    const [selectDate, setSelectDate] = useState(new Date());
    const [month, setMonth] = useState(new Date().getMonth());

    const handleMonthChange = (date) => {
        setMonth(date.getMonth());
    };

    const changeState = (type, value) => {
        dispatch({"type": type, "value": value});
    }
    const onLoadFile = (e) => {
        const files = e.target.files;
        console.log(files);

        files.map(file => {
            let fileReader = new FileReader();
            fileReader.onload = () => {
                console.log(fileReader.result);
            fileReader.readAsDataURL(file);
        }

        });
    }

    return (
        <>
            <div>
                <p>업로드 일자</p>
                <CustomDatePicker>
                <DatePicker
                    selected={selectDate} 
                    onChange={(date) => {changeState('date', date); setSelectDate(date);}} 
                    dateFormat='yyyy-MM-dd' 
                    customInput={<DatePickerInput />}
                    onMonthChange={handleMonthChange}
                    dayClassName={(d) =>
                        d.getMonth() === month
                        ? d.getDate() === selectDate.getDate()
                            && d.getMonth() === selectDate.getMonth()
                            ? 'custom-day selected-day'
                            : 'custom-day'
                        : 'custom-day gray-day'
                    } ></DatePicker>
                </CustomDatePicker>
            </div>
            <div>
                <p>대상</p>
                <RadioButton value='common' name="target" text='공동' onChange={changeState}></RadioButton>
                <RadioButton value='joowan' name="target" text='차주완' onChange={changeState}></RadioButton>
                <RadioButton value='taebin' name="target" text='이태빈' onChange={changeState}></RadioButton>
            </div>
            <div>
                <p>출처</p>
                <SelectBox onChange={changeState} name='source'></SelectBox>
            </div>
            {(initState['source'] === 'instagram_story' || initState['source'] === 'instagram' || initState['source'] === 'twitter') && <div><p>출처 계정</p><input style={{width:'50%'}}></input></div>
            }
            {(initState['source'] === 'weibo' || initState['source'] === 'etd' || initState['source'] === 'twitter')
                && <div><p>출처 URL</p><input style={{width:'100%'}}></input></div>}
            <div>
                <p>이미지</p>
                <label style={{cursor: 'pointer'}} htmlFor="image">이미지 선택하기</label>
                <input id='image' style={{display: 'none'}} type='file' onChange={onLoadFile} multiple></input>
            </div>
        </>
    )
}

export default UploadGallery;