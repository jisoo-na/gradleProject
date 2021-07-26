package com.common.gradleproject.board.controller;

import com.common.gradleproject.board.domain.BoardDTO;
import com.common.gradleproject.board.mapper.BoardMapper;
import com.common.gradleproject.common.CommonController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class BoardController {

    private static final Logger loggger = LoggerFactory.getLogger(BoardController.class);

    @Autowired
    private BoardMapper boardMapper;

    @Autowired
    private CommonController commonController;

    @RequestMapping(value = "/board/list.do")
    public ModelAndView listBoard(Model model) {

        ModelAndView mav = new ModelAndView("board/list");

        BoardDTO boardDTO = new BoardDTO();

        String title = "제목";
        String content = "내용";
        String writer = "작성자";

        boardDTO.setType(1);
        boardDTO.setSubject("제목");
        boardDTO.setContent("내용");
        boardDTO.setViewCnt(0);

        mav.addObject("t", title);
        mav.addObject("c", content);
        mav.addObject("w", writer);


        int cnt = boardMapper.selectBoard(boardDTO);
        loggger.info("cnt 값 :: " + cnt);

        commonController.setJsUrl(mav);

        return mav;
    }

//    @RequestMapping(value = "/board/list.do")
//    public String listBoard(Model model) {
//
//        BoardDTO boardDTO = new BoardDTO();
//
//        String title = "제목";
//        String content = "내용";
//        String writer = "작성자";
//
//        boardDTO.setType(1);
//        boardDTO.setSubject("제목");
//        boardDTO.setContent("내용");
//        boardDTO.setViewCnt(0);
//
//        model.addAttribute("t", title);
//        model.addAttribute("c", content);
//        model.addAttribute("w", writer);
//
////        boardMapper.insertBoard(boardDTO);
//
//        int cnt = boardMapper.selectBoard(boardDTO);
////        System.out.println("cnt 값 :: " + cnt);
//        loggger.info("cnt 값 :: " + cnt);
//
//        return "board/list";
//    }

}
