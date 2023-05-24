package com.dallin.userservice.utils;

import org.mindrot.jbcrypt.BCrypt;

public class PasswordUtil {
    public static String bcryptPassword(String password) {
        // Generate salt
        String salt = BCrypt.gensalt();

        // Hash the password
        String hashedPassword = BCrypt.hashpw(password, salt);

        System.out.println(hashedPassword);

        return hashedPassword;
    }

    public static boolean verifyPassword(String password, String hashedPassword) {
        // Verify the password
        return BCrypt.checkpw(password, hashedPassword);
    }
}
