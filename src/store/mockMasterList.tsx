
export const masterList = [
    {
        id: 'cereals_id',
        name: 'cereals',
        label: 'Cereals',
        cropsList: [
            {
                id: 'cereals_crop_id_1',
                name: 'cereals_crop_1',
                label: 'Crop 1',
                categoryList: [
                    {
                        id: 'cereals_crop_1_category_id_1',
                        name: 'cereals_crop_1_category_1',
                        label: 'Category 1',
                        gradeList: [
                            {
                                id: 'cereals_crop_1_category_id_1_grade_id_1',
                                name: 'cereals_crop_1_category_1_grade_1',
                                label: 'Grade 1',
                            }
                        ]
                    },
                    {
                        id: 'cereals_crop_1_category_id_2',
                        name: 'cereals_crop_1_category_2',
                        label: 'Category 2',
                        gradeList: [
                            {
                                id: 'cereals_crop_1_category_2_grade_id_1',
                                name: 'grade_1',
                                label: 'Grade 1',
                            }
                        ]
                    }
                ]
            },
            {
                id: 'cereals_crop_id_2',
                name: 'cereals_crop_2',
                label: 'Crop 2',
                categoryList: [
                    {
                        id: 'cereals_crop_2_category_id_1',
                        name: 'cereals_crop_2_category_1',
                        label: 'Category 1',
                        gradeList: [
                            {
                                id: 'cereals_crop_2_category_id_1_grade_id_1',
                                name: 'cereals_crop_2_category_1_grade_1',
                                label: 'Grade 1',
                            }
                        ]
                    },
                    {
                        id: 'cereals_crop_2_category_id_2',
                        name: 'cereals_crop_2_category_2',
                        label: 'Category 2',
                        gradeList: [
                            {
                                id: 'cereals_crop_2_category_2_grade_id_1',
                                name: 'grade_1',
                                label: 'Grade 1',
                            }
                        ]
                    }
                ]
            }
        ]
    }
]

export interface flatMasterListType { 
    produce_id: string;
    produce_name: string;
    crop_id: string;
    crop_name: string;
    category_id: string;
    category_name: string;
    grade_id: string;
    grade_name: string;
}

export const masterFlatList = [
    {produce_id: 'cereals', produce_name: 'Cereals',  crop_id: 'jowar', crop_name: 'Jowar',
        category_id: 'bijapur', category_name: 'BIJAPUR', grade_id: 'grade_1', grade_name: 'Grade 1'},
    
    {produce_id: 'cereals', produce_name: 'Cereals',  crop_id: 'jowar', crop_name: 'Jowar',
        category_id: 'hybrid', category_name: 'HYBRID', grade_id: 'grade_2', grade_name: 'Grade 2'},

    {produce_id: 'cereals', produce_name: 'Cereals',  crop_id: 'paddy', crop_name: 'Paddy',
        category_id: 'hassan_dappa', category_name: 'HASSAN DAPPA', grade_id: 'grade_2', grade_name: 'Grade 3'},

    {produce_id: 'cereals', produce_name: 'Cereals',  crop_id: 'paddy', crop_name: 'Paddy',
        category_id: 'black', category_name: 'BLACK', grade_id: 'grade_2', grade_name: 'Grade 1'},
    
    {produce_id: 'pulses', produce_name: 'Pulses',  crop_id: 'tur', crop_name: 'Tur',
        category_id: 'category_1', category_name: 'Category 2', grade_id: 'grade_2', grade_name: 'Grade 2'},
        
]