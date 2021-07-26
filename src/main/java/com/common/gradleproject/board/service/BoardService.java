package com.common.gradleproject.board.service;

import com.common.gradleproject.board.domain.BoardDTO;

public interface BoardService {

    public int selectBoard(BoardDTO boardDTO);

    public void insertBoard(BoardDTO boardDTO);

}
