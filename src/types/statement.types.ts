import { BaseElement, BaseText } from "slate";

export type TTableCellJustify = 'right' | 'left' | 'center';

export interface ITableCellNode extends BaseElement {
    justify: TTableCellJustify;
} 

export interface ITableTextNode extends BaseText {
    bold: boolean;
    italic: boolean;
}