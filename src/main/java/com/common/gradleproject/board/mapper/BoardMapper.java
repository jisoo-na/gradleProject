package com.common.gradleproject.board.mapper;

import com.common.gradleproject.board.domain.BoardDTO;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface BoardMapper {

    public int selectBoard(BoardDTO board);

    void insertBoard(BoardDTO boardDTO);
}
