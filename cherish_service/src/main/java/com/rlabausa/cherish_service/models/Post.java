package com.rlabausa.cherish_service.models;

import org.springframework.beans.factory.annotation.Autowired;

import javax.persistence.*;
import java.math.BigDecimal;

@Entity                 // JPA Annotation to make the object ready for storage in a JPA-based data store
@Table(name = "POSTS")  // Specify the details of the table that will be used to persist the entity in the database
public class Post {
    @Id                 // Primary key of an entity
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Specify primary key generation strategy
    private Long id;

    @Column(name = "location_name")
    private String locationName;
    private BigDecimal latitude;
    private BigDecimal longitude;
    private String title;
    private String author;
    private String body;

    public Post(){

    }

    public Post(Long id, String locationName, BigDecimal latitude, BigDecimal longitude, String title, String author, String body) {
        this.id = id;
        this.locationName = locationName;
        this.latitude = latitude;
        this.longitude = longitude;
        this.title = title;
        this.author = author;
        this.body = body;
    }

    public Long getId() {
        return this.id;
    }

    public String getLocationName() {
        return this.locationName;
    }

    public BigDecimal getLatitude() {
        return this.latitude;
    }

    public BigDecimal getLongitude() {
        return this.longitude;
    }

    public String getTitle() {
        return this.title;
    }

    public String getAuthor() {
        return author;
    }

    public String getBody() {
        return body;
    }

    public void setLocationName(String locationName) {
        this.locationName = locationName;
    }

    public void setLatitude(BigDecimal latitude) {
        this.latitude = latitude;
    }

    public void setLongitude(BigDecimal longitude) {
        this.longitude = longitude;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public void setBody(String body) {
        this.body = body;
    }
}
