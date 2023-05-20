import { Injectable } from '@angular/core';
import { Redis } from "ioredis"

@Injectable({
  providedIn: 'root'
})
export class RedisService {
  private redis: Redis;

  constructor() {
    // Create a Redis client
    /**
    this.redis = new Redis({
      port: 6379,
      host: 'localhost',
      password: 'password'
    });
     */
    this.redis = new Redis();

  }

  async set(key: string, value: any): Promise<void> {
    await this.redis.set(key, value);
  }

  async get(key: string): Promise<string> {
    const value = await this.redis.get(key);
    if (value === null) {
      return '';
    }
    return value;
  }
}