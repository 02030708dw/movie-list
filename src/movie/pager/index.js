import $ from "jquery";
import styles from "./index.module.less";
import {getMoveis} from '@/api/movie'
import {createMovieTags} from '../list';
/**
 * 初始化函数，负责创建容器
 */
let container;
function init() {
  container = $("<div>").addClass(styles.pager).appendTo("#app");
}

init();

/**
 * 根据传入的页码、页容量、总记录数，创建分页区域的标签
 * @params page 页码
 * @params limit 页容量
 * @params total 总页数
 */
export function createPagers(page, limit, total) {
  container.empty();

  /**
   * 辅助函数，负责帮忙创建一个页码标签
   * @params text 标签的文本
   * @params status 标签的状态，空字符串-普通状态，disabled-禁用状态，active-选中状态
   */
  function createTag(text, status, targetPage) {
    const span = $("<span>").appendTo(container).text(text);
    const className = styles[status];
    span.addClass(className);
    //只有是普通样式时5才需要监听点击事件
    if (status === "") {
      span.on("click", async function () {
        //1.重新拿数据
        const resp = await getMoveis(targetPage,limit)
        //2.重新生成列表 
        createMovieTags(resp.data.movieList)
        //3.重新生成分页
        createPagers(targetPage,limit,resp.data.movieTotal);
      });
    }
  }

  const pageNumber = Math.ceil(total / limit);
  //1. 创建首页标签
  createTag("|<<",page === 1 ? "disabled" : '', 1);
  //2. 创建上一页标签
  createTag("<<", page === 1 ? "disabled" : "", page - 1);
  //3. 创建数字页码标签
  const maxCount = 10; //页码
  let min =Math.floor(page - maxCount / 2);
  min < 1 && (min = 1) 
  let max = min + maxCount -1;
  max > pageNumber && (max = pageNumber);
  for(let i=min;i<= max;i++){
    createTag(i,i===page?'active':'',i)
  }
  //4. 创建下一页标签
  createTag('>>',page === pageNumber ? 'disabled' : '',page + 1)
  //5. 创建尾页标签
  createTag('>>|',page === pageNumber ? 'disabled' : '',pageNumber)
}  
