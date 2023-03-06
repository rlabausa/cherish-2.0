package com.rlabausa.cherish_service.controllers;

import com.rlabausa.cherish_service.models.Photo;
import com.rlabausa.cherish_service.repositories.PhotoRepository;
import com.rlabausa.cherish_service.services.PhotoService;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
@RequestMapping("photos")
public class PhotosController {

    private PhotoRepository photoRepository;
    private PhotoService photoService;

    public PhotosController(PhotoRepository photoRepository, PhotoService photoService){
        this.photoRepository = photoRepository;
        this.photoService = photoService;
    }

    @PostMapping()
    public Photo addPhoto(@RequestParam MultipartFile file) throws IOException {
        return this.photoService.addPhoto(file);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getPhoto(@PathVariable Long id) throws IOException {
        return this.photoService.getPhoto(id);
    }


    @GetMapping(
            value = "/src/{id}",
            produces = MediaType.IMAGE_JPEG_VALUE
    )
    public ResponseEntity<?> getPhotoSrc(@PathVariable Long id) throws IOException {
        return this.photoService.downloadPhoto(id);
    }


}
