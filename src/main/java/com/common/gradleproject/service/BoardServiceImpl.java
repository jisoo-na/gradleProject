package com.common.gradleproject.service;

import com.common.gradleproject.domain.BoardDTO;
import com.common.gradleproject.mapper.BoardMapper;
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

}
