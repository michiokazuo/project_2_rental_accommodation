package com.project2.service_impl;

import com.project2.config.AppConfig;
import com.project2.entities.data.Category;
import com.project2.repository.AppUserRepository;
import com.project2.repository.CategoryRepository;
import com.project2.repository.MotelRoomRepository;
import com.project2.service.CategoryService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class CategoryService_Impl implements CategoryService {

    private final AppConfig appConfig;

    private final CategoryRepository categoryRepository;

    private final MotelRoomRepository motelRoomRepository;

    @Override
    public List<Category> findAll(String email) throws Exception {
        return categoryRepository.findAllByDeletedFalse();
    }

    @Override
    public Category findById(Integer id, String email) throws Exception {
        if (id != null && id > 0)
            return categoryRepository.findByIdAndDeletedFalse(id);
        return null;
    }

    @Override
    public List<Category> search_sort(Category category, String field, Boolean isASC, String email) throws Exception {
        return null;
    }

    @Override
    public Category insert(Category category, String email) throws Exception {
        if (email != null && appConfig.checkAdmin(email)) {
            category.setDeleted(false);
            return categoryRepository.save(category);
        }
        return null;
    }

    @Override
    public Category update(Category category, String email) throws Exception {
        if (email != null && appConfig.checkAdmin(email)) {
            category.setDeleted(false);
            return categoryRepository.save(category);
        }
        return null;
    }

    @Override
    public boolean delete(Integer id, String email) throws Exception {
        return email != null && id != null && id > 0 && appConfig.checkAdmin(email)
                && categoryRepository.deleteCustom(id) >= 0
                && motelRoomRepository.updateByCategory(id) >= 0;
    }
}
