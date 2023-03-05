package com.rlabausa.cherish_service.models;

import javax.persistence.*;

@Entity
@Table(name="PHOTOS")
public class Photo {
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFilePath() {
        return filePath;
    }

    public void setFilePath(String filePath) {
        this.filePath = filePath;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String filePath;

    public Photo(){

    }

    public Photo(Long id, String filePath) {
        this.id = id;
        this.filePath = filePath;
    }
}
