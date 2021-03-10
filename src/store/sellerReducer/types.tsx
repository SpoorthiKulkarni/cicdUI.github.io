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
    apmc_rate_data?: {apmc_price: string, increase: string};
    sk?: string;
    pk?: string;
}

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
}

export interface MatchRequirementModel extends CropModel {
    buyerId: string;
    quantityRequired: number;
    location: string;
}

export enum TransactionStatus {
    pending = 'PENDING',
    on_going = 'ON_GOING',
    completed = 'COMPLETED',
}

export interface TransactioModel extends MatchRequirementModel {
    transactionId: string;
    transactionStatus: TransactionStatus;
    transactionTotalAmount: number;
    transactionStatusText: string;
}

export interface SellerStateModel {
    categories: Array<string>;
    masterCrops: Array<string>;
    variety: Array<CropCategoryModel>;
    cropsList: Array<CropApiModel>;
    matchesList: Array<MatchRequirementModel>;
    transactionList: Array<TransactioModel>;
    reviewsList: Array<ReviewRating>;
    apmcCropPrice: string;
    timeStamp: any;
}

export interface ReviewRating {
    rating: number;
    buyerId: string;
    buyerLocation: string;
    date: string;
    reviewtext: string;
}

export interface CropCategoryModel {
    config_id: string;
    config_name: string;
    variety: string;
    grade: string;
    name: string;
}