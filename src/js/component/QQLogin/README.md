# 组件登陆态使用手册（暂定）

登陆态的存储采用 React Hooks Context 的方式进行。 Provider 已写在根组件了，使用的时候需要调用对应的 Consumer 即可，使用者不需要自行维护登陆态，直接采用本 QQLogin 文件夹暴露的模块进行包装即可。 

使用方法如下

# 登陆态 Consumer

``` js
import { loginCtx } from "src/js/component/QQLogin"; 

export function UserHeader() {
    return (
        <div>
            Header Container.
            <loginCtx.Consumer>{({ userInfo }) => {
                // ctrl 点击上面的 userInfo 可以看到它的类型定义哦
                
                if (userInfo) {
                    // 说明已登陆
                    return (
                        <div>`欢迎, ${ userInfo.loginName }`</div>
                    );
                } else {
                    // 未登陆或正在登陆中 ... 
                    return (
                        <div>未登陆</div>
                    ); 
                }
            }}</loginCtx.Consumer>
        </div>
    )
}
```


