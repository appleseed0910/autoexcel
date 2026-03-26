## Structure

1. fetch (from xlsx) [I/O : xlsx/entries]
    - load (page with playwright) [I/O : entries/data]
2. write [I/O : data/xlsx]

## Doc

### bugs:

- ~~Bug fix: 现在split的那个序列 是region的头和尾 只有两个entry，需要遍历其中哈~~
    - **稀疏数据 vs 连续区间**的思维差异，quick fix by Pa, `const cells = Object.keys(sheet).filter(k => !k.startsWith('!'))`
- 连续cell里总有失败的url，如何写入至少三次尝试再next
- 真的失败了也要创建一个data 占位符，不然复制粘贴好烦人啊。。

---

1. future structure:
```
    - xlsx read script, excel to json(contain links)
    - playwright script, loop through links json, write down page title & pointer number json(data)
    - xlsx write script, write json(data) to a new excel file

    - main cmd to connect all 3 mentioned
```

2. Nice to have (TODO):
```
    - https://www.npmjs.com/package/cli-progress add cli progress bar 
    - Infodoc redirect
    - pointer to be a relatve locator selector
```

3. notes:
    - `pnpm exec tsc --init` to have init tsconfig file

---

4. questions:
    - > node:fs 和 fs 有啥区别？
        - node:fs 是指 import的时候 直接去node 内置模块去找 fs, 不要去node_modules里找了
        - 同理可得node其他的api也可以这样引入
        - BTW，在浏览器代码里 fs这个模块本身就不可用所以两种引入都没用啦

    - > 为啥要 先 readFileSync再丢给xlsx load
        - 哦其实 fs readFile 再xlsx read 出wb 和 xlsx直接read('xx.xlsx')是等价的

    - > JSON.stringyfy(data, null, 2)
        - `JSON.stringify(value, replacer, space)`
        - 第一个参 要stringfy的 对象
        - 第二个参 存在几种情况 `数组`|`func`|`null`
            - `数组` ['name', 'age'] 那就是只保留这俩字段 其他不要
            - `func` 一个处理函数，每个字段都会过一遍，适合用来数据清洗和修改
            - `null` 默认不做额外处理
        - 第三个参 是每个object中间加的空格数，最大10
        - Symbol key的值不参与遍历和序列化
        - 最常见场景 
            - `JSON.stringify(data, (k, v) => v === undefined ? null : v)`
            - `JSON.stringify(data, (k, v) => k === 'password' ? undefined : v)`


    - > `const [, end] = range.split(':')` 是啥意思
        - 解构赋值高级用法。。
        - 这里的 [ , end] 就是 跳过第0个值，第1个值给end
        - const [a, , c] = [1, 2, 3] 那么 c就是3

    - > `const endRow = Number(end.match(/\d+/)?.[0])` 又是啥！
        - 假设end是 'A2'
        - /\d+/ 至少1个digit
        - end.match(至少1个digit) => 拿到end去掉'A'的部分 => 可能是[1][2]
        - [0]取第一个嘛 转成数字
        - 常见regex `/[A-Z]+/` 字母 `/^\d+$/` 整个字符串必须是数字 `/\w+/` 字母数字下划线

    - > Array.from(row)这是啥
        - from的第一个参是 An iterable or array-like object to convert to an array. `String, Map, Set`
        - 第二个参可以传map func 就是每个都处理一下 再吐出来的arr

    - > **slice 和splice啥区别 亲亲？**
        - slice 不改原数组， splice改原数组！！
            - arr.slice(start, end) 不包含end，返回新arr
            - arr.splice(start, deleteCount, ...items) 从start删掉x个，插入...items
                - arr.splice(x, x) 返回的是 被删掉的东西！！
                - splice 插入的item永远是 startIdx，所以如果删0， 就会跑到定位的元素前面，如果删1，那就刚好替换

---

5. 工程化思维：
    - TS的possible undefined 如何根治
        1. 数据早收口
        2. 边界处理
        3. 把不确定变成确定
        4. 不要把undefined到处传

            ```typescript
                // bad!
                const name = data.user?.profile?.name
                console.log(name.toUpperCase())
            ```
            ```typescript
                // good!
                const rawName = data.user?.profile?.name

                if (!rawName) {
                    throw new Error('Missing user name')
                }

                const name = rawName
                console.log(name.toUpperCase())
            ```
            ```typescript
                // good!
                function getEndRow(end?: string) {
                    if (!end) return null

                    const match = end.match(/\d+/)
                    if (!match) return null

                    return Number(match[0])
                    }
            ```
            ```typescript
                const list = maybeList ?? []
                const name = maybeName ?? ''
                const count = maybeCount ?? 0
            ```

        5. 分一个raw data和business logic data
            ```typescript
                type RawUser = {
                    name?: string
                    age?: number
                    email?: string
                }

                type User = {
                    name: string
                    age: number
                    email: string
                }

                function normalizeUser(raw: RawUser): User {
                    if (!raw.name || raw.age == null || !raw.email) {
                        throw new Error('Invalid user data')
                    }

                    return {
                        name: raw.name,
                        age: raw.age,
                        email: raw.email
                    }
                }
            ```
        6. 强者不用`!`
        7. 工程化思维反思
            - 这是外部输入吗
            - 这里为空是正常分支，还是异常情况
            - 应该给默认值，还是直接 throw
            - 是不是前面建模就太松了
        8. cheatsheet
            - 给默认值：??
            - 提前 return
            - throw error
            - 先校验再转换成确定类型
            

