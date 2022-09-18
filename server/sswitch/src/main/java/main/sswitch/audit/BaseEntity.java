package main.sswitch.audit;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.Column;
import javax.persistence.EntityListeners;
import javax.persistence.MappedSuperclass;
import java.time.LocalDateTime;

@EntityListeners(AuditingEntityListener.class)
@MappedSuperclass
@Getter
public abstract class BaseEntity {
    @CreatedDate
    @Column(updatable = false, name = "date_created")
    protected LocalDateTime dateCreated;

    @Getter
    @Setter
    @Column(name = "date_modified")
    protected LocalDateTime dateModified = LocalDateTime.now();
}