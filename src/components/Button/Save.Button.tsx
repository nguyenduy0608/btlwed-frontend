import { images } from '@/assets/imagesAssets';
import { Button } from 'antd';
import { ButtonHTMLType } from 'antd/lib/button/button';
import Lottie from 'lottie-react';

const SaveButton = ({ onClick, htmlType = 'button' }: { onClick?: () => void; htmlType?: ButtonHTMLType }) => {
    return (
        <Button
            htmlType={htmlType}
            type="primary"
            className="gx-mb-0"
            onClick={onClick && onClick}
            style={{ display: 'flex', alignItems: 'center' }}
            icon={
                <div style={{ height: '24px', width: '24px', marginRight: '10px' }}>
                    <Lottie animationData={images.add} loop={true} />
                </div>
            }
        >
            Lưu
        </Button>
    );
};

export default SaveButton;
