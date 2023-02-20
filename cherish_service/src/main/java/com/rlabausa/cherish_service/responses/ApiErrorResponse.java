package com.rlabausa.cherish_service.responses;

import org.springframework.http.HttpStatus;

import java.util.Date;

public class ApiErrorResponse {
    private HttpStatus status;
    private int statusCode;
    private String message;
    private String type;
    private Date timestamp;

    public ApiErrorResponse(HttpStatus status, String message, String type){
        this.status = status;
        this.message = message;
        this.type = type;

        this.statusCode = status.value();
        this.timestamp = new Date();
    }

    public HttpStatus getStatus() {
        return this.status;
    }

    public String getMessage() {

        return this.message;
    }

    public String getType() {

        return this.type;
    }

    public int getStatusCode() {
        return statusCode;
    }

    public Date getTimestamp() {
        return timestamp;
    }
}
