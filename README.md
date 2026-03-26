## Structure

1. fetch (from xlsx) [I/O : xlsx/entries]
    - load (page with playwright) [I/O : entries/data]
2. write [I/O : data/xlsx]

## TODO:

0. ~~Bug fix: 现在split的那个序列 是region的头和尾 只有两个entry，需要遍历其中哈~~
    - 稀疏数据 vs 连续区间的思维差异，quick fix by Pa, `const cells = Object.keys(sheet).filter(k => !k.startsWith('!'))`
0. 连续cell里总有失败的url，如何写入至少三次尝试再next

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
    - node:fs 和 fs 有啥区别？
    - 为啥要 先 readFileSync再丢给xlsx load
    - JSON.stringyfy(data, null, 2)
    - `const [, end] = range.split(':')` 是啥意思
    - `const endRow = Number(end.match(/\d+/)?.[0])` 又是啥！
    - ts 里 possible undefined也太多了 还是研究一下吧
    - Array.from(row)这是啥
    - slice 和splice啥区别 亲亲？