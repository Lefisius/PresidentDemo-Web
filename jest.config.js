// module.exports = {
//   preset: 'ts-jest',
//   testEnvironment: 'node',
//   testMatch: ['**/unit/**/*.spec.ts'],  // เฉพาะ Unit Tests เท่านั้น
//   moduleFileExtensions: ['ts', 'js'],
// };


module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',  // เปลี่ยนเป็น jsdom เพื่อจำลองสภาพแวดล้อมเบราว์เซอร์
  testMatch: ['**/unit/**/*.spec.ts'],  // คงการตั้งค่าเดิมสำหรับ Unit Tests
  moduleFileExtensions: ['ts', 'js'],
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
    },
  },
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
};