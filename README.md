This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.<br>

## Background

** React를 실제 프로덕트로 개발한 경험은 없습니다. **
Vue + Nuxt 프로젝트 개발 경험과 React Native 개발 경험만 있습니다.<br>

프로젝트는 Create React App 으로 개발되었습니다.<br>
Library는 AJAX 통신을 위해 axios가 사용되었습니다.<br>
컴포넌트는 모두 직접 구현했습니다.

SnackBar에서는 [Event Emitter](https://medium.com/@lolahef/react-event-emitter-9a3bb0c719)에 대한 글을 참고했습니다.

## Project Structure
- src/
  - assets/
    - css/
    - icons/
  - components/
  - services/
    - api/
    - localStorage/

## Development Flow

### 1. 프로젝트 구조 및 세팅
### 2. 컴포넌트 목업 추가
### 3. API 연결, data-binding
### 4. 컴포넌트 디자인
### 5. InfiniteScrollWrapper 구현
### 6. Scrap Action (w/ LocalStorage) 구현
### 7. 버튼, 이미지 애니메이션 효과
### 8. Responsive Design 적용
### 9. 개선 사항 도출 및 리팩토링
- Redux를 사용해 state management를 하면 App.js 를 간결하게 사용할 수 있으며 각 컴포넌트간의 의존성을 낮출 수 있습니다.
- 프로젝트 요구사항이 Single Page라 따로 라우팅을 추가하지 않았습니다.
