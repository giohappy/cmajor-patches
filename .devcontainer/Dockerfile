FROM mcr.microsoft.com/devcontainers/base:ubuntu-22.04
RUN apt update -y
RUN apt install -y libwebkit2gtk-4.0-37 libgtk-3-dev
RUN wget https://github.com/cmajor-lang/cmajor/releases/download/1.0.2454/cmajor.linux.x64.zip && unzip cmajor.linux.x64.zip && rm cmajor.linux.x64.zip
