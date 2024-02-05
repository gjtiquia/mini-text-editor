import React, {
  ChangeEvent,
  KeyboardEvent,
  useEffect,
  useRef,
  useState,
} from 'react';
import styles from './styles.module.css';
import { CodeInputProps } from '../types';
import { handleEnterKey, handleTabKey } from '../utils';

export const CodeInput: React.FC<CodeInputProps> = (props) => {
  let preElement = useRef<HTMLPreElement>(null);
  let textAreaElement = useRef<HTMLTextAreaElement>(null);
  let wrapperElement = useRef<HTMLDivElement>(null);
  let outerElement = useRef<HTMLDivElement>(null);

  // Used to detect when the user manually resizes the wrapper with handle
  let wrapperHeight: number;
  let wrapperWidth: number;

  const [manualResize, setManualResize] = useState(false);

  useEffect(() => {
    watchResize();
    if (props.autoHeight) {
      autoHeight();
    }
    setBackgroundWrapper();
  }, []);

  useEffect(() => {
    setBackgroundWrapper();
  });

  useEffect(() => {
    codeTokens();
  }, [props.language]);

  function setBackgroundWrapper() {
    if (outerElement.current) {
      outerElement.current.style.backgroundColor = window.getComputedStyle(
        preElement.current!
      ).backgroundColor;
    }
  }

  function setSizes() {

    setBackgroundWrapper();

    // Basically... in the orignal code, the wrapper size depends on inner textarea size
    // Everything is derived from textarea
    // But! I want the textarea size to derive from outer outer outer div
    // So.... to hack it, I passed the div reference as props and calculated it on the fly

    if (textAreaElement.current && props.containerRef.current) {

      const { height, width } = getContainerSize();

      textAreaElement.current.style.width = `${width}px`;
      textAreaElement.current.style.height = `${height}px`;
    }


    if (preElement.current && wrapperElement.current && outerElement.current) {

      const { height, width } = getTextareaSize();

      preElement.current.style.width = `${width}px`;
      preElement.current.style.height = `${height}px`;
      wrapperElement.current.style.width = `${width}px`;
      wrapperElement.current.style.height = `${height}px`;

      // calculate what 1rem is in pixels
      const rem = parseFloat(
        window.getComputedStyle(document.documentElement).fontSize
      );

      outerElement.current.style.width = `${width + rem}px`;
      outerElement.current.style.height = `${height + rem}px`;
    }
  }

  function getTextareaSize() {
    if (textAreaElement.current) {
      const { height, width } = textAreaElement.current.getBoundingClientRect();
      return { height, width };
    }
    return {
      height: 0,
      width: 0,
    };
  }

  function getContainerSize() {
    if (props.containerRef.current) {
      const { height, width } = props.containerRef.current.getBoundingClientRect();
      return { height, width };
    }
    return {
      height: 0,
      width: 0,
    };
  }

  function autoHeight() {
    if (manualResize) {
      return;
    }
    if (wrapperElement.current && textAreaElement.current) {
      // wrapperElement.current.style.height = `0px`;
      wrapperElement.current.style.height = textAreaElement.current.scrollHeight + 'px';
    }
  }

  function watchResize() {
    new ResizeObserver(setSizes).observe(textAreaElement.current!);
  }

  function syncScroll() {
    if (preElement.current === null || textAreaElement.current === null) return;
    preElement.current.scrollTop = textAreaElement.current.scrollTop;
    preElement.current.scrollLeft = textAreaElement.current.scrollLeft;
    // Prevents a scrolling issue when the user manually resizes the wrapper
    if (textAreaElement.current.scrollTop > preElement.current.scrollTop) {
      textAreaElement.current.scrollTop = preElement.current.scrollTop;
    }
    if (textAreaElement.current.scrollLeft > preElement.current.scrollLeft) {
      textAreaElement.current.scrollLeft = preElement.current.scrollLeft;
    }
  }

  const codeTokens = () => {
    try {
      if (props.prismJS) {
        if (props.prismJS.languages[props.language]) {
          if (props.autoHeight) {
            autoHeight();
          }
          const tokens = props.prismJS.highlight(
            props.value,
            props.prismJS.languages[props.language],
            props.language
          );
          return tokens;
        } else {
          if (props.autoHeight) {
            autoHeight();
          }
          return props.prismJS.util.encode(props.value).toString();
        }
      }
    } catch (e) {
      console.error(e);
    }
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

  function handleMouseDown() {
    const { height, width } = getTextareaSize();
    wrapperHeight = height;
    wrapperWidth = width;
  }

  function handleMouseUp() {
    const { height, width } = getTextareaSize();
    if (height !== wrapperHeight || width !== wrapperWidth) {
      setManualResize(true);
    }
  }

  return (
    <div
      ref={outerElement!}
      style={{
        padding: '1rem',
        boxSizing: `border-box`,
      }}
      className={styles['outer-wrapper']}
    >
      <div
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        ref={wrapperElement!}
        className={styles.wrap}
      >
        <textarea
          className={`${props.resize ? styles[`resize-${props.resize}`] : ''}`}
          spellCheck={false}
          onKeyDown={handleKeyDown}
          onInput={handleInput}
          onScroll={syncScroll}
          ref={textAreaElement!}
          placeholder={props.placeholder || 'Type code here...'}
          value={props.value}
        ></textarea>
        <pre
          ref={preElement!}
          className={`language-${props.language}`}
          aria-hidden={true}
        >
          <div
            dangerouslySetInnerHTML={{ __html: codeTokens() || '' }}
            className="code-highlighted"
          ></div>
        </pre>
      </div>
    </div>
  );
};

export default CodeInput;
