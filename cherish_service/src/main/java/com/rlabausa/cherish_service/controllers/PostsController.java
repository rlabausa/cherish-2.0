package com.rlabausa.cherish_service.controllers;

import com.rlabausa.cherish_service.models.Post;
import com.rlabausa.cherish_service.models.assemblers.PostModelAssembler;
import com.rlabausa.cherish_service.repositories.PostRepository;
import com.rlabausa.cherish_service.exceptions.PostNotFoundException;
import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.IanaLinkRelations;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.hateoas.EntityModel;

import java.util.List;
import java.util.stream.Collectors;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

@RestController
@RequestMapping("posts")
public class PostsController {
    private PostRepository repository;
    private PostModelAssembler modelAssembler;

    public PostsController(PostRepository repository, PostModelAssembler modelAssembler) {
        this.repository = repository;
        this.modelAssembler = modelAssembler;
    }

    @GetMapping()
    public CollectionModel<EntityModel<Post>> getAll() {

        List<EntityModel<Post>> posts = this.repository.findAll()
                .stream()
                .map(this.modelAssembler::toModel)
                .collect(Collectors.toList());

        return CollectionModel.of(
                posts,
                linkTo(methodOn(PostsController.class).getAll()).withSelfRel()
        );
    }

    @GetMapping("/{id}")
    public EntityModel<Post> getOne(@PathVariable Long id) {
        Post post = this.repository.findById(id)
                .orElseThrow(() -> new PostNotFoundException(id));

        return this.modelAssembler.toModel(post);
    }

    @PostMapping()
    public ResponseEntity<EntityModel<Post>> addPost(@RequestBody Post post) {
        Post newPost = this.repository.save(post);
        EntityModel<Post> entityModel = this.modelAssembler.toModel(newPost);

        return ResponseEntity
                .created(entityModel.getRequiredLink(IanaLinkRelations.SELF).toUri())
                .body(entityModel);
    }
}
