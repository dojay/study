## 执行npm install，发生了什么

- npm install
- 检查是否有package-lock.json文件
  - 如果有，检查是否和package.json是否冲突
    - 不冲突的话，找缓存
      - 缓存中存在，直接解压到node_modules
      - 缓存中不存在，下载包。校验完整性，加入缓存，解压到node_modules，生成lock文件
    - 冲突的话，去远程获取包信息,构建依赖树
  - 去远程获取包信息，构建依赖树