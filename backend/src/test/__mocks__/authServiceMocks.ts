// import { jest } from '@jest/globals';
// import { xata } from "../../utils/db";
// import bcrypt from 'bcryptjs';
// import jwt from 'jsonwebtoken';

// // Mock implementations
// jest.mock('../../utils/db', () => ({
//     xata: {
//         db: {
//             Users: {
//                 filter: jest.fn(),
//                 create: jest.fn()
//             }
//         }
//     }
// }));

// jest.mock('bcryptjs', () => ({
//     hash: jest.fn(),
//     compare: jest.fn()
// }));

// jest.mock('jsonwebtoken', () => ({
//     sign: jest.fn()
// }));

// // Type assertions for mocked modules
// const mockedXata = jest.mocked(xata, { shallow: true });
// const mockedBcrypt = jest.mocked(bcrypt, { shallow: true });
// const mockedJwt = jest.mocked(jwt, { shallow: true });

// export const setupMocks = () => {
//     // Clear all mocks before setup
//     jest.clearAllMocks();

//     // Mock database methods
//     const mockFilter = mockedXata.db.Users.filter as jest.MockedFunction<typeof xata.db.Users.filter>;
//     mockFilter.mockReturnValue({
//         getFirst: jest.fn()
//     } as any);

//     // Mock bcrypt methods
//     (mockedBcrypt.hash as jest.MockedFunction<typeof bcrypt.hash>)
//         .mockImplementation(async (_password: string, _salt: string | number) => "hashedpassword");
    
//     (mockedBcrypt.compare as jest.MockedFunction<typeof bcrypt.compare>)
//         .mockImplementation(async (password: string, _hashedPassword: string) => password === "correctpassword");

//     // Mock JWT sign method
//     (mockedJwt.sign as jest.MockedFunction<typeof jwt.sign>)
//         .mockImplementation((_payload: any, _secret: string, _options: jwt.SignOptions) => "mocked_token");
// };

// // Helper functions for common mock scenarios
// export const mockUserExists = (user: any) => {
//     const mockFilter = mockedXata.db.Users.filter as jest.MockedFunction<typeof xata.db.Users.filter>;
//     mockFilter.mockReturnValueOnce({
//         getFirst: jest.fn().mockResolvedValueOnce(user)
//     } as any);
// };

// export const mockUserDoesNotExist = () => {
//     const mockFilter = mockedXata.db.Users.filter as jest.MockedFunction<typeof xata.db.Users.filter>;
//     mockFilter.mockReturnValueOnce({
//         getFirst: jest.fn().mockResolvedValueOnce(null)
//     } as any);
// };

// export const mockCreateUser = (userData: any) => {
//     const mockCreate = mockedXata.db.Users.create as jest.MockedFunction<typeof xata.db.Users.create>;
//     mockCreate.mockResolvedValueOnce(userData);
// };

// export const mockPasswordMatch = (matches: boolean) => {
//     (mockedBcrypt.compare as jest.MockedFunction<typeof bcrypt.compare>)
//         .mockResolvedValueOnce(matches);
// };
