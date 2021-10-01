import React, { useEffect, useState } from 'react';
import { Modal, Space, Typography, Tag } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { WarningFilled } from '@ant-design/icons';
import { Link } from 'react-router-dom';

import MasterList from './masterListUpdate';

import DefaultBtn from '../../app-components/defaultBtn';
import { getMasterProduceList } from '../../store/buyerReducer/actions';
import { routesMap } from '../../constants';
import { RootState } from '../../store/rootReducer';

const { Paragraph, Text, Title } = Typography;

const AddProduceModal = (props: any) => {
    const { history } = props;
    const [modalVisible, setModalVisible] = useState(false);
    const [isActiveFlag, setIsActiveFlag] = useState("");
    const dispatch = useDispatch();
    const loginState = useSelector((state: RootState) => state.loginUser);
    const isApproved = (loginState.kyc_flag === "approved");
    

    useEffect(() => {
        dispatch(getMasterProduceList());
        
        if (loginState?.is_active != null){
            setIsActiveFlag (loginState?.is_active);
        }
    }, [loginState]);

    const userStatus = [
        {
            flag: "Active",
            title: "Active",
            backgroundColor: "#f2f2f2",
            color: "#12805C",
            icon: true
        },
        {
            flag: "Matches Blocked",
            title: "Matches Blocked",
            backgroundColor: "#ffc700",
            color: "black"
        },
        {
            flag: "Add Requirement Blocked",
            title: "Add Requirement Blocked",
            backgroundColor: "#red",
            color: "black"
        }
        
    ];

    const showKycRequiredModal = () => {
        Modal.info({
            className: "kyc-required-modal",
            content:
                <>
                    <Text>Please update your KYC information to update master list/ add interested</Text><br />
                    <Text>Profile &gt; KYC Information</Text>
                </>
            ,
            okText: 'Update Now',
            closable: true,
            onOk: () => history.push(routesMap.profile),
        });
    };

    return (
        <>
            <div id="buyer-ui-crops">
                {
                    userStatus.map((list) => {
                        return (isActiveFlag === list.flag) ?
                            <Tag color={list.backgroundColor} style={{ color: list.color, fontSize: "large", padding: "0.5em" }} >
                            {list.title} </Tag> :
                            <Tag style={{ display: 'none' }}></Tag>
                    })
                }
                <Title level={5}>Create/ Update Your Produce Master List</Title>
                <Paragraph>Add all the produce that you deal with into a master list for quick and easy selection when there a requirement to buy.</Paragraph>
                <DefaultBtn
                    className="add-produce-btn vikas-btn-radius"
                    onClick={() => {
                        if (isApproved) {
                            setModalVisible(true);
                        } else {
                            showKycRequiredModal();
                        }
                    }}
                    content="My Master List"
                />
                {!isApproved &&
                    <Space className="kyc-pending-message" direction="horizontal" >
                        <WarningFilled className="warning-icon" />
                        <Title level={5} className="kyc-pending-text">KYC Pending.</Title>
                        <Link to={routesMap.profile} className="update-text">Update Now</Link>
                    </Space>
                }
            </div>
            <Modal
                title={<Title level={3}>Produce Master List</Title>}
                visible={modalVisible}
                footer={null}
                maskClosable={false}
                className="custom-masterlist-modal"
                onCancel={() => setModalVisible(false)}
                width={'90%'}
                wrapClassName="add-produce-modal"
            >
                <MasterList setModalVisible={setModalVisible} />
            </Modal>
        </>
    );
};

export default AddProduceModal;
