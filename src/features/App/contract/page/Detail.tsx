import PrintButton from '@/components/Button/Print.Button';
import CardComponent from '@/components/CardComponent';
import CardContainer from '@/components/CardComponent/Card.Container';
import CardRow from '@/components/CardComponent/Card.Row';
import OrderPrint from '@/components/PrintTemplate/Order.print';
import TableComponent from '@/components/TableComponent';
import TagResult from '@/components/TagResult';
import TopBar from '@/components/TopBar';
import { ORDER_STATE, ORDER_STATUS, PAYMENTSTATUS } from '@/contants';
import Container from '@/layout/Container';
import { currencyFormat } from '@/utils';
import { Col, Row, Timeline } from 'antd';
import moment from 'moment';
import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import ReactToPrint from 'react-to-print';
import { OrderService } from '../service';

const OrderDetailPage = () => {
    // print
    const componentRef = React.useRef<any>();

    return <></>;
};

export default OrderDetailPage;
