import React, { useState, useEffect, useRef } from 'react';
import { getRange, isValidIPItemValue } from '../helper';
import '../style.css';

export interface IPInputProps {
  className?: string;
  defaultValue: string[];
  isError?: () => void;
  onChange?: (ip: string) => any;
}

const IPSegmentInput: React.FC<IPInputProps> = (props) => {
  const { defaultValue } = props;
  const [value, setValue] = useState(['', '', '', '']);
  const [value1, setValue1] = useState(['', '', '', '']);

  const inputRefs = Array.from({ length: 4 }, (a) => useRef(null));
  const inputRefs1 = Array.from({ length: 4 }, (a) => useRef(null));

  const className = ['react-ip-input', props.className].join(' ');

  useEffect(() => {
    setValue(defaultValue[0].split('.'));
    setValue1(defaultValue[1].split('.'));
  }, [defaultValue]);

  useEffect(() => {
    console.log(value);
    onPropsChange();
  }, [value, value1]);

  /**
   * 回调
   */
  const onPropsChange = () => {
    const ip = [value.join('.'), value1.join('.')];
    return props.onChange(ip.toString());
  };
  /**
   * 改变事件
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, i: number) => {
    let val: number = parseInt(e.target.value, 10);
    if (Number.isNaN(val) && e.target.value != '') {
      return e.preventDefault();
    }
    if (e.target.value !== '' && !isValidIPItemValue(val)) {
      val = 255;
    } else if (e.target.value == '') {
      val = 0;
    }
    value[i] = val.toString();
    let str = value.join('.');
    let arr = str.split('.');

    if (i < 3) {
      value1[i] = val.toString();
      let str1 = value1.join('.');
      let arr1 = str1.split('.');
      setValue1(arr1);
    }
    setValue(arr);

    if (!Number.isNaN(val) && String(val).length === 3 && i < 3) {
      inputRefs[i + 1].current?.focus();
    }
  };

  /**
   * 输入事件
   */
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, i: number) => {
    /* 37 = ←, 39 = →, 8 = backspace, 190 = . */
    let domId = i;
    if ((e.keyCode === 37 || e.keyCode === 8) && getRange(e.target).end === 0 && i > 0) {
      domId = i - 1;
    }
    if (e.keyCode === 39 && getRange(e.target).end === e.target.value.length && i < 3) {
      domId = i + 1;
    }
    if (e.keyCode === 190) {
      e.preventDefault();
      if (i < 3) {
        domId = i + 1;
      }
    }

    inputRefs[domId].current?.focus();
  };
  /**
   * 改变事件
   */
  const handleChange1 = (e: React.ChangeEvent<HTMLInputElement>, i: number) => {
    let val: number = parseInt(e.target.value, 10);
    if (Number.isNaN(val) && e.target.value != '') {
      return e.preventDefault();
    }
    if (e.target.value !== '' && !isValidIPItemValue(val)) {
      val = 255;
    } else if (e.target.value == '') {
      val = 0;
    }
    value1[i] = val.toString();
    let str = value1.join('.');
    let arr = str.split('.');

    setValue1(arr);

    if (!Number.isNaN(val) && String(val).length === 3 && i < 3) {
      inputRefs1[i + 1].current?.focus();
    }
  };

  /**
   * 输入事件
   */
  const handleKeyDown1 = (e: React.KeyboardEvent<HTMLInputElement>, i: number) => {
    /* 37 = ←, 39 = →, 8 = backspace, 190 = . */
    let domId = i;
    if ((e.keyCode === 37 || e.keyCode === 8) && getRange(e.target).end === 0 && i > 0) {
      domId = i - 1;
    }
    if (e.keyCode === 39 && getRange(e.target).end === e.target.value.length && i < 3) {
      domId = i + 1;
    }
    if (e.keyCode === 190) {
      e.preventDefault();
      if (i < 3) {
        domId = i + 1;
      }
    }

    inputRefs1[domId].current?.focus();
  };

  return (
    <div>
      <div className={className}>
        {value.map((val, i) => (
          <div className="react-ip-input__item" key={i}>
            <input
              ref={inputRefs[i]}
              type="text"
              value={Number.isNaN(val) ? '' : val}
              onChange={(e) => handleChange(e, i)}
              onKeyDown={(e) => handleKeyDown(e, i)}
            />
            {i !== 3 ? <i>.</i> : false}
          </div>
        ))}
      </div>
      <span>-</span>
      <div className={className}>
        {value1.map((val, i) => (
          <div className="react-ip-input__item" key={i + 3}>
            <input
              ref={inputRefs1[i]}
              type="text"
              disabled={i !== 3 ? true : false}
              value={Number.isNaN(val) ? '' : val}
              onChange={(e) => handleChange1(e, i)}
              onKeyDown={(e) => handleKeyDown1(e, i)}
            />
            {i !== 3 ? <i>.</i> : false}
          </div>
        ))}
      </div>
    </div>
  );
};
export default IPSegmentInput;
