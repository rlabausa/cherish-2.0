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

    @Transient
    private String src;

    public Photo(){

    }

    public Photo(Long id, String filePath, String src) {
        this.id = id;
        this.filePath = filePath;
        this.src = src;
    }

    public String getSrc() {
        return this.src;
    }

    public void setSrc(String src) {
        this.src = src;
    }
}
