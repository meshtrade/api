@echo off
REM protoc-gen-meshjava.bat: Windows batch file for protoc-gen-meshjava plugin
REM
REM This batch file is the Windows equivalent of the Unix shell script.
REM It locates the compiled JAR file and executes it with the Java runtime.

setlocal enabledelayedexpansion

REM Determine the directory where this batch file is located
set "SCRIPT_DIR=%~dp0"
set "SCRIPT_DIR=%SCRIPT_DIR:~0,-1%"

REM Path to the compiled JAR file
set "JAR_FILE=%SCRIPT_DIR%\target\protoc-gen-meshjava-jar-with-dependencies.jar"

REM Check if the JAR file exists
if not exist "%JAR_FILE%" (
    echo Error: protoc-gen-meshjava JAR not found at: %JAR_FILE% >&2
    echo Please build the plugin first with: mvn clean package >&2
    exit /b 1
)

REM Check if Java is available
java -version >nul 2>&1
if errorlevel 1 (
    echo Error: Java is not installed or not in PATH >&2
    echo Please install Java 17+ and ensure it's in your PATH >&2
    exit /b 1
)

REM Execute the Java-based protoc plugin
REM Pass all arguments to the Java application
java -jar "%JAR_FILE%" %*