import React from 'react';
import { DateRange } from 'react-date-range';
import locale from 'date-fns/locale/vi';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import styled from 'styled-components';
import { BOX_SHADOW } from '@/config/theme';
import { momentToStringDate } from '@/utils';
import TagResult from '@/components/TagResult';

const DatepickerFilter = () => {
    const [state, setState] = React.useState<any>([
        {
            startDate: new Date('2022-11-01'),
            endDate: new Date(),
            key: 'selection',
        },
    ]);
    return (
        <WrapperStyled>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <span style={{ paddingRight: '15px', fontWeight: 600 }}>Từ</span>{' '}
                <TagResult text={momentToStringDate(state[0].startDate)} color="#3D91FF" />
                <span style={{ padding: '0 15px', fontWeight: 600 }}>đến</span>{' '}
                <TagResult text={momentToStringDate(state[0].endDate)} color="#3D91FF" />
            </div>
            <DateRange
                fixedHeight
                className="home_picker"
                locale={locale}
                showDateDisplay={false}
                onChange={(item) => setState([item.selection])}
                moveRangeOnFirstSelection={false}
                ranges={state}
            />
        </WrapperStyled>
    );
};

const WrapperStyled = styled.div`
    border-radius: 16px;
    box-shadow: ${BOX_SHADOW};
    background-color: white;
    padding: 15px;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    flex-direction: column;
`;

export default DatepickerFilter;
