package main.sswitch.boards.community.likeForum.service;

import lombok.extern.slf4j.Slf4j;
import main.sswitch.boards.community.forum.entity.Forum;
import main.sswitch.boards.community.forum.service.ForumService;
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
    private final ForumService forumService;


    public LikeForumService(LikeForumRepository likeForumRepository,
                            ForumService forumService,
                            UserService userService) {
        this.forumService = forumService;
        this.likeForumRepository = likeForumRepository;
        this.userService = userService;
    }

    public LikeForum createLike(LikeForum likeForum) {
        verifyExistLikeForum(likeForum);
        LikeForum saveLike = likeForumRepository.save(likeForum);
        forumService.likeForum(likeForum.getForum().getForumId() , likeForum.getUser().getUserId());
        return saveLike;
    }

//    public LikeForum findLike(long forumId){return }
    public Page<LikeForum> findLikes(int page, int size) {
        return likeForumRepository.findAll(PageRequest.of(page, size,
                Sort.by("userId").descending()));
    }

    public void deleteLike(LikeForum likeForum) {
        findVerifyLikeForum(likeForum);
        forumService.hateForum(likeForum.getForum().getForumId());

        likeForumRepository.delete(likeForum);
    }

    public LikeForum findVerifyLikeForum(LikeForum likeForum) {
        long userId = likeForum.getUser().getUserId();
        long forumId = likeForum.getForum().getForumId();
        Optional<LikeForum> optionalLike =
                likeForumRepository.findByUserAndForumId(userId,forumId);

        LikeForum findLike =
                optionalLike.orElseThrow(() ->
                        new BusinessLogicException(ExceptionCode.LIKE_FORUM_NOT_FOUND));
        return findLike;
    }

    public void verifyExistLikeForum(LikeForum likeForum) {
        long userId = likeForum.getUser().getUserId();
        long forumId = likeForum.getForum().getForumId();
        Optional<LikeForum> optionalLike = likeForumRepository.findByUserAndForumId(userId, forumId);
        if (optionalLike.isPresent())
           throw new BusinessLogicException(ExceptionCode.LIKE_FORUM_EXIST);
    }

}
