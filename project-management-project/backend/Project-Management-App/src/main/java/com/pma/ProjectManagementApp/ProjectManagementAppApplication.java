package com.pma.ProjectManagementApp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class ProjectManagementAppApplication {

	public static void main(String[] args) {
		SpringApplication.run(ProjectManagementAppApplication.class, args);
	}

	@Configuration
	public class WebConfig implements WebMvcConfigurer {

		@Override
		public void addCorsMappings(CorsRegistry registry) {
			registry.addMapping("/**")
					.allowedOrigins("http://localhost:5173")
					.allowedMethods("GET", "POST", "PUT", "DELETE")
					.allowedHeaders("*");
		}
	}
}
