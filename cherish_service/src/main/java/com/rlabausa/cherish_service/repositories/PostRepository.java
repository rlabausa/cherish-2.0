package com.rlabausa.cherish_service.repositories;

import com.rlabausa.cherish_service.models.Post;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface PostRepository extends PagingAndSortingRepository<Post, Long> {

}
