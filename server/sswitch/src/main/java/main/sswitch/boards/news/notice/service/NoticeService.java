package main.sswitch.boards.news.notice.service;

import main.sswitch.boards.news.notice.entity.Notice;
import main.sswitch.boards.news.notice.repository.NoticeRepository;
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
public class NoticeService {

    private final NoticeRepository noticeRepository;
    private final UserService userService;

    public NoticeService(NoticeRepository noticeRepository,
                         UserService userService){
        this.noticeRepository = noticeRepository;
        this.userService = userService;
    }

    public Notice createNotice(Notice notice) {
        //이미 등록된 공지사항인지 확인
        verifyExistNotice(notice.getNoticeId());
        //관리자인지 확인
//        verifyUserRole(notice);

        return noticeRepository.save(notice);
    }

    public Notice updateNotice(Notice notice) {
        //조회하려는 공지사항이 존재하는지 확인
        Notice findNotice = findVerifiedNotice(notice.getNoticeId());
        //관리자인지 확인
//        verifyUserRole(notice);

        Optional.ofNullable(notice.getNoticeTitle())
                .ifPresent(noticeTitle -> findNotice.setNoticeTitle(noticeTitle));
        Optional.ofNullable(notice.getNoticeText())
                .ifPresent(noticeText -> findNotice.setNoticeText(noticeText));

        return noticeRepository.save(findNotice);
    }

    //이거 쿼리 안태우고 바로 검색하도록 수정
    public Notice findNotice(long noticeId) {
        return findVerifiedNoticeByQuery(noticeId);
    }

    public Page<Notice> findNotices(int page, int size) {
        return noticeRepository.findAll(PageRequest.of(page, size,
                Sort.by("noticeId").descending()));
    }

    public void deleteNotice(long noticeId) {
        Notice notice = findVerifiedNotice(noticeId);
        //관리자인지 확인
//        verifyUserRole(notice.getUserRole());

        noticeRepository.delete(notice);
    }

    public Notice findVerifiedNotice(long noticeId) {
        Optional<Notice> optionalNotice = noticeRepository.findById(noticeId);
        Notice findNotice =
                optionalNotice.orElseThrow(() ->
                        new BusinessLogicException(ExceptionCode.NOTICE_NOT_FOUND));

        return findNotice;
    }

    public void verifyExistNotice(long noticeId) {
        Optional<Notice> notice = noticeRepository.findById(noticeId);
        if (notice.isPresent()) {
            throw new BusinessLogicException(ExceptionCode.NOTICE_EXISTS);
        }
    }

    public Notice findVerifiedNoticeByQuery(long noticeId) {
        Optional<Notice> optionalNotice = noticeRepository.findByNotice(noticeId);
        Notice findNotice =
                optionalNotice.orElseThrow(() ->
                        new BusinessLogicException(ExceptionCode.NOTICE_NOT_FOUND));

        return findNotice;
    }

    //작성자 권환 확인 메소드
    public void verifyUserRole(Notice notice) {
        String role = notice.getUser().getRole();
        if (!(role == "관리자 계정")) {
            throw new BusinessLogicException(ExceptionCode.ACCESS_DENIED);
        }
    }
}
