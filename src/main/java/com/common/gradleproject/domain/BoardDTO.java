package com.common.gradleproject.domain;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BoardDTO {

    private int seq;

    private int type;

    private String subject;

    private String content;

    private int viewCnt;

    private String delFg;

    private String regDate;

    private String uptDate;

}
