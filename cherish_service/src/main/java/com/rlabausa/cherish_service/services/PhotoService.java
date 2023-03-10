package com.rlabausa.cherish_service.services;

import com.rlabausa.cherish_service.models.Photo;
import com.rlabausa.cherish_service.repositories.PhotoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.StreamUtils;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PhotoService {
    private final Path PHOTOS_DIRECTORY = Paths.get(
            "C:",
            "Users",
            "rubyl",
            "source",
            "repos",
            "cherish-2.0",
            "app_photo_uploads"
    );

    private PhotoRepository photoRepository;

    public PhotoService(PhotoRepository photoRepository){
        this.photoRepository = photoRepository;
    }

    public Photo addPhoto(MultipartFile file) throws IOException {
        String fileName = file.getOriginalFilename();

        Path filePath = this.PHOTOS_DIRECTORY.resolve(fileName);

        // save to database
        Photo newPhoto = new Photo();
        newPhoto.setFilePath(filePath.toString());
        Photo savedPhoto = this.photoRepository.save(newPhoto);

        // save to filesystem
        Files.copy(
                file.getInputStream(),
                filePath
        );

        return savedPhoto;
    }
    public ResponseEntity<Photo> getPhoto(Long id){
        var photo = this.photoRepository.findById(id)
                .orElseThrow();

        var uri = this.getPhotoUrlFromId(id);

        photo.setSrc(uri);

        return ResponseEntity.ok()
                .body(photo);

    }

    public ResponseEntity<List<Photo>> getAllPhotos(){
        var photos = this.photoRepository.findAll()
                .stream()
                .map(photo -> {
                    var downloadUri = this.getPhotoUrlFromId(photo.getId());
                    photo.setSrc(downloadUri);
                    return photo;
                })
                .collect(Collectors.toList());

        return ResponseEntity.ok()
                .body(photos);
    }


    public ResponseEntity<?> downloadPhoto(Long id) throws IOException {
        Photo photo = this.photoRepository.findById(id)
                .orElseThrow();

        String photoPath = photo.getFilePath();

        System.out.println(photoPath);

        FileInputStream inputStream = new FileInputStream(photoPath);
        byte[] bytes = StreamUtils.copyToByteArray(inputStream);

        return ResponseEntity.ok()
                .contentType(MediaType.IMAGE_JPEG)
                .body(bytes);
    }

    private String getPhotoUrlFromId(Long id){
        var downloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/photos/src/")
                .path(id.toString())
                .toUriString();

        return downloadUri;

    }
}
