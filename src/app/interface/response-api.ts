import { StoresData, ArticlesData } from '../interface/data-api';

export interface ResponseJsonSuc {
    Success: boolean,
    Error_msg?: string,
    Error_code: number,
    Total_elements: number,
    Response: [StoresData]
}

export interface ResponseJsonProd {
    Success: boolean,
    Error_msg?: string,
    Error_code: number,
    Total_elements: number,
    Response: [ArticlesData]
}

export interface Parameter {
    Field: string,
    Value: string,
    Object: any
}

export interface Parameters {
    ParameterInfo: [Parameter]
}


