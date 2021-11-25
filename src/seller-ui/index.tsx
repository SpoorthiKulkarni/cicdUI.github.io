import React from 'react';
import { Divider, Typography } from 'antd';

import CropsSection from './crops';
// import DashboardSection from './dashboard';
import MatchedSection from './matches';
import './seller.scss';

import Header from '../header';
import Footer from '../footer';

import SellerBanner from '../static/assets/sellerBanner.png';
import WelcomeModal from '../app-components/welcomeModal';
import ReviewsSection from '../buyer-seller-commons/reviews';
import Transaction from '../buyer-seller-commons/transactions';

const { Title } = Typography;

const SellerUi = (props: any) => {
    const { history } = props;

    return (
        <div className='seller-ui-app'>
            <Header history={history} showActions isLoggedIn />
            <div className='seller-ui-dashboard'>
                {/* <DashboardSection /> */}
                <WelcomeModal />
                <Title level={2}>My Dashboard</Title>
                <img className='seller-banner' src={SellerBanner} alt='seller-banner' />
                <Divider />
                <CropsSection history={history} />
                <Divider />
                <MatchedSection />
                <Divider />
                <Transaction />
                <Divider />
                <ReviewsSection />
            </div>
            <Footer />
        </div>
    );
};

export default SellerUi;
