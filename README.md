# Timer

## 说明
#### 高精度Interval定时器
* 自动校正误差：每次执行回调都会自动校正误差，精度1ms
* 延迟预警：超过指定的延迟上限（delayLimit），会触发回调（delayCallback）

## 用法
```js
const timer = new Timer(
  ({ offset, count }) => {
    console.log({ offset, count })
  },
  1000,
  {
    delayLimit: 50,
    delayCallback: ({ offset, count, delay }) => {
      console.log({ offset, count, delay })
    }
  }
)
```

## environment:
* browser: chrome >= 36, Firefox >= 38, edge >= 12
* node: >= v10.7.0
