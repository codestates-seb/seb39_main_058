package main.sswitch.boards.community.forum.service;

import main.sswitch.boards.community.forum.entity.Forum;
import main.sswitch.boards.community.forum.repository.ForumRepository;
import main.sswitch.help.exceptions.BusinessLogicException;
import main.sswitch.help.exceptions.ExceptionCode;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ForumService {
    private final ForumRepository forumRepository;

    public ForumService(ForumRepository forumRepository) {
        this.forumRepository = forumRepository;
    }

    public Forum createForum(Forum forum) {
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
    public Forum likeForum(Forum forum) {
        Forum findForum = findVerifiedForum(forum.getForumId());

        long findForumLike = forum.getForumLike();
        findForumLike++;
        findForum.setForumLike(findForumLike);

        return forumRepository.save(findForum);
    }

    public Forum findForum(long forumId) {
        return findVerifiedForum(forumId);
    }

    public Page<Forum> findForums(int page, int size) {
        return forumRepository.findAll(PageRequest.of(page, size,
                Sort.by("forumId").descending()));
    }

    //게시글 검색기능 구현
    public Page<Forum> searchForums(String keyword, int page, int size) {
        return forumRepository.findByForumTitleContaining(keyword,PageRequest.of(page, size,
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
