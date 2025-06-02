import { Test, TestingModule } from '@nestjs/testing';
import { CryptService } from './crypt.service';

function randomString(length: number = 8): string {
  return (Math.random() + 1).toString(36).substring(7).slice(0, length);
}

describe('CryptService', () => {
  let service: CryptService;
  let plainPassword;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CryptService],
    }).compile();

    service = module.get<CryptService>(CryptService);
    plainPassword = randomString();
  });
  
  it("hashPassword should return a string with hash and salt separated by a dot", async () => {
    const hashed = await service.hashPassword(plainPassword);
    expect(typeof hashed).toBe("string");
    const parts = hashed.split(".");
    expect(parts.length).toBe(2);
    expect(parts[0]).toMatch(/^[a-f0-9]+$/);
    expect(parts[1]).toMatch(/^[a-f0-9]+$/);
    expect(parts[1].length).toBe(32);
  });

  it("comparePassword should return true for correct password", async () => {
    const hashed = await service.hashPassword(plainPassword);
    const result = await service.comparePassword(hashed, plainPassword);
    expect(result).toBe(true);
  });

  it("comparePassword should return false for incorrect password", async () => {
    const hashed = await service.hashPassword(plainPassword);
    const result = await service.comparePassword(hashed, "WrongPassword!");
    expect(result).toBe(false);
  });

  it("comparePassword should return false for malformed storedPassword", async () => {
    const malformed = randomString();
    await expect(service.comparePassword(malformed, plainPassword)).rejects.toThrow();
  });

  it("hashPassword should generate different hashes for the same password (due to random salt)", async () => {
    const hash1 = await service.hashPassword(plainPassword);
    const hash2 = await service.hashPassword(plainPassword);
    expect(hash1).not.toBe(hash2);
  });
});
