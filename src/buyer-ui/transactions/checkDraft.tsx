import React, { useState } from 'react';
import { Input, Button, Form, DatePicker, Typography } from 'antd';
import moment from 'moment';

import UploadBankDoc from './uploadBankDoc';

import { customIfscValidator, customNameValidator } from '../../login-ui/registration/utils';
import { cashAndCheckPayment } from '../../store/buyerReducer/actions';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/rootReducer';
import { parseIDfromHash } from '../../app-components/utils';

const { Text } = Typography;

const CheckDraft = (props: any) => {
    const [imageFile, setImageFile] = useState({});
    const [requiredDocument, setRequiredDocument] = useState(false);
    const { record, viewPaymentDetails, setPaymentDetails} = props;
    const loginState = useSelector((state: RootState) => state.loginUser);
    const buyerState = useSelector((state: RootState) => state.buyer);

    const dispatch = useDispatch()

    const [form] = Form.useForm();

    const transactionId = parseIDfromHash(props?.record?.key);
    const produce = props?.record?.produce;
    const quantity = props?.record?.buyer_quantity;

    const OnCheckDetailsSave = (values: any) => {
        const payload = {
            "userType": "buyer",
            "transactionId": `${transactionId}`,
            "produce": `${produce}`,
            "quantity": `${quantity}`,
            "userId": `${loginState.pk}`,
            "paymentType": "cheque",
            "Amount": `${buyerState.paymentAmount}`,
            "Cheque/Challan Number": `${values.ChequeChallanNumber}`,
            "Date": `${values.Date}`,
            "ifsc_code": `${values.ifsc_code}`,
            "BankDocument": imageFile,
            "BankName": `${values.BankName}`,
            "envType": process.env.REACT_APP_ENV
        }
        if (requiredDocument === true) {
            dispatch(cashAndCheckPayment(payload));
            form.resetFields();
            setPaymentDetails(!viewPaymentDetails);
        }
    }

    const cancelClick = () => {
        form.resetFields();
        setPaymentDetails(!viewPaymentDetails);
    }

    return (
        <div className="checkDraftSection">
            <Form
                form={form}
                labelCol={{ span: 10 }}
                wrapperCol={{ span: 10 }}
                colon={false}
                labelAlign='left'
                onFinish={OnCheckDetailsSave}
            >
                <Form.Item
                    className='payment-form-text'
                    name='ChequeChallanNumber'
                    label='Cheque/Challan No.'
                    rules={[
                        {
                            required: true,
                            message: 'please enter a valid Cheque/Challan Number ',
                        },
                    ]}>
                    <Input name='ChequeChallanNumber'
                    />
                </Form.Item>

                <Form.Item
                    className='payment-form-text'
                    name='BankName'
                    label='Bank Name'
                    rules={[{ required: true }, { validator: (rule, value) => customNameValidator(rule, value, 'Bank Name is Required') }]}
                >
                    <Input name='BankName' />
                </Form.Item>

                <Form.Item
                    className='payment-form-text'
                    label='IFSC Code'
                    name='ifsc_code'
                    rules={[{ required: true }, { validator: (rule, value) => customIfscValidator(rule, value) }]}
                >
                    <Input name='ifsc_code' style={{ textTransform: 'uppercase' }} />
                </Form.Item>

                <Form.Item name='Date' label='Date' className='payment-form-text'
                    rules={[
                        { required: true },
                    ]}>
                    <DatePicker
                        className="custom-input"
                        format="DD-MM-YYYY"
                        placeholder="DD-MM-YYYY"
                        disabledDate={(current) => {
                            return moment().add(-5, 'days') >= current ||
                                moment().add(1, 'days') <= current;
                        }}
                    />
                </Form.Item>

                <Form.Item name='Amount' label='Amount' className='payment-form-text'
                >
                    <Input name='amount' type='textarea' disabled={true} defaultValue={`₹ ${buyerState.paymentAmount}`} allowClear={false} />
                </Form.Item>

                <Form.Item name='BankDocument' label='Bank Document' className='doc-upload-required'>
                    <UploadBankDoc
                        name='bank_doc'
                        imageFile={imageFile}
                        setImageFile={setImageFile}
                        requiredDocument={requiredDocument}
                        setRequiredDocument={setRequiredDocument}
                    />
                    {requiredDocument ? "" : <Text style={{ color: 'red' }}>Document is Required</Text>}
                </Form.Item>
                <div className='other-btn-section'>
                    <Button className='other-btn-cancel' htmlType="button" onClick={cancelClick}>Cancel</Button>
                    <Button className='other-btn-save' htmlType='submit'>Save</Button>
                </div>
            </Form>
        </div>
    )
}

export default CheckDraft;
