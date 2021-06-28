import React from 'react';
import { Alert, Button, Carousel, Image, Typography } from 'antd';
import { Trans, useTranslation } from 'react-i18next'

import Logo from '../static/assets/vbLogo.png';
import KannadaLogo from '../static/assets/kannadaLogo.png'
import VBOne from '../static/assets/Vikasbandhu_One.jpg';
import VBTwo from '../static/assets/Vikasbandhu_Two.jpg';
import VBThree from '../static/assets/Vikasbandhu_Three.jpg';
import VBFour from '../static/assets/Vikasbandhu_Four.jpg';
import VBFive from '../static/assets/Vikasbandhu_Five.jpg';
import { englishStyling, isEnglish, kannadaStyling } from '../static/translations/constants';

const { Text, Title } = Typography;

const Home = () => {
    const [ t,i18n ]=useTranslation('common');
    const customStyles = isEnglish(t("language")) ? englishStyling : kannadaStyling;
    const logo =  isEnglish(t("language")) ? Logo : KannadaLogo;

    const goToAim = (url: any) => {
        window.location = url;
    };

    return (
        <div id="home">
            <div className="home-content-wrapper">
                <Alert
                    className="animate-alert"
                    message={
                        <Trans
                            i18nKey="home_page.flash_text"
                            components={{ italic: <i />, bold: <strong /> }}
                        />
                    }
                    banner
                />
                <Carousel className="home-carousel" autoplay autoplaySpeed={5000}>
                    <Image height={"87vh"} src={VBOne} preview={false} />
                    <Image height={"87vh"} src={VBTwo} preview={false} />
                    <Image height={"87vh"} src={VBThree} preview={false} />
                    <Image height={"87vh"} src={VBFour} preview={false} />
                    <Image height={"87vh"} src={VBFive} preview={false} />
                </Carousel>
                <div className="mobile-home-content">
                    <Title className="col-white home-title" level={1}>
                        {t('title')}
                    </Title>
                    <Text className="col-white home-text">{t('home_page.mobile_home_text')}</Text>
                    <br/>
                    <Button className="explore-vb-btn" onClick={() => goToAim("#aim")}>
                        <Title className="col-white margin-none" level={5}>
                           {t('landing_page.actions.explore')}
                        </Title>
                    </Button>
                </div>
                <div className={customStyles.homeContent}>
                    <Image className="logo" height={100} width={100} src={logo} preview={false} />
                    <div className="home-paragraph">
                        <Title className="col-white" level={4}>
                            {t('title')} -
                        </Title>
                        <Title className="col-white margin-none" level={5}>
                            {t('home_page.text_1')}
                        </Title>
                        <Title className="col-white margin-none" level={5}>
                            {t('home_page.text_2')}
                        </Title>
                        <Title className="col-white margin-none" level={5}>
                            {t('home_page.text_3')}
                        </Title>
                        <Title className="col-white margin-none" level={5}>
                            {t('home_page.text_4')}
                        </Title>
                    </div>
                    <Button className="explore-vb-btn" onClick={() => goToAim("#aim")}>
                        <Title className="col-white margin-none" level={5}>
                           {t('landing_page.actions.explore')}
                        </Title>
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Home;
