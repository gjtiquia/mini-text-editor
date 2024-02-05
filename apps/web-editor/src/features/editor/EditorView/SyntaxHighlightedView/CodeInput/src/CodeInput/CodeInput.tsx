import {
  ChangeEvent,
  KeyboardEvent,
  useEffect,
  useRef,
} from 'react';
import Prism from 'prismjs';
import styles from './styles.module.css';
import { CodeInputProps } from '../types';
import { handleEnterKey, handleTabKey } from '../utils';

export function CodeInput(props: CodeInputProps) {

  const outerWrapperDivElement = useRef<HTMLDivElement>(null);
  const wrapperDivElement = useRef<HTMLDivElement>(null);
  const preElement = useRef<HTMLPreElement>(null);
  const textAreaElement = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    updateOuterWrapperDivBackgroundColor();
  }, []);

  useEffect(() => {
    generateCodeTokens();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.language]);

  function updateOuterWrapperDivBackgroundColor() {
    if (!outerWrapperDivElement.current || !preElement.current)
      return;

    const preElementBackgroundColor = window.getComputedStyle(preElement.current).backgroundColor;
    outerWrapperDivElement.current.style.backgroundColor = preElementBackgroundColor;
  }

  function syncPreElementScrollWithTextAreaScroll() {
    if (preElement.current === null || textAreaElement.current === null) return;

    preElement.current.scrollTop = textAreaElement.current.scrollTop;
    preElement.current.scrollLeft = textAreaElement.current.scrollLeft;

    // Prevents a scrolling issue when the user manually resizes the wrapper
    if (textAreaElement.current.scrollTop > preElement.current.scrollTop) {
      textAreaElement.current.scrollTop = preElement.current.scrollTop;
    }

    // Prevents a scrolling issue when the user manually resizes the wrapper
    if (textAreaElement.current.scrollLeft > preElement.current.scrollLeft) {
      textAreaElement.current.scrollLeft = preElement.current.scrollLeft;
    }
  }

  const generateCodeTokens = () => {
    if (!Prism.languages[props.language])
      return Prism.util.encode(props.value).toString();

    return Prism.highlight(
      props.value,
      Prism.languages[props.language],
      props.language
    );
  };

  function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    let input_element = textAreaElement.current!;
    let code = input_element.value;
    if (event.key === 'Tab') {
      handleTabKey(event, input_element, code);
      props.onChange(input_element.value);
    }
    if (event.key === 'Enter') {
      handleEnterKey(event, input_element);
      props.onChange(input_element.value);
    }
  }

  async function handleInput(e: ChangeEvent<HTMLTextAreaElement>) {
    props.onChange((e.target as HTMLTextAreaElement).value);
  }

  return (
    <div
      ref={outerWrapperDivElement}
      className={styles['outer-wrapper'] + " " + "h-full w-full p-2 rounded-md"}
    >
      <div
        ref={wrapperDivElement}
        className={styles.wrap + " " + "h-full w-full"}
      >
        <textarea
          ref={textAreaElement}
          className="resize-none"

          spellCheck={false}

          onKeyDown={handleKeyDown}
          onInput={handleInput}
          onScroll={syncPreElementScrollWithTextAreaScroll}

          placeholder={props.placeholder}
          value={props.value}
        />

        <pre
          ref={preElement!}
          className={`language-${props.language}`}
          aria-hidden={true}
        >
          <div
            dangerouslySetInnerHTML={{ __html: generateCodeTokens() || '' }}
            className="code-highlighted"
          />
        </pre>
      </div>
    </div>
  );
};

export default CodeInput;
