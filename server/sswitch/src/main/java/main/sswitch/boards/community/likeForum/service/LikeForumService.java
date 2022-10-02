package main.sswitch.boards.community.likeForum.service;

import lombok.extern.slf4j.Slf4j;
import main.sswitch.boards.community.forum.entity.Forum;
import main.sswitch.boards.community.likeForum.entity.LikeForum;
import main.sswitch.boards.community.likeForum.repository.LikeForumRepository;
import main.sswitch.help.exceptions.BusinessLogicException;
import main.sswitch.help.exceptions.ExceptionCode;
import main.sswitch.user.entity.User;
import main.sswitch.user.service.UserService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Slf4j
@Service
public class LikeForumService {
    private final LikeForumRepository likeForumRepository;
    private final UserService userService;


    public LikeForumService(LikeForumRepository likeForumRepository,
                            UserService userService) {
        this.likeForumRepository = likeForumRepository;
        this.userService = userService;
    }

    public LikeForum createLike(LikeForum likeForum) {
        LikeForum saveLike = likeForumRepository.save(likeForum);
        Forum forum = new Forum();
        forum.setForumLike(forum.getForumLike()+1);
        return saveLike;
    }

//    public LikeForum findLike(long forumId){return }
    public Page<LikeForum> findLikes(int page, int size) {
        return likeForumRepository.findAll(PageRequest.of(page, size,
                Sort.by("userId").descending()));
    }

    public void deleteLike(long userId) {
        Forum forum = new Forum();
        forum.setForumLike(forum.getForumLike() -1);
        LikeForum findLike = findUserLike(userId);

        likeForumRepository.delete(findLike);
    }

    public LikeForum findUserLike(long userId) {
        Optional<LikeForum> optionalLike =
                likeForumRepository.findByUserId(userId);

        LikeForum findLike =
                optionalLike.orElseThrow(() ->
                        new BusinessLogicException(ExceptionCode.LIKE_FORUM_NOT_FOUND));
        return findLike;
    }

}
