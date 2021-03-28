import React, { useEffect, useState } from 'react';
import { Table, Typography } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../store/rootReducer';
import { componentCallBacksModel, matchesColumns } from './matchesTable.model';
import ViewCropDetails from './viewCropDetails';
import { getMatchesForBuyerCrops, rejectMatches } from '../../store/buyerReducer/actions';
import { FullfillmentFlags, MatchRequirementModel } from '../../store/buyerReducer/types';

const { Title } = Typography;

const initialEmptyCropDetail = {
    fulfillment_flag: FullfillmentFlags.single_fulfillment,
    produce: '',
    seller_id: '',
    quantity: 0,
    location: '',
    buyer_id: '',
    buyer_crop_id: '',
    seller_quantity: 0,
    seller_remaining_quant: 0,
    buyer_remaining_quant: 0,
    seller_final_price: 0,
    price: 0,
    buyer_actual_quantity: 0
};

const processFullfillmentData = (allMatchesList: Array<any>) => {
    let allFullfilments: any = [];
    allMatchesList.map((buyerMatchEntry) => {
        const [currentBuyerMatchEntryPair]: Array<any> = Object.entries(buyerMatchEntry);
        const buyerMatchesData: Array<any> = currentBuyerMatchEntryPair[1];
        const genericData = buyerMatchesData[0];
        for(let i=1; i < buyerMatchesData.length; i++) {
            const fulfilmentData = {...buyerMatchesData[i], ...genericData};
            allFullfilments.push(fulfilmentData)
        }
    });
    return allFullfilments;
}

const MatchedSection = () => {
    const dispatch = useDispatch();
    const [openDetailsModal, setOpenDetailsModal] = useState(false);
    const [selectedCropDetails, setSelectedCropDetails] = useState(initialEmptyCropDetail);
    const [processedMatches, setProcessedMatches] = useState([]);
    const buyerState = useSelector((state: RootState) => state.buyer);

    const rejectTheMatch = (curMatchRecord: MatchRequirementModel) => {
        const {buyer_id, buyer_crop_id} = curMatchRecord;
        const rejectPayload = {buyer_id, buyer_crop_id: [buyer_crop_id]};
        dispatch(rejectMatches(rejectPayload));
    }

    const componentCallBacks: componentCallBacksModel = {
        showCropDetailsModal: setOpenDetailsModal,
        populateCropDetails: setSelectedCropDetails,
        rejectMatch: rejectTheMatch
    };
    

    useEffect(() => {
        dispatch(getMatchesForBuyerCrops())
    }, [])

    useEffect(() => {
        const processedData = processFullfillmentData(buyerState.matchesList)
        setProcessedMatches(processedData);
    }, [buyerState.matchesList])

    return (
        <div id="buyer-ui-matches">
            <Title level={2}>My Matches</Title>
            <Table
                loading={buyerState.isMatchesFetching}
                className="margin-t-1em"
                columns={matchesColumns(componentCallBacks)}
                dataSource={processedMatches}
            />
            <ViewCropDetails
                cropDetails={selectedCropDetails}
                openDetailsModal={openDetailsModal}
                setOpenDetailsModal={setOpenDetailsModal}
            />
        </div>
    );
};

export default MatchedSection;
