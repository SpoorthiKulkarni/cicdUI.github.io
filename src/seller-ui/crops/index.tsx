import React, { useEffect, useState } from 'react';
import { Table, Typography } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/rootReducer';
import { cropColumns } from './cropsTable.model';
import './crops.scss';
import AddCropModal from './AddCrop';
import { deleteSelectedCrop, getAllCropsList, sellerIntentToSell, updateCropData } from '../../store/sellerReducer/actions';
import { CropApiModel, SellerStateModel } from '../../store/sellerReducer/types';
import PrimaryBtn from '../../app-components/primaryBtn';
import { EditableCell, EditableRow } from './AddCrop/customTableComponents';

const { Title } = Typography;

const getCropId = (cropID: string) => {
    const indexOfHash = cropID.indexOf('#');
    const actualCropID = indexOfHash > 0 ? cropID.substr(indexOfHash+1) : '';
    return actualCropID;
}

const CropsSection = () => {
    const sellerState: SellerStateModel = useSelector((state: RootState) => state.seller);
    const [isEdit, setIsEdit] = useState(false);
    const [currentCropId, setCurrentCropId] = useState('');
    const [currentProduceRecord, setCurrentProduceRecord] = useState({} as CropApiModel);
    const [modalVisible, setModalVisible] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllCropsList());
    }, [])

    const prepareForEditCrop = (cropData: CropApiModel) => {
        const {sk} = cropData;
        const actualCropID = getCropId(sk || '');
        setCurrentCropId(actualCropID)
        setIsEdit(true);
        setCurrentProduceRecord(cropData);
    }

    const deleteCrop = (cropID: string) => {
        const actualCropID = getCropId(cropID);
        dispatch(deleteSelectedCrop(actualCropID));
    }

    const updateCropDetails = (updatedCropData: CropApiModel) => {
        console.log('updateCropDetails', updatedCropData)
        const {sk} = updatedCropData;
        const actualCropID = getCropId(sk || '');
        const {intent_to_sell} = updatedCropData;
        if(intent_to_sell) {
            dispatch(sellerIntentToSell(updatedCropData, actualCropID))
        } else {
            dispatch(updateCropData({...updatedCropData, is_delete: "no"}));
        }
    }

    return (
        <div className="crops-container" id="seller-ui-crops">
            <Title level={2}>My Produce</Title>
            <PrimaryBtn
                className="add-crop-btn vikas-btn-radius"
                onClick={() => {
                    setIsEdit(false);
                    setModalVisible(true)
                }}
                content="Add Produce"
            />
            <AddCropModal
                currentProduceRecord={currentProduceRecord}
                isEdit={isEdit}
                setIsEdit={setIsEdit}
                setModalVisible={setModalVisible}
                modalVisible={modalVisible}
            />
            <Table
                className="margin-t-1em"
                components={{
                    body: {
                      row: EditableRow,
                      cell: EditableCell,
                    },
                }}
                columns={cropColumns({deleteCrop, prepareForEditCrop, updateCropDetails, setIsEdit, isEdit, currentCropId}) as any}
                dataSource={sellerState.cropsList}
            />
        </div>
    );
};

export default CropsSection;
