### 1. 介绍
jms-common中的avue 组件库是基于 [Avue](https://avuejs.com/) 开源库开发的符合我们业务的组件库，本质是对 elementUI 的二次封装，提炼了我们业务中的常见的场景，针对快递系统的业务做了大量的修改和自定义，增加或删除了功能，目的是为了更加简便容易的完成需求。crud中包含了增删改查的功能，其实就是table组件，from组件，和detail组件的组合。但是所有的组件又是松散耦合的，为了减少重复代码，绝大多数业务逻辑被封装在mixin里面。也便于应对后续业务调整代码改起来也方便一些。<br />

### 2. avue-crud的事件
avue-crud的事件是指模板上以`@`开头所有支持的事件，但是，某些事件是要配置项里面有一些配置才会触发。

| **名称** | **实参** | **说明** |
| --- | --- | --- |
| `@row-save` | `(from, close, loading)` | **弹窗表单新增时点击【保存】时触发的事件。**<br />​`from`：当前表单的数据对象；<br />`close`：关闭弹窗的函数；<br />`loading`：取消【保存】的loading状态的函数； |
| `@row-save-create` | `_(from, clear, loading)_` | **弹窗表单新增时点击【保存并新增】时触发的事件，只有在**`option`**里配置了**`saveCreate`**为**`true`**才会出现这个按钮。**<br />`from`：当前表单的数据对象；<br />`clear`：清除当前表单数据的函数；<br />`loading`：取消【保存】的loading状态的函数； |
| `@row-update` | `_(from, index, close, oldForm, loading)_` | **弹窗表单编辑时点击【保存】时触发的事件。**<br />`from`：当前表单的数据对象；<br />`index`：当前编辑的数据在表格中的索引<br />`close`：关闭弹窗的函数；<br />`oldForm`：未编辑之前的备份数据，有些场景下编辑要传`{newData, oldData}`，可以取它。<br />`loading`：取消【保存】的loading状态的函数； |
| `@search-change` | `_(searchForm)_` | **当表格搜索栏的任何搜索条件发生变化时，会触发此事件。**<br />`searchForm`：搜索栏变更后的对象； |
| `@search-reset` | _无_ | **点击搜索栏的【清空】按钮，会触发此事件。** |
| `@after-row-view` | `_(data)_` | **弹窗查看时的详情数据被获取时触发，如果在**`option`**里配置了**`viewUrl`**，从后端获取了查看数据之后触发。否则直接取表格当前行数据。**<br />`data`：详情数据对象； |
| `@delete-success` | _无_ | **仅当**`option`**里配置了**`deleteUrl`**。表格数据删除成功才会触发次事件。** |
| `@expand-change` | `_(row, expand)_` | **表格展开收起时触发的事件。**<br />仅当option配置了 |
| `@row-update` | `_(from, index, close, oldForm, loading)_` | **弹窗表单编辑时点击【保存】时触发的事件。**<br />`form`：当前表单的数据对象；<br />`index`：当前编辑的数据在表格中的索引<br />`close`：关闭弹窗的函数；<br />`oldForm`：未编辑之前的备份数据，有些场景下编辑要传`{newData, oldData}`，可以取它。<br />`loading`：取消【保存】的loading状态的函数； |
| `@row-update` | `_(from, index, close, oldForm, loading)_` | **弹窗表单编辑时点击【保存】时触发的事件。**<br />`form`：当前表单的数据对象；<br />`index`：当前编辑的数据在表格中的索引<br />`close`：关闭弹窗的函数；<br />`oldForm`：未编辑之前的备份数据，有些场景下编辑要传`{newData, oldData}`，可以取它。<br />`loading`：取消【保存】的loading状态的函数； |
| ​<br /> | _​_<br /> |  |
| ​<br /> | _​_<br /> |  |
| ​<br /> | _​_<br /> |  |
| ​<br /> | _​_<br /> |  |
| ​<br /> | _​_<br /> |  |
| ​<br /> | _​_<br /> |  |
| ​<br /> | _​_<br /> |  |
| ​<br /> | _​_<br /> |  |
| ​<br /> | _​_<br /> |  |
| ​<br /> | _​_<br /> |  |
| ​<br /> | _​_<br /> |  |
| ​<br /> | _​_<br /> |  |
| ​<br /> | _​_<br /> |  |
| ​<br /> | _​_<br /> |  |
| ​<br /> | _​_<br /> |  |
| ​<br /> | _​_<br /> |  |
| ​<br /> | _​_<br /> |  |
| ​<br /> | _​_<br /> |  |
| ​<br /> | _​_<br /> |  |
| ​<br /> | _​_<br /> |  |
| ​<br /> | _​_<br /> |  |



### 3. avue-crud的属性

<br />

### 4. avue-crud的options配置

<br />

### 5. avue-crud的slot用法

<br />

### 6. 权限初始化

<br />

### 7. 表格自适应

<br />

### 8. 响应式搜索栏

<br />

### 9. 动态列使用方法

<br />

### 10. avue-crud的使用案例
#### 1. 表单联动配置


#### 2. 分组表格和分组表单配置


#### 3. 大数据虚拟滚动方案


### 11. 注意事项

<br />
<br />

