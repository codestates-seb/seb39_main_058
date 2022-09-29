package main.sswitch.user.repository;

import main.sswitch.user.entity.User;
import org.springframework.data.domain.Example;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    @Query(value = "select * from user where login_id = :loginId", nativeQuery = true)
    Optional<User> findByLoginId(String loginId);
    @Query(value = "select * from user where email = :email", nativeQuery = true)
    Optional<User> findByEmail(String email);
    @Query(value = "select * from user where user_name = :userName", nativeQuery = true)
    Optional<User> findByUsername(String userName);
    @Query(value = "select * from user where user_id = :userId", nativeQuery = true)
    Optional<User> findByUserId(long userId);

    boolean existsByLoginId(String loginId);

    boolean existsByEmail(String email);

    boolean existsByUserName(String userName);
}
