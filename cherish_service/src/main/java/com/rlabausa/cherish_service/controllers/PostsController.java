package com.rlabausa.cherish_service.controllers;

import com.rlabausa.cherish_service.models.Post;
import com.rlabausa.cherish_service.repositories.PostRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collection;

@RestController
@RequestMapping("posts")
public class PostsController {
    private PostRepository repository;

    public PostsController(PostRepository repository){
        this.repository = repository;
    }

    @GetMapping()
    public Iterable<Post> getAll(){
       var posts = this.repository.findAll();
       return posts;
    }

    @GetMapping("/{id}")
    public Post getOne(@PathVariable Long id) {
        var post = this.repository.findById(id)
                .orElseThrow();

        return post;

    }
}
