import { StoresData, ArticlesData } from '../interface/data-api';

// Modelo estructurado que será de respuesta al consultar la API este es para una lista de objetos Sucursales
export interface ResponseJsonSuc {
    Success: boolean,
    Error_msg?: string,
    Error_code: number,
    Total_elements: number,
    Response: [StoresData]
}

// Modelo estructurado que será de respuesta al consultar la API este es para una lista de objetos Articulos
export interface ResponseJsonProd {
    Success: boolean,
    Error_msg?: string,
    Error_code: number,
    Total_elements: number,
    Response: [ArticlesData]
}

// Modelo que estructura el tipo de objeto de cada elemento que se enviara como parámetro del API a consultar
export interface Parameter {
    Field: string,
    Value: string,
    Object: any
}

// Modelo que enlista los objetos o valores que se deben parametrizar a la hora de consultar en la API
export interface Parameters {
    ParameterInfo: [Parameter]
}


