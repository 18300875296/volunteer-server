import { provide, inject } from 'vue';
import { AnyExtension, Editor, SingleCommands } from '@tiptap/vue-3';
import TableCell from '@tiptap/extension-table-cell';
import TextStyle from '@tiptap/extension-text-style';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Table from '@tiptap/extension-table';
import TextAlign from '@tiptap/extension-text-align';
import TableRow from '@tiptap/extension-table-row';
import { Color } from '@tiptap/extension-color';
import TableHeader from '@tiptap/extension-table-header';

const COMMAND_CONFIG_SYMBOL = Symbol('commandConfig');
const EDITOR_SYMBOL = Symbol('editor');
type CustomCommandType = {
  commandName: keyof SingleCommands;
  params?: any[];
};
type BarConfigType = {
  title: string;
  iconName: string;
  command: CustomCommandType[];
  inputType?: InputType;
  mark?: string;
  attributes?: {} | undefined;
  accept?: string;
  multiple?: boolean;
};
type InputType = 'color' | 'file' | '';

type UseCommandType = {
  generateCommand(command: CustomCommandType[], target?: string | null): void;
  isActive: (mark: string, attributes: {} | undefined) => boolean;
};
type ProvideConfig = {
  commandConfig: UseCommandType;
  editor: Editor;
};
type ProvideType = {
  [COMMAND_CONFIG_SYMBOL]: UseCommandType;
  [EDITOR_SYMBOL]: Editor;
};
// type BarType = {
//   title: string;
//   iconName: string;
//   handle: {
//     handleFunction: (commands: CustomCommandType[]) => any;
//     params: CustomCommandType[];
//   };
// };
const CustomTableCell = TableCell.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      backgroundColor: {
        default: null,
        parseHTML: (element) => element.getAttribute('data-background-color'),
        renderHTML: (attributes) => {
          return {
            'data-background-color': attributes.backgroundColor,
            style: `background-color: ${attributes.backgroundColor}`,
          };
        },
      },
    };
  },
});
const extensions: AnyExtension[] = [
  StarterKit,
  Image,
  Table.configure({ resizable: true }),
  TableRow,
  TableHeader,
  CustomTableCell,
  TextStyle,
  Color,
  TextAlign.configure({
    types: ['heading', 'paragraph'],
  }),
];

//   title: '插入图片',
//   action: (imageList) => {
//     const imagesHtml = imageList.map((url) => `<img src="${url}" alt="" title=""></img>`).join(',');
//     props.editor.chain().focus().insertContent(imagesHtml).run();
//   },
// },
// {

const useCommand = (editor: Editor): UseCommandType => {
  const commandMap = editor.commands;
  function generateCommand(commands: CustomCommandType[], target?: string): void {
    let _editor = editor.chain().focus();
    for (const command of commands) {
      const { commandName, params } = command;
      if (commandMap[commandName]) {
        if (params && params.length) {
          _editor = _editor[commandName](...params);
        } else if (target) {
          _editor = _editor[commandName](target);
        }
      }
    }
    _editor.run();
  }
  function isActive(mark: string, attributes: {} | undefined): boolean {
    if (mark) return editor.isActive(mark, attributes);
    return false;
  }
  return { generateCommand, isActive };
};
const provideConfig = (provideConfig: ProvideConfig) => {
  const { commandConfig, editor } = provideConfig;
  provide(COMMAND_CONFIG_SYMBOL, commandConfig);
  provide(EDITOR_SYMBOL, editor);
};
const injectConfig = <K extends keyof ProvideType>(key: K, _default?: any): ProvideType[K] => {
  return inject(key, _default) as ProvideType[K];
};
const createTipTap = () => {
  const editor = new Editor({
    content: '',
    extensions,
  });
  const commandConfig = useCommand(editor);
  provideConfig({ commandConfig, editor });

  function destroy(): void {
    editor.destroy();
  }
  return { destroy };
};
export { createTipTap, injectConfig, COMMAND_CONFIG_SYMBOL, EDITOR_SYMBOL };
export type { BarConfigType, CustomCommandType };
