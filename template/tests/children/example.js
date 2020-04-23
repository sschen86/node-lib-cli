module.exports = function (context, { tests, test, assert }) {
    tests('RESTful', () => {
        test('RESTful.get', () => {
            assert.isNumber(context.num)
        })
    })
}
