package com.project2.config;

import com.project2.secutity.JWTAuthenticationFilter;
import com.project2.secutity.JWTAuthorizationFilter;
import com.project2.secutity.SecurityConstants;
import com.project2.service_impl.UserDetailsServiceImpl;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Configuration
@EnableWebSecurity
@AllArgsConstructor
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    private final UserDetailsServiceImpl userDetailsService;

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Override
    @Autowired
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService).passwordEncoder(passwordEncoder());
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        // disable crsf
        http.cors().and().csrf().disable();

        http.headers().defaultsDisabled().disable();

        http.authorizeRequests().antMatchers("/", "/trang-chu", "/dang-nhap", "/dang-xuat",
                "/tin-tuc", "/lien-he", "/thong-tin-thue", "/tim-kiem", "/error")
                .permitAll();
//
//        // chỉ cho phép người dùng đã đăng nhập với quền user hoặc admin truy cập
//        http.authorizeRequests().antMatchers("/user/**", "/cong-viec-ca-nhan", "/danh-gia")
//                .access("hasAnyRole('ROLE_USER')");
//
        http.authorizeRequests().antMatchers("/admin/**")
                .access("hasRole('ROLE_ADMIN')");

        http.authorizeRequests().antMatchers("/host/**")
                .access("hasRole('ROLE_HOST')");

        http.authorizeRequests().antMatchers("/user/**")
                .access("hasRole('ROLE_RENTER')");

        http.authorizeRequests().antMatchers("/admin-host/**")
                .access("hasAnyRole('ROLE_ADMIN', 'ROLE_HOST')");

        http.authorizeRequests().antMatchers("/admin-user/**")
                .access("hasAnyRole('ROLE_ADMIN', 'ROLE_RENTER')");

        http.authorizeRequests().antMatchers("/host-user/**")
                .access("hasAnyRole('ROLE_RENTER', 'ROLE_HOST')");

        http.authorizeRequests().antMatchers("/all-role/**")
                .access("hasAnyRole('ROLE_RENTER', 'ROLE_ADMIN', 'ROLE_HOST')");

        http.authorizeRequests().and().exceptionHandling().accessDeniedPage("/error");

        http.authorizeRequests()
//                .antMatchers(HttpMethod.POST, SecurityConstants.SIGN_UP_URL).permitAll()
//                .anyRequest().authenticated()
//                .and()
//                .addFilter(new JWTAuthenticationFilter(authenticationManager()))
//                .addFilter(new JWTAuthorizationFilter(authenticationManager()))
//                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .logout().logoutUrl("/dang-xuat").clearAuthentication(true).deleteCookies().invalidateHttpSession(true)
                .logoutSuccessUrl("/")
                .and().formLogin().loginPage("/dang-nhap")
                .loginProcessingUrl("/api/security-login").defaultSuccessUrl("/api/public/login-process/success")
                .failureUrl("/api/public/login-process/fail")
                .usernameParameter("username").passwordParameter("password");
    }
}
