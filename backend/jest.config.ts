// jest.config.ts
import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest', // Usar o preset do ts-jest
  testEnvironment: 'node', // Ambiente de teste
  roots: ['<rootDir>/src'], // Diretório onde estão os arquivos de teste
  testMatch: ['**/?(*.)+(spec|test).[jt]s?(x)'], // Padrão de busca para arquivos de teste
};

export default config;
