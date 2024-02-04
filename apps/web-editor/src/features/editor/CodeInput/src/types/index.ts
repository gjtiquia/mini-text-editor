import Prism from 'prismjs';

export type CodeInputProps = {
  prismJS?: typeof Prism;
  value: string;
  language: string;
  onChange: (value: string) => void;
  placeholder?: string;
  resize?: 'none' | 'both' | 'horizontal' | 'vertical';
  autoHeight?: boolean;
};
