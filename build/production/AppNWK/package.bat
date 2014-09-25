rem === Define the final name of your App
set var=nwkTest

rem === Clean up first
del %var%.zip /q
del %var%.exe /q
del nw.exe /q
del nw.bat /q
del tmp.nw /q
del tmp.zip /q
rmdir resources /s /q
rmdir node_modules /s /q 

rem === Copy the production build of the App to this folder
xcopy ..\App /E /Y
del nw.bat /q

rem === Zip just the ExtJS App to tmp.zip and rename it so nw will recognise it
7z.exe a tmp.zip -x!nwfiles -x!*.bat 
ren tmp.zip tmp.nw 

rem === Copy the clean version of nw.exe into this folder
copy nwFiles\nw.exe nw.exe

rem === Combine the nw.exe file with the tmp.zip file to create the package executable
copy /b nw.exe+tmp.nw %var%.exe
del tmp.nw /q
del nw.exe /q

rem === Add in the nw required files and create the distributable package.zip file
rem --- This could possibly be optimised, but isnt a big deal.
7z a %var%.zip .\nwFiles\* 
7z a %var%.zip %var%.exe 
del %var%.exe /q
7z d %var%.zip nw.exe

rem === Optional, custom. Add any other files you need to distribute.
7z a %var%.zip mydocs\ 
pause

