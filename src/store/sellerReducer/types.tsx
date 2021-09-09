import {
    CropCategoryModel,
    MatchRequirementModel,
    ReviewRating,
    TransactioModel
} from "../../buyer-seller-commons/types";

export interface CropApiModel {
    category_name: string;
    crop_name: string;
    sub_category: string;
    grade: string;
    quantity: string;
    price_per_qnt: string;
    apmc_rate: number;
    intent_to_sell: string;
    additional_info: string;
    district: string;
    apmc_rate_data?: { apmc_price: string, increase: string };
    sk?: string;
    pk?: string;
    currently_fulfilled_qty?: number;
};

export interface CropModel {
    cropName: string;
    subCategory?: string;
    cropGrade?: string;
    quantity: number;
    pricePerQnt: number;
    apmcRate: number;
    intentToSell: boolean;
    termsAndConditions?: string;
    apmcRateChange: any;
};

export interface StatusDetails {
    event_description: string;
    event_timestamp: string;
};

export interface CurrentStatusDetails {
    pk: string;
    sk: string;
    event_description: string;
    event_timestamp: string;
};

export interface SellerStateModel {
    categories: Array<string>;
    masterCrops: Array<string>;
    variety: Array<CropCategoryModel>;
    cropsList: Array<CropApiModel>;
    matchesList: Array<MatchRequirementModel>;
    transactionList: {
        Pending: Array<TransactioModel>,
        active: Array<TransactioModel>,
        complete: Array<TransactioModel>
    };
    reviewsList: Array<ReviewRating>;
    apmcCropPrice: any;
    timeStamp: any;
    statusDetails: Array<StatusDetails>
    currentStatusDetails: Array<CurrentStatusDetails>;
};
