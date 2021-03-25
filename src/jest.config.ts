export default {
  clearMocks: true,
  testEnvironment: "node",
  modulePaths: ["<rootDir>"],
  moduleDirectories: ["node_modules", "./node_modules"],
  testPathIgnorePatterns: ["/out/"],
};
