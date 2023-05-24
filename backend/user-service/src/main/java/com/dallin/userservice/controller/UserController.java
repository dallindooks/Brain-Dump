package com.dallin.userservice.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dallin.userservice.Exception.UserNotAuthenticatedException;
import com.dallin.userservice.config.DBConfiguration;
import com.dallin.userservice.model.User;
import com.dallin.userservice.service.UserService;
import com.dallin.userservice.utils.PasswordUtil;
import com.dallin.userservice.utils.TokenUtil;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private TokenUtil tokenUtil;

    @Autowired
    DBConfiguration configuration;
    
    @PostMapping("/add")
    public ResponseEntity<User> createUser(@RequestBody User user) {
        userService.addUser(user);
        String jwt = tokenUtil.getNewToken(user.getUsername());
        return ResponseEntity.status(HttpStatus.CREATED)
                .header("Location", "users/" + user.getId())
                .header("Token", jwt)
                .body(user);
        
    }

    @PutMapping("/update")
    public ResponseEntity<User> updateUser(@RequestBody User user, @RequestHeader String token) throws UserNotAuthenticatedException {
        if (!tokenUtil.validateToken(token, user.getUsername())) {
            throw new UserNotAuthenticatedException("Authentication Failed!");
        }
        userService.updateUser(user);
        return ResponseEntity.status(HttpStatus.OK)
                .header("Location", "users/" + user.getId())
                .body(user);
        
    }

    @GetMapping("/find_{userId}")
    public ResponseEntity<User> getUser(@PathVariable Integer userId, @RequestHeader String token) {
        User user = userService.findUserById(userId);
        if (!tokenUtil.validateToken(token, user.getUsername())) {
            throw new UserNotAuthenticatedException("Authentication Failed!");
        }
        return ResponseEntity.status(HttpStatus.OK)
                .body(user);
        
    }

    @GetMapping("/find-user_{username}")
    public ResponseEntity<User> getUserByUsername(@PathVariable String username, @RequestHeader String token) {
        User user = userService.findUserByUsername(username);
        if (!tokenUtil.validateToken(token, user.getUsername())) {
            throw new UserNotAuthenticatedException("Authentication Failed!");
        }
        return ResponseEntity.status(HttpStatus.OK)
                .body(user);
        
    }

    @DeleteMapping("/delete")
    public ResponseEntity<Void> deleteUser(@RequestBody User user, @RequestHeader String token) {
        if (!tokenUtil.validateToken(token, user.getUsername())) {
            throw new UserNotAuthenticatedException("Authentication Failed!");
        }
        userService.deleteUser(user);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @ExceptionHandler(UserNotAuthenticatedException.class)
    public ResponseEntity<String> handleUserNotAuthenticatedException(UserNotAuthenticatedException ex) {
        String errorMessage = ex.getMessage();
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorMessage);
    }

    @PostMapping("/login/{username}")
    public ResponseEntity<User> login(@PathVariable String username, @RequestBody String password){
        User user = userService.findUserByUsername(username);
        System.out.println(user.getPassword());
        System.out.println(password);
        if (PasswordUtil.verifyPassword(password, user.getPassword())){
            String jwt = tokenUtil.getNewToken(user.getUsername());
            HttpHeaders headers = new HttpHeaders();
            headers.add("Location", "users/" + user.getId());
            headers.add("Token", jwt);
            headers.add(HttpHeaders.ACCESS_CONTROL_EXPOSE_HEADERS, "token");
            return new ResponseEntity<User>(user, headers, HttpStatus.OK);
        }

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        
    }


}
