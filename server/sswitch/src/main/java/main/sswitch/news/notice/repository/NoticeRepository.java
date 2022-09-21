package main.sswitch.news.notice.repository;

import main.sswitch.news.notice.entity.Notice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface NoticeRepository extends JpaRepository<Notice, Long> {
    @Query(value = "SELECT n FROM Notice n WHERE n.noticeId = :noticeId")
    Optional<Notice> findByNotice(long noticeId);
}
