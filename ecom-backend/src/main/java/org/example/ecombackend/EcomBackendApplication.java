package org.example.ecombackend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.web.config.EnableSpringDataWebSupport;

@SpringBootApplication
@EnableSpringDataWebSupport(pageSerializationMode = EnableSpringDataWebSupport.PageSerializationMode.VIA_DTO)
public class EcomBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(EcomBackendApplication.class, args);
        System.out.println("Started");
    }

}
