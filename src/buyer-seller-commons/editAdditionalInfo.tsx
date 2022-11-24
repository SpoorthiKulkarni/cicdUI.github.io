import React from 'react';
import { Button, Col, Form, Input, Modal, Row } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { ExclamationCircleOutlined } from '@ant-design/icons';

export const EditAdditionalInfo = (record: any, updateAdditionalDetails: any) => {
    const changedInfo = record;

    function onFinish(fieldsValue: any) {
        console.log('i am here');
        const additional_info = {
            moisture: fieldsValue.moisture,
            other_info: fieldsValue.other_info,
            packing_size: fieldsValue.packing_size,
            packing_type: fieldsValue.packing_type,
            fungus: fieldsValue.fungus,
        };
        changedInfo.additional_info['moisture'] = additional_info.moisture;
        changedInfo.additional_info['other_info'] = additional_info.other_info;
        changedInfo.additional_info['packing_size'] = additional_info.packing_size;
        changedInfo.additional_info['packing_type'] = additional_info.packing_type;
        changedInfo.additional_info['fungus'] = additional_info.fungus;
        updateAdditionalDetails(changedInfo);
        modal.destroy();
    }

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    const confirmationPopup = (fieldsValue: any) => {
        Modal.confirm({
            title: `Are you sure you want to change the additional info? You can do it only once.`,
            icon: <ExclamationCircleOutlined />,
            onOk() {
                onFinish(fieldsValue);
            },
            onCancel() {},
        });
    };

    const modal = Modal.info({
        visible: false,
        title: 'Specification',
        closable: true,
        okButtonProps: { style: { display: 'none' } },
        content: (
            <Row gutter={16}>
                <Col span={24}>
                    <Form onFinish={confirmationPopup} onFinishFailed={onFinishFailed}>
                        <Form.Item
                            labelCol={{ span: 10 }}
                            wrapperCol={{ span: 12 }}
                            labelAlign="left"
                            label="Moisture"
                            name="moisture"
                        >
                            <Input className="custom-input" placeholder="Moisture in %" />
                        </Form.Item>
                        <Form.Item
                            labelCol={{ span: 10 }}
                            wrapperCol={{ span: 12 }}
                            labelAlign="left"
                            label="Fungus"
                            name="fungus"
                        >
                            <Input className="custom-input" placeholder="Fungus in %" />
                        </Form.Item>
                        <Form.Item
                            labelCol={{ span: 10 }}
                            wrapperCol={{ span: 12 }}
                            labelAlign="left"
                            label="Packing Type"
                            name="packing_type"
                        >
                            <Input className="custom-input" placeholder="Packing type" />
                        </Form.Item>
                        <Form.Item
                            labelCol={{ span: 10 }}
                            wrapperCol={{ span: 12 }}
                            labelAlign="left"
                            label="Packing Size"
                            name="packing_size"
                        >
                            <Input className="custom-input" placeholder="Packing size in kg" />
                        </Form.Item>
                        <Form.Item
                            labelCol={{ span: 10 }}
                            wrapperCol={{ span: 12 }}
                            labelAlign="left"
                            label="Other Information"
                            name="other_info"
                        >
                            <TextArea className="custom-input" rows={4} />
                        </Form.Item>
                        <div className="additionalInfo-submit">
                            <Button
                                className = 'additional-info-button'
                                type="primary"
                                htmlType="submit"
                            >
                                Submit
                            </Button>
                        </div>
                    </Form>
                </Col>
            </Row>
        ),
        okText: 'Ok',
        icon: null,
    });
};