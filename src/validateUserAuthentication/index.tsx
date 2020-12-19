import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Alert, Spin } from 'antd';

import { getAccessTokenAndFetchUserDetails } from '../store/loginReducer/actions';
import { RootState } from '../store/rootReducer';
import { UserStateModel } from '../store/loginReducer/types';
import { routesMap } from '../constants';

const { buyer_ui, seller_ui } = routesMap;

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const ValidateUserAuthentication = (props: any) => {
    const { history } = props;
    const loginState: UserStateModel = useSelector((state: RootState) => state.loginUser);
    const { signInState, is_seller, is_buyer } = loginState;
    const dispatch = useDispatch();
    const query = useQuery();

    useEffect(() => {
        const accessCode = query.get('code') || '';
        dispatch(getAccessTokenAndFetchUserDetails(accessCode));
    }, []);

    useEffect(() => {
        if (signInState.isVerified) {
            if (is_seller) {
                history.push(seller_ui);
            } else if (is_buyer) {
                history.push(buyer_ui);
            }
        }
    }, [signInState.isVerified]);

    return (
        <Spin spinning={!signInState.hasError}>
            <Alert
                className="text-align-center"
                banner
                message={signInState.hasError ? signInState.msg : 'Please wait while we are validating the user'}
                description={signInState.hasError ? signInState.msg : 'Please wait while we are validating the user'}
                type={ signInState.hasError ? 'error' : 'info'}
            />
        </Spin>
    );
};

export default ValidateUserAuthentication;