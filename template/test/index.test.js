import ijest from 'ijest'
import base from './children/base'

// document
// https://github.com/sschen86/ijest

ijest({
  // 上下文环境
  context: {
    // 在此处定义环境变量，引入待测试的库，引入辅助工具等
  },

  // 测试开始前运行
  before (context) {
    // 初始化一些东西
  },

  // 测试结束后运行
  after (context) {
    // 清理东西
  },

  // 所有测试用例
  tests: {
    base,
  },

  // 自定义断言
  asserts: {
    // 定义来一个判断值是否是长度为2的字符串断言，可以在测试中使用
    isString2 (value) {
      expect(typeof value).toBe('string')
      expect(value.length).toBe(2)
    },
  },
})
