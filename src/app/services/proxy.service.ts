import { SingleResponseJson, Parameters } from '../interface/response-api'
import { environment } from '../../environments/environment';
import { Injectable , Inject } from '@angular/core';
import axios, {AxiosResponse} from 'axios';
import { TokensService } from '../services/tokens.service';

/**
 * Servicio Consulta APIRest,
 * Permite obtener los datos de los servicios API
*/

@Injectable({ providedIn: 'root' })
export class ApiService {
  public uri: string;
  public dataJSon: string | null = null;
  public method: string;
  public invokeStatus: string | null = null;
  
  baseURL: string = environment.endpoint;
 
  constructor(@Inject('uri') public Uri: string,
              @Inject('method') public Method: string) {
    this.uri = Uri;
    this.method = Method;
  }

  public async getJSonResponse(getToken: boolean, accessToken: string): Promise<any> {
    let responseFromServer = '';

    try {
        const myClient = axios.create({
            baseURL: this.uri,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': getToken ? 
                    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6InNhbHZhZG9yLmdvbWV6IiwibmFtZWlkIjoic2FsdmFkb3IuZ29tZXpAZXhpbWFnZW4uY29tLm14IiwiY2VydHNlcmlhbG51bWJlciI6IjAxMjEzMjU0NjU5ODciLCJuYmYiOjE1MjQ4OTAzNDIsImV4cCI6MTUzNTQzMTE0MSwiaWF0IjoxNTI0ODkwMzQyLCJpc3MiOiJwcm9tb2xpbmUiLCJhdWQiOiJodHRwOi8vcHJvbW9saW5lLmNvbSJ9.0QcaTwxvc92FbNCYy0N3NNA6LIl0kDYOAJrjadE6qdc" : `Bearer ${accessToken}`
            }
        });

        let response: AxiosResponse;
        if (this.method === "GET") {
            response = await myClient.get(this.uri);
        } else {
          response = await myClient.post(this.uri, { Args: {
            "User": "sairva3@gmail.com",
            "Password": "rmfTt2OTZ8ZiVTd"
          }});
        }

        responseFromServer = response.data;
    } catch (ex) {
        console.error("Application_Error: GetJSonResponse ", ex);
        responseFromServer = JSON.stringify({ Success: 0, Message: ex });
    }

    return responseFromServer;
}
}

@Injectable({ providedIn: 'root' })
export class ProxyGet {
  //Funcion de consulta API para obtner sucursales
    private json: any;
    private responseJSon: any | null = null;
    private WcfeCommerce: ApiService | null = null;

    public getWcfeCommerce1(): ApiService | null {
        return this.WcfeCommerce;
    }

    public setWcfeCommerce1(value: ApiService): void {
        this.WcfeCommerce = value;
    }

    public getJson(): any {
        return this.json;
    }

    public setJson(value: any): void {
        this.json = value;
    }

    public async callTokenServices(): Promise<void> {
        const requestJSon: Record<string, any> = {};
        try {
            const requestJSon2: Record<string, any> = {};
            requestJSon["User"] = "sairva3@gmail.com";
            requestJSon["Password"] = "rmfTt2OTZ8ZiVTd";

            requestJSon2["Args"] = requestJSon;

            this.setJson(JSON.stringify(requestJSon2));
            this.setWcfeCommerce1(new ApiService(
                "https://localhost:44352/api/Token","POST"
            ));
            this.getWcfeCommerce1()!.dataJSon = this.getJson();
            var responseJSon = await this.getWcfeCommerce1()!.getJSonResponse(true, "");
            const response = responseJSon as SingleResponseJson<string>;
            if (response && response.Success && response.Response) {
              TokensService.ExpiresToken = new Date(Date.now() + 86400000); // 1 day
              TokensService.Token = response.Response;
            }
        } catch (ex) {
            console.error("Application_Error: ProxyGet-Controller ", ex);
        }
    }

    public async callAPI(service: string, method: string): Promise<any> {
        try {
           
          if (!TokensService.Token || (TokensService.ExpiresToken && TokensService.ExpiresToken < new Date(Date.now() + 3600000))) {
            return this.callTokenServices().then(x  => {;
              this.responseJSon = this.callAPI(service,method);
              return this.responseJSon;
            });
          }else{
            this.setWcfeCommerce1(new ApiService( `https://localhost:44352/api/Services/${service}`,method));
            this.responseJSon = await this.getWcfeCommerce1()!.getJSonResponse(false, TokensService.Token ?? "");
            return this.responseJSon;
          }
        } catch (ex) {
            console.error("Application_Error: ProxyGet-Controller ", ex);
        }
        
    }

    public async callAPIWithParams(service: string, method: string, param: Parameters): Promise<any> {
        if (!TokensService.Token || (TokensService.ExpiresToken && TokensService.ExpiresToken < new Date(Date.now() + 3600000))) {
            await this.callTokenServices();
        }
        const requestJSon: Record<string, any> = {};
        try {
            const requestJSon2: Record<string, any> = {};
            for (const p of param.Parameter) {
                requestJSon[p.Field] = p.Object ?? p.Value;
            }

            requestJSon2["Args"] = requestJSon;

            this.setJson(JSON.stringify(requestJSon2));
            this.setWcfeCommerce1(new ApiService(`https://localhost:44352/api/Services/${service}`,method));
            this.responseJSon = await this.getWcfeCommerce1()!.getJSonResponse(false, TokensService.Token ?? "");
        } catch (ex) {
            console.error("Application_Error: ProxyGet-Controller ", ex);
        }
        return this.responseJSon;
    }
}