import React, { useState, useEffect } from 'react';
import {
    Checkbox,
    Col,
    Divider,
    Form,
    Input,
    Row,
    Select,
    Typography,
    Upload
} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { cloneDeep, isEmpty } from 'lodash';

import {
    confirmAccountValidator,
    customAadhaarValidator,
    customIfscValidator,
    customNameValidator,
    accountNumberValidator,
    customPANValidator,
    customPincodeValidator,
    generateFormData,
    customUpiValidator
} from './utils';
import RegisterConfirmation from './registerConfirmationModal';
import DocumentsUploadComponents from './formComponents/documentsUpload';
import RequestSubmittedPopup from './requestSubmittedPopup';

import { workingHours } from '../constants';

import Header from '../../header';
import { RootState } from '../../store/rootReducer';
import {
    resetOtpState,
    setRegisterMsg,
    setResgiterVerifiedFlag,
    submitRegister,
    updateForm
} from '../../store/registrationReducer/actions';
import { routesMap } from '../../constants';
import PrimaryBtn from '../../app-components/primaryBtn';
import DefaultBtn from '../../app-components/defaultBtn';
import CancelBtn from '../../app-components/cancelBtn';

const { home } = routesMap;
const { Option } = Select;
const { TextArea } = Input;
const { Text } = Typography;

const singleLabelFieldLayout = {
    labelCol: { span: 24 },
    wrapperCol: { span: 18 },
};

const getWorkingHoursOptions = () => {
    return (
        workingHours.map((curOption) => {
            const {name, label, disabled} = curOption;
            return (
                <Option disabled={disabled} value={name}>{label}</Option>
            );
        })
    );
};

const normFile = (e: any) => {
    console.log('Upload event:', e.fileList);
    if (Array.isArray(e)) {
        return e;
    }
    // return e && e.fileList.filter((file: any) => !!file.status);
    return e && e.fileList;
};

