package com.bananahrm.hrms.Entity;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

@Entity
@Table(name="leave_requests")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level=AccessLevel.PRIVATE)
public class LeaveRequest {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    Long id;

    @Column(name = "approveBy")
    Long updateBy;

    @Column(name="employee_id")
    Long employeeId;

    @Column(name="leave_type_id")
    Long leaveTypeId;

    @Column(name="from_date")
    LocalDate fromDate;

    @Column(name="to_date")
    LocalDate toDate;

    String reason;

    // pending or success
    String status = "pending";
}
