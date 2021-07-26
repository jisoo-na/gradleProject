package com.common.gradleproject.common;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class CommonController {

	private static final Logger loggger = LoggerFactory.getLogger(CommonController.class);


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
