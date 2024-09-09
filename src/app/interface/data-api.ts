/**
 * Modelo de datos los datos de articulos
*/
export interface ArticlesData {
    Id: string,
    Name: string,
    Description: string,
    Price: number,
    Total_in_shelf: number,
    Total_in_vault: number,
    Store_id: string,
    Store_name: string
}

/**
 * Modelo de datos los datos de sucursales
*/
export interface StoresData {
    Id: string,
    Name: string,
    Address: string
}
