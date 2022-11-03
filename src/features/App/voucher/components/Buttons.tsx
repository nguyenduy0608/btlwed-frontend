import DeleteDescriptionButton from '@/components/Button/Delete.Description.Button';
import { routerPage } from '@/config/routes';
import { checkNowDate, Notification } from '@/utils';
import { CheckCircleOutlined, CloseCircleOutlined, EditOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import voucherService from '../service';
import { DataTypeVoucher } from './Voucher.Config';
interface IProps {
    record: DataTypeVoucher;
    // handleShowModal: (value: DataTypePotentialCustomers) => void;
    refetch: any;
}
const Buttons = (props: IProps) => {
    const { record, refetch } = props;
    console.log('🚀 ~ file: Buttons.tsx ~ line 18 ~ Buttons ~ record', record);
    const navigate = useNavigate();
    const handleLock = async (id: number) => {
        const res = await voucherService.lock(id);
        if (res.status) {
            refetch();
        }
    };
    const handleUnlock = async (id: number) => {
        const res = await voucherService.unlock(id);
        if (res.status) {
            refetch();
        }
    };
    const handleDelete = async (id: number) => {
        const res = await voucherService.delete(id);
        if (res.status) {
            Notification('success', 'Xóa thành công');
            refetch();
        }
    };

    return [
        record.status ? (
            <Button
                type="text"
                className="gx-mb-0"
                style={{
                    fontSize: '16px',
                    color: '#0090FF',
                }}
                onClick={() => handleLock(record.id)}
                disabled={checkNowDate(record.endTime) || record.remainQuota == 0}
            >
                <CheckCircleOutlined />
                Đang hoạt động
            </Button>
        ) : (
            <Button
                type="text"
                className="gx-mb-0"
                style={{
                    fontSize: '16px',
                    color: '#CC0000',
                }}
                onClick={() => handleUnlock(record.id)}
                disabled={checkNowDate(record.endTime) || record.remainQuota == 0}
            >
                <CloseCircleOutlined />
                Ngừng hoạt động
            </Button>
        ),

        <Button
            type="text"
            className="gx-mb-0"
            style={{
                fontSize: '16px',
                color: 'green',
            }}
            onClick={() => navigate(routerPage.voucherForm + '/' + record.id)}
        >
            <EditOutlined key="edit" />
            Chỉnh sửa
        </Button>,
        <DeleteDescriptionButton handleDelete={() => handleDelete(record.id)} />,
    ];
};

export default Buttons;
