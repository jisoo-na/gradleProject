package com.common.gradleproject.controller;

import com.common.gradleproject.domain.BoardDTO;
import com.common.gradleproject.mapper.BoardMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class BoardController {

    private static final Logger loggger = LoggerFactory.getLogger(BoardController.class);

    @Autowired
    private BoardMapper boardMapper;

    @RequestMapping(value = "/board/list.do")
    public String listBoard(Model model) {

        BoardDTO boardDTO = new BoardDTO();

        String title = "제목";
        String content = "내용";
        String writer = "작성자";

        model.addAttribute("t", title);
        model.addAttribute("c", content);
        model.addAttribute("w", writer);

        int cnt = boardMapper.selectBoard(boardDTO);
//        System.out.println("cnt 값 :: " + cnt);
        loggger.info("cnt 값 :: " + cnt);

        return "board/list";
    }

}
