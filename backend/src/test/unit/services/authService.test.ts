// import { describe, it, expect, beforeEach, jest } from '@jest/globals';
// import { NewUser, LoginUser } from "../../../types/user";
// import { registerUser, loginUser } from "../../../services/authService";
// import {
//     setupMocks,
//     mockUserExists,
//     mockUserDoesNotExist,
//     mockCreateUser,
//     mockPasswordMatch
// } from '../../__mocks__/authServiceMocks';
// import { xata } from '../../../utils/db';

// describe('Auth Service Tests', () => {
//     beforeEach(() => {
//         setupMocks();
//         // Setup JWT environment variables
//         process.env.JWT_SECRET_KEY = 'test_secret';
//         process.env.JWT_EXPIRES_IN = '1h';
//     });

//     describe('User Registration', () => {
//         it('should successfully register a new user', async () => {
//             // Arrange
//             const newUser: NewUser = {
//                 name: 'Test User',
//                 email: 'test@example.com',
//                 password: 'password123',
//                 role: 'user'
//             };

//             mockUserDoesNotExist();
//             mockCreateUser({
//                 id: '1',
//                 name: newUser.name,
//                 email: newUser.email,
//                 role: newUser.role,
//                 password: 'hashedpassword'
//             });

//             // Act
//             const response = await registerUser(newUser);

//             // Assert
//             expect(response.code).toBe(200);
//             expect(response.message).toBe('User Registered successfully');
//         });

//         it('should fail when user already exists', async () => {
//             // Arrange
//             const existingUser: NewUser = {
//                 name: 'Existing User',
//                 email: 'existing@example.com',
//                 password: 'password123',
//                 role: 'user'
//             };

//             mockUserExists({
//                 id: '1',
//                 name: existingUser.name,
//                 email: existingUser.email,
//                 role: existingUser.role
//             });

//             // Act
//             const response = await registerUser(existingUser);

//             // Assert
//             expect(response.code).toBe(409);
//             expect(response.message).toBe('User already exists');
//         });

//         it('should register user with default role when role is not provided', async () => {
//             // Arrange
//             const newUser: NewUser = {
//                 name: 'Test User',
//                 email: 'test@example.com',
//                 password: 'password123',
//                 role: 'user'
//             };

//             mockUserDoesNotExist();
//             mockCreateUser({
//                 id: '1',
//                 name: newUser.name,
//                 email: newUser.email,
//                 role: 'user',
//                 password: 'hashedpassword'
//             });

//             // Act
//             const response = await registerUser(newUser);

//             // Assert
//             expect(response.code).toBe(200);
//             expect(response.message).toBe('User Registered successfully');
//         });
//     });

//     describe('User Login', () => {
//         it('should successfully login with correct credentials', async () => {
//             // Arrange
//             const loginData: LoginUser = {
//                 email: 'test@example.com',
//                 password: 'correctpassword'
//             };

//             mockUserExists({
//                 id: '1',
//                 email: loginData.email,
//                 password: 'hashedpassword',
//                 xata_id: 'user123'
//             });
//             mockPasswordMatch(true);

//             // Act
//             const response = await loginUser(loginData);

//             // Assert
//             expect(response.code).toBe(200);
//             expect(response.token).toBe('mocked_token');
//         });

//         it('should fail login with incorrect password', async () => {
//             // Arrange
//             const loginData: LoginUser = {
//                 email: 'test@example.com',
//                 password: 'wrongpassword'
//             };

//             mockUserExists({
//                 id: '1',
//                 email: loginData.email,
//                 password: 'hashedpassword',
//                 xata_id: 'user123'
//             });
//             mockPasswordMatch(false);

//             // Act
//             const response = await loginUser(loginData);

//             // Assert
//             expect(response.code).toBe(404);
//             expect(response.message).toBe('Invalid Credentials');
//         });

//         it('should fail login when user does not exist', async () => {
//             // Arrange
//             const loginData: LoginUser = {
//                 email: 'nonexistent@example.com',
//                 password: 'password123'
//             };

//             mockUserDoesNotExist();

//             // Act
//             const response = await loginUser(loginData);

//             // Assert
//             expect(response.code).toBe(404);
//             expect(response.message).toBe('Invalid Credentials');
//         });

//         it('should fail when JWT environment variables are not set', async () => {
//             // Arrange
//             const loginData: LoginUser = {
//                 email: 'test@example.com',
//                 password: 'correctpassword'
//             };

//             mockUserExists({
//                 id: '1',
//                 email: loginData.email,
//                 password: 'hashedpassword',
//                 xata_id: 'user123'
//             });
//             mockPasswordMatch(true);

//             // Remove JWT environment variables
//             delete process.env.JWT_SECRET_KEY;
//             delete process.env.JWT_EXPIRES_IN;

//             // Act
//             const response = await loginUser(loginData);

//             // Assert
//             expect(response.code).toBe(500);
//             expect(response.message).toContain("jwt's are not defined yet");
//         });
//     });

//     describe('Error Handling', () => {
//         it('should handle database errors during registration', async () => {
//             // Arrange
//             const newUser: NewUser = {
//                 name: 'Test User',
//                 email: 'test@example.com',
//                 password: 'password123',
//                 role: 'user'
//             };

//             // Mock a database error
//             mockUserDoesNotExist();
//             mockCreateUser(Promise.reject(new Error('Database connection error')));

//             // Act
//             const response = await registerUser(newUser);

//             // Assert
//             expect(response.code).toBe(500);
//             expect(response.message).toContain('Database connection error');
//         });

//         it('should handle database errors during login', async () => {
//             // Arrange
//             const loginData: LoginUser = {
//                 email: 'test@example.com',
//                 password: 'password123'
//             };

//             // Mock database error during user fetch
//             const mockFilter = jest.fn().mockReturnValue({
//                 getFirst: jest.fn().mockRejectedValue<any>(new Error('Database error'))
//             });
//             jest.spyOn(xata.db.Users, 'filter').mockImplementation(mockFilter);

//             // Act
//             const response = await loginUser(loginData);

//             // Assert
//             expect(response.code).toBe(500);
//             expect(response.message).toContain('Database error');
//         });
//     });
// });