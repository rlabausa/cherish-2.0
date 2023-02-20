package com.rlabausa.cherish_service.controllers;

import com.rlabausa.cherish_service.models.Post;
import com.rlabausa.cherish_service.models.assemblers.PostModelAssembler;
import com.rlabausa.cherish_service.repositories.PostRepository;
import com.rlabausa.cherish_service.exceptions.PostNotFoundException;
import org.springframework.hateoas.IanaLinkRelations;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.hateoas.EntityModel;

@RestController
@RequestMapping("posts")
public class PostsController {
    private PostRepository repository;
    private PostModelAssembler modelAssembler;

    public PostsController(PostRepository repository, PostModelAssembler modelAssembler){

        this.repository = repository;
        this.modelAssembler = modelAssembler;
    }

    @GetMapping()
    public Iterable<Post> getAll(){
       var posts = this.repository.findAll();
       return posts;
    }

    @GetMapping("/{id}")
    public Post getOne(@PathVariable Long id) {
        var post = this.repository.findById(id)
                .orElseThrow(() -> new PostNotFoundException(id));

        return post;
    }

    @PostMapping()
    public ResponseEntity<EntityModel<Post>> addPost(@RequestBody Post post){
        Post newPost = this.repository.save(post);
        EntityModel<Post> entityModel = this.modelAssembler.toModel(newPost);

        return ResponseEntity
                .created(entityModel.getRequiredLink(IanaLinkRelations.SELF).toUri())
                .body(entityModel);
    }
}
