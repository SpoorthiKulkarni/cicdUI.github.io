import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    Button,
    Checkbox,
    Col,
    Input,
    List,
    Row,
    Select,
    Space,
    Table,
    Typography
} from 'antd';
import { uniqBy, remove, findIndex } from 'lodash';
import { FilterOutlined, CaretRightOutlined } from '@ant-design/icons';
import { masterListColumns } from './../masterListTable.model';
import { BuyerStateModel, CropCategoryModel, MasterListApiFormat } from '../../../store/buyerReducer/types';
import { fetchAllProduce, fetchAllCrops, fetchAllVariety, updateMasterListData } from '../../../store/buyerReducer/actions';
import DefaultBtn from '../../../app-components/defaultBtn';
import CancelBtn from '../../../app-components/cancelBtn';
import { RootState } from '../../../store/rootReducer';
import { convertMasterListToGradeStructure, updateMasterCropDatastructure } from '../masterListUtils';

const { Search } = Input;
const { Option } = Select;
const { Text, Title } = Typography;

const MasterList = (props: any) => {
    const buyerStore: BuyerStateModel = useSelector((state: RootState) => state.buyer);
    const {setModalVisible} = props;
    const dispatch = useDispatch();
    const [addedMasterList, updateAddedMasterList] = useState(buyerStore.masterProduceList as Array<MasterListApiFormat>);
    const [selectedProduceCategory, setSelectedProduceCategory] = useState('');
    const [selectedCrop, setSelectedCrop] = useState('');
    const [selectedVariety, setSelectedVariety] = useState('');
    const [selectedGradeList, updateSelectedList] = useState(convertMasterListToGradeStructure(buyerStore.masterProduceList) as any)

    useEffect(() => {
        buyerStore.masterCropNames && !buyerStore.masterCropNames.length && dispatch(fetchAllProduce());
    }, [])

    
    /* On change of master produce selection*/
    const handleMasterProduceChange = (produceName: string) => {
        // Should erase the variety and grade data on change.
        setSelectedProduceCategory(produceName);
        dispatch(fetchAllCrops(produceName));
    }

    const handleMasterVarietyChange = (cropName: string) => {
        setSelectedCrop(cropName);
        dispatch(fetchAllVariety(cropName));
    }

    /* Show options for master produce details */
    const renderMasterProduceChildren = (produce: Array<string>) => {
        const categoryOptions = produce.map((category) => 
            <Option key={category} value={category} >{category}</Option> )
        return categoryOptions;
    };

    /* Get/Show Crops for the selected master produce */
    const getProduceTypeData = (crop: Array<string>) => {
        const produceList = crop.map((cropType) => 
            <List.Item onClick={() => handleMasterVarietyChange(cropType)}>
                {cropType} <CaretRightOutlined/>
            </List.Item> )
        return produceList;
    }

    /* Show categories for the selected Crop */
    const getCategoryListData = (cropName: Array<CropCategoryModel>) => {
        const varietyList = uniqBy(cropName, 'variety').map((currentCropData) => {
            const {variety} = currentCropData;
            return (<>
                <List.Item onClick={() => setSelectedVariety(variety)}>
                    {variety} <CaretRightOutlined />
                </List.Item>
            </>)
        })
        return varietyList;
    };

    /* Show grades for the selected Category */
    const getGradeData = (cropName: Array<CropCategoryModel>, cropVariety: string ) => {
        const gradeList = cropName
            .filter((crop: CropCategoryModel) => crop.variety === cropVariety)
                .map(({grade}: CropCategoryModel, index) => {
                    return (
                        <>
                            <List.Item key={`${grade}-${index}`} >
                                <Checkbox className="custom-checkbox" 
                                    checked={isSelected(grade)}
                                    onChange={(e)=> {
                                        const {target} = e;
                                        const {checked} = target;
                                        addCropToList(grade, checked)
                                    }}
                                >
                                    {grade}
                                </Checkbox>
                            </List.Item>
                        </>
                    )
                })
        return gradeList;
    };

    /* 
        Function with side affect, updating the state.
    */
    const removeElementAndUpdateList = (itemIndex: number) => {
        /* Remove from master list array */
        let copiedMasterList = [...addedMasterList];
        copiedMasterList.splice(itemIndex, 1);
        updateAddedMasterList(copiedMasterList);
        /* Remove from master list array end */
    }

    const addCropToList = (gradeSelection: string, isSelected: boolean) => {
        const updatedGradeStructure = updateMasterCropDatastructure(
            gradeSelection, 
            isSelected, 
            {gradeDataStructure: selectedGradeList, selectedProduceCategory, selectedCrop, selectedVariety}
        )
        
        updateSelectedList(updatedGradeStructure);
        // Create entry data
        const entryData = {
            produce_name: selectedProduceCategory,
            crop_name: selectedCrop,
            category_name: selectedVariety,
            grade_name: gradeSelection
        };
        // Update master list
        if (isSelected) {
            updateAddedMasterList([...addedMasterList, entryData]);
        } else {
            const removeElementIndex = findIndex(addedMasterList, entryData);
            removeElementAndUpdateList(removeElementIndex);
        }
        
    }

    const handleMasterTableDelete = (record: MasterListApiFormat, index: number) => {
        const {crop_name, grade_name: gradeName, category_name, produce_name} = record;
        removeElementAndUpdateList(index);

        /* Update grade datastructure */
        const updatedGradeStructure = updateMasterCropDatastructure(
            gradeName, 
            false, 
            {gradeDataStructure: selectedGradeList, selectedProduceCategory: produce_name, selectedCrop: crop_name, selectedVariety: category_name}
        );
        updateSelectedList(updatedGradeStructure);
        /* Update grade datastructure end */
    }

    // const setSelectedClassName = (selectedClassName: string, listType: string) => {
    //     var element = document.getElementsByClassName(selectedClassName);
    //     var idName = "";
    //     var gradeSelected = "";
    //     var isGrade = false;

    //     switch(listType){
    //         case "produce": {
    //             idName="selected-produce-item";
    //             break;
    //         }
    //         case "variety": {
    //             idName="selected-variety-item";
    //             break;
    //         }
    //         case "grade": {
    //             gradeSelected="selected-grade-item";
    //             isGrade = true;
    //             break;
    //         }
    //     }

    //     if (isGrade) {
    //         element.item(0)?.setAttribute("className", gradeSelected);
    //     } else {
    //         element.item(0)?.setAttribute("id",idName);
    //     }
    // };
    
    const isSelected = (curItemGradeName: string) => {
        const isProducePresent = selectedGradeList[selectedProduceCategory]
        const isCropPresent = isProducePresent && selectedGradeList[selectedProduceCategory][selectedCrop]
        const isSubCategoryPresent = isCropPresent && selectedGradeList[selectedProduceCategory][selectedCrop][selectedVariety]
        const isGradeSelected = isSubCategoryPresent && selectedGradeList[selectedProduceCategory][selectedCrop][selectedVariety][curItemGradeName]
        return isGradeSelected;
    }

    return (
        <>
        <Row gutter={16}>
            <Col>
                <Title level={5}>Select all the produce you buy regularly</Title>
                <Text>Select Produce Category</Text>
                <Select
                    className="custom-select"
                    allowClear
                    placeholder="Please select"
                    onChange={handleMasterProduceChange}
                    style={{ width: '100%' }}
                >
                    {renderMasterProduceChildren(buyerStore.masterCropNames)}
                </Select>
            </Col>
        </Row>
        <Row className="margin-t-1em">
            <Col span={8}>
                <div className="custom-list">
                    <Title level={5}>Produce</Title>
                    <Search className="custom-search" placeholder="Search" />
                    {getProduceTypeData(buyerStore.cropsList)}
                </div>
            </Col>
            <Col span={8}>
                <div className="custom-list">
                    <Title level={5}>Variety</Title>
                    <Search className="custom-search" placeholder="Search" />
                    {getCategoryListData(buyerStore.varietyList)}
                </div>
            </Col>
            <Col span={8}>
                <div className="custom-list">
                    <Title level={5}>Grade</Title>
                    { selectedVariety ? getGradeData(buyerStore.varietyList, selectedVariety) : [] }
                </div>
            </Col>
        </Row>
        <Row className="margin-t-1em">
            <Col>
                <Space direction="vertical">
                    <Title level={5}>My Master List</Title>
                    <Space>
                        <Search className="custom-search" placeholder="Search" />
                        <DefaultBtn icon={<FilterOutlined/>} content="Filter" />
                        </Space>
                </Space>
            </Col>
        </Row>
        <Row justify="center">
            <Col>
                <Table
                    className="margin-t-1em"
                    columns={
                        masterListColumns({
                            removeProduceEntry: (record: MasterListApiFormat, index: number) => handleMasterTableDelete(record, index)
                        })}
                    pagination={ false }
                    rowClassName="custom-row"
                    scroll = {{y: 200}}
                    dataSource={addedMasterList}
                />
            </Col>
        </Row>
        <Row justify="center" className='margin-t-1em'>
            <Col>
                <CancelBtn
                    className="margin-l-r-1em crop-modal-action-btn vikas-btn-radius"
                    onClick={() => {
                        setModalVisible(false);
                    }}
                />
                <Button
                    className="crop-modal-action-btn vikas-btn-radius"
                    type="primary"
                    onClick={() => {
                        dispatch(updateMasterListData(addedMasterList))
                        setModalVisible(false);
                    }}
                >
                    Done
                </Button>
            </Col>
        </Row>
        </>
    )
}

export default MasterList;
