import { DatePicker } from 'antd';
import React from 'react';
const { RangePicker } = DatePicker;
const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];
const dateFormat = 'DD/MM/YYYY';

const RangerPicker = ({ name, onChange }: { name: string; onChange: any }) => {
    return (
        <RangePicker
            onChange={(date: any, dateStrings: string[]) => {
                return onChange(
                    name,
                    date
                        ? `${dateStrings[0].split('/').reverse().join('-')},${dateStrings[1]
                              .split('/')
                              .reverse()
                              .join('-')}`
                        : ''
                );
            }}
            placeholder={['Từ ngày', 'Đến ngày']}
            defaultValue={null}
            format={dateFormat}
        />
    );
};

export default React.memo(RangerPicker);
