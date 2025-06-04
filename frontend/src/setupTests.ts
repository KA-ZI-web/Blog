import '@testing-library/jest-dom';
import { configure } from '@testing-library/react';

// 可选：调整测试库的默认行为
configure({
  testIdAttribute: 'data-test-id', // 自定义测试标识属性
});