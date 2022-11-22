# tsServer.templete.v1

## typescript backend server templete v1

```
npm init -y
mkdir src
mkdir dist
```

#### 폴더구조

```
[project: /]
    > dist
    > node_modules
    > src
        app.ts
    package.json
    tsconfig.json
```

#### Typescript & 관련 모듈 설치

```
npm i -g typescript
npm i @types/node
npm i -D ts-node tsc-watch
```

#### Typescript 환경 설정(tsconfig.json 생성)

```
tsc --init --rootDir src --outDir ./dist --esModuleInterop --lib ES2020 --module commonjs --noImplicitAny true
```

#### tsconfig.json 수정

```
{
    "compilerOptions": {
        ...
    },
    "include": ["src/**/*"],
    "exclude": ["node_modules"]
}
```

#### package.json 수정

```
"scripts": {
    "start": "tsc-watch --onSuccess \"ts-node dist/app.js\" ",
    "build": "tsc --build",
    "dev": "ts-node-dev src/app.ts",
    "test": "echo \"Error: no test specified\" && exit 1"
}
```

#### 기본 모듈 설치

```
npm i body-parser @types/body-parser compression @types/compression connect-timeout @types/connect-timeout cors @types/cors express @types/express helmet dotenv @types/node
```
