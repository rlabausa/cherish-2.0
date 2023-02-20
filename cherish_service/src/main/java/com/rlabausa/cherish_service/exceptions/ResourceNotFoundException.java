package com.rlabausa.cherish_service.exceptions;

public class ResourceNotFoundException extends RuntimeException {
    public ResourceNotFoundException(Long id){
        super("Could not find resource " + id);

    }

    public ResourceNotFoundException(Long id, String resourceType){
        super("Could not find " + resourceType + " " + id);
    }
}
