## Structure

1. fetch (from xlsx) [I/O : xlsx/entries]
    - load (page with playwright) [I/O : entries/data]
2. write [I/O : data/xlsx]

## TODO:

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