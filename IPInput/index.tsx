import React, { useState, useEffect, useRef } from 'react';
import { getRange, isValidIPItemValue } from '../helper';
import '../style.css';

export interface IPInputProps {
  className?: string;
  defaultValue: string;
  isError?: () => void;
  onChange?: (ip: string) => any;
}

const IPInput: React.FC<IPInputProps> = (props) => {
  const { defaultValue } = props;
  const [value, setValue] = useState(['', '', '', '']);

  const inputRefs = Array.from({ length: 4 }, (a) => useRef(null));
  const className = ['react-ip-input', props.className].join(' ');

  useEffect(() => {
    if (!Array.isArray(defaultValue)) {
      setValue(defaultValue.split('.'));
    }
  }, [defaultValue]);
  useEffect(() => {
    console.log(value);
    onPropsChange();
  }, [value]);
  /**
   * 回调
   */
  const onPropsChange = () => {
    const ip = value.join('.');
    return props.onChange(ip);
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

  return (
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
  );
};
export default IPInput;
