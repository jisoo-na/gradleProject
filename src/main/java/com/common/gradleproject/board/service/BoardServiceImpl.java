package com.common.gradleproject.board.service;

import com.common.gradleproject.board.domain.BoardDTO;
import com.common.gradleproject.board.mapper.BoardMapper;
import org.springframework.beans.factory.annotation.Autowired;

public class BoardServiceImpl implements BoardService {

    @Autowired
    private BoardMapper boardMapper;

    @Override
    public int selectBoard(BoardDTO boardDTO) {
        int result = 0;

        result = boardMapper.selectBoard(boardDTO);

        return result;
    }

    @Override
    public void insertBoard(BoardDTO boardDTO) {

        boardMapper.insertBoard(boardDTO);
    }

}
