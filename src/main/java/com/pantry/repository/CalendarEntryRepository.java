package com.pantry.repository;

import com.pantry.model.CalendarEntry;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.time.LocalDate;
import java.util.Optional;

@Repository
public interface CalendarEntryRepository extends JpaRepository<CalendarEntry, Long> {
    Optional<CalendarEntry> findByDate(LocalDate date);
}
