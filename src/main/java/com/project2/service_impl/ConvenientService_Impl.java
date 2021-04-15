package com.project2.service_impl;

import com.project2.config.AppConfig;
import com.project2.entities.data.Convenient;
import com.project2.repository.ConvenientRepository;
import com.project2.repository.RoomHasConvenientRepository;
import com.project2.service.ConvenientService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class ConvenientService_Impl implements ConvenientService {

    private final AppConfig appConfig;

    private final ConvenientRepository convenientRepository;

    private final RoomHasConvenientRepository roomHasConvenientRepository;

    @Override
    public List<Convenient> findAll(String email) throws Exception {
        return convenientRepository.findAllByDeletedFalse();
    }

    @Override
    public Convenient findById(Integer id, String email) throws Exception {
        return convenientRepository.findByIdAndDeletedFalse(id);
    }

    @Override
    public List<Convenient> search_sort(Convenient convenient, String field, Boolean isASC, String email) throws Exception {
        return null;
    }

    @Override
    public Convenient insert(Convenient convenient, String email) throws Exception {
        if (email != null && appConfig.checkAdmin(email)) {
            convenient.setDeleted(false);
            return convenientRepository.save(convenient);
        }
        return null;
    }

    @Override
    public Convenient update(Convenient convenient, String email) throws Exception {
        if (email != null && appConfig.checkAdmin(email)) {
            convenient.setDeleted(false);
            return convenientRepository.save(convenient);
        }
        return null;
    }

    @Override
    public boolean delete(Integer id, String email) throws Exception {
        return email != null && id != null && id > 0 && appConfig.checkAdmin(email)
                && convenientRepository.deleteCustom(id) >= 0
                && roomHasConvenientRepository.deleteByConvenient(id) >= 0;
    }
}
