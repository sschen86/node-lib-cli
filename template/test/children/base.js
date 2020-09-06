export default function (context, { tests, test, assert }) {
  // 定义测试分组
  tests('groupName', () => {
    test('test info', () => 'value', value => {
      // 执行各种断言
      assert.isString(value)
    })
  })
}
