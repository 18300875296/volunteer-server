import { BarConfigType } from './main';

const BAR_CONFIG: BarConfigType[] = [
  { title: '加粗', iconName: 'icon-bold', command: [{ commandName: 'toggleBold' }], mark: 'bold' },
  { title: '斜体', iconName: 'icon-italic', command: [{ commandName: 'toggleItalic' }], mark: 'italic' },
  { title: '删除线', iconName: 'icon-strike', command: [{ commandName: 'toggleStrike' }], mark: 'strike' },
  { title: '段落文字', iconName: 'icon-paragraph', command: [{ commandName: 'setParagraph' }], mark: 'paragraph' },
  {
    title: '字体颜色',
    iconName: 'icon-fontcolor',
    command: [{ commandName: 'setColor' }],
    inputType: 'color',
  },
  {
    title: '一级标题',
    iconName: 'icon-heading-1',
    command: [{ commandName: 'toggleHeading', params: [{ level: 1 }] }],
    mark: 'heading',
    attributes: { level: 1 },
  },
  {
    title: '二级标题',
    iconName: 'icon-heading-2',
    command: [{ commandName: 'toggleHeading', params: [{ level: 2 }] }],
    mark: 'heading',
    attributes: { level: 2 },
  },
  {
    title: '三级标题',
    iconName: 'icon-heading-3',
    command: [{ commandName: 'toggleHeading', params: [{ level: 3 }] }],
    mark: 'heading',
    attributes: { level: 3 },
  },
  {
    title: '四级标题',
    iconName: 'icon-heading-4',
    command: [{ commandName: 'toggleHeading', params: [{ level: 4 }] }],
    mark: 'heading',
    attributes: { level: 4 },
  },
  {
    title: '五级标题',
    iconName: 'icon-heading-5',
    command: [{ commandName: 'toggleHeading', params: [{ level: 5 }] }],
    mark: 'heading',
    attributes: { level: 5 },
  },
  {
    title: '六级标题',
    iconName: 'icon-heading-6',
    command: [{ commandName: 'toggleHeading', params: [{ level: 6 }] }],
    mark: 'heading',
    attributes: { level: 6 },
  },
  {
    title: '无序列表',
    iconName: 'icon-bullet-list',
    command: [{ commandName: 'toggleBulletList' }],
    mark: 'bulletList',
  },
  {
    title: '有序列表',
    iconName: 'icon-ordered-list',
    command: [{ commandName: 'toggleOrderedList' }],
    mark: 'orderedList',
  },
  { title: '引用', iconName: 'icon-blockquote', command: [{ commandName: 'toggleBlockquote' }], mark: 'blockquote' },
  { title: '分割线', iconName: 'icon-horizontal-rule', command: [{ commandName: 'setHorizontalRule' }] },
  {
    title: '插入图片',
    iconName: 'icon-insert-img',
    command: [{ commandName: 'toggleBlockquote' }],
    inputType: 'file',
    accept: 'image/*',
    multiple: true,
  },
  {
    title: '清除样式',
    iconName: 'icon-clear-style',
    command: [{ commandName: 'clearNodes' }, { commandName: 'unsetAllMarks' }],
  },
  {
    title: '左对齐',
    iconName: 'icon-align-left',
    command: [{ commandName: 'setTextAlign', params: ['left'] }],
  },
  {
    title: '居中',
    iconName: 'icon-align-center',
    command: [{ commandName: 'setTextAlign', params: ['center'] }],
  },
  {
    title: '右对齐',
    iconName: 'icon-align-right',
    command: [{ commandName: 'setTextAlign', params: ['right'] }],
  },
  {
    title: '左右对齐',
    iconName: 'icon-align-justify',
    command: [{ commandName: 'setTextAlign', params: ['justify'] }],
  },
  {
    title: '插入表格',
    iconName: 'icon-insert-table',
    command: [{ commandName: 'insertTable', params: [{ rows: 3, cols: 3, withHeaderRow: true }] }],
  },
  {
    title: '删除表格',
    iconName: 'icon-delete-table',
    command: [{ commandName: 'deleteTable' }],
  },
  {
    title: '表前插入行',
    iconName: 'icon-add-row-before',
    command: [{ commandName: 'addRowBefore' }],
  },
  {
    title: '表后插入行',
    iconName: 'icon-add-row-after',
    command: [{ commandName: 'addRowAfter' }],
  },

  {
    title: '删除行',
    iconName: 'icon-delete-raw',
    command: [{ commandName: 'deleteRow' }],
  },
  {
    title: '右边添加一列',
    iconName: 'icon-add-column-after',
    command: [{ commandName: 'addColumnAfter' }],
  },
  {
    title: '左边添加一列',
    iconName: 'icon-add-column-before',
    command: [{ commandName: 'addColumnBefore' }],
  },
  {
    title: '删除列',
    iconName: 'icon-delete-column',
    command: [{ commandName: 'deleteColumn' }],
  },
  {
    title: '撤销',
    iconName: 'icon-undo',
    command: [{ commandName: 'undo' }],
  },
  {
    title: '重做',
    iconName: 'icon-redo',
    command: [{ commandName: 'redo' }],
  },
];
export { BAR_CONFIG };
