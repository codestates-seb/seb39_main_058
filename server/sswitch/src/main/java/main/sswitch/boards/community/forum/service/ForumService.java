package main.sswitch.boards.community.forum.service;

import main.sswitch.boards.community.forum.entity.Forum;
import main.sswitch.boards.community.likeForum.entity.LikeForum;
import main.sswitch.boards.community.forum.repository.ForumRepository;
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

@Service
public class ForumService {
    private final ForumRepository forumRepository;
    private final UserService userService;

    private final LikeForumRepository likeForumRepository;

    public ForumService(ForumRepository forumRepository,
                        UserService userService,LikeForumRepository likeForumRepository) {
        this.forumRepository = forumRepository;
        this.userService = userService;
        this.likeForumRepository = likeForumRepository;
    }

    public Forum createForum(Forum forum) {
//        findUserId(forum);
//        System.out.println(forum.getUser().getLoginId());
        Forum savedForum = forumRepository.save(forum);

        return savedForum;
    }

    public Forum updateForum(Forum forum) {
        Forum findForum = findVerifiedForum(forum.getForumId());

        Optional.ofNullable(forum.getForumTitle())
                .ifPresent(forumTitle -> findForum.setForumTitle(forumTitle));
        Optional.ofNullable(forum.getForumText())
                .ifPresent(forumText -> findForum.setForumText(forumText));
        Optional.ofNullable(forum.getSecret())
                .ifPresent(secret -> findForum.setSecret(secret));
        Optional.ofNullable(forum.getTag())
                .ifPresent(tag -> findForum.setTag(tag));

        return forumRepository.save(findForum);
    }

    //게시글 좋아요 버튼 구현
    //우선 해당글 따봉누른 유저 목록을 불러옴
    //없으면 넣어줌 있으면 빼줌
    public LikeForum likeForum(LikeForum likeForum) {
        Forum findForum = findVerifiedForum(likeForum.getForum().getForumId());
        LikeForum saveLikeForum = likeForumRepository.save(likeForum);

        long findForumLike = likeForum.getForum().getForumLike();
        findForumLike++;
        findForum.setForumLike(findForumLike);

        return saveLikeForum;
    }

    public Forum findForum(long forumId) {
        return findVerifiedForum(forumId);
    }

    public Page<Forum> findForums(int page, int size) {
        return forumRepository.findAll(PageRequest.of(page, size,
                Sort.by("forumId").descending()));
    }

    //제목 검색기능 구현
    public Page<Forum> findForumTitle(String title, int page, int size) {
        return forumRepository.findByForumTitleContaining(title,PageRequest.of(page, size,
                Sort.by("forumId").descending()));

    }

    //태그 검색기능 구현
    public Page<Forum> findForumTag(String tag, int page, int size) {
        return forumRepository.findByTagContaining(tag,PageRequest.of(page, size,
                Sort.by("forumId").descending()));

    }

    //작성자 검색기능 구현
    public Page<Forum> findUsername(String username, int page, int size) {
        User user = userService.findUserWithUserName(username);
        long userId = user.getUserId();
        if (userId == 0) {
            return null;
        }
        userService.findUserWithId(userId);     //이러면 null값 반환이 안될듯??
        return forumRepository.findByForumUserId(userId,PageRequest.of(page, size));
    }

    //내용 검색기능 구현
    public Page<Forum> findForumText(String text, int page, int size) {
        return forumRepository.findByForumTextContains(text,PageRequest.of(page, size,
                Sort.by("forumId").descending()));

    }

    public void deleteForum(long forumId) {
        Forum findForum = findVerifiedForum(forumId);

        forumRepository.delete(findForum);
    }


    public Forum findVerifiedForum(long forumId) {
        Optional<Forum> optionalForum =
                forumRepository.findById(forumId);
        Forum findForum =
                optionalForum.orElseThrow(() ->
                        new BusinessLogicException(ExceptionCode.FORUM_NOT_FOUND));
        return findForum;
    }

//    public void findUserId(Forum forum) {
//        User user = userService.findUserWithLoginId(forum.getUser().getLoginId());
//        forumRepository
//    }

//    //게시글 검색시 쿼리 검색 진행하는 메소드
//    public Forum SearchForumTitleByQuery(String forumTitle) {
//        Optional<Forum> optionalForum = forumRepository.searchByTitle(forumTitle);
//
//        Forum findForumTitle =
//                optionalForum.orElseThrow(() ->
//                        new BusinessLogicException(ExceptionCode.RESULT_NOT_FOUND));
//
//        return findForumTitle;
//    }

    //게시글 권한 확인 메서드
//    public Forum verifyAccessAuthorization(long userId) {
//        // 게시글 상태가 비밀글인지
//
//        //유저롤이 관리자인지
//
//        //유저id와 게시글 작성자 id가 일치하는지
//
//        //둘다 아니면 403에러처리
//    }
}
