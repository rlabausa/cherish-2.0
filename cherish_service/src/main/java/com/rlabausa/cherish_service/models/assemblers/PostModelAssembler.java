package com.rlabausa.cherish_service.models.assemblers;
import com.rlabausa.cherish_service.controllers.PostsController;
import com.rlabausa.cherish_service.models.Post;
import org.springframework.hateoas.server.RepresentationModelAssembler;
import org.springframework.hateoas.EntityModel;

import org.springframework.stereotype.Component;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

@Component
public class PostModelAssembler implements RepresentationModelAssembler<Post, EntityModel<Post>> {
    @Override
    public EntityModel<Post> toModel(Post post){
        EntityModel<Post> postModel = EntityModel.of(
                post,
                linkTo(methodOn(PostsController.class).getOne(post.getId()))
                        .withSelfRel(),
                linkTo(methodOn(PostsController.class).getAll())
                        .withRel("/posts")
                );

        return postModel;

    }
}
