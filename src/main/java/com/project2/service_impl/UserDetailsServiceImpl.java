package com.project2.service_impl;

import com.project2.entities.data.AppUser;
import com.project2.repository.AppUserRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class UserDetailsServiceImpl implements UserDetailsService {

    private final AppUserRepository appUserRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        AppUser appUser = appUserRepository.findByEmailAndDeletedFalse(username);

        if (appUser == null) {
            throw new UsernameNotFoundException("Tài khoản " + username + " không tìm thấy!");
        }

        GrantedAuthority grantedAuthority = new SimpleGrantedAuthority(appUser.getRole().getName());
        List<GrantedAuthority> grantedAuthorityList = new ArrayList<>();
        grantedAuthorityList.add(grantedAuthority);

        return new User(username, appUser.getPassword(), grantedAuthorityList);
    }
}
