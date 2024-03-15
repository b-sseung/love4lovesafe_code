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
            <input type="radio" value={value} name={name} id={value} onChange={()=>onChange(name, value)}></input>
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

const ImageView = ({url}) => {
    return <div>{url}</div>;
}

const UploadGallery = () => {
    const [initState, dispatch] = useReducer(uploadFileForm, 
            {"date": "", "target": "", "file_data": "", "file_extension": "", 
            "source": "", "source_url": "", "source_account": "", "type": ""});

    const [selectDate, setSelectDate] = useState(new Date());
    const [month, setMonth] = useState(new Date().getMonth());

    const handleMonthChange = (date) => {
        setMonth(date.getMonth());
    };

    const changeState = (type, value) => {
        dispatch({"type": type, "value": value});
    }
    const onLoadFile = (e) => {
        const extensions = new Array();
        const files = new Array();
        const viewer = $('#ImageViewer');
        viewer.innerHTML = '';

        let fileList = e.target.files;
        changeState('file_data', Array.from(fileList));

        for (let i = 0; i < fileList.length; i++) {
            console.log(fileList[i]);
            extensions.push(fileList[i]['type']);
    
            let fileReader = new FileReader();
            fileReader.onload = () => {
                const result = fileReader.result;
                files.push(result);
                viewer.append(<ImageView url={result}></ImageView>);
            }
            
            fileReader.readAsDataURL(fileList[i]);
        }

        changeState('file_extension', extensions);
    }

    const onSubmit = () => {
        console.log(initState);
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
                <p>종류</p>
                <RadioButton value='image' name="type" text='이미지' onChange={changeState}></RadioButton>
                <RadioButton value='video' name="type" text='영상' onChange={changeState}></RadioButton>
            </div>
            <div>
                <p>출처</p>
                <SelectBox onChange={changeState} name='source'></SelectBox>
            </div>
            {initState['source'] !== ''
                 && <div><p>출처 계정</p><input style={{width:'50%'}}></input></div>
            }
            {initState['source'] !== ''
                && <div><p>출처 URL</p><input style={{width:'100%'}}></input></div>}
            {initState['type'] !== '' &&
                <div>
                    <p>{initState['type'] === 'image' ? '이미지' : '썸네일'}</p>
                    <label style={{cursor: 'pointer'}} htmlFor="fileImage">선택하기</label>
                    <input id='fileImage' style={{display: 'none'}} type='file' onChange={onLoadFile} multiple></input>
                </div>
            }
            <div id="ImageViewer"></div>
            <button onClick={onSubmit}>등록하기</button>
        </>
    )
}

export default UploadGallery;