package com.thesis.studyapp.dto;

import com.thesis.studyapp.HasId;
import lombok.Data;
import org.springframework.data.neo4j.annotation.QueryResult;

import java.util.List;

@QueryResult
public @Data class TaskDTO implements HasId {

    private Long id;

    private String question;
    private List<String> answers;
    private int solution;

}
