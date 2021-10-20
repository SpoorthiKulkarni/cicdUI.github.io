import {
    CropCategoryModel,
    EventTemplate,
    MatchRequirementModel,
    ReviewRating,
    Status,
    TransactionModel
} from "../../buyer-seller-commons/types";

export interface ProduceModel {
    crop_name: string;
    grade: string;
    category: string;
    sub_type: string;
    quantity: number;
    delivery_by: any;
    additionalInfo?: string | null;
    sk?: string;
    pk?: string;
    currently_fulfilled_qty?: number;
    isEditable?: boolean;
};

export interface CropModel {
    cropName: string;
    subCategory?: string;
    cropGrade?: string;
    quantity: number;
    pricePerQnt: number;
};

export interface flatMasterListType {
    produce_id: string;
    produce_name: string;
    crop_id: string;
    crop_name: string;
    category_id: string;
    category_name: string;
    grade_id: string;
    grade_name: string;
};

export interface MasterListApiFormat {
    produce_name: string;
    crop_name: string;
    category_name: string;
    grade_name: string;
};

export interface PaymentDetails {
    orderID: string;
    orderAmount: string;
    paymentMode: string;
    referenceId: string;
    txMsg: string;
    txStatus: string;
    txTime: string;
};

export interface PaymentRedirectionDetails {
    transactionId: string;
    paymentNo: string;
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

export interface PaymentAmount {
    amount: string;
}

export interface BuyerStateModel {
    masterProduceList: Array<MasterListApiFormat>;
    produceList: Array<ProduceModel>;
    masterCropNames: Array<string>;
    cropsList: Array<string>;
    varietyList: Array<CropCategoryModel>;
    matchesList: Array<MatchRequirementModel>;
    transactionList: {
        Pending: Array<TransactionModel>,
        active: Array<TransactionModel>,
        complete: Array<TransactionModel>
    };
    reviewsList: Array<ReviewRating>;
    timeStamp: any;
    isMatchesFetching: boolean;
    paymentDetails: Array<PaymentDetails>;
    paymentRedirectionDetails: any;
    statusDetails: Array<StatusDetails>;
    currentStatusDetails: Array<CurrentStatusDetails>;
    eventTemplate: Array<EventTemplate>;
    paymentAmount: any;
    rejectCount: any;
    otpError: { showError: Boolean, errorMg: String, verified: Boolean, produce: String };
    status: Array<Status>;
};

export interface BuyerRejectMatch {
    buyer_id: string;
    buyer_crop_id: string;
    seller_id: string;
    seller_crop_id: string;
    matched_quantity: number;
};
