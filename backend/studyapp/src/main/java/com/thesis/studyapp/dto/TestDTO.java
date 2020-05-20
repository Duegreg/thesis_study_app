package com.thesis.studyapp.dto;

import com.thesis.studyapp.HasId;
import lombok.Data;
import org.springframework.data.neo4j.annotation.QueryResult;

import java.util.List;

@QueryResult
public @Data class TestDTO implements HasId {

    private Long id;

    private String name;
    private String description;

    private List<Long> testTaskIds;

//    private List<TestTaskDTO> tasks;
}
