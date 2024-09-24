// Modelo que estructura el tipo de objeto de cada elemento que se enviara como parámetro del API a consultar
export interface Parameter {
    Field: string;
    Value: string;
    Object: any;
}

// Modelo que enlista los objetos o valores que se deben parametrizar a la hora de consultar en la API
export interface Parameters {
    Parameter: Parameter[];
}

// Modelo estructurado que será de respuesta al consultar la API este es para una lista de objetos Sucursales
export interface ResponseJson<T> {
    Success: boolean;
    Error_msg: string | null;
    Error_code: number;
    Total_elements: number;
    Response: T[];
}

// Modelo estructurado que será de respuesta al consultar la API este es para una lista de objetos Sucursales
export interface SingleResponseJson<T> {
    Success: boolean;
    Error_msg: string| null;
    Error_code: number;
    Response: T;
}