const Buyer = (props: any) => {
    const { history } = props;
    const [addressForPin, setAddressForPin] = useState({taluk: '', district: '', state: ''});
    const [registerFormValues, setRegisterFormValues] = useState({});
    const [showConfirmation, toggleShowConfirmation] = useState(false);
    const [showSubmitMsgPopup, toggleShowSubmitMsgPopup] = useState(false);
    const [workHoursDisbaled, toggleWorkHoursDisbaled] = useState({weekday: false, saturday: false, sunday: false} as any);
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const registrationState = useSelector((state: RootState) => state.registration);
    const { configs, entityType, formData, registerResponse, isProcessing } = registrationState;
    const { type, category } = formData;

    useEffect(() => {
        if(registerResponse.verified) {
            dispatch(setRegisterMsg(''));
            dispatch(setResgiterVerifiedFlag(false));
            toggleShowConfirmation(!showConfirmation);
            toggleShowSubmitMsgPopup(!showSubmitMsgPopup);
        }
    }, [registerResponse.verified]);

    const onConfirmRegister = () => {
        const registerDataPromise = generateFormData({
            formSubmitValues: cloneDeep(registerFormValues),
            userType: entityType,
            addressForPin
        });
        registerDataPromise.then((registerFromData) => {
            dispatch(updateForm(registerFormValues as any));
            dispatch(submitRegister(entityType, registerFromData));
        });
    };

    const onFinish = (values: any) => {
        console.log('Success:', values);
        setRegisterFormValues(values);
        toggleShowConfirmation(!showConfirmation);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    window.onbeforeunload = function () {
        return "The data will be lost on reload of page. Are you sure?" ;
    };

    const onChangeAllDay = (e: any, relatedEntity: string) => {
        const {checked} = e.target || {};
        if (checked) {
            form.setFieldsValue({[relatedEntity]: 'all_day'});
        } else {
            form.setFieldsValue({[relatedEntity]: '9am_to_5pm'});
        }
        const updatedWorkHoursStatus = {...workHoursDisbaled, [relatedEntity]: !workHoursDisbaled[relatedEntity]};

        toggleWorkHoursDisbaled(updatedWorkHoursStatus);
    };

    const checkIfDisabled = (fieldName: string) => workHoursDisbaled[fieldName];

    const onReset = () => {
        dispatch(resetOtpState());
        history.push(home);
    };

    return (
        <React.Fragment>
            <RegisterConfirmation
                registerResponse={registerResponse}
                showConfirmation={showConfirmation}
                onConfirmRegister={onConfirmRegister}
                toggleShowConfirmation={toggleShowConfirmation}
                isProcessing={isProcessing}
            />
            <RequestSubmittedPopup
                history={history}
                showSubmitMsgPopup={showSubmitMsgPopup}
            />
            <Header />
            <div className="entity-details-container">
                <h1>Buyer Profile Verification</h1>
                <Divider />
                <Form
                    labelAlign='left'
                    form={form}
                    colon={false}
                    scrollToFirstError
                    {...singleLabelFieldLayout}
                    name="basic"
                    initialValues={
                        {
                            ...formData,
                            saturday: '9am_to_5pm',
                            sunday: 'holiday',
                            weekday: '9am_to_9pm'
                        }
                    }
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Row gutter={16} justify="start">
                        <Col sm={24} md={24} lg={12}>
                            <Form.Item
                                labelAlign='left'
                                labelCol={{ span: 10 }}
                                wrapperCol={{ span: 12 }}
                                label="Buyer Type"
                                name="type"
                            >
                                <Input
                                    className="custom-input"
                                    bordered={false}
                                    disabled={true}
                                />
                            </Form.Item>
                            {
                                !isEmpty(category) ?
                                <Form.Item
                                    labelAlign="left"
                                    labelCol={{ span: 10 }}
                                    wrapperCol={{ span: 12 }}
                                    label="Category"
                                    name="category"
                                >
                                    <Input
                                        className="custom-input"
                                        bordered={false}
                                        disabled={true}
                                    />
                                </Form.Item> : null
                            }
                            <Form.Item
                                labelAlign='left'
                                labelCol={{ span: 10 }}
                                wrapperCol={{ span: 12 }}
                                label="Buyer Name"
                                name="name"
                            >
                                <Input
                                    className="custom-input"
                                    bordered={false}
                                    disabled={true}
                                />
                            </Form.Item>
                            <Form.Item
                                labelAlign='left'
                                labelCol={{ span: 10 }}
                                wrapperCol={{ span: 12 }}
                                label="Phone Number"
                                name="number"
                            >
                                <Input
                                    className="custom-input"
                                    bordered={false}
                                    disabled={true}
                                />
                            </Form.Item>
                            <Form.Item
                                labelAlign='left'
                                labelCol={{ span: 10 }}
                                wrapperCol={{ span: 12 }}
                                label="Email"
                                name="email"
                            >
                                <Input
                                    className="custom-input"
                                    bordered={false}
                                    disabled={true} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={16} justify="start">
                        <Col sm={24} md={24} lg={12}>
                        <DocumentsUploadComponents userType={entityType} subType={type} documents_list={configs} />

                        {/*  For Testing comment the above line and uncomment the below line *Individual* *Institution* */}
                        {/* <DocumentsUploadComponents userType={'Buyer'} subType={'Individual'} documents_list={configs} /> */}

                            <h2>Location Information</h2>
                            <div className='display-flex-row align-flex-end'>
                                <Form.Item
                                    label="Pin Code"
                                    name="zip"
                                    rules={[{
                                        required: true,
                                        validator: (rule, value) => customPincodeValidator(rule, value, setAddressForPin)
                                    }]}
                                >
                                    <Input className="custom-input" />
                                </Form.Item>
                                <p className='margin-b-2em'>{addressForPin.taluk} {addressForPin.district} {addressForPin.state}</p>
                            </div>
                            <Form.Item
                                label="Address"
                                name="address1"
                                rules={[{ required: true, message: 'Please input your Address!' }]}
                            >
                                <TextArea className="custom-input" />
                            </Form.Item>
                        </Col>
                    </Row>

                    <h2 className="required-form-field">Working Hours</h2>
                    <Row gutter={16} justify="start">
                        <Col sm={24} md={24} lg={12}>
                            <Form.Item
                                labelCol={{span: 6}}
                                wrapperCol={{span: 18}}
                                label="Monday to Friday"
                            >
                                <Form.Item
                                    wrapperCol={{span: 10}}
                                    noStyle
                                    name="weekday"
                                    rules={[{ required: true }]}
                                >
                                    <Select
                                        className="custom-select"
                                        disabled={checkIfDisabled('weekday')}
                                        style={{ width: '50%' }}
                                        placeholder="Please Select">
                                        { getWorkingHoursOptions() }
                                    </Select>
                                </Form.Item>
                                <Form.Item
                                    wrapperCol={{span: 10}}
                                    noStyle
                                    valuePropName='checked'
                                >
                                    <Checkbox
                                        className="custom-checkbox"
                                        onChange={(e) => onChangeAllDay(e, 'weekday')}
                                        style={{margin: "0 2em"}}
                                    >
                                        24 hours
                                    </Checkbox>
                                </Form.Item>
                            </Form.Item>

                            <Form.Item
                                labelCol={{span: 6}}
                                wrapperCol={{span: 18}}
                                label="Saturday"
                            >
                                <Form.Item
                                    wrapperCol={{span: 10}}
                                    noStyle
                                    name="saturday"
                                    rules={[{ required: true }]}
                                >
                                    <Select
                                        className="custom-select"
                                        disabled={checkIfDisabled('saturday')}
                                        style={{ width: '50%' }}
                                        placeholder="Please Select"
                                    >
                                        { getWorkingHoursOptions() }
                                    </Select>
                                </Form.Item>
                                <Form.Item
                                    wrapperCol={{span: 10}}
                                    noStyle
                                    valuePropName='checked'
                                >
                                    <Checkbox
                                        className="custom-checkbox"
                                        onChange={(e) => onChangeAllDay(e, 'saturday')}
                                        style={{margin: "0 2em"}}
                                    >
                                        24 hours
                                    </Checkbox>
                                </Form.Item>
                            </Form.Item>

                            <Form.Item
                                labelCol={{span: 6}}
                                wrapperCol={{span: 18}}
                                label="Sunday"
                            >
                                <Form.Item
                                    wrapperCol={{span: 10}}
                                    noStyle
                                    name="sunday"
                                    rules={[{ required: true }]}
                                >
                                    <Select
                                        disabled={checkIfDisabled('sunday')}
                                        style={{ width: '50%' }}
                                        placeholder="Please Select"
                                    >
                                        { getWorkingHoursOptions() }
                                    </Select>
                                </Form.Item>
                                <Form.Item
                                    wrapperCol={{span: 10}}
                                    noStyle
                                    valuePropName='checked'
                                >
                                    <Checkbox
                                        className="custom-checkbox"
                                        onChange={(e) => onChangeAllDay(e, 'sunday')}
                                        style={{margin: "0 2em"}}
                                    >
                                        24 hours
                                    </Checkbox>
                                </Form.Item>
                            </Form.Item>
                        </Col>
                    </Row>

                    <h2>Bank Account Information</h2>
                    <Row gutter={16} justify="start">
                        <Col sm={24} md={24} lg={12}>
                            <Row>
                                <Col span={12}>
                                    <Form.Item
                                        label="Account Holder Name"
                                        name="account_name"
                                    >
                                        <Input className="custom-input" />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item
                                        label="IFSC Code"
                                        name="ifsc_code"
                                    >
                                        <Input className="custom-input" style={{textTransform: "uppercase"}} />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item
                                        label="Account Number"
                                        name="account_number"
                                    >
                                        <Input className="custom-input" />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item
                                        label="Confirm Account Number"
                                        name="confirm_account_number"
                                    >
                                        <Input className="custom-input" />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Col>
                    </Row>

                    <Row gutter={16} justify="start">
                        <Col sm={24} md={24} lg={12}>
                            <Form.Item
                                labelCol={{span: 12}}
                                wrapperCol={{span: 8}}
                                name="bank_doc"
                                label="Upload Bank Passbook or Statement"
                                valuePropName="fileList"
                                getValueFromEvent={normFile}
                            >
                                <Upload
                                    accept="image/*"
                                    beforeUpload={(file) => {
                                        // const isRequiredFileType =
                                        //     file.type === 'image/jpeg' ||
                                        //     file.type === 'image/png';
                                        // if (!isRequiredFileType) {
                                        //     message.error(
                                        //         `${file.name} is not an Image file`,
                                        //     );
                                        // }
                                        // return isRequiredFileType;
                                        return false;
                                    }}
                                    name="logo"
                                    listType="text"
                                >
                                    <DefaultBtn
                                        icon={<UploadOutlined />}
                                        content="Upload Document"
                                    />
                                    <br/><Text className="font-size-small">Max file size: 1MB</Text>
                                </Upload>
                            </Form.Item>
                            <Form.Item
                                label="UPI ID"
                                name="upi_id"
                                rules={[{validator: (rule, value) => customUpiValidator(rule, value)}]}
                            >
                                <Input className="custom-input" />
                            </Form.Item>
                            <Form.Item
                                label="Additional Information"
                                name="additional_info"
                            >
                                <TextArea className="custom-input" />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={16} justify="start">
                        <Col sm={24} md={24} lg={12}>
                            <Form.Item
                                name="consent"
                                valuePropName="checked"
                                rules={[{ required: true, message: 'Please accept the terms and conditions!' }]}
                            >
                                <Checkbox className="custom-checkbox" >
                                    I certify that the information submitted above is true and correct to the best of my knowledge.
                                    I further understand that any false statements may result in denial or revocation of the services
                                </Checkbox>
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={16}>
                        <Col sm={24} md={24} lg={12}>
                            <Row gutter={32} justify='space-around'>
                                <Col span={8}>
                                    <Form.Item>
                                        <CancelBtn
                                            className="margin-l-r-1em width-full"
                                            onClick={onReset}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item>
                                        <PrimaryBtn
                                            className="margin-l-r-1em width-full"
                                            htmlType="submit"
                                            content="Submit"
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Form>
            </div>
        </React.Fragment>
    );
};

export default Buyer;
