import CardComponent from '@/components/CardComponent';
import TableComponent from '@/components/TableComponent';
import TopBar from '@/components/TopBar';
import { routerPage } from '@/config/routes';
import { PADDING } from '@/config/theme';
import Container from '@/layout/Container';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Description from '../components/Description';
import Filter from '../components/Filter';
import { columnsVoucher, dataSourceVoucher } from '../components/Voucher.Config';
const VoucherPage = () => {
    const navigate = useNavigate();

    const rowRender = (record: any, index: number, indent: number, expanded: any) => {
        const row = document.querySelector(`[data-row-key="${record.id}"]`);
        if (expanded) {
            row?.classList.add('rowTableSelect');
        } else {
            row?.classList.remove('rowTableSelect');
        }

        return <Description />;
    };

    return (
        <>
            <TopBar
                title="Quản lý voucher"
                extra={
                    <Button onClick={() => navigate(routerPage.voucherForm)} className="gx-mb-0" type="primary">
                        Thêm mới
                    </Button>
                }
            />
            <Container>
                <CardComponent title="" extra={[<Filter />]}>
                    <TableComponent
                        page={1}
                        rowSelect={false}
                        onChangePage={(_page) => console.log(_page)}
                        expandedRowRender={rowRender}
                        columns={columnsVoucher}
                        dataSource={dataSourceVoucher}
                        total={dataSourceVoucher.length}
                    />
                </CardComponent>
            </Container>
        </>
    );
};

export default VoucherPage;
