package com.common.gradleproject.mapper;

import com.common.gradleproject.domain.BoardDTO;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface BoardMapper {

    public int selectBoard(BoardDTO board);

}
