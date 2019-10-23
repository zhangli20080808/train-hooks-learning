import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App.jsx';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App/>, document.getElementById('root'));
serviceWorker.unregister();

/*
实践 https://juejin.im/post/5d9c5f935188251e3a06bbbb

新特性 -- 1.Context 2.ContextType 3.lazy  允许我们懒加载组件  4.Suspense  因为lazy有loading状态 这个就是用来补齐你的视觉的
5.memo 优化渲染性能

策略和useEffect是一样的 调用时机有差异  useEffect渲染之后执行 而useMemo的返回值是参与渲染的

const double = useMemo(()=>{ return count * 2},[count === 3])

实例 传入的onClick方法导致app每次渲染 这是我们不希望的

const onClick = useMemo(()=>{return ()=>{ console.log('11'}},[]) 只运行一次 此时我们换成useCallback
const onClick = useCallback(()=>console.log('11),[]) 可以理解为 useCallback 是useMemo的变体

Context 定义：提供了一种方式，能够让数据在组件树中传递而不是一级一级手动传递 但也有缺陷 就是使用全局变量的形式 会让组件失去独立性 但又使用场景
API -- createContext(defaultValue?)
静态属性ContextType访问跨层级组件的数据  
static contentType = createContext()  render->获取 this.context

hooks
类组件不足  状态逻辑难以复用 缺少复用机制 渲染属性和高阶组件导致层级冗余  复杂难以维护 生命周期函数混杂不想干逻辑 想干逻辑分散在不同的生命周期
 this指向  内联函数过度创建新句柄 类函数成员不能保证this

 优势
 1. 函数组件无this指向问题 2. 自定义hooks方便复用状态逻辑 3. 副作用的关注点分离
    useState ->返回一个变量就行了  叫啥我不管 如何知道返回的是当前组件的count呢  因为js是单线程的 当useState被调用的时候 只会在一个上下文中 很多利用了全部唯一性
    动态增加useState的动作  会发生什么呢？

    useEffect render之后调用 可以根据自定义状态 调用与否 第一次渲染后的调用就相当于 componentDidMount 后面的调用都相当于componentDidUpdate
    回调函数  清除上一次动作的副作用遗留下来的状态  componentWillUnmount

 useRef 1.需要访问子组件中的一些方法获取dom元素  2.渲染不同生命周期需要共享的数据 需要访问上一次渲染时的数据甚至是state，就把他们同步到ref中，下一次渲染就能获取到了

 自定义hooks  使用法则 1.顶层组件调用hooks 2.在函数组件和自定义hooks函数中调用hooks函数 不能在其他函数中调用

 不在循环语句 条件语句 嵌套函数中调用 如果不在顶层调用 在不同的生周期调用 顺序可能发生了变化 进而导致变量混乱

 常见问题
 1. 对传统react编程的影响
 生命周期函数如何映射到hooks
    class Test extends Component {
        stat = {
            overflow: false
        }
        static getDerivedStateFromProps(props, state) {
            if (props.count > 10) {
                return {
                    overflow: true
                }
            }
        }
    }
    function Test(props) {
        const [overflow,setOverflow] = useState(false)
        if(overflow>10) setOverflow(true)
    }
 2. 类实例成员变量如何映射到Hooks    useRef
    class App {  it=0  }     function App { const it = useRef()  }

 3. Hooks如何获取到历史props和state
    function PreCounter() {
        const [count, setCount] = useState(0)

        const [updater, setUpdater] = useState(0)
        //用这个方法来强制刷新组件
        function forceUpdate() {
            setUpdater(updater => updater + 1)
        }
        const preCountRef = useRef()
        useEffect(() => {
            preCountRef.current = count
        })
        const preCount = preCountRef.current

        return <div>Now: {count} pre:{preCount}</div>
    }
 4. 如何强制更新一个Hooks组件
    思路  主动创建一个不参与渲染的state,然后更新她的值，以此实现强制重渲染


 将完全不相关的 state 拆分为多组 state。比如 size 和 position。
 如果某些 state 是相互关联的，或者需要一起发生改变，就可以把它们合并为一组 state。比如 left 和 top。

     function Example({id}) {
      const requestParams = useRef({});
      requestParams.current = {page: 1, size: 20, id};

      const refresh = useCallback(() => {
        doRefresh(requestParams.current);
      }, []);


      useEffect(() => {
        id && refresh();
      }, [id, refresh]); // 思考这里的 deps list 是否合理？  但是观察 refresh 方法可以发现，它在首次 render 被创建之后，永远不会发生改变了
    }

     const [state, setState] = useState({
      width: 100,
      height: 100,
      left: 0,
      top: 0
    });

    const handleMouseMove = (e) => {
      setState((prevState) => ({
        ...prevState,
        left: e.pageX,
        top: e.pageY,
      }))
    };

    const [filters, setFilters] = useState({
      name: "",
      address: "",
      status: "",
      personA: "",
      personB: "",
      progress: ""
    });

    useEffect(() => {
      id && doSearch(filters);
    }, [id, filters]);

    如果 state 不能合并，在 callback 内部又使用了 setState 方法，那么可以考虑使用 setState callback 来减少一些依赖。比如
    const useValues = () => {
      const [values, setValues] = useState({
        data: {},
        count: 0
      });

      const [updateData] = useCallback(
          (nextData) => {
            setValues({
              data: nextData,
              count: values.count + 1 // 因为 callback 内部依赖了外部的 values 变量，所以必须在依赖数组中指定它
            });
          },
          [values],
      );

      return [values, updateData];
    };


    依赖数组依赖的值最好不要超过 3 个，否则会导致代码会难以维护。
    如果发现依赖数组依赖的值过多，我们应该采取一些方法来减少它。

    去掉不必要的依赖。
    将 Hook 拆分为更小的单元，每个 Hook 依赖于各自的依赖数组。
    通过合并相关的 state，将多个依赖值聚合为一个。
    通过 setState 回调函数获取最新的 state，以减少外部依赖。
    通过 ref 来读取可变变量的值，不过需要注意控制修改它的途径。


    通过 setState 回调，让函数不依赖外部变量。例如：

    export const useCount = () => {
      const [count, setCount] = useState(0);

      const [increase, decrease] = useMemo(() => {
        const increase = () => {
          setCount((latestCount) => latestCount + 1);
        };

        const decrease = () => {
          setCount((latestCount) => latestCount - 1);
        };
        return [increase, decrease];
      }, []); // 保持依赖数组为空，这样 increase 和 decrease 方法都只会被创建一次

      return [count, increase, decrease];
    };

  通过 ref 来保存可变变量。例如：

    export const useCount = () => {
      const [count, setCount] = useState(0);
      const countRef = useRef(count);
      countRef.current = count;

      const [increase, decrease] = useMemo(() => {
        const increase = () => {
          setCount(countRef.current + 1);
        };

        const decrease = () => {
          setCount(countRef.current - 1);
        };
        return [increase, decrease];
      }, []); // 保持依赖数组为空，这样 increase 和 decrease 方法都只会被创建一次

      return [count, increase, decrease];
    };
}

redux 数据流 需改数据的途径，来表达对数据的改动以及数据间的关系
三大原则
1.单一数据源 都挂在同一个对象下面  2.状态不可变 修改数据的前后数据源不在是同一个对象了 why？可以实现状态的保存
3 纯函数修改状态


*/