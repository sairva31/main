
let _token: string | null = null;
let _expiresToken: Date | null = null;

export class TokensService {
    static get Token(): string | null {
        return _token;
    }

    static set Token(value: string | null) {
        _token = value;
    }

    static get ExpiresToken(): Date | null {
        return _expiresToken;
    }

    static set ExpiresToken(value: Date | null) {
        _expiresToken = value;
    }
}

