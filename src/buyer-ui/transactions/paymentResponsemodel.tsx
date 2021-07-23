import React, { useEffect, useState } from 'react';
import  DefaultBtn  from '../../app-components/defaultBtn';
import { RootState } from '../../store/rootReducer';
import { useSelector } from 'react-redux';
import { Col, Input, Row, Space, Modal, Typography } from 'antd';
import { useDispatch } from 'react-redux';
import { getPaymentDetails } from '../../store/buyerReducer/actions';

const { Text, Title } = Typography;

const PaymentResponseModel = (transDetails: any) => {
    const [viewPaymenResponsetDetails, setPaymentResponseDetails] = useState(true);
    const closeModal = () => setPaymentResponseDetails(!viewPaymenResponsetDetails);
    const dispatch = useDispatch();
    const buyerState = useSelector((state: RootState) => state.buyer);
    const {paymentDetails } = buyerState; 
    
    //const {orderId, orderAmount, paymentMode, referenceId, txMsg, txStatus, txTime} =   paymentDetails;   
  
  useEffect(() => {
         dispatch(getPaymentDetails())
         console.log("inside response page paymentdetails", buyerState)
    }, [paymentDetails]);  

    return (
        <>
             <Modal
                    visible={viewPaymenResponsetDetails}
                    title={<Title level={3}>Payment Response Details</Title>}
                    onCancel={closeModal}
                    footer = {null}
            >
            <Row>
                <Col sm={24} md={12}>
                    OrderID:
                </Col>
                <Col sm={24} md={12}>
                    : {paymentDetails[0]?.orderId}
                </Col>
            </Row>
            <Row>
                <Col sm={24} md={12}>
                    OrderAmount:
                </Col>
                <Col sm={24} md={12}>
                    : {paymentDetails[0]?.orderAmount}
                </Col>
            </Row>
            <Row>
                <Col sm={24} md={12}>
                    Reference ID:
                </Col>
                <Col sm={24} md={12}>
                    : {paymentDetails[0]?.referenceId}
                </Col>
            </Row>
            <Row>
                <Col sm={24} md={12}>
                    Transaction Status:
                </Col>
                <Col sm={24} md={12}>
                    : {paymentDetails[0]?.txStatus}
                </Col>
            </Row>
            <Row>
                <Col sm={24} md={12}>
                    Payment Mode:
                </Col>
                <Col sm={24} md={12}>
                    : {paymentDetails[0]?.paymentMode}
                </Col>
            </Row>
            <Row>
                <Col sm={24} md={12}>
                    Message:
                </Col>
                <Col sm={24} md={12}>
                    : {paymentDetails[0]?.txMsg}
                </Col>
            </Row>
            <Row>
                <Col sm={24} md={12}>
                    Transaction Time:
                </Col>
                <Col sm={24} md={12}>
                    : {paymentDetails[0]?.txTime}
                </Col>
            </Row>
            <Row>
                <DefaultBtn onClick={closeModal} content="ok" />
            </Row>
            </Modal> 
        </>
           
        );
     
};

export default PaymentResponseModel;