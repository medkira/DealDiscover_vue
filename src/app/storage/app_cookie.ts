import { jwtDecode } from "jwt-decode";

export default class AppCookie {

    public setCookie = (token: string, options: CookieOptions = {}) => {
        const expirationDate = new Date();
        const expiresInDays = options.expires || 1; // Default to 1 day
        expirationDate.setDate(expirationDate.getDate() + expiresInDays);
        const cookieValue = encodeURIComponent(token) + '; Expires=' + expirationDate.toUTCString() + '; Path=/; SameSite=Strict; Secure';
        document.cookie = options.name + '=' + cookieValue;
    };


    public getCookie = (cookieName: string): string | null => {
        const nameEQ = cookieName + '=';
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            let cookie = cookies[i];
            while (cookie.charAt(0) === ' ') {
                // console.log("cookie before subreing: ", cookie.length)
                // console.log("cookie.charAt(0): ", cookie.charAt(0));
                cookie = cookie.substring(1, cookie.length);
                // console.log("cookie after subreing: ", cookie.length)
            }

            if (cookie.indexOf(nameEQ) === 0) {
                return decodeURIComponent(cookie.substring(nameEQ.length, cookie.length));
            }
        }
        return null;
    };


    public setTokenCookie(token: string): void {
        this.setCookie(token, { name: "TokenCookie", expires: 30 });
    }

    public getTokenCookie(): string | null {
        return this.getCookie('TokenCookie');
    }

    public removeTokenCookie(): void {
        this.setCookie('', { name: 'TokenCookie', expires: -1 });
    }

    public getRoleFromToken() {
        const token = this.getTokenCookie();
        if (token) {
            const decodedToken: decodedToken = jwtDecode(token!)
            // console.log("decodedToken: ", decodedToken);
            try {
                return decodedToken.userRole || null;
            } catch (error) {
                console.error("Error decoding token:", error);
                return null;
            }
        }
    }

    public getIdFromToken() {
        const token = this.getTokenCookie();
        if (token) {
            const decodedToken: decodedToken = jwtDecode(token!)
            // console.log("decodedToken: ", decodedToken);
            try {
                return decodedToken.userId || null;
            } catch (error) {
                console.error("Error decoding token:", error);
                return null;
            }
        }
    }

}


interface CookieOptions {
    name?: string;
    expires?: number;
    path?: string;
}

interface decodedToken {
    userRole: string,
    userId: string,

}
