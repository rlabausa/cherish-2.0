package com.rlabausa.cherish_service.exceptions;

public class PostNotFoundException extends ResourceNotFoundException {
    public PostNotFoundException(Long id) {
        super(id, "Post");
    }
}
