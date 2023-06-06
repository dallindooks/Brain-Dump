package com.dallin.userservice.service;

import java.util.List;

import org.apache.http.HttpStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.dallin.userservice.dao.UserDao;
import com.dallin.userservice.model.User;
import com.dallin.userservice.utils.PasswordUtil;

@Service
public class UserService {

    private final UserDao userDao;

    @Autowired
    public UserService(UserDao userDao) {
        this.userDao = userDao;
    }

    public User addUser(User user) {
        // System.out.println(user.getPassword());
        user.setPassword(PasswordUtil.bcryptPassword(user.getPassword()));
        User newUser = user;
        return userDao.save(newUser);
    }

    public User updateUser(User user) {
        User updatedUser = findUserById(user.getId());
        updatedUser.setEmail(user.getEmail());
        updatedUser.setFirstName(user.getFirstName());
        updatedUser.setLastName(user.getLastName());
        updatedUser.setUsername(user.getUsername());
        return userDao.save(updatedUser);
    }

    public void deleteUser (User user) {
        User deleteUser = user;
        userDao.delete(deleteUser);
    }

    public User findUserById(Integer Id) {
        return userDao.findById(Id).get();
    }

    public User findUserByUsername(String username) throws ResponseStatusException{
        User user = userDao.findUserByUsername(username).orElseThrow(() -> new ResponseStatusException(HttpStatus.SC_NOT_FOUND, "User not found", null));
        return user;
    }

    public List<User> getAllUsers() {
        return userDao.findAll();
    }
    
}
