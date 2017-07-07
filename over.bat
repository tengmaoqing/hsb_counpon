
cmd /k netstat -aon | findstr "8080" | taskkill /pid 2804 /F