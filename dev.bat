rem 开发模式8080
start cmd /k "npm run dev"
rem 开启编译器8090
start cmd /k "cd ../hsb_fd/ && npm run devServer"
rem 开启服务器
start cmd /k "cd ../api/ && npm run supervisor"
rem 开启数据库
start cmd /k "C: && cd \Program Files\MongoDB\Server\3.4\bin && mongod"
rem 开启组件开发8020
start cmd /k "cd ../hsb_fd/ && npm run devComponent"