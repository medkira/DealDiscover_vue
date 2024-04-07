import axios, { AxiosError } from 'axios';

export interface Failure {
    statusCode: number;
    statusMessage: any;
}
export class ErrorHandler {
    failure: Failure;

    constructor(error: any) {
        if (axios.isAxiosError(error)) {
            // Axios error, possibly from the API response or from Axios itself.
            this.failure = this._handleError(error);
        } else {
            // Default error
            this.failure = DataSource.getFailure(DataSource.DEFAULT);
        }
    }

    private _handleError(exception: AxiosError): Failure {
        switch (exception.code) {
            case 'ECONNABORTED':
                return DataSource.getFailure(DataSource.CONNECT_TIMEOUT);

            case 'ETIMEDOUT':
                return DataSource.getFailure(DataSource.RECEIVE_TIMEOUT);

            case 'ERR_NETWORK':
                return DataSource.getFailure(DataSource.NO_INTERNET_CONNECTION);

            // case 'ERR_BAD_REQUEST':
            //     return DataSource.getFailure(DataSource.BAD_REQUEST);

            default:
                if (exception.response) {
                    const errorData = exception.response.data as { error: string };
                    // If response exists, it's possibly an error from the API itself
                    return {
                        statusCode: exception.response.status,

                        // statusMessage: exception.response.data,
                        statusMessage: errorData.error,
                    };
                } else {
                    return DataSource.getFailure(DataSource.UNKNOWN_ERROR);
                }
        }
    }
}

class ResponseCode {
    static SUCCESS = 200;
    static NO_CONTENT = 204;
    static BAD_REQUEST = 400;
    static FORBIDDEN = 403;
    static UNAUTHORIZED = 401;
    static NOT_FOUND = 404;
    static INTERNAL_SERVER_ERROR = 500;
    static CONNECT_TIMEOUT = 504;
    static CANCEL = 499;
    static RECEIVE_TIMEOUT = 502;
    static SEND_TIMEOUT = 503;
    static CACHE_ERROR = 501;
    static NO_INTERNET_CONNECTION = 505;
    static UNKNOWN_ERROR = 999;
    static INVALID_DATA = 1000;
    static INVALID_CREDENTIALS = 1001;
    static DEFAULT = 999;
}

class ResponseMessage {
    static SUCCESS = "success";
    static NO_CONTENT = "success";
    static BAD_REQUEST = "Bad request, try again later";
    static UNAUTHORIZED = "User is unauthorized, try again later";
    static FORBIDDEN = "Forbidden request, try again later";
    static NOT_FOUND = "Not found";
    static INTERNAL_SERVER_ERROR = "Something went wrong";

    static CONNECT_TIMEOUT = "Timeout error, try again later";
    static CANCEL = "Request was cancelled, try again later";
    static RECEIVE_TIMEOUT = "Receive timeout, try again later";
    static SEND_TIMEOUT = "Send timeout, try again later";
    static CACHE_ERROR = "Cache error, try again later";
    static NO_INTERNET_CONNECTION = "Please check your internet connection";
    static UNKNOWN_ERROR = "Something went wrong";
    static INVALID_DATA = "";
    static INVALID_CREDENTIALS = "";
    static DEFAULT = "Something went wrong";
}


enum DataSource {
    NO_CONTENT,
    BAD_REQUEST,
    FORBIDDEN,
    UNAUTHORIZED,
    NOT_FOUND,
    INTERNAL_SERVER_ERROR,
    CONNECT_TIMEOUT,
    CANCEL,
    RECEIVE_TIMEOUT,
    SEND_TIMEOUT,
    CACHE_ERROR,
    NO_INTERNET_CONNECTION,
    UNKNOWN_ERROR,
    INVALID_DATA,
    INVALID_CREDENTIALS,
    DEFAULT
}


namespace DataSource {
    export function getFailure(dataSource: DataSource): Failure {
        switch (dataSource) {
            case DataSource.NO_CONTENT:
                return { statusCode: ResponseCode.NO_CONTENT, statusMessage: ResponseMessage.NO_CONTENT };

            case DataSource.BAD_REQUEST:
                return { statusCode: ResponseCode.BAD_REQUEST, statusMessage: ResponseMessage.BAD_REQUEST };

            case DataSource.FORBIDDEN:
                return { statusCode: ResponseCode.FORBIDDEN, statusMessage: ResponseMessage.FORBIDDEN };

            case DataSource.UNAUTHORIZED:
                return { statusCode: ResponseCode.UNAUTHORIZED, statusMessage: ResponseMessage.UNAUTHORIZED };

            case DataSource.NOT_FOUND:
                return { statusCode: ResponseCode.NOT_FOUND, statusMessage: ResponseMessage.NOT_FOUND };

            case DataSource.INTERNAL_SERVER_ERROR:
                return { statusCode: ResponseCode.INTERNAL_SERVER_ERROR, statusMessage: ResponseMessage.INTERNAL_SERVER_ERROR };

            case DataSource.CONNECT_TIMEOUT:
                return { statusCode: ResponseCode.CONNECT_TIMEOUT, statusMessage: ResponseMessage.CONNECT_TIMEOUT };

            case DataSource.CANCEL:
                return { statusCode: ResponseCode.CANCEL, statusMessage: ResponseMessage.CANCEL };

            case DataSource.RECEIVE_TIMEOUT:
                return { statusCode: ResponseCode.RECEIVE_TIMEOUT, statusMessage: ResponseMessage.RECEIVE_TIMEOUT };

            case DataSource.SEND_TIMEOUT:
                return { statusCode: ResponseCode.SEND_TIMEOUT, statusMessage: ResponseMessage.SEND_TIMEOUT };

            case DataSource.CACHE_ERROR:
                return { statusCode: ResponseCode.CACHE_ERROR, statusMessage: ResponseMessage.CACHE_ERROR };

            case DataSource.NO_INTERNET_CONNECTION:
                return { statusCode: ResponseCode.NO_INTERNET_CONNECTION, statusMessage: ResponseMessage.NO_INTERNET_CONNECTION };

            case DataSource.UNKNOWN_ERROR:
                return { statusCode: ResponseCode.UNKNOWN_ERROR, statusMessage: ResponseMessage.UNKNOWN_ERROR };

            case DataSource.INVALID_DATA:
                return { statusCode: ResponseCode.INVALID_DATA, statusMessage: ResponseMessage.INVALID_DATA };

            case DataSource.INVALID_CREDENTIALS:
                return { statusCode: ResponseCode.INVALID_CREDENTIALS, statusMessage: ResponseMessage.INVALID_CREDENTIALS };

            case DataSource.DEFAULT:
                return { statusCode: ResponseCode.DEFAULT, statusMessage: ResponseMessage.DEFAULT };
        }
    }
}
