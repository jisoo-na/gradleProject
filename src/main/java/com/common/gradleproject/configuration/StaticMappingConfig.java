package com.common.gradleproject.configuration;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurationSupport;

@Configuration
public class StaticMappingConfig extends WebMvcConfigurationSupport {

	@Override
	public void addResourceHandlers(ResourceHandlerRegistry registry) {
		registry.addResourceHandler("/templates/**").addResourceLocations("classpath:/templates/");
		registry.addResourceHandler("/lib/**").addResourceLocations("classpath:/lib/");
		registry.addResourceHandler("/img/**").addResourceLocations("classpath:/img/");
	}

}
