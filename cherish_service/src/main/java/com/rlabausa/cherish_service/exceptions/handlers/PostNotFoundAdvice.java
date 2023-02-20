package com.rlabausa.cherish_service.exceptions.handlers;

import com.rlabausa.cherish_service.exceptions.PostNotFoundException;
import com.rlabausa.cherish_service.exceptions.ResourceNotFoundException;
import com.rlabausa.cherish_service.responses.ApiErrorResponse;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice
public class PostNotFoundAdvice {
    @ResponseBody
    @ExceptionHandler(PostNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    ApiErrorResponse postNotFoundHandler(PostNotFoundException exc){
        return new ApiErrorResponse(
                HttpStatus.NOT_FOUND,
                exc.getMessage(),
                exc.getClass().getSimpleName()
        );
    }
}
