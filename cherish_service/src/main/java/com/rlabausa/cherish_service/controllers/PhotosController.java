package com.rlabausa.cherish_service.controllers;

import com.rlabausa.cherish_service.models.Photo;
import com.rlabausa.cherish_service.repositories.PhotoRepository;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
@RequestMapping("photos")
public class PhotosController {
    private final Path FOLDER_PATH = Paths.get("C:", "Users", "rubyl", "Desktop", "cherish_photos");
    private PhotoRepository photoRepository;

    public PhotosController(PhotoRepository photoRepository){
        this.photoRepository = photoRepository;
    }

    @PostMapping()
    public Photo addPhoto(@RequestParam MultipartFile file) throws IOException {

        String filePath = this.generateFilePathForStorage(file);

        // save to database
        Photo newPhoto = new Photo();
        newPhoto.setFilePath(filePath);
        Photo savedPhoto = this.photoRepository.save(newPhoto);

        if (savedPhoto != null){
            // save to filesystem
            Files.copy(
                    file.getInputStream(),
                    this.FOLDER_PATH.resolve(file.getOriginalFilename())
            );
        }

        return savedPhoto;

    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getPhoto(@PathVariable Long id) throws IOException {
        Photo photo = this.photoRepository.findById(id)
                .orElseThrow();

        String photoPath = photo.getFilePath();

        Path file = new File(photoPath).toPath();
        byte [] bytes = Files.readAllBytes(file);

        return ResponseEntity.ok()
                .contentType(MediaType.IMAGE_PNG)
                .body(bytes);
    }

    private String generateFilePathForStorage(MultipartFile file){
        String newFileName = file.getOriginalFilename();
        Path filePath = this.FOLDER_PATH.resolve(newFileName);
        return filePath.toString();
    }
}
