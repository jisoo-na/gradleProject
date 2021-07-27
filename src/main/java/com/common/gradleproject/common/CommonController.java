package com.common.gradleproject.common;

import com.common.gradleproject.board.domain.BoardDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class CommonController {

	private static final Logger loggger = LoggerFactory.getLogger(CommonController.class);

	@Autowired
	private CommonController commonController;

	@RequestMapping(value = "/script/image.do")
	public ModelAndView listBoard(Model model) {

		ModelAndView mav = new ModelAndView("script/image");

		commonController.setJsUrl(mav);

		return mav;
	}


	/**
	 * 공통 (javascript 경로 셋팅을 위한 method)
	 * @param mav
	 */
	public void setJsUrl(ModelAndView mav) {
		String viewName = mav.getViewName();
		int idx = viewName.lastIndexOf("/");
		String jsUrl = "/templates/"+viewName.substring(0, idx) + "/js" + viewName.substring(idx,viewName.length())+".js";

		mav.addObject("jsUrl", jsUrl);
	}
}
