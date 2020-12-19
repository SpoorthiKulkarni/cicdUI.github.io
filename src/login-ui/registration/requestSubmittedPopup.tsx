import React from 'react';
import { Col, Row, Modal } from 'antd';

import PrimaryBtn from '../../app-components/primaryBtn';

type propsModel = {
    showSubmitMsgPopup: boolean,
    history: any
}

const RequestSubmittedPopup = (props: propsModel) => {
    const {showSubmitMsgPopup, history} = props
    return (
        <>
            <Modal
                visible={showSubmitMsgPopup}
                centered
                title={null}
                footer={null}
                closable={false}
                maskClosable={false}
            >
                <p>Information submitted successfully</p>
                <p>Your profile will be verified by Vikasbandhu Please login to continue</p>
                <Row justify='end'>
                    <Col>
                        <PrimaryBtn
                            className='margin-l-r-1em'
                            onClick={() => history.push('/')}
                            content="Login"
                        />
                    </Col>
                </Row>
            </Modal>
        </>
    )
}

export default RequestSubmittedPopup;